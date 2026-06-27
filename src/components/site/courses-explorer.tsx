import { useEffect, useState, useCallback } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseCard } from "@/components/site/course-card";
import { type Category, type Course } from "@/lib/data";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

type Level = "Barchasi" | Course["level"];
type Duration = "1-2 oy" | "3-5 oy" | "6+ oy";
type Sort = "popular" | "price-asc" | "price-desc" | "rating";

const levels: Level[] = ["Barchasi", "Boshlovchi", "O'rtacha", "Mutaxassis"];
const durations: Duration[] = ["1-2 oy", "3-5 oy", "6+ oy"];
const allCategories: Category[] = [
  "Frontend",
  "Backend",
  "Dizayn",
  "Mobil",
  "Data Science",
  "Marketing",
  "DevOps",
];

const LIMIT = 12;

export function CoursesExplorer() {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [level, setLevel] = useState<Level>("Barchasi");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedDurations, setSelectedDurations] = useState<Duration[]>([]);
  const [sort, setSort] = useState<Sort>("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [courses, setCourses] = useState<Course[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const fetchCourses = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(LIMIT),
    });
    if (query.trim()) params.set("search", query.trim());
    if (categories.length === 1) params.set("category", categories[0]);
    if (level !== "Barchasi") params.set("level", level);
    if (sort === "price-asc") { params.set("sortBy", "price"); params.set("sortOrder", "asc"); }
    else if (sort === "price-desc") { params.set("sortBy", "price"); params.set("sortOrder", "desc"); }
    else if (sort === "rating") { params.set("sortBy", "rating"); params.set("sortOrder", "desc"); }
    else { params.set("sortBy", "popular"); params.set("sortOrder", "desc"); }

    api
      .get<{ data: { items: Course[]; total: number } }>(`/public/courses?${params}`)
      .then((res) => {
        setCourses(res.data.data.items ?? []);
        setTotal(res.data.data.total ?? 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [query, categories, level, sort, page]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const totalPages = Math.ceil(total / LIMIT);

  const resetFilters = () => {
    setQuery("");
    setCategories([]);
    setLevel("Barchasi");
    setMinPrice("");
    setMaxPrice("");
    setSelectedDurations([]);
    setPage(1);
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[260px_1fr]">

      <div>
        <Button
          variant="outline"
          className="w-full lg:hidden"
          onClick={() => setFiltersOpen((v) => !v)}
        >
          <SlidersHorizontal className="size-4" />
          Filtrlar
        </Button>

        <Card className={cn("mt-3 lg:mt-0", !filtersOpen && "hidden lg:block")}>
          <CardContent className="flex flex-col gap-6">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Kategoriya
              </p>
              <div className="flex flex-col gap-2.5">
                {allCategories.map((cat) => (
                  <Label
                    key={cat}
                    className="flex items-center gap-2 text-sm font-normal"
                  >
                    <Checkbox
                      checked={categories.includes(cat)}
                      onCheckedChange={() => {
                        setCategories((prev) => toggle(prev, cat));
                        setPage(1);
                      }}
                    />
                    <span className="flex-1">{cat}</span>
                  </Label>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Daraja
              </p>
              <div className="flex flex-col gap-2.5">
                {levels.map((l) => (
                  <Label
                    key={l}
                    className="flex items-center gap-2 text-sm font-normal"
                  >
                    <input
                      type="radio"
                      name="level"
                      checked={level === l}
                      onChange={() => { setLevel(l); setPage(1); }}
                      className="size-4 accent-primary"
                    />
                    {l}
                  </Label>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Narx oralig&rsquo;i (so&rsquo;m)
              </p>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="400 000"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  aria-label="Minimal narx"
                />
                <span className="text-muted-foreground">—</span>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="2 000 000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  aria-label="Maksimal narx"
                />
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Davomiyligi
              </p>
              <div className="flex flex-col gap-2.5">
                {durations.map((d) => (
                  <Label
                    key={d}
                    className="flex items-center gap-2 text-sm font-normal"
                  >
                    <Checkbox
                      checked={selectedDurations.includes(d)}
                      onCheckedChange={() =>
                        setSelectedDurations((prev) => toggle(prev, d))
                      }
                    />
                    {d}
                  </Label>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => { setPage(1); fetchCourses(); }}>
                Filtrlash
              </Button>
              <Button variant="outline" className="flex-1" onClick={resetFilters}>
                Tozalash
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>


      <div>
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Kurs nomini yozing..."
            className="pl-9"
            aria-label="Kurs qidirish"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {total} ta
            </span>{" "}
            kurs topildi
          </p>
          <Select value={sort} onValueChange={(v) => { setSort(v as Sort); setPage(1); }}>
            <SelectTrigger className="w-44" aria-label="Saralash">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="popular">Eng mashhur</SelectItem>
              <SelectItem value="rating">Reyting bo&rsquo;yicha</SelectItem>
              <SelectItem value="price-asc">Arzon → qimmat</SelectItem>
              <SelectItem value="price-desc">Qimmat → arzon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
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
          <p className="py-24 text-center text-muted-foreground">
            Hech qanday kurs topilmadi. Filtrlarni o&rsquo;zgartirib
            ko&rsquo;ring.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  text=""
                  className="pr-1.5!"
                  onClick={(e) => { e.preventDefault(); if (page > 1) setPage(page - 1); }}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    href="#"
                    isActive={page === i + 1}
                    onClick={(e) => { e.preventDefault(); setPage(i + 1); }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  text=""
                  className="pl-1.5!"
                  onClick={(e) => { e.preventDefault(); if (page < totalPages) setPage(page + 1); }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
