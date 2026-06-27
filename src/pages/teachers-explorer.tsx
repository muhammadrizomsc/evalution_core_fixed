import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TeacherCard } from "@/components/site/teacher-card";
import { type Teacher } from "@/lib/data";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

const filters = [
  "Barchasi",
  "Frontend",
  "Backend",
  "Dizayn",
  "Mobil",
  "Marketing",
] as const;

const LIMIT = 12;

export function TeachersExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof filters)[number]>("Barchasi");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(LIMIT),
    });
    api
      .get<{ data: { items: Teacher[]; total: number } }>(`/public/instructors?${params}`)
      .then((res) => {
        setTeachers(res.data.data.items ?? []);
        setTotal(res.data.data.total ?? 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  const filtered = teachers.filter((t) => {
    const matchesCategory = category === "Barchasi" || t.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      t.name.toLowerCase().includes(q) ||
      t.role.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O'qituvchi ismini qidiring..."
            className="pl-9"
            aria-label="O'qituvchi qidirish"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setCategory(f)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                category === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl border p-6 flex flex-col items-center gap-3">
              <Skeleton className="size-24 rounded-full" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          {"Hech qanday o'qituvchi topilmadi. Qidiruvni o'zgartirib ko'ring."}
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
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
            {Array.from({ length: totalPages }, (_, i) => (
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
  );
}
