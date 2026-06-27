import { useEffect, useState } from "react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { categoryColors } from "@/lib/data";
import { api } from "@/lib/api";

interface Enrollment {
  id: string;
  courseId: string;
  status?: string;
  progress?: number;
  completedLessons?: number;
  totalLessons?: number;
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

function ProgressBar({ value }: { value: number }) {
  const color = value >= 80 ? "bg-emerald-500" : value >= 40 ? "bg-blue-500" : "bg-orange-500";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export function KurslarimPage() {
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
    (e) => e.status !== "completed" && (e.progress ?? 0) < 100
  );
  const completedCourses = enrollments.filter(
    (e) => e.status === "completed" || (e.progress ?? 0) === 100
  );

  const stats = [
    { label: "Davom etayotgan", value: loading ? "—" : activeCourses.length, icon: BookOpen, color: "bg-blue-50 text-blue-600", border: "border-blue-200" },
    { label: "Tugallangan", value: loading ? "—" : completedCourses.length, icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-200" },
    { label: "Sertifikatlar", value: loading ? "—" : completedCourses.length, icon: Award, color: "bg-violet-50 text-violet-600", border: "border-violet-200" },
    { label: "O'rganilgan soat", value: "—", icon: Clock, color: "bg-orange-50 text-orange-600", border: "border-orange-200" },
  ];

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
          Davom etayotgan kurslar ({loading ? "..." : activeCourses.length})
        </h2>
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-2 w-full mt-3" />
                  <Skeleton className="h-8 w-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : activeCourses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center text-sm text-slate-500">
            Faol kurslar yo'q.{" "}
            <Link to="/student/katalog" className="text-blue-600 hover:underline">
              Katalogdan kurs tanlang
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activeCourses.map((enrollment) => {
              const course = enrollment.course;
              const instructorName = enrollment.instructor
                ? `${enrollment.instructor.firstName} ${enrollment.instructor.lastName}`
                : "O'qituvchi";
              const category = (course?.category ?? "Frontend") as keyof typeof categoryColors;
              const progress = enrollment.progress ?? 0;
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
                        <AvatarFallback className="text-[10px]">{instructorName[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-slate-500">{instructorName}</span>
                    </div>
                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-slate-500">
                          {enrollment.completedLessons ?? 0} / {enrollment.totalLessons ?? 0} dars
                        </span>
                        <span className="font-semibold text-slate-900">{progress}%</span>
                      </div>
                      <ProgressBar value={progress} />
                    </div>
                    <Button size="sm" className="mt-3 w-full">
                      <Play className="mr-1.5 size-3.5" />
                      Davom ettirish
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-blue-600">
          Tugallangan kurslar ({loading ? "..." : completedCourses.length})
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            completedCourses.map((enrollment) => {
              const course = enrollment.course;
              const instructorName = enrollment.instructor
                ? `${enrollment.instructor.firstName} ${enrollment.instructor.lastName}`
                : "O'qituvchi";
              return (
                <Card key={enrollment.id} className="group overflow-hidden rounded-xl border-slate-200 shadow-xs">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course?.image ?? "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80"}
                      alt={course?.title}
                      className="size-full object-cover transition-transform group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 left-3 bg-slate-800/80 text-white shadow-none">
                      Tugallangan
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900">{course?.title ?? "Kurs"}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <Avatar className="size-5">
                        <AvatarFallback className="text-[10px]">{instructorName[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-slate-500">{instructorName}</span>
                    </div>
                    <p className="mt-3 text-sm text-emerald-600 font-medium">100% tugallandi</p>
                    <Button size="sm" className="mt-3 w-full">
                      <Download className="mr-1.5 size-3.5" />
                      Sertifikatni yuklash
                    </Button>
                  </CardContent>
                </Card>
              );
            })}

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
