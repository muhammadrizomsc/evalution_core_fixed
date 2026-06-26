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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Payment {
  id: string;
  date: string;
  course: string;
  amount: number;
  method: string;
  status: string;
}

const payments: Payment[] = [
  { id: "1", date: "14-noyabr, 2025", course: "React.js — zamonaviy frontend", amount: 790_000, method: "Payme", status: "To'langan" },
  { id: "2", date: "02-oktabr, 2025", course: "Python asoslari", amount: 590_000, method: "Uzcard", status: "To'langan" },
  { id: "3", date: "18-avgust, 2025", course: "UX/UI dizayn asoslari", amount: 490_000, method: "Click", status: "To'langan" },
];

function fmt(v: number) {
  return new Intl.NumberFormat("uz-UZ").format(v).replace(/,/g, " ");
}

const totalSpent = payments.reduce((s, p) => s + p.amount, 0);
const thisYear = payments.filter((p) => p.date.includes("2025")).reduce((s, p) => s + p.amount, 0);

const stats = [
  { label: "Jami sarflangan (so'm)", value: fmt(totalSpent), icon: DollarSign, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-200" },
  { label: "Sotib olingan kurslar", value: String(payments.length), icon: BookOpen, color: "bg-blue-50 text-blue-600", border: "border-blue-200" },
  { label: "Bu yil sarflangan (so'm)", value: fmt(thisYear), icon: Calendar, color: "bg-orange-50 text-orange-600", border: "border-orange-200" },
];

const paymentMethods = ["Payme", "Click", "Uzcard", "Visa / Mastercard"];

export function TolovlarPage() {
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
            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{s.value}</p>
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
                    {payments.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="pl-6 text-slate-500">{p.date}</TableCell>
                        <TableCell className="font-medium text-slate-900">{p.course}</TableCell>
                        <TableCell className="text-slate-700">{fmt(p.amount)}</TableCell>
                        <TableCell className="text-slate-500">{p.method}</TableCell>
                        <TableCell>
                          <span className="font-medium text-emerald-600">{p.status}</span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="text-slate-500">
                            <Download className="mr-1 size-3.5" />
                            PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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
