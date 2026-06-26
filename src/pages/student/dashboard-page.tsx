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
  ArrowUpRight,
  Check,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categoryColors } from "@/lib/data";

const heroCourse = {
  name: "React.js — zamonaviy frontend",
  module: "Modul 4 · 12-dars: useState va useEffect hooklari",
  progress: 62,
  completedLessons: 14,
  totalLessons: 32,
  image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
};

const stats = [
  { label: "Faol online kurslar", value: "3", icon: BookOpen, color: "bg-blue-50 text-blue-600", border: "border-blue-200" },
  { label: "O'rganilgan soat", value: "47", icon: Clock, color: "bg-orange-50 text-orange-600", border: "border-orange-200", trend: "+4s" },
  { label: "Tugallangan", value: "2", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-200" },
  { label: "Sertifikatlar", value: "2", icon: Award, color: "bg-violet-50 text-violet-600", border: "border-violet-200" },
];

interface ActiveCourse {
  id: string;
  name: string;
  teacher: string;
  teacherAvatar: string;
  category: keyof typeof categoryColors;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  image: string;
}

const activeCourses: ActiveCourse[] = [
  {
    id: "1",
    name: "React.js — zamonaviy frontend",
    teacher: "Akmal Karimov",
    teacherAvatar: "https://i.pravatar.cc/150?img=12",
    category: "Frontend",
    progress: 62,
    totalLessons: 32,
    completedLessons: 14,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
  },
  {
    id: "2",
    name: "Python asoslari",
    teacher: "Dilnoza Yusupova",
    teacherAvatar: "https://i.pravatar.cc/150?img=45",
    category: "Backend",
    progress: 33,
    totalLessons: 24,
    completedLessons: 8,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80",
  },
  {
    id: "3",
    name: "UX/UI dizayn asoslari",
    teacher: "Sardor Aliyev",
    teacherAvatar: "https://i.pravatar.cc/150?img=56",
    category: "Dizayn",
    progress: 95,
    totalLessons: 20,
    completedLessons: 19,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  },
  {
    id: "4",
    name: "SMM va raqamli marketing",
    teacher: "Madina Rashidova",
    teacherAvatar: "https://i.pravatar.cc/150?img=32",
    category: "Marketing",
    progress: 17,
    totalLessons: 18,
    completedLessons: 3,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
];

const weekDays = ["Du", "Se", "Cho", "Pa", "Ju", "Sh", "Ya"];
const streakDays = [true, true, true, true, true, false, false];
const todayIndex = 4;

const recommendedCourses = [
  { name: "TypeScript chuqur", lessons: 32, hours: 18, category: "Frontend" as const, image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80" },
  { name: "Node.js va Express", lessons: 40, hours: 24, category: "Backend" as const, image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&q=80" },
  { name: "Figma bilan prototiplash", lessons: 26, hours: 14, category: "Dizayn" as const, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80" },
  { name: "SQL va ma'lumotlar bazasi", lessons: 22, hours: 12, category: "Data Science" as const, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
];

function ProgressBar({ value, className }: { value: number; className?: string }) {
  const color = value >= 80 ? "bg-emerald-500" : value >= 40 ? "bg-blue-500" : "bg-orange-500";
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-slate-100 ${className ?? ""}`}>
      <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Salom, Bobur! 👋
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

      <Card className="overflow-hidden rounded-2xl border-slate-200 bg-slate-900 text-white shadow-xs">
        <CardContent className="flex flex-col gap-6 p-0 md:flex-row">
          <div className="relative aspect-video w-full md:aspect-auto md:w-56 lg:w-72">
            <img
              src={heroCourse.image}
              alt={heroCourse.name}
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
            <h2 className="mt-2 text-xl font-bold lg:text-2xl">{heroCourse.name}</h2>
            <p className="mt-1 text-sm text-slate-400">{heroCourse.module}</p>
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-slate-400">Kurs progressi</span>
                <span className="font-bold text-blue-400">{heroCourse.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                <div className="h-full rounded-full bg-blue-500" style={{ width: `${heroCourse.progress}%` }} />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Play className="mr-1.5 size-3.5" />
                Darsni davom ettirish
              </Button>
              <span className="text-sm text-slate-400">
                {heroCourse.completedLessons} / {heroCourse.totalLessons} dars tugallandi
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl border bg-white p-5 shadow-xs ${s.border}`}>
            <div className="flex items-start justify-between">
              <div className={`flex size-10 items-center justify-center rounded-lg ${s.color}`}>
                <s.icon className="size-5" />
              </div>
              {s.trend && (
                <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight className="size-3" />
                  {s.trend}
                </span>
              )}
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
          <div className="grid gap-4 sm:grid-cols-2">
            {activeCourses.map((course) => (
              <Card key={course.id} className="group overflow-hidden rounded-xl border-slate-200 shadow-xs">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="size-full object-cover transition-transform group-hover:scale-105"
                  />
                  <Badge className={`absolute top-3 left-3 shadow-none ${categoryColors[course.category]}`}>
                    {course.category === "Backend" ? "Dasturlash" : course.category}
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
                    Davom ettirish
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Siz uchun tavsiya etiladi</h2>
          <Link to="/student/katalog" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
            Barcha kurslar <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommendedCourses.map((course) => (
            <Card key={course.name} className="group overflow-hidden rounded-xl border-slate-200 shadow-xs">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.image}
                  alt={course.name}
                  className="size-full object-cover transition-transform group-hover:scale-105"
                />
                <Badge className={`absolute top-3 left-3 shadow-none ${categoryColors[course.category]}`}>
                  {course.category === "Data Science" ? "Data" : course.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-slate-900">{course.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{course.lessons} dars · {course.hours} soat</p>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Batafsil
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
