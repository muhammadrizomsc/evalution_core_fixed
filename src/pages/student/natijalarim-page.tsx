import {
  BarChart3,
  ClipboardCheck,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TestResult {
  id: string;
  name: string;
  course: string;
  date: string;
  score: number;
  status: "passed" | "retake";
}

const testResults: TestResult[] = [
  { id: "1", name: "Modul 4 testi: Hooklar", course: "React.js — zamonaviy frontend", date: "12-noyabr, 2025", score: 88, status: "passed" },
  { id: "2", name: "Amaliyot: Komponentlar", course: "React.js — zamonaviy frontend", date: "28-oktabr, 2025", score: 95, status: "passed" },
  { id: "3", name: "Funksiyalar va sikllar testi", course: "Python asoslari", date: "15-oktabr, 2025", score: 64, status: "retake" },
  { id: "4", name: "Yakuniy loyiha: Figma maket", course: "UX/UI dizayn asoslari", date: "03-oktabr, 2025", score: 92, status: "passed" },
  { id: "5", name: "Boshlang'ich test: JS asoslari", course: "Python asoslari", date: "21-sentabr, 2025", score: 78, status: "passed" },
  { id: "6", name: "React — State management", course: "React.js — zamonaviy frontend", date: "28-dekabr, 2025", score: 83, status: "passed" },
  { id: "7", name: "Python — ma'lumotlar tuzilmasi", course: "Python asoslari", date: "15-yanvar, 2026", score: 65, status: "retake" },
  { id: "8", name: "JavaScript — yakuniy test", course: "JavaScript asoslari", date: "18-noyabr, 2025", score: 94, status: "passed" },
  { id: "9", name: "Git — amaliy topshiriq", course: "Git va GitHub", date: "01-sentabr, 2025", score: 88, status: "passed" },
  { id: "10", name: "CSS — responsive dizayn", course: "UX/UI dizayn asoslari", date: "20-oktabr, 2025", score: 72, status: "passed" },
  { id: "11", name: "React — komponentlar", course: "React.js — zamonaviy frontend", date: "05-dekabr, 2025", score: 95, status: "passed" },
];

const avgScore = Math.round(testResults.reduce((s, t) => s + t.score, 0) / testResults.length);
const passedCount = testResults.filter((t) => t.status === "passed").length;
const highestScore = Math.max(...testResults.map((t) => t.score));

const stats = [
  { label: "O'rtacha natija", value: `${avgScore}%`, icon: BarChart3, color: "bg-blue-50 text-blue-600", border: "border-blue-200" },
  { label: "Yechilgan testlar", value: String(testResults.length), icon: ClipboardCheck, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-200" },
  { label: "O'tilgan", value: String(passedCount), icon: CheckCircle2, color: "bg-green-50 text-green-600", border: "border-green-200" },
  { label: "Eng yuqori ball", value: String(highestScore), icon: Zap, color: "bg-amber-50 text-amber-600", border: "border-amber-200" },
];

function scoreColor(score: number) {
  if (score >= 90) return "text-emerald-600";
  if (score >= 70) return "text-blue-600";
  return "text-orange-600";
}

export function NatijalarimPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Natijalarim
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Kurs testlari va amaliy topshiriqlar bo'yicha natijalaringiz.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      <Card className="rounded-xl border-slate-200 shadow-xs">
        <CardContent className="p-0">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Test va topshiriq natijalari</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6 uppercase text-xs tracking-wide">Test / Topshiriq</TableHead>
                  <TableHead className="uppercase text-xs tracking-wide">Kurs</TableHead>
                  <TableHead className="uppercase text-xs tracking-wide">Sana</TableHead>
                  <TableHead className="uppercase text-xs tracking-wide">Natija</TableHead>
                  <TableHead className="uppercase text-xs tracking-wide">Holat</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testResults.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="pl-6 font-medium text-slate-900">{r.name}</TableCell>
                    <TableCell className="text-slate-500">{r.course}</TableCell>
                    <TableCell className="text-slate-500">{r.date}</TableCell>
                    <TableCell>
                      <span className={`font-bold ${scoreColor(r.score)}`}>{r.score}%</span>
                    </TableCell>
                    <TableCell>
                      {r.status === "passed" ? (
                        <span className="font-medium text-emerald-600">O'tdi</span>
                      ) : (
                        <span className="font-medium text-orange-500">Qayta topshirish mumkin</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
