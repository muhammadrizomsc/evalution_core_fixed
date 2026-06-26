import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TeacherCard } from "@/components/site/teacher-card";
import { teachers } from "@/lib/data";
import { cn } from "@/lib/utils";

const filters = [
  "Barchasi",
  "Frontend",
  "Backend",
  "Dizayn",
  "Mobil",
  "Marketing",
] as const;

export function TeachersExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof filters)[number]>("Barchasi");

  const filtered = teachers.filter((t) => {
    const matchesCategory = category === "Barchasi" || t.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      t.name.toLowerCase().includes(q) ||
      t.role.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

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

      {filtered.length === 0 ? (
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
  );
}
