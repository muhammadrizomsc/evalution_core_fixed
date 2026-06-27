import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Award,
  Play,
  Flame,
  ArrowRight,
  Search,
  Check,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { categoryColors } from "@/lib/data";
import { useAuthStore } from "@/stores/auth-store";
import { api } from "@/lib/api";

interface Enrollment {
  id: string;
  courseId: string;
  progress?: number;
  completedLessons?: number;
  totalLessons?: number;
  status?: string;
  course?: {
    id: string;
    title: string;
    slug: string;
    image?: string;
    category?: string;
  };
  instructor?: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

const weekDays = ["Du", "Se", "Cho", "Pa", "Ju", "Sh", "Ya"];
const streakDays = [true, true, true, true, true, false, false];

function getTodayIndex(): number {
  const dow = new Date().getDay();
  return dow === 0 ? 6 : dow - 1;
}

function ProgressBar({ value, className }: { value: number; className?: string }) {
  const color = value >= 80 ? "bg-emerald-500" : value >= 40 ? "bg-blue-500" : "bg-orange-500";
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-slate-100 ${className ?? ""}`}>
      <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export function StudentDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const firstName = user?.firstName ?? "Talaba";
  const todayIndex = getTodayIndex();

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ data: { items: Enrollment[] } }>("/student/enrollments")
      .then((res) => {
        setEnrollments(res.data.data.items ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const activeCourses = enrollments.filter(
    (e) => e.status !== "completed" && e.progress !== 100
  );
  const completedCourses = enrollments.filter(
    (e) => e.status === "completed" || e.progress === 100
  );
  const heroCourse = activeCourses[0] ?? null;

  const stats = [
    { label: "Faol online kurslar", value: loading ? "—" : String(activeCourses.length), icon: BookOpen, color: "bg-blue-50 text-blue-600", border: "border-blue-200" },
    { label: "O'rganilgan soat", value: "—", icon: Clock, color: "bg-orange-50 text-orange-600", border: "border-orange-200" },
    { label: "Tugallangan", value: loading ? "—" : String(completedCourses.length), icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-200" },
    { label: "Sertifikatlar", value: loading ? "—" : String(completedCourses.length), icon: Award, color: "bg-violet-50 text-violet-600", border: "border-violet-200" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Salom, {firstName}! 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Online o'qishingizni davom ettiring. Bugun yangi narsa o'rganish uchun ajoyib kun!
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/student/katalog">
            <Search className="mr-2 size-4" />
            Yangi kurs tanlash
          </Link>
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-48 w-full rounded-2xl" />
      ) : heroCourse ? (
        <Card className="overflow-hidden rounded-2xl border-slate-200 bg-slate-900 text-white shadow-xs">
          <CardContent className="flex flex-col gap-6 p-0 md:flex-row">
            <div className="relative aspect-video w-full md:aspect-auto md:w-56 lg:w-72">
              <img
                src={heroCourse.course?.image ?? "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80"}
                alt={heroCourse.course?.title}
                className="size-full object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-blue-600 text-white shadow-none">
                Davom etmoqda
              </Badge>
            </div>
            <div className="flex flex-1 flex-col justify-center p-5 md:py-6 md:pr-8 md:pl-0">
              <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase">
                O'qishni davom ettiring
              </p>
              <h2 className="mt-2 text-xl font-bold lg:text-2xl">{heroCourse.course?.title}</h2>
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-slate-400">Kurs progressi</span>
                  <span className="font-bold text-blue-400">{heroCourse.progress ?? 0}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${heroCourse.progress ?? 0}%` }} />
                </div>
              </div>
              <div className="mt-5 flex items-center gap-4">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Play className="mr-1.5 size-3.5" />
                  Darsni davom ettirish
                </Button>
                <span className="text-sm text-slate-400">
                  {heroCourse.completedLessons ?? 0} / {heroCourse.totalLessons ?? 0} dars tugallandi
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl border bg-white p-5 shadow-xs ${s.border}`}>
            <div className="flex items-start justify-between">
              <div className={`flex size-10 items-center justify-center rounded-lg ${s.color}`}>
                <s.icon className="size-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{s.value}</p>
            <p className="mt-0.5 text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Faol online kurslarim</h2>
            <Link to="/student/kurslarim" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
              Hammasi <ArrowRight className="size-3.5" />
            </Link>
          </div>
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-2 w-full mt-3" />
                  </div>
                </div>
              ))}
            </div>
          ) : activeCourses.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center text-sm text-slate-500">
              Hali hech qanday kursga yozilmagansiz.{" "}
              <Link to="/student/katalog" className="text-blue-600 hover:underline">
                Katalogdan tanlang
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {activeCourses.slice(0, 4).map((enrollment) => {
                const course = enrollment.course;
                const instructorName = enrollment.instructor
                  ? `${enrollment.instructor.firstName} ${enrollment.instructor.lastName}`
                  : "O'qituvchi";
                const category = (course?.category ?? "Frontend") as keyof typeof categoryColors;
                return (
                  <Card key={enrollment.id} className="group overflow-hidden rounded-xl border-slate-200 shadow-xs">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={course?.image ?? "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80"}
                        alt={course?.title}
                        className="size-full object-cover transition-transform group-hover:scale-105"
                      />
                      {categoryColors[category] && (
                        <Badge className={`absolute top-3 left-3 shadow-none ${categoryColors[category]}`}>
                          {category}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-900">{course?.title ?? "Kurs"}</h3>
                      <div className="mt-2 flex items-center gap-2">
                        <Avatar className="size-5">
                          {enrollment.instructor?.avatar && <img src={enrollment.instructor.avatar} />}
                          <AvatarFallback className="text-[10px]">{instructorName[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-slate-500">{instructorName}</span>
                      </div>
                      <div className="mt-3">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-slate-500">{enrollment.completedLessons ?? 0} / {enrollment.totalLessons ?? 0} dars</span>
                          <span className="font-semibold text-slate-900">{enrollment.progress ?? 0}%</span>
                        </div>
                        <ProgressBar value={enrollment.progress ?? 0} />
                      </div>
                      <Button size="sm" className="mt-3 w-full">
                        Davom ettirish
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        <Card className="h-fit rounded-xl border-slate-200 shadow-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Haftalik maqsad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-slate-900">5</span>
              <span className="text-sm text-slate-500">/ 7 kun ketma-ket o'qildi</span>
              <Flame className="ml-1 size-4 text-orange-500" />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">Haftalik maqsad: 10 soat</span>
                <span className="font-semibold text-emerald-600">7s 20daq</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: "73%" }} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              {weekDays.map((day, i) => (
                <div key={day} className="flex flex-col items-center gap-1.5">
                  <span className="text-[11px] font-medium text-slate-400">{day}</span>
                  {i === todayIndex ? (
                    <div className="flex size-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {todayIndex + 1}
                    </div>
                  ) : streakDays[i] ? (
                    <div className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="size-4" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-300">
                      <span className="size-2 rounded-full bg-slate-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
