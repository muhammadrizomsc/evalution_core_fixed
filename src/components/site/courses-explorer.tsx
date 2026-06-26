import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { courses, type Category, type Course } from "@/lib/data";
import { cn } from "@/lib/utils";

type Level = "Barchasi" | Course["level"];
type Duration = "1-2 oy" | "3-5 oy" | "6+ oy";
type Sort = "popular" | "price-asc" | "price-desc" | "rating";

const levels: Level[] = ["Barchasi", "Boshlovchi", "O'rtacha", "Mutaxassis"];
const durations: Duration[] = ["1-2 oy", "3-5 oy", "6+ oy"];

const categoryCounts = courses.reduce<Partial<Record<Category, number>>>(
  (acc, c) => {
    acc[c.category] = (acc[c.category] ?? 0) + 1;
    return acc;
  },
  {}
);
const allCategories = Object.keys(categoryCounts) as Category[];

function matchesDuration(course: Course, selected: Duration[]): boolean {
  if (selected.length === 0) return true;
  return selected.some((d) => {
    if (d === "1-2 oy") return course.durationMonths <= 2;
    if (d === "3-5 oy")
      return course.durationMonths >= 3 && course.durationMonths <= 5;
    return course.durationMonths >= 6;
  });
}

export function CoursesExplorer() {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [level, setLevel] = useState<Level>("Barchasi");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedDurations, setSelectedDurations] = useState<Duration[]>([]);
  const [sort, setSort] = useState<Sort>("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);
  // Price inputs apply only when "Filtrlash" is pressed, like the mockup.
  const [appliedPrice, setAppliedPrice] = useState<{
    min: number | null;
    max: number | null;
  }>({ min: null, max: null });

  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const applyFilters = () => {
    setAppliedPrice({
      min: minPrice ? Number(minPrice) : null,
      max: maxPrice ? Number(maxPrice) : null,
    });
  };

  const resetFilters = () => {
    setQuery("");
    setCategories([]);
    setLevel("Barchasi");
    setMinPrice("");
    setMaxPrice("");
    setSelectedDurations([]);
    setAppliedPrice({ min: null, max: null });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = courses.filter((course) => {
      if (q && !`${course.title} ${course.excerpt}`.toLowerCase().includes(q))
        return false;
      if (categories.length > 0 && !categories.includes(course.category))
        return false;
      if (level !== "Barchasi" && course.level !== level) return false;
      if (appliedPrice.min !== null && course.price < appliedPrice.min)
        return false;
      if (appliedPrice.max !== null && course.price > appliedPrice.max)
        return false;
      if (!matchesDuration(course, selectedDurations)) return false;
      return true;
    });

    return result.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.reviews - a.reviews;
      }
    });
  }, [query, categories, level, appliedPrice, selectedDurations, sort]);

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
                      onCheckedChange={() =>
                        setCategories((prev) => toggle(prev, cat))
                      }
                    />
                    <span className="flex-1">{cat}</span>
                    <span className="text-xs text-muted-foreground">
                      ({categoryCounts[cat]})
                    </span>
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
                      onChange={() => setLevel(l)}
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
              <Button className="flex-1" onClick={applyFilters}>
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kurs nomini yozing..."
            className="pl-9"
            aria-label="Kurs qidirish"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {filtered.length} ta
            </span>{" "}
            kurs topildi
          </p>
          <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
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

        {filtered.length === 0 ? (
          <p className="py-24 text-center text-muted-foreground">
            Hech qanday kurs topilmadi. Filtrlarni o&rsquo;zgartirib
            ko&rsquo;ring.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        )}

        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" text="" className="pr-1.5!" />
            </PaginationItem>
            {[1, 2, 3].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#" isActive={page === 1}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" text="" className="pl-1.5!" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
