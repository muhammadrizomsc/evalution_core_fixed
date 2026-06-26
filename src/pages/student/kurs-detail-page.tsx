import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  Star,
  Users,
  Play,
  Globe,
  Check,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCourse, getTeacher, formatPrice, categoryColors } from "@/lib/data";
import { cn } from "@/lib/utils";

type Tab = "tavsif" | "dastur" | "oqituvchi";

const tabs: { id: Tab; label: string }[] = [
  { id: "tavsif", label: "Tavsif" },
  { id: "dastur", label: "Dastur" },
  { id: "oqituvchi", label: "O'qituvchi" },
];

interface CourseModule {
  title: string;
  desc: string;
  lessons: number;
  duration: string;
}

const moduleTemplates: CourseModule[] = [
  { title: "Kirish va asoslar", desc: "Kursga kirish, muhitni sozlash, o'zgaruvchilar va ma'lumot turlari.", lessons: 5, duration: "48 daq" },
  { title: "Funksiyalar va massivlar", desc: "Funksiya yaratish, massivlar bilan ishlash, callback va closure.", lessons: 4, duration: "52 daq" },
  { title: "DOM va hodisalar", desc: "DOM elementlari, eventlar, formalar bilan ishlash.", lessons: 5, duration: "55 daq" },
  { title: "Asinxron dasturlash", desc: "Promise, async/await, Fetch API va REST.", lessons: 4, duration: "45 daq" },
  { title: "Loyiha amaliyoti", desc: "To'liq loyiha qurish, deploy va optimizatsiya.", lessons: 5, duration: "60 daq" },
  { title: "Yakuniy imtihon", desc: "Barcha mavzular bo'yicha test va loyiha topshirish.", lessons: 3, duration: "30 daq" },
];

const perks = [
  "ta video dars",
  "ta amaliy loyiha",
  "Umrbod kirish",
  "Tugatgach sertifikat",
  "Mentor bilan aloqa",
];

export function StudentKursDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<Tab>("tavsif");
  const [openModule, setOpenModule] = useState<number | null>(0);
  const course = getCourse(slug ?? "");

  if (!course) return <Navigate to="/student/katalog" replace />;

  const teacher = getTeacher(course.teacherId);
  const totalHours = Math.round(course.totalLessons * 1.5);

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/student/katalog" className="hover:text-slate-900">Katalog</Link>
        <span>/</span>
        <span className="font-medium text-slate-900">{course.title}</span>
      </nav>

      <Card className="rounded-xl border-slate-200 shadow-xs">
        <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center">
          <img
            src={course.image}
            alt={course.title}
            className="aspect-video w-full rounded-xl object-cover md:w-64 lg:w-72"
          />
          <div className="flex-1">
            <Badge className={`shadow-none ${categoryColors[course.category]}`}>
              {course.category}
            </Badge>
            <h1 className="mt-3 text-2xl font-bold text-slate-900">{course.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                {course.rating} ({course.reviews} sharh)
              </span>
              <span className="flex items-center gap-1">
                <Users className="size-3.5" />
                {teacher.students} talaba
              </span>
              <span className="flex items-center gap-1">
                <Play className="size-3.5" />
                {course.totalLessons} dars · {totalHours} soat
              </span>
              <span className="flex items-center gap-1">
                <Globe className="size-3.5" />
                O'zbek tilida
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarImage src={teacher.avatar} />
                <AvatarFallback>{teacher.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-slate-900">
                {teacher.name} — {teacher.role}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex gap-1 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {activeTab === "tavsif" && (
              <Card className="rounded-xl border-slate-200 shadow-xs">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Kurs haqida</h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {course.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Nimalarni o'rganasiz?</h3>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {course.outcomes.map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-blue-600" />
                          <span className="text-sm text-slate-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "dastur" && (
              <Card className="rounded-xl border-slate-200 shadow-xs">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold text-slate-900">
                    Kurs dasturi — {moduleTemplates.length} modul · {course.totalLessons} dars
                  </h2>
                  <div className="space-y-3">
                    {moduleTemplates.map((mod, i) => {
                      const isOpen = openModule === i;
                      return (
                        <div key={i} className="rounded-xl border transition-shadow hover:shadow-sm">
                          <button
                            type="button"
                            onClick={() => setOpenModule(isOpen ? null : i)}
                            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                          >
                            <span className="text-sm font-semibold text-slate-900">
                              Modul {i + 1}: {mod.title}
                            </span>
                            <ChevronDown className={cn(
                              "size-4 shrink-0 text-slate-400 transition-transform",
                              isOpen && "rotate-180"
                            )} />
                          </button>
                          {isOpen && (
                            <div className="border-t px-5 py-4">
                              <p className="text-sm text-slate-600">
                                {mod.desc} ({mod.lessons} dars · {mod.duration})
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "oqituvchi" && (
              <Card className="rounded-xl border-slate-200 shadow-xs">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-16">
                      <AvatarImage src={teacher.avatar} />
                      <AvatarFallback className="text-lg">{teacher.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{teacher.name}</h2>
                      <p className="text-sm text-slate-500">{teacher.role}</p>
                      <div className="mt-1 flex items-center gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Star className="size-3.5 fill-amber-400 text-amber-400" />
                          {teacher.rating}
                        </span>
                        <span>{teacher.courses} kurs</span>
                        <span>{teacher.students} talaba</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{teacher.bio}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div>
          <Card className="sticky top-24 rounded-xl border-slate-200 shadow-xs">
            <CardContent className="p-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900">
                  {formatPrice(course.price).replace(" so'm", "")}
                </span>
                {course.oldPrice && (
                  <span className="text-lg text-slate-400 line-through">
                    {formatPrice(course.oldPrice).replace(" so'm", "")}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500">so'm</p>

              <ul className="mt-5 space-y-2.5">
                {perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="size-4 text-blue-600" />
                    {i === 0 ? `${course.totalLessons} ${perk}` : i === 1 ? `${Math.min(5, Math.ceil(course.totalLessons / 10))} ${perk}` : perk}
                  </li>
                ))}
              </ul>

              <Button size="lg" className="mt-6 w-full text-base" asChild>
                <Link to={`/student/katalog/${course.slug}/tolov`}>
                  Sotib olish
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
