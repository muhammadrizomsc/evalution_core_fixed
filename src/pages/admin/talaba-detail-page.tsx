import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import {
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  Mail,
  MoreVertical,
  Phone,
  SquarePen,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInitials } from "@/lib/data";
import { api } from "@/lib/api";

interface StudentDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  status?: string;
  birthDate?: string;
  address?: string;
  createdAt?: string;
}

interface Enrollment {
  id: string;
  courseId: string;
  courseName?: string;
  course?: { title: string; slug: string };
  status?: string;
  progress?: number;
  completedLessons?: number;
  totalLessons?: number;
  startedAt?: string;
}

interface Payment {
  id: string;
  amount: number;
  status?: string;
  method?: string;
  paidAt?: string;
  courseName?: string;
  course?: { title: string };
  notes?: string;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 py-2.5 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}

function EmptyTab({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <Card className="rounded-xl border-slate-200 shadow-xs">
      <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-slate-100">
          <Icon className="size-6 text-slate-400" />
        </div>
        <div>
          <p className="font-medium text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-500">
            Ma&apos;lumotlar topilmadi
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function fmt(v: number) {
  return new Intl.NumberFormat("uz-UZ").format(v).replace(/,/g, " ");
}

export function StudentProfilePage() {
  const { id } = useParams();
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    Promise.allSettled([
      api.get<{ data: StudentDetail }>(`/admin/students/${id}`),
      api.get<{ data: Enrollment[] }>(`/admin/students/${id}/enrollments`),
      api.get<{ data: Payment[] }>(`/admin/students/${id}/payments`),
    ]).then(([studentRes, enrollRes, payRes]) => {
      if (studentRes.status === "fulfilled") {
        setStudent(studentRes.value.data.data);
      } else {
        const err = studentRes.reason as { response?: { status?: number } };
        if (err?.response?.status === 404) setNotFound(true);
      }
      if (enrollRes.status === "fulfilled") {
        setEnrollments(Array.isArray(enrollRes.value.data.data) ? enrollRes.value.data.data : []);
      }
      if (payRes.status === "fulfilled") {
        setPayments(Array.isArray(payRes.value.data.data) ? payRes.value.data.data : []);
      }
    }).finally(() => setLoading(false));
  }, [id]);

  if (!id) return <Navigate to="/404" replace />;
  if (notFound) return <Navigate to="/404" replace />;

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-64" />
        <div className="rounded-xl border p-6 space-y-4">
          <div className="flex gap-4">
            <Skeleton className="size-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!student) return null;

  const fullName = `${student.firstName} ${student.lastName}`.trim();
  const isActive = student.status === "active" || student.status === "Faol";

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/admin">Admin</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/admin/talabalar">Talabalar</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{fullName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>


      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="size-16 sm:size-20">
              {student.avatar ? (
                <AvatarImage src={student.avatar} alt={fullName} />
              ) : null}
              <AvatarFallback className="bg-blue-100 text-xl font-semibold text-blue-700">
                {getInitials(fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {fullName}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                {student.createdAt && (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    {new Date(student.createdAt).toLocaleDateString("uz-UZ")}
                  </span>
                )}
                {student.phone && (
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="size-3.5" />
                    {student.phone}
                  </span>
                )}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge className={isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}>
                  {isActive ? "Faol talaba" : "Nofaol talaba"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline">
              <Mail data-icon="inline-start" />
              Xabar yuborish
            </Button>
            <Button>
              <SquarePen data-icon="inline-start" />
              Tahrirlash
            </Button>
            <Button variant="ghost" size="icon" aria-label="Boshqa amallar">
              <MoreVertical />
            </Button>
          </div>
        </div>
      </div>


      <Tabs defaultValue="umumiy" className="gap-6">
        <div className="overflow-x-auto">
          <TabsList variant="line" className="border-b border-slate-200 pb-1">
            <TabsTrigger value="umumiy">Umumiy</TabsTrigger>
            <TabsTrigger value="davomat">Davomat</TabsTrigger>
            <TabsTrigger value="baholar">Baholar</TabsTrigger>
            <TabsTrigger value="tolovlar">To&apos;lovlar</TabsTrigger>
            <TabsTrigger value="hujjatlar">Hujjatlar</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="umumiy" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-xl border-slate-200 shadow-xs">
              <CardHeader>
                <CardTitle className="text-base">
                  Shaxsiy ma&apos;lumotlar
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-slate-100">
                <InfoRow label="F.I.Sh." value={fullName} />
                <InfoRow label="Email" value={student.email} />
                {student.phone && <InfoRow label="Telefon" value={student.phone} />}
                {student.birthDate && <InfoRow label="Tug'ilgan sana" value={student.birthDate} />}
                {student.address && <InfoRow label="Manzil" value={student.address} />}
              </CardContent>
            </Card>

            <Card className="rounded-xl border-slate-200 shadow-xs">
              <CardHeader>
                <CardTitle className="text-base">
                  Kurslar statistikasi
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-slate-100">
                <InfoRow label="Jami kurslar" value={String(enrollments.length)} />
                <InfoRow
                  label="Faol kurslar"
                  value={String(enrollments.filter(e => e.status === "active" || e.status === "enrolled").length)}
                />
                <InfoRow
                  label="Tugallangan"
                  value={String(enrollments.filter(e => e.status === "completed").length)}
                />
                <InfoRow label="To'lovlar soni" value={String(payments.length)} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="davomat">
          {enrollments.length === 0 ? (
            <EmptyTab icon={ClipboardCheck} title="Davomat tarixi" />
          ) : (
            <Card className="rounded-xl border-slate-200 shadow-xs">
              <CardHeader>
                <CardTitle className="text-base">Yozilgan kurslar</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kurs</TableHead>
                      <TableHead>Holat</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Darslar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments.map((en) => {
                      const courseName = en.course?.title ?? en.courseName ?? en.courseId;
                      return (
                        <TableRow key={en.id}>
                          <TableCell className="font-medium">{courseName}</TableCell>
                          <TableCell>
                            <Badge className={en.status === "completed" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}>
                              {en.status ?? "Noma'lum"}
                            </Badge>
                          </TableCell>
                          <TableCell>{en.progress !== undefined ? `${en.progress}%` : "—"}</TableCell>
                          <TableCell className="text-slate-500">
                            {en.completedLessons !== undefined && en.totalLessons !== undefined
                              ? `${en.completedLessons}/${en.totalLessons}`
                              : "—"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="baholar">
          <EmptyTab icon={GraduationCap} title="Baholar tarixi" />
        </TabsContent>

        <TabsContent value="tolovlar">
          {payments.length === 0 ? (
            <EmptyTab icon={CreditCard} title="To'lovlar tarixi" />
          ) : (
            <Card className="rounded-xl border-slate-200 shadow-xs">
              <CardHeader>
                <CardTitle className="text-base">To&apos;lovlar tarixi</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kurs</TableHead>
                      <TableHead>Summa</TableHead>
                      <TableHead>Usul</TableHead>
                      <TableHead>Sana</TableHead>
                      <TableHead>Holat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((p) => {
                      const courseName = p.course?.title ?? p.courseName ?? "—";
                      const paidDate = p.paidAt ? new Date(p.paidAt).toLocaleDateString("uz-UZ") : "—";
                      return (
                        <TableRow key={p.id}>
                          <TableCell className="font-medium">{courseName}</TableCell>
                          <TableCell>{fmt(p.amount)} so&apos;m</TableCell>
                          <TableCell className="text-slate-500">{p.method ?? "—"}</TableCell>
                          <TableCell className="text-slate-500">{paidDate}</TableCell>
                          <TableCell>
                            <Badge className={p.status === "paid" || p.status === "To'langan" ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"}>
                              {p.status ?? "—"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="hujjatlar">
          <EmptyTab icon={FileText} title="Hujjatlar" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
