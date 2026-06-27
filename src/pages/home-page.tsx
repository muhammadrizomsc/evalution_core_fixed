import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CalendarClock,
  GraduationCap,
  HandHeart,
  Laptop,
  MonitorPlay,
  Rocket,
  Star,
  Users,
  UsersRound,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseCard } from "@/components/site/course-card";
import { TeacherCard } from "@/components/site/teacher-card";
import { getInitials, type Course, type Teacher } from "@/lib/data";
import { FaqAccordion } from "@/pages/faq-accordion";
import { api } from "@/lib/api";

const statIcons = [GraduationCap, BookOpen, Users, Briefcase];

interface SiteStats {
  totalStudents: number;
  totalGraduates: number;
  totalInstructors: number;
  totalCourses: number;
  totalCertificates: number;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  rating: number;
  text: string;
}

const benefits = [
  {
    icon: Rocket,
    title: "Amaliy loyihalar",
    text: "Har bir kursda real loyihalar ustida ishlab, portfolio yaratasiz.",
  },
  {
    icon: Laptop,
    title: "Zamonaviy dastur",
    text: "Bozor talabiga mos, har yili yangilanadigan o'quv dasturlari.",
  },
  {
    icon: Award,
    title: "Sertifikat",
    text: "Kurs yakunida tan olingan rasmiy sertifikatga ega bo'lasiz.",
  },
  {
    icon: HandHeart,
    title: "Mentor yordami",
    text: "Tajribali mentorlar har qadamda savollaringizga javob beradi.",
  },
  {
    icon: Briefcase,
    title: "Ish topishda ko'mak",
    text: "CV tayyorlash, intervyu mashqi va hamkor kompaniyalarga yo'llanma.",
  },
  {
    icon: CalendarClock,
    title: "Qulay jadval",
    text: "Ertalabki, kunduzgi va kechki guruhlar — o'zingizga mosini tanlang.",
  },
  {
    icon: MonitorPlay,
    title: "Onlayn platforma",
    text: "Barcha darslar yozib olinadi va platformada doim ochiq turadi.",
  },
  {
    icon: UsersRound,
    title: "Jamiyat",
    text: "5 000+ bitiruvchidan iborat faol hamjamiyatga qo'shilasiz.",
  },
];

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{subtitle}</p>
    </div>
  );
}

export function HomePage() {
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [statsRes, coursesRes, teachersRes, testimonialsRes] = await Promise.allSettled([
          api.get<{ data: SiteStats }>("/public/stats"),
          api.get<{ data: { items: Course[] } }>("/public/courses?featured=true&limit=8"),
          api.get<{ data: { items: Teacher[] } }>("/public/instructors?limit=6"),
          api.get<{ data: Testimonial[] }>("/public/testimonials?limit=6"),
        ]);

        if (statsRes.status === "fulfilled") setStats(statsRes.value.data.data);
        if (coursesRes.status === "fulfilled") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const items = (coursesRes.value.data.data.items ?? []) as any[];
          setCourses(items.map((c) => ({
            slug: c.slug ?? c.id ?? "",
            title: c.title ?? "",
            excerpt: c.excerpt ?? c.description ?? c.shortDescription ?? "",
            category: c.category ?? "Frontend",
            image: c.image ?? c.thumbnailUrl ?? c.coverUrl ?? "",
            price: c.price ?? 0,
            durationMonths: c.durationMonths ?? c.duration ?? 1,
            totalLessons: c.totalLessons ?? c.lessonsCount ?? 0,
            rating: c.rating ?? 5.0,
            reviewsCount: c.reviewsCount ?? 0,
            instructor: c.instructor ?? { name: "", avatar: "" },
            level: c.level ?? "Boshlang'ich",
            featured: c.featured ?? false,
          })));
        }
        if (teachersRes.status === "fulfilled") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const items = (teachersRes.value.data.data.items ?? []) as any[];
          setTeachers(items.map((t) => ({
            id: t.id ?? "",
            name: t.name ?? `${t.firstName ?? ""} ${t.lastName ?? ""}`.trim(),
            role: t.role ?? t.position ?? t.specialty ?? "",
            category: t.category ?? "Frontend",
            bio: t.bio ?? t.description ?? t.about ?? "",
            courses: t.courses ?? t.coursesCount ?? t.totalCourses ?? 0,
            students: t.students ?? t.studentsCount ?? t.totalStudents ?? 0,
            rating: t.rating ?? 5.0,
            avatar: t.avatar ?? t.avatarUrl ?? t.photo ?? "",
          })));
        }
        if (testimonialsRes.status === "fulfilled") setTestimonials(testimonialsRes.value.data.data ?? []);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const statItems = stats
    ? [
        { label: "Talabalar", value: `${stats.totalStudents}+` },
        { label: "Kurslar", value: `${stats.totalCourses}+` },
        { label: "O'qituvchilar", value: `${stats.totalInstructors}+` },
        { label: "Bitiruvchilar", value: `${stats.totalGraduates}+` },
      ]
    : [];

  return (
    <div>

      <section className="border-b bg-gradient-to-b from-blue-50 via-blue-50/60 to-white">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 lg:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Badge className="bg-primary/10 text-primary">
                IT va dizayn ta&rsquo;lim markazi
              </Badge>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                Kelajak kasbingizni{" "}
                <span className="text-primary">bugun boshlang.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Tajribali mentorlar, amaliy loyihalar va zamonaviy o&rsquo;quv
                dasturi bilan IT sohasida martaba quring. Noldan boshlab
                mutaxassis darajasigacha — biz bilan birga.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="h-11 px-6 text-base" asChild>
                  <Link to="/kurslar">
                    Kurslarni ko&rsquo;rish
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 px-6 text-base"
                  asChild
                >
                  <Link to="/aloqa">Bepul konsultatsiya</Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-200/60 to-purple-200/40 blur-2xl" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-white shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=80"
                  alt="Talabalar birgalikda o'qimoqda"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="mx-auto -mt-12 max-w-5xl px-4 sm:px-6 lg:px-8">
        <Card className="py-6 shadow-lg">
          <CardContent className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="size-11 rounded-xl" />
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))
              : statItems.map((stat, i) => {
                  const Icon = statIcons[i] ?? GraduationCap;
                  return (
                    <div key={stat.label} className="flex items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
          </CardContent>
        </Card>
      </section>


      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          title="Eng yaxshilar orasidan eng kerakli kursni tanlang"
          subtitle="Frontend'dan Data Science'gacha — har bir yo'nalishda amaliyotga asoslangan kurslar."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-xl border overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-full mt-3" />
                  </div>
                </div>
              ))
            : courses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
        </div>
        <div className="mt-10 text-center">
          <Button size="lg" variant="outline" className="h-11 px-6" asChild>
            <Link to="/kurslar">
              Barcha kurslarni ko&rsquo;rish
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>


      <section className="border-y bg-blue-50/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            title="O'qishni rivojlantirish afzaliklari"
            subtitle="Bizda o'qish nafaqat bilim — balki real natija va karyera uchun mustahkam poydevor."
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="gap-3 transition-shadow hover:shadow-md"
              >
                <CardContent className="flex flex-col gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <benefit.icon className="size-5" />
                  </div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          title="Bizning o'qituvchilar"
          subtitle="Yetakchi kompaniyalarda ishlagan, o'z sohasining haqiqiy mutaxassislari sizga dars beradi."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border p-6 flex flex-col items-center gap-3">
                  <Skeleton className="size-24 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ))
            : teachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
        </div>
        <div className="mt-10 text-center">
          <Button size="lg" variant="outline" className="h-11 px-6" asChild>
            <Link to="/oqituvchilar">
              Barcha o&rsquo;qituvchilar
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>


      <section className="border-y bg-blue-50/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            title="Talabalarimiz fikri"
            subtitle="Bitiruvchilarimiz bugun yetakchi kompaniyalarda ishlamoqda. Ularning tajribasi bilan tanishing."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border p-5 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ))
              : testimonials.map((t) => (
                  <Card key={t.id ?? t.name} className="transition-shadow hover:shadow-md">
                    <CardContent className="flex h-full flex-col gap-4">
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="size-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        &ldquo;{t.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-3 border-t pt-4">
                        <Avatar>
                          <AvatarImage src={t.avatar} alt={t.name} />
                          <AvatarFallback>{getInitials(t.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          title="Ko'p beriladigan savollar"
          subtitle="Ko'p so'raladigan savollarga javoblar. Boshqa savolingiz bo'lsa, biz bilan bog'laning."
        />
        <div className="mt-10">
          <FaqAccordion />
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Hoziroq o&rsquo;z kelajagingizni boshlang
              </h2>
              <p className="mt-4 max-w-md text-blue-100">
                Birinchi darsga bepul qatnashing, markazimiz va mentorlar bilan
                tanishing. Qaror qabul qilish uchun hech qanday majburiyat yo&rsquo;q.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="h-11 bg-white px-6 text-primary hover:bg-blue-50"
                  asChild
                >
                  <Link to="/kurslar">Kursga yozilish</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 border-white/40 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link to="/aloqa">Savol berish</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl lg:block">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=80"
                alt="Jamoa birgalikda ishlamoqda"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
