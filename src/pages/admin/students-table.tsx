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
import {
  getInitials,
  students,
  totalStudents,
  type PaymentStatus,
} from "@/lib/data";

const paymentBadgeClasses: Record<PaymentStatus, string> = {
  "To'langan": "bg-emerald-50 text-emerald-700",
  Qarzdor: "bg-red-50 text-red-700",
  Kutilmoqda: "bg-orange-50 text-orange-700",
};

const groupNames = [...new Set(students.map((s) => s.groupName))].sort();

export function StudentsTable() {
  const [query, setQuery] = React.useState("");
  const [group, setGroup] = React.useState("all");
  const [status, setStatus] = React.useState("all");
  const [payment, setPayment] = React.useState("all");
  const [view, setView] = React.useState<"list" | "grid">("list");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return students.filter((s) => {
      if (q) {
        const haystack = `${s.name} ${s.code} ${s.phone}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (group !== "all" && s.groupName !== group) return false;
      if (status !== "all" && s.status !== status) return false;
      if (payment !== "all" && s.payment !== payment) return false;
      return true;
    });
  }, [query, group, status, payment]);

  const isFiltered =
    query.trim() !== "" || group !== "all" || status !== "all" || payment !== "all";
  const total = isFiltered ? filtered.length : totalStudents;

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-xs">
      
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Talaba qidiring (ism, ID, telefon)..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={group} onValueChange={setGroup}>
            <SelectTrigger className="w-full sm:w-auto">
              <SelectValue placeholder="Barcha guruhlar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha guruhlar</SelectItem>
              {groupNames.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-auto">
              <SelectValue placeholder="Barcha holatlar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha holatlar</SelectItem>
              <SelectItem value="Faol">Faol</SelectItem>
              <SelectItem value="Nofaol">Nofaol</SelectItem>
            </SelectContent>
          </Select>
          <Select value={payment} onValueChange={setPayment}>
            <SelectTrigger className="w-full sm:w-auto">
              <SelectValue placeholder="To'lov holati" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">To&apos;lov holati</SelectItem>
              <SelectItem value="To'langan">To&apos;langan</SelectItem>
              <SelectItem value="Kutilmoqda">Kutilmoqda</SelectItem>
              <SelectItem value="Qarzdor">Qarzdor</SelectItem>
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
                Guruh
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                To&apos;lov
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
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-12 text-center text-sm text-slate-500"
                >
                  Hech qanday talaba topilmadi
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((s, i) => (
                <TableRow key={s.id} className="text-sm">
                  <TableCell className="pl-4">
                    <Checkbox aria-label={`${s.name}ni tanlash`} />
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {String(i + 1).padStart(3, "0")}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/admin/talabalar/${s.id}`}
                      className="flex items-center gap-3"
                    >
                      <Avatar>
                        {s.avatar ? <AvatarImage src={s.avatar} alt={s.name} /> : null}
                        <AvatarFallback className="bg-blue-100 text-xs font-semibold text-blue-700">
                          {getInitials(s.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="min-w-0">
                        <span className="block font-medium text-slate-900">
                          {s.name}
                        </span>
                        <span className="block text-xs text-slate-500">
                          {s.code}
                        </span>
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-slate-600">
                    {s.phone}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-blue-600">
                      {s.groupName}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={paymentBadgeClasses[s.payment]}>
                      {s.payment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                      <span
                        className={`size-1.5 rounded-full ${
                          s.status === "Faol" ? "bg-emerald-500" : "bg-slate-400"
                        }`}
                      />
                      <span
                        className={
                          s.status === "Faol"
                            ? "text-slate-700"
                            : "text-slate-500"
                        }
                      >
                        {s.status}
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
                          aria-label={`${s.name} profilini ko'rish`}
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      
      <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 p-4 sm:flex-row">
        <p className="text-sm text-slate-500">
          Ko&apos;rsatilmoqda{" "}
          <span className="font-medium text-slate-700">
            1-{filtered.length}
          </span>{" "}
          / <span className="font-medium text-slate-700">{total}</span> talaba
        </p>
        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" text="" className="px-1.5" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                className="border-blue-600 bg-blue-600 text-white hover:bg-blue-600/90 hover:text-white"
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">9</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" text="" className="px-1.5" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
