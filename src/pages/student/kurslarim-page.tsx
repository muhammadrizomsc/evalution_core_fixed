import { Link } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  Award,
  Clock,
  Play,
  Download,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categoryColors } from "@/lib/data";

interface MyCourse {
  id: string;
  name: string;
  teacher: string;
  teacherAvatar: string;
  category: keyof typeof categoryColors;
  categoryLabel: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  image: string;
  status: "active" | "completed";
  grade?: number;
  gradeLabel?: string;
}

const myCourses: MyCourse[] = [
  {
    id: "1", name: "React.js — zamonaviy frontend", teacher: "Akmal Karimov",
    teacherAvatar: "https://i.pravatar.cc/150?img=12", category: "Frontend", categoryLabel: "Frontend",
    progress: 62, totalLessons: 32, completedLessons: 14,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80", status: "active",
  },
  {
    id: "2", name: "Python asoslari", teacher: "Dilnoza Yusupova",
    teacherAvatar: "https://i.pravatar.cc/150?img=45", category: "Backend", categoryLabel: "Dasturlash",
    progress: 33, totalLessons: 24, completedLessons: 8,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80", status: "active",
  },
  {
    id: "3", name: "UX/UI dizayn asoslari", teacher: "Sardor Aliyev",
    teacherAvatar: "https://i.pravatar.cc/150?img=56", category: "Dizayn", categoryLabel: "Dizayn",
    progress: 95, totalLessons: 20, completedLessons: 19,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80", status: "active",
  },
  {
    id: "4", name: "JavaScript asoslari", teacher: "Akmal Karimov",
    teacherAvatar: "https://i.pravatar.cc/150?img=12", category: "Frontend", categoryLabel: "Frontend",
    progress: 100, totalLessons: 60, completedLessons: 60,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80", status: "completed",
    grade: 94, gradeLabel: "A'lo",
  },
  {
    id: "5", name: "Git va GitHub", teacher: "Jasur Rahimov",
    teacherAvatar: "https://i.pravatar.cc/150?img=60", category: "DevOps", categoryLabel: "DevOps",
    progress: 100, totalLessons: 16, completedLessons: 16,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80", status: "completed",
    grade: 88, gradeLabel: "Yaxshi",
  },
];

const activeCourses = myCourses.filter((c) => c.status === "active");
const completedCourses = myCourses.filter((c) => c.status === "completed");

const stats = [
  { label: "Davom etayotgan", value: activeCourses.length, icon: BookOpen, color: "bg-blue-50 text-blue-600", border: "border-blue-200" },
  { label: "Tugallangan", value: completedCourses.length, icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-200" },
  { label: "Sertifikatlar", value: completedCourses.length, icon: Award, color: "bg-violet-50 text-violet-600", border: "border-violet-200" },
  { label: "O'rganilgan soat", value: "47", icon: Clock, color: "bg-orange-50 text-orange-600", border: "border-orange-200" },
];

function ProgressBar({ value }: { value: number }) {
  const color = value >= 80 ? "bg-emerald-500" : value >= 40 ? "bg-blue-500" : "bg-orange-500";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export function KurslarimPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Mening online kurslarim
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Yozilgan barcha online kurslaringiz, progress va sertifikatlaringiz.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link to="/student/katalog">
            <Plus className="mr-2 size-4" />
            Yangi kurs olish
          </Link>
        </Button>
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

      <div>
        <h2 className="mb-4 text-lg font-semibold text-blue-600">
          Davom etayotgan kurslar ({activeCourses.length})
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activeCourses.map((course) => (
            <Card key={course.id} className="group overflow-hidden rounded-xl border-slate-200 shadow-xs">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.image}
                  alt={course.name}
                  className="size-full object-cover transition-transform group-hover:scale-105"
                />
                <Badge className={`absolute top-3 left-3 shadow-none ${categoryColors[course.category]}`}>
                  {course.categoryLabel}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-slate-900">{course.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarImage src={course.teacherAvatar} />
                    <AvatarFallback className="text-[10px]">{course.teacher[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-slate-500">{course.teacher}</span>
                </div>
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{course.completedLessons} / {course.totalLessons} dars</span>
                    <span className="font-semibold text-slate-900">{course.progress}%</span>
                  </div>
                  <ProgressBar value={course.progress} />
                </div>
                <Button size="sm" className="mt-3 w-full">
                  <Play className="mr-1.5 size-3.5" />
                  Davom ettirish
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-blue-600">
          Tugallangan kurslar ({completedCourses.length})
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {completedCourses.map((course) => (
            <Card key={course.id} className="group overflow-hidden rounded-xl border-slate-200 shadow-xs">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.image}
                  alt={course.name}
                  className="size-full object-cover transition-transform group-hover:scale-105"
                />
                <Badge className="absolute top-3 left-3 bg-slate-800/80 text-white shadow-none">
                  Tugallangan
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-slate-900">{course.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarImage src={course.teacherAvatar} />
                    <AvatarFallback className="text-[10px]">{course.teacher[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-slate-500">{course.teacher}</span>
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Yakuniy natija:{" "}
                  <span className={`font-bold ${course.grade! >= 90 ? "text-emerald-600" : "text-blue-600"}`}>
                    {course.grade}% ({course.gradeLabel})
                  </span>
                </p>
                <Button size="sm" className="mt-3 w-full">
                  <Download className="mr-1.5 size-3.5" />
                  Sertifikatni yuklash
                </Button>
              </CardContent>
            </Card>
          ))}

          <Card className="flex items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 shadow-xs">
            <CardContent className="py-12 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100">
                <Plus className="size-6 text-slate-400" />
              </div>
              <p className="mt-4 font-semibold text-slate-700">Yangi online kurs olish</p>
              <p className="mt-1 text-sm text-slate-500">
                Katalogdan kurs tanlang va darrov o'qishni boshlang.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
