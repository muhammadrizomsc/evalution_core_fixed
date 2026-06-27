import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  Check,
  Clock,
  MessageCircle,
  Star,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseCard } from "@/components/site/course-card";
import {
  categoryColors,
  formatPrice,
  getInitials,
  type Category,
  type Course,
} from "@/lib/data";
import { api } from "@/lib/api";

interface ApiCourse {
  id: string;
  slug: string;
  title: string;
  category: Category;
  rating: number;
  reviews: number;
  durationMonths: number;
  lessonsPerWeek?: number;
  totalLessons: number;
  price: number;
  oldPrice?: number;
  level: "Boshlovchi" | "O'rtacha" | "Mutaxassis";
  image: string;
  excerpt?: string;
  description?: string;
  outcomes?: string[];
  audience?: string[];
  startDate?: string;
  seatsLeft?: number;
  seatsTotal?: number;
  popular?: boolean;
  instructor?: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
    specialization?: string;
    totalStudents?: number;
    totalCourses?: number;
    rating?: number;
  };
}

const requiredSkillsByCategory: Record<string, string[]> = {
  Frontend: ["HTML asoslari", "CSS asoslari", "Mantiqiy fikrlash"],
  Backend: ["Kompyuter savodxonligi", "Mantiqiy fikrlash"],
  Dizayn: ["Kompyuter savodxonligi", "Ijodiy fikrlash"],
  Mobil: ["Dasturlash asoslari", "Mantiqiy fikrlash"],
  "Data Science": ["Python asoslari", "Matematika asoslari"],
  Marketing: ["Kompyuter savodxonligi", "Ijtimoiy tarmoqlar"],
  DevOps: ["Linux asoslari", "Tarmoq asoslari"],
};

export function CourseDetailPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState<ApiCourse | null>(null);
  const [similar, setSimilar] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    api
      .get<{ data: ApiCourse }>(`/public/courses/${slug}`)
      .then((res) => {
        setCourse(res.data.data);
        return api.get<{ data: { items: Course[] } }>(
          `/public/courses?category=${res.data.data.category}&limit=5`
        );
      })
      .then((res) => {
        setSimilar((res.data.data.items ?? []).filter((c) => c.slug !== slug).slice(0, 4));
      })
      .catch((err) => {
        if (err?.response?.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (!slug) return <Navigate to="/404" replace />;
  if (notFound) return <Navigate to="/404" replace />;

  if (loading) {
    return (
      <div>
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-12">
          <Skeleton className="h-8 w-48 bg-white/20" />
          <Skeleton className="mt-4 h-12 w-2/3 bg-white/20" />
          <Skeleton className="mt-4 h-6 w-full bg-white/20" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!course) return null;

  const instructor = course.instructor;
  const instructorName = instructor
    ? `${instructor.firstName} ${instructor.lastName}`
    : "O'qituvchi";
  const students = instructor?.totalStudents ?? 0;
  const seatsTotal = course.seatsTotal ?? 20;
  const seatsLeft = course.seatsLeft ?? 5;
  const occupied = seatsTotal - seatsLeft;
  const seatProgress = Math.round((occupied / seatsTotal) * 100);

  const checklist = [
    `${course.totalLessons} ta dars`,
    `${course.durationMonths} oy davomiylik`,
    "Sertifikat",
    "Mentor bilan aloqa",
    "Amaliy loyihalar",
  ];

  const requiredSkills =
    requiredSkillsByCategory[course.category] ?? ["Kompyuter savodxonligi"];

  return (
    <div>

      <section className="bg-gradient-to-br from-blue-600 via-blue-600 to-purple-600 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8 lg:py-16">
          <div>
            <nav className="flex flex-wrap items-center gap-1.5 text-sm text-blue-100">
              <Link to="/" className="hover:text-white">
                Bosh sahifa
              </Link>
              <span>/</span>
              <Link to="/kurslar" className="hover:text-white">
                Kurslar
              </Link>
              <span>/</span>
              <span className="text-white">{course.title}</span>
            </nav>

            <div className="mt-5 flex flex-wrap gap-2">
              {course.popular && (
                <Badge className="bg-amber-400 text-amber-950">Mashhur</Badge>
              )}
              <Badge className={categoryColors[course.category]}>
                {course.category}
              </Badge>
              <Badge className="bg-white/15 text-white">{course.level}</Badge>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-4 max-w-2xl text-blue-100">{course.description ?? course.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{course.rating}</span>
                <span className="text-blue-200">
                  ({course.reviews} sharh)
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-blue-100">
                <Users className="size-4" />
                {students}+ talaba
              </span>
              <span className="flex items-center gap-1.5 text-blue-100">
                <Clock className="size-4" />
                {course.durationMonths} oy
              </span>
              <span className="flex items-center gap-1.5 text-blue-100">
                <BookOpen className="size-4" />
                {course.totalLessons} dars
              </span>
            </div>

            {instructor && (
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="size-10 border-2 border-white/30">
                  <AvatarImage src={instructor.avatar} alt={instructorName} />
                  <AvatarFallback className="text-foreground">
                    {getInitials(instructorName)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="text-blue-200">O&rsquo;qituvchi</p>
                  <p className="font-medium">
                    {instructorName} — {instructor.specialization ?? "Mutaxassis"}
                  </p>
                </div>
              </div>
            )}
          </div>


          <Card className="gap-0 overflow-hidden p-0 text-foreground shadow-2xl">
            <div className="relative aspect-video">
              <img src={course.image} alt={course.title} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <CardContent className="flex flex-col gap-5 p-6">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold">
                  {formatPrice(course.price)}
                </span>
                {course.oldPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(course.oldPrice)}
                  </span>
                )}
              </div>

              <ul className="flex flex-col gap-2.5">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2.5">
                <Button size="lg" className="h-11 w-full text-base">
                  Ro&rsquo;yxatdan o&rsquo;tish
                </Button>
                <Button size="lg" variant="outline" className="h-11 w-full" asChild>
                  <Link to="/aloqa">Bepul konsultatsiya</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>


      <section className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <Tabs defaultValue="tavsif">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="tavsif">Tavsif</TabsTrigger>
            <TabsTrigger value="dastur">Dastur</TabsTrigger>
            <TabsTrigger value="oqituvchi">O&rsquo;qituvchi</TabsTrigger>
            <TabsTrigger value="sharhlar">
              Sharhlar ({course.reviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tavsif" className="mt-6 flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-bold">Kurs haqida</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {course.description ?? course.excerpt}
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Har bir dars nazariya, amaliyot va uy vazifasidan iborat. Kurs
                davomida mentor bilan aloqada bo&rsquo;lasiz, kod review olasiz
                va guruhda real loyihalar ustida ishlaysiz. Yakunda esa
                portfolioga ega bo&rsquo;lib, ishga joylashishga tayyor
                holatda bitirasiz.
              </p>
            </div>

            {course.outcomes && course.outcomes.length > 0 && (
              <div>
                <h2 className="text-xl font-bold">
                  Nimalarni o&rsquo;rganasiz?
                </h2>
                <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {course.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="size-3" />
                      </span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {course.audience && course.audience.length > 0 && (
              <div>
                <h2 className="text-xl font-bold">Kim uchun?</h2>
                <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm text-muted-foreground">
                  {course.audience.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>

          <TabsContent value="dastur" className="mt-6">
            <h2 className="text-xl font-bold">Kurs dasturi</h2>
            <p className="mt-3 text-muted-foreground">
              Kurs {course.durationMonths} oy davom etadi: haftasiga{" "}
              {course.lessonsPerWeek ?? 3} ta dars, jami {course.totalLessons} ta
              mashg&rsquo;ulot. To&rsquo;liq dastur bilan tanishish uchun bepul
              konsultatsiyaga yoziling.
            </p>
          </TabsContent>

          <TabsContent value="oqituvchi" className="mt-6">
            {instructor ? (
              <Card>
                <CardContent className="flex flex-col items-start gap-4 sm:flex-row">
                  <Avatar className="size-20">
                    <AvatarImage src={instructor.avatar} alt={instructorName} />
                    <AvatarFallback>{getInitials(instructorName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-bold">{instructorName}</h2>
                    <p className="text-sm font-medium text-primary">
                      {instructor.specialization ?? "Mutaxassis"}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {instructor.bio}
                    </p>
                    <div className="mt-3 flex gap-5 text-sm text-muted-foreground">
                      <span>{instructor.totalCourses ?? 0} kurs</span>
                      <span>{instructor.totalStudents ?? 0} talaba</span>
                      <span className="flex items-center gap-1">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        {instructor.rating ?? 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <p className="text-muted-foreground">O'qituvchi ma'lumoti mavjud emas.</p>
            )}
          </TabsContent>

          <TabsContent value="sharhlar" className="mt-6">
            <div className="flex flex-col items-center gap-3 rounded-xl border py-14 text-center">
              <MessageCircle className="size-8 text-muted-foreground" />
              <p className="font-medium">
                {course.reviews} ta sharh — {course.rating} o&rsquo;rtacha baho
              </p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Sharhlarni to&rsquo;liq ko&rsquo;rish uchun platformaga kiring
                yoki bizga murojaat qiling.
              </p>
            </div>
          </TabsContent>
        </Tabs>


        <aside className="flex flex-col gap-6">
          <Card>
            <CardContent className="flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Talab qilinadigan ko&rsquo;nikmalar
              </p>
              <div className="flex flex-wrap gap-2">
                {requiredSkills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Kurs guruhi
              </p>
              {course.startDate && (
                <div className="flex items-center gap-2.5 text-sm">
                  <CalendarDays className="size-4 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Boshlanish sanasi</p>
                    <p className="font-medium">{course.startDate}</p>
                  </div>
                </div>
              )}
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    O&rsquo;rinlar band
                  </span>
                  <span className="font-medium">
                    {occupied}/{seatsTotal}
                  </span>
                </div>
                <Progress value={seatProgress} className="mt-2" />
                <p className="mt-2 text-xs text-muted-foreground">
                  Atigi {seatsLeft} ta o&rsquo;rin qoldi — shoshiling!
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>


      {similar.length > 0 && (
        <section className="border-t bg-blue-50/40">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight">
              O&rsquo;xshash kurslar
            </h2>
            <p className="mt-2 text-muted-foreground">
              Bu kursni o&rsquo;rganganlar quyidagilarni ham yoqtirdi.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
