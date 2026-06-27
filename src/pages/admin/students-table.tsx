import * as React from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  LayoutGrid,
  List,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInitials } from "@/lib/data";
import { api } from "@/lib/api";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status?: string;
  avatar?: string;
  code?: string;
  groupName?: string;
  paymentStatus?: string;
}

const PAGE_SIZE = 10;

const paymentBadgeClasses: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-700",
  debt: "bg-red-50 text-red-700",
  pending: "bg-orange-50 text-orange-700",
  "To'langan": "bg-emerald-50 text-emerald-700",
  Qarzdor: "bg-red-50 text-red-700",
  Kutilmoqda: "bg-orange-50 text-orange-700",
};

export function StudentsTable() {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [view, setView] = React.useState<"list" | "grid">("list");
  const [page, setPage] = React.useState(1);

  const [students, setStudents] = React.useState<Student[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const fetchStudents = React.useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_SIZE),
    });
    if (query.trim()) params.set("search", query.trim());
    if (status !== "all") params.set("status", status);

    api
      .get<{ data: { items: Student[]; total: number } }>(`/admin/students?${params}`)
      .then((res) => {
        setStudents(res.data.data.items ?? []);
        setTotal(res.data.data.total ?? 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, query, status]);

  React.useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    setPage(1);
  };

  function getName(s: Student) {
    return `${s.firstName ?? ""} ${s.lastName ?? ""}`.trim();
  }

  const pageNumbers = React.useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("ellipsis");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  }, [page, totalPages]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-xs">

      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={handleSearch}
            placeholder="Talaba qidiring (ism, ID, telefon)..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full sm:w-auto">
              <SelectValue placeholder="Barcha holatlar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha holatlar</SelectItem>
              <SelectItem value="active">Faol</SelectItem>
              <SelectItem value="inactive">Nofaol</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden items-center gap-1 rounded-lg border border-slate-200 p-0.5 sm:flex">
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon-sm"
              aria-label="Ro'yxat ko'rinishi"
              onClick={() => setView("list")}
            >
              <List />
            </Button>
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon-sm"
              aria-label="Katak ko'rinishi"
              onClick={() => setView("grid")}
            >
              <LayoutGrid />
            </Button>
          </div>
        </div>
      </div>


      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10 pl-4">
                <Checkbox aria-label="Barchasini tanlash" />
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                №
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                F.I.SH.
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Telefon
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Email
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Holat
              </TableHead>
              <TableHead className="pr-4 text-right text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Amal
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="pl-4"><Checkbox disabled /></TableCell>
                  <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-12 text-center text-sm text-slate-500"
                >
                  Hech qanday talaba topilmadi
                </TableCell>
              </TableRow>
            ) : (
              students.map((s, i) => {
                const fullName = getName(s);
                const rowNum = (page - 1) * PAGE_SIZE + i + 1;
                const isActive = s.status === "active" || s.status === "Faol";
                return (
                  <TableRow key={s.id} className="text-sm">
                    <TableCell className="pl-4">
                      <Checkbox aria-label={`${fullName}ni tanlash`} />
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {String(rowNum).padStart(3, "0")}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/admin/talabalar/${s.id}`}
                        className="flex items-center gap-3"
                      >
                        <Avatar>
                          {s.avatar ? <AvatarImage src={s.avatar} alt={fullName} /> : null}
                          <AvatarFallback className="bg-blue-100 text-xs font-semibold text-blue-700">
                            {getInitials(fullName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="min-w-0">
                          <span className="block font-medium text-slate-900">
                            {fullName}
                          </span>
                          {s.code && (
                            <span className="block text-xs text-slate-500">
                              {s.code}
                            </span>
                          )}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-slate-600">
                      {s.phone ?? "—"}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {s.email}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                        <span
                          className={`size-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-400"}`}
                        />
                        <span className={isActive ? "text-slate-700" : "text-slate-500"}>
                          {isActive ? "Faol" : "Nofaol"}
                        </span>
                      </span>
                    </TableCell>
                    <TableCell className="pr-4">
                      <div className="flex items-center justify-end gap-0.5">
                        <Button
                          asChild
                          variant="ghost"
                          size="icon-sm"
                          className="text-slate-500 hover:text-slate-900"
                        >
                          <Link
                            to={`/admin/talabalar/${s.id}`}
                            aria-label={`${fullName} profilini ko'rish`}
                          >
                            <Eye />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-slate-500 hover:text-slate-900"
                          aria-label="Tahrirlash"
                        >
                          <Pencil />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-slate-500 hover:text-red-600"
                          aria-label="O'chirish"
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>


      <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 p-4 sm:flex-row">
        <p className="text-sm text-slate-500">
          Ko&apos;rsatilmoqda{" "}
          <span className="font-medium text-slate-700">
            {total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)}
          </span>{" "}
          / <span className="font-medium text-slate-700">{total}</span> talaba
        </p>
        {totalPages > 1 && (
          <Pagination className="mx-0 w-auto justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  text=""
                  className="px-1.5"
                  onClick={(e) => { e.preventDefault(); if (page > 1) setPage(page - 1); }}
                />
              </PaginationItem>
              {pageNumbers.map((p, idx) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={page === p}
                      className={page === p ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-600/90 hover:text-white" : ""}
                      onClick={(e) => { e.preventDefault(); setPage(p); }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  text=""
                  className="px-1.5"
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
