import * as React from "react";
import {
  ArrowUpRight,
  Search,
  Download,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

interface Payment {
  id: string;
  amount: number;
  status?: string;
  method?: string;
  paidAt?: string;
  notes?: string;
  student?: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  course?: {
    id: string;
    title: string;
  };
}

interface PaymentStats {
  totalPaid: number;
  totalPending: number;
  totalDebt: number;
  countPaid: number;
  countPending: number;
  countDebt: number;
}

function fmt(v: number) {
  return new Intl.NumberFormat("uz-UZ").format(v).replace(/,/g, " ");
}

const paymentBadge: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-700",
  pending: "bg-orange-50 text-orange-700",
  debt: "bg-red-50 text-red-700",
  "To'langan": "bg-emerald-50 text-emerald-700",
  Kutilmoqda: "bg-orange-50 text-orange-700",
  Qarzdor: "bg-red-50 text-red-700",
};

const PAGE_SIZE = 20;

export function AdminTolovlarPage() {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const [payments, setPayments] = React.useState<Payment[]>([]);
  const [total, setTotal] = React.useState(0);
  const [stats, setStats] = React.useState<PaymentStats | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_SIZE),
    });
    if (status !== "all") params.set("status", status);

    api
      .get<{ data: { items: Payment[]; total: number } }>(`/admin/payments?${params}`)
      .then((res) => {
        const items = res.data.data.items ?? [];
        setPayments(items);
        setTotal(res.data.data.total ?? 0);

        // Compute stats from items (approximation; ideally backend provides it)
        const paid = items.filter(p => p.status === "paid" || p.status === "To'langan");
        const pending = items.filter(p => p.status === "pending" || p.status === "Kutilmoqda");
        const debt = items.filter(p => p.status === "debt" || p.status === "Qarzdor");
        setStats({
          totalPaid: paid.reduce((s, p) => s + p.amount, 0),
          totalPending: pending.reduce((s, p) => s + p.amount, 0),
          totalDebt: debt.reduce((s, p) => s + p.amount, 0),
          countPaid: paid.length,
          countPending: pending.length,
          countDebt: debt.length,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, status]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return payments;
    return payments.filter((r) => {
      const name = r.student ? `${r.student.firstName} ${r.student.lastName}` : "";
      return name.toLowerCase().includes(q);
    });
  }, [payments, query]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">To&apos;lovlar</h1>
          <p className="mt-1 text-sm text-slate-500">
            Barcha talabalar to&apos;lov holati
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 size-4" />
          Eksport
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-xl border-emerald-200 shadow-xs">
          <CardContent className="p-5">
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <ArrowUpRight className="size-3.5" /> To&apos;langan
            </div>
            {loading ? (
              <Skeleton className="mt-2 h-8 w-32" />
            ) : (
              <>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {fmt(stats?.totalPaid ?? 0)} so&apos;m
                </p>
                <p className="mt-0.5 text-sm text-slate-500">
                  {stats?.countPaid ?? 0} ta to&apos;lov
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-xl border-orange-200 shadow-xs">
          <CardContent className="p-5">
            <div className="text-xs font-semibold text-orange-500">Kutilmoqda</div>
            {loading ? (
              <Skeleton className="mt-2 h-8 w-32" />
            ) : (
              <>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {fmt(stats?.totalPending ?? 0)} so&apos;m
                </p>
                <p className="mt-0.5 text-sm text-slate-500">
                  {stats?.countPending ?? 0} ta to&apos;lov
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-xl border-red-200 shadow-xs">
          <CardContent className="p-5">
            <div className="text-xs font-semibold text-red-500">Qarzdorlar</div>
            {loading ? (
              <Skeleton className="mt-2 h-8 w-32" />
            ) : (
              <>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {fmt(stats?.totalDebt ?? 0)} so&apos;m
                </p>
                <p className="mt-0.5 text-sm text-slate-500">
                  {stats?.countDebt ?? 0} ta to&apos;lov
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Talaba ismi bo'yicha qidirish..."
              className="pl-9"
            />
          </div>
          <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Barcha holatlar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha holatlar</SelectItem>
              <SelectItem value="paid">To&apos;langan</SelectItem>
              <SelectItem value="pending">Kutilmoqda</SelectItem>
              <SelectItem value="debt">Qarzdor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6 text-xs font-semibold tracking-wide text-slate-500 uppercase">Talaba</TableHead>
                <TableHead className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Kurs</TableHead>
                <TableHead className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Summa</TableHead>
                <TableHead className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Usul</TableHead>
                <TableHead className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Sana</TableHead>
                <TableHead className="pr-6 text-xs font-semibold tracking-wide text-slate-500 uppercase">Holat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="pl-6"><Skeleton className="h-8 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-sm text-slate-500">
                    Hech qanday to&apos;lov topilmadi
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((r) => {
                  const studentName = r.student
                    ? `${r.student.firstName} ${r.student.lastName}`.trim()
                    : "Noma'lum";
                  const courseName = r.course?.title ?? "—";
                  const paidDate = r.paidAt ? new Date(r.paidAt).toLocaleDateString("uz-UZ") : "—";
                  return (
                    <TableRow key={r.id} className="text-sm">
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            {r.student?.avatar && <AvatarImage src={r.student.avatar} alt={studentName} />}
                            <AvatarFallback className="bg-blue-100 text-[10px] font-semibold text-blue-700">
                              {getInitials(studentName)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-slate-900">{studentName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 max-w-[180px] truncate">{courseName}</TableCell>
                      <TableCell className="font-medium text-slate-700">
                        {fmt(r.amount)} so&apos;m
                      </TableCell>
                      <TableCell className="text-slate-500">{r.method ?? "—"}</TableCell>
                      <TableCell className="text-slate-500">{paidDate}</TableCell>
                      <TableCell className="pr-6">
                        <Badge className={paymentBadge[r.status ?? ""] ?? "bg-slate-100 text-slate-600"}>
                          {r.status ?? "—"}
                        </Badge>
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
            <span className="font-medium text-slate-700">{filtered.length}</span> ta to&apos;lov
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
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      href="#"
                      isActive={page === i + 1}
                      className={page === i + 1 ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-600/90 hover:text-white" : ""}
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
                    className="px-1.5"
                    onClick={(e) => { e.preventDefault(); if (page < totalPages) setPage(page + 1); }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}
