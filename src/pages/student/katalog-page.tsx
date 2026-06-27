import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice, categoryColors } from "@/lib/data";
import { api } from "@/lib/api";

interface ApiCourse {
  id: string;
  slug: string;
  title: string;
  category: string;
  rating?: number;
  reviews?: number;
  totalLessons?: number;
  price: number;
  oldPrice?: number;
  image?: string;
  popular?: boolean;
  level?: string;
  instructor?: {
    firstName: string;
    lastName: string;
  };
}

const PER_PAGE = 8;
const categories = ["Barchasi", "Frontend", "Backend", "Dizayn", "Mobil", "Data Science", "Marketing", "DevOps"];
const levels = ["barchasi", "Boshlovchi", "O'rtacha", "Mutaxassis"];
const sortOptions = [
  { value: "popular", label: "Eng mashhur" },
  { value: "price-asc", label: "Arzon" },
  { value: "price-desc", label: "Qimmat" },
  { value: "rating", label: "Reyting" },
];

export function KatalogPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [selectedLevel, setSelectedLevel] = useState("barchasi");
  const [sortBy, setSortBy] = useState("popular");

  const [courses, setCourses] = useState<ApiCourse[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCourses = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(PER_PAGE),
    });
    if (search.trim()) params.set("search", search.trim());
    if (selectedCategory !== "Barchasi") params.set("category", selectedCategory);
    if (selectedLevel !== "barchasi") params.set("level", selectedLevel);
    if (sortBy === "price-asc") { params.set("sortBy", "price"); params.set("sortOrder", "asc"); }
    else if (sortBy === "price-desc") { params.set("sortBy", "price"); params.set("sortOrder", "desc"); }
    else if (sortBy === "rating") { params.set("sortBy", "rating"); params.set("sortOrder", "desc"); }
    else { params.set("featured", "true"); }

    api
      .get<{ data: { items: ApiCourse[]; total: number } }>(`/public/courses?${params}`)
      .then((res) => {
        setCourses(res.data.data.items ?? []);
        setTotal(res.data.data.total ?? 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, search, selectedCategory, selectedLevel, sortBy]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight">Kurslar katalogi</h1>
        <p className="mt-1 text-sm text-slate-400">
          Yangi kurs tanlang va bir martalik to'lov bilan umrbod kirish oling.
        </p>
      </div>

      <Card className="rounded-xl border-slate-200 shadow-xs">
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Kurs nomi bo'yicha qidiring..."
              className="pl-9"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              className="rounded-lg border px-3 py-2 text-sm"
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === "Barchasi" ? "Barcha kategoriyalar" : c}</option>
              ))}
            </select>
            <select
              className="rounded-lg border px-3 py-2 text-sm"
              value={selectedLevel}
              onChange={(e) => { setSelectedLevel(e.target.value); setPage(1); }}
            >
              {levels.map((l) => (
                <option key={l} value={l}>{l === "barchasi" ? "Daraja: barchasi" : l}</option>
              ))}
            </select>
            <select
              className="rounded-lg border px-3 py-2 text-sm"
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>Saralash: {s.label}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: PER_PAGE }).map((_, i) => (
            <div key={i} className="rounded-xl border overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full mt-3" />
              </div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg font-medium text-slate-500">Natija topilmadi</p>
          <p className="mt-1 text-sm text-slate-400">Boshqa kalit so'z yoki kategoriya sinab ko'ring.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const category = course.category as keyof typeof categoryColors;
            const instructorName = course.instructor
              ? `${course.instructor.firstName} ${course.instructor.lastName}`
              : "";
            return (
              <Card key={course.slug ?? course.id} className="group overflow-hidden rounded-xl border-slate-200 shadow-xs transition-shadow hover:shadow-md">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.image ?? "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80"}
                    alt={course.title}
                    className="size-full object-cover transition-transform group-hover:scale-105"
                  />
                  {categoryColors[category] && (
                    <Badge className={`absolute top-3 left-3 shadow-none ${categoryColors[category]}`}>
                      {course.category}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-900">{course.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {instructorName}{instructorName && course.totalLessons ? " · " : ""}{course.totalLessons ? `${course.totalLessons} dars` : ""}
                  </p>
                  {course.rating !== undefined && (
                    <div className="mt-2 flex items-center gap-1.5 text-sm">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{course.rating}</span>
                      {course.reviews !== undefined && (
                        <span className="text-slate-400">({course.reviews})</span>
                      )}
                    </div>
                  )}
                  <div className="mt-3">
                    <span className="text-lg font-bold text-slate-900">{formatPrice(course.price)}</span>
                    {course.oldPrice && (
                      <span className="ml-2 text-sm text-slate-400 line-through">
                        {formatPrice(course.oldPrice)}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link to={`/student/katalog/${course.slug ?? course.id}`}>Batafsil</Link>
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <Link to={`/student/katalog/${course.slug ?? course.id}/tolov`}>Sotib olish</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-blue-600">
          Ko'rsatilmoqda {total === 0 ? 0 : (page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, total)} / <span className="font-semibold">{total}</span> kurs
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="size-9"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
              <Button
                key={i + 1}
                variant={page === i + 1 ? "default" : "outline"}
                size="icon"
                className="size-9"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="size-9"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
