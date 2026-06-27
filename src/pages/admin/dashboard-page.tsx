import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Download,
  Plus,
  TrendingUp,
  Users,
  UsersRound,
  CheckCircle2,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/stores/auth-store";
import {
  formatPrice,
  getInitials,
  groups,
  students,
  weekLessons,
} from "@/lib/data";

const uzMonths = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr",
];
const shortMonths = [
  "Dek", "Yan", "Fev", "Mar", "Apr", "May",
  "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy",
];

function todayLabel(): string {
  const d = new Date();
  return `Bugun ${d.getDate()}-${uzMonths[d.getMonth()]}, ${d.getFullYear()}.`;
}

const revenueData = shortMonths.map((m, i) => ({
  month: m,
  value: [25, 32, 38, 42, 48, 56, 62, 72, 68, 78, 85, 98][i] * 1_000_000,
}));

const studentGrowthData = shortMonths.map((m, i) => ({
  month: m,
  yangi: [12, 18, 22, 28, 15, 20, 25, 30, 35, 32, 28, 24][i],
  faol: [88, 95, 105, 110, 115, 120, 125, 130, 140, 145, 155, 160][i],
}));

const kpis = [
  { label: "Faol talabalar", value: "124", trend: "+12.5%", up: true, icon: Users, iconClass: "bg-blue-50 text-blue-600", borderClass: "border-blue-200" },
  { label: "Aktiv guruhlar", value: "18", trend: "+3", up: true, icon: UsersRound, iconClass: "bg-orange-50 text-orange-600", borderClass: "border-orange-200" },
  { label: "Oylik daromad (so'm)", value: "86.4M", trend: "+18.2%", up: true, icon: TrendingUp, iconClass: "bg-emerald-50 text-emerald-600", borderClass: "border-emerald-200" },
  { label: "O'rtacha davomat", value: "87%", trend: "-2.3%", up: false, icon: CheckCircle2, iconClass: "bg-violet-50 text-violet-600", borderClass: "border-violet-200" },
];

const paymentStatuses: Record<string, string> = {
  "To'langan": "text-emerald-600",
  Kutilmoqda: "text-orange-500",
  Qarzdor: "text-red-600",
};

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const userName = user?.firstName ?? "Admin";

  const todayDow = new Date().getDay();
  const dayIndex = todayDow === 0 ? 6 : todayDow - 1;
  const todayLessons = [...weekLessons]
    .filter((l) => l.day === dayIndex)
    .sort((a, b) => a.start.localeCompare(b.start));

  const recentStudents = students.slice(0, 10);

  const categoryAmounts: Record<string, number> = {
    DevOps: 1_500_000,
    Dizayn: 890_000,
    Mobil: 990_000,
    "Data Science": 1_200_000,
  };
  const fallbackAmounts = [490_000, 790_000, 690_000];

  const studentAmounts = useMemo(
    () =>
      recentStudents.map((s, i) => {
        const course = groups.find((g) => g.id === s.groupId);
        return course
          ? (categoryAmounts[course.category] ?? fallbackAmounts[i % 3])
          : 490_000;
      }),
    [],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Salom, {userName}! 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {todayLabel()} Sizning umumiy ko'rsatkichlaringiz quyida.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 size-4" />
            Eksport
          </Button>
          <Button>
            <Plus className="mr-2 size-4" />
            Talaba qo'shish
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((s) => (
          <div
            key={s.label}
            className={`rounded-xl border bg-white p-5 shadow-xs ${s.borderClass}`}
          >
            <div className="flex items-start justify-between">
              <div className={`flex size-10 items-center justify-center rounded-lg ${s.iconClass}`}>
                <s.icon className="size-5" />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${s.up ? "text-emerald-600" : "text-red-500"}`}>
                {s.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {s.trend}
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{s.value}</p>
            <p className="mt-0.5 text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <Card className="rounded-xl border-slate-200 shadow-xs xl:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Daromad statistikasi</CardTitle>
              <p className="text-xs text-slate-500">Oxirgi 12 oy ko'rsatkichi</p>
            </div>
            <select className="rounded-lg border px-3 py-1.5 text-sm">
              <option>Bu yil</option>
              <option>O'tgan yil</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-3xl font-bold text-slate-900">782 400 000 so'm</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-emerald-600">
                <ArrowUpRight className="size-3.5" />
                +18.2% o'tgan yilga nisbatan
              </p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} tickFormatter={(v) => `${v / 1_000_000}M`} />
                <Tooltip formatter={(v) => [`${(Number(v) / 1_000_000).toFixed(1)}M so'm`, "Daromad"]} />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.5} fill="url(#revGrad)" dot={{ r: 4, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-slate-200 shadow-xs xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Bugungi darslar</CardTitle>
              <p className="text-xs text-slate-500">{new Date().getDate()}-{uzMonths[new Date().getMonth()]} · {todayLessons.length} dars</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-blue-600">
              <Link to="/admin/jadval">Hammasi <ChevronRight className="size-3.5" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            {todayLessons.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-400">Bugun dars yo'q</p>
            ) : (
              todayLessons.map((l) => (
                <div key={l.id} className="flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors hover:bg-slate-50">
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-900">{l.start}</p>
                    <p className="text-[10px] text-slate-400">90 daq</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">{l.groupName.replace(/-\d+/, " asoslari")}</p>
                    <p className="truncate text-xs text-slate-500">{l.groupName} · {l.teacherShort} · {l.room}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl border-slate-200 shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">Talabalar o'sishi</CardTitle>
            <p className="text-xs text-slate-500">Oxirgi 12 oyda yangi qo'shilgan talabalar</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-blue-600" /> Yangi</span>
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-blue-200" /> Faol</span>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={studentGrowthData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <Tooltip />
              <Bar dataKey="faol" fill="#bfdbfe" radius={[4, 4, 0, 0]} />
              <Bar dataKey="yangi" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">So'nggi talabalar</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-blue-600">
              <Link to="/admin/talabalar">Hammasi <ChevronRight className="size-3.5" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Talaba</TableHead>
                  <TableHead>Guruh</TableHead>
                  <TableHead>Sana</TableHead>
                  <TableHead>Holat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          {s.avatar && <AvatarImage src={s.avatar} />}
                          <AvatarFallback className="bg-blue-100 text-[10px] font-semibold text-blue-700">
                            {getInitials(s.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-500">{s.groupName}</TableCell>
                    <TableCell className="text-slate-500">{s.joinedAt.replace(/, \d{4}/, "").replace("-iyul", "-iyl").replace("-iyun", "-iyn").split(",")[0]}</TableCell>
                    <TableCell>
                      <span className={`flex items-center gap-1 text-sm font-medium ${s.status === "Faol" ? "text-emerald-600" : "text-slate-400"}`}>
                        <span className={`size-1.5 rounded-full ${s.status === "Faol" ? "bg-emerald-500" : "bg-slate-300"}`} />
                        {s.status === "Faol" ? (s.payment === "Kutilmoqda" ? "Kutilmoqda" : "Faol") : "Nofaol"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">So'nggi to'lovlar</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-blue-600">
              <Link to="/admin/tolovlar">Hammasi <ChevronRight className="size-3.5" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Talaba</TableHead>
                  <TableHead>Summa</TableHead>
                  <TableHead>Sana</TableHead>
                  <TableHead>Holat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.map((s, idx) => {
                  const amount = studentAmounts[idx];
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="pl-6 font-medium">{s.name}</TableCell>
                      <TableCell className="text-slate-700">{formatPrice(amount).replace(" so'm", "")}</TableCell>
                      <TableCell className="text-slate-500">{s.joinedAt.replace(/, \d{4}/, "").split(",")[0]}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${paymentStatuses[s.payment] ?? "text-slate-500"}`}>
                          {s.payment}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
