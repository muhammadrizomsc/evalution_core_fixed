import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  BookOpen,
  Calendar,
  Download,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";

interface Payment {
  id: string;
  amount: number;
  method?: string;
  status?: string;
  paidAt?: string;
  createdAt?: string;
  course?: { title: string; slug?: string };
  courseName?: string;
}

function fmt(v: number) {
  return new Intl.NumberFormat("uz-UZ").format(v).replace(/,/g, " ");
}

const paymentMethods = ["Payme", "Click", "Uzcard", "Visa / Mastercard"];

const paymentBadge: Record<string, string> = {
  paid: "text-emerald-600 font-medium",
  "To'langan": "text-emerald-600 font-medium",
  pending: "text-orange-500 font-medium",
  Kutilmoqda: "text-orange-500 font-medium",
  debt: "text-red-600 font-medium",
  Qarzdor: "text-red-600 font-medium",
};

export function TolovlarPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Student payments come from enrollments with payment info
    // Fallback: try to get from enrollments
    api
      .get<{ data: Payment[] | { items: Payment[] } }>("/student/enrollments")
      .then((res) => {
        // If the endpoint returns enrollments, extract payment info
        // The actual endpoint for student payments varies — try a direct payments endpoint first
      })
      .catch(() => {});

    // Try a student-specific payments summary
    api
      .get<{ data: Payment[] }>("/student/payments")
      .then((res) => {
        setPayments(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch(() => {
        setPayments([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalSpent = payments.reduce((s, p) => s + p.amount, 0);
  const thisYear = payments.filter((p) => {
    const date = p.paidAt ?? p.createdAt ?? "";
    return date.includes(String(new Date().getFullYear()));
  }).reduce((s, p) => s + p.amount, 0);

  const stats = [
    { label: "Jami sarflangan (so'm)", value: loading ? "—" : fmt(totalSpent), icon: DollarSign, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-200" },
    { label: "Sotib olingan kurslar", value: loading ? "—" : String(payments.length), icon: BookOpen, color: "bg-blue-50 text-blue-600", border: "border-blue-200" },
    { label: "Bu yil sarflangan (so'm)", value: loading ? "—" : fmt(thisYear), icon: Calendar, color: "bg-orange-50 text-orange-600", border: "border-orange-200" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Mening to'lovlarim
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sotib olingan kurslar va to'lov tarixi. Har bir kurs — bir martalik to'lov, umrbod kirish.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link to="/student/katalog">
            <Plus className="mr-2 size-4" />
            Yangi kurs olish
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl border bg-white p-5 shadow-xs ${s.border}`}>
            <div className={`flex size-10 items-center justify-center rounded-lg ${s.color}`}>
              <s.icon className="size-5" />
            </div>
            {loading ? (
              <Skeleton className="mt-3 h-8 w-24" />
            ) : (
              <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{s.value}</p>
            )}
            <p className="mt-0.5 text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="rounded-xl border-slate-200 shadow-xs">
            <CardContent className="p-0">
              <div className="border-b px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900">To'lov tarixi</h2>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6 uppercase text-xs tracking-wide">Sana</TableHead>
                      <TableHead className="uppercase text-xs tracking-wide">Kurs</TableHead>
                      <TableHead className="uppercase text-xs tracking-wide">Summa</TableHead>
                      <TableHead className="uppercase text-xs tracking-wide">Usul</TableHead>
                      <TableHead className="uppercase text-xs tracking-wide">Holat</TableHead>
                      <TableHead className="uppercase text-xs tracking-wide">Chek</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array.from({ length: 3 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell className="pl-6"><Skeleton className="h-4 w-24" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      ))
                    ) : payments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="py-12 text-center text-sm text-slate-500">
                          Hali hech qanday to'lov amalga oshirilmagan
                        </TableCell>
                      </TableRow>
                    ) : (
                      payments.map((p) => {
                        const courseName = p.course?.title ?? p.courseName ?? "—";
                        const date = p.paidAt ?? p.createdAt;
                        const dateStr = date ? new Date(date).toLocaleDateString("uz-UZ") : "—";
                        const statusClass = paymentBadge[p.status ?? ""] ?? "text-slate-600 font-medium";
                        return (
                          <TableRow key={p.id}>
                            <TableCell className="pl-6 text-slate-500">{dateStr}</TableCell>
                            <TableCell className="font-medium text-slate-900 max-w-[180px] truncate">{courseName}</TableCell>
                            <TableCell className="text-slate-700">{fmt(p.amount)}</TableCell>
                            <TableCell className="text-slate-500">{p.method ?? "—"}</TableCell>
                            <TableCell>
                              <span className={statusClass}>{p.status ?? "—"}</span>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="text-slate-500">
                                <Download className="mr-1 size-3.5" />
                                PDF
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="rounded-xl border-slate-200 shadow-xs">
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold text-slate-900">To'lov usuli</h3>
              <div className="mt-4 flex items-center gap-3 rounded-lg border p-3">
                <div className="flex h-10 items-center justify-center rounded-lg bg-blue-600 px-3">
                  <span className="text-xs font-bold text-white">VISA</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">•••• •••• •••• 4242</p>
                  <p className="text-xs text-slate-500">Amal qiladi: 08/27</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Kartani o'zgartirish
              </Button>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {paymentMethods.map((m) => (
                  <Badge key={m} variant="secondary" className="text-xs">{m}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-blue-100 bg-blue-50/50 shadow-xs">
            <CardContent className="p-5">
              <h3 className="font-semibold text-slate-900">Yana kurs qo'shing</h3>
              <p className="mt-1 text-sm text-slate-500">
                Katalogdan yangi kurs tanlang — to'lovdan so'ng darrov kirish ochiladi.
              </p>
              <Button size="sm" className="mt-3 w-full" asChild>
                <Link to="/student/katalog">Kurslar katalogi</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
