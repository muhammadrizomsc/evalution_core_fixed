import { Link } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import {
  Users,
  MapPin,
  Calendar,
  Download,
  SquarePen,
  MoreVertical,
  Plus,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  groups,
  frontendGroupMembers,
  getTeacher,
  getInitials,
  type GroupMember,
  type PaymentStatus,
} from "@/lib/data";

const paymentBadge: Record<PaymentStatus, string> = {
  "To'langan": "bg-emerald-50 text-emerald-600",
  Qarzdor: "bg-red-50 text-red-600",
  Kutilmoqda: "bg-orange-50 text-orange-600",
};

function attendanceColor(value: number): string {
  if (value >= 90) return "text-emerald-600";
  if (value >= 85) return "text-slate-900";
  return "text-orange-500";
}

function EmptyTab({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Card className="rounded-xl shadow-xs">
      <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-blue-50">
          <Icon className="size-6 text-blue-600" />
        </div>
        <p className="mt-2 text-sm font-medium text-slate-900">{title}</p>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function GuruhDetailPage() {
  const { id } = useParams();
  const group = groups.find((g) => g.id === id);
  if (!group) return <Navigate to="/404" replace />;

  const teacher = getTeacher(group.teacherId);
  const faol = group.status === "Faol";

  const members: GroupMember[] = Array.from(
    { length: Math.min(group.studentsCount, frontendGroupMembers.length) },
    (_, i) => frontendGroupMembers[i % frontendGroupMembers.length],
  );

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
              <Link to="/admin/guruhlar">Guruhlar</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{group.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="rounded-xl shadow-xs">
        <CardContent className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm">
              <Users className="size-7" />
            </div>
            <div className="space-y-2.5">
              <h1 className="text-2xl font-bold text-slate-900">{group.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>{group.courseTitle}</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {group.startDate}
                  {group.endDate ? ` — ${group.endDate}` : ""}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5" /> {group.room}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  className={
                    faol
                      ? "border-transparent bg-emerald-50 text-emerald-600"
                      : "border-transparent bg-orange-50 text-orange-600"
                  }
                >
                  <span
                    className={`size-1.5 rounded-full ${faol ? "bg-emerald-500" : "bg-orange-500"}`}
                  />
                  {group.status}
                </Badge>
                <Badge className="border-transparent bg-blue-50 text-blue-600">
                  {group.studentsCount} talaba
                </Badge>
                <Badge className="border-transparent bg-emerald-50 text-emerald-600">
                  {group.attendanceRate}% davomat
                </Badge>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Avatar className="size-7">
                  <AvatarImage src={teacher.avatar} alt={teacher.name} />
                  <AvatarFallback className="bg-blue-100 text-[10px] font-medium text-blue-700">
                    {getInitials(teacher.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-slate-700">
                  <span className="font-medium">{teacher.name}</span> — o&apos;qituvchi
                </span>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline">
              <Download data-icon="inline-start" /> Eksport
            </Button>
            <Button>
              <SquarePen data-icon="inline-start" /> Tahrirlash
            </Button>
            <Button variant="outline" size="icon" aria-label="Boshqa amallar">
              <MoreVertical />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="talabalar" className="gap-4">
        <TabsList className="w-full justify-start overflow-x-auto sm:w-fit">
          <TabsTrigger value="talabalar">
            Talabalar ({group.studentsCount})
          </TabsTrigger>
          <TabsTrigger value="jadval">Jadval</TabsTrigger>
          <TabsTrigger value="davomat">Davomat</TabsTrigger>
          <TabsTrigger value="baholar">Baholar</TabsTrigger>
          <TabsTrigger value="materiallar">Materiallar</TabsTrigger>
        </TabsList>

        <TabsContent value="talabalar">
          <Card className="rounded-xl py-0 shadow-xs">
            <CardContent className="p-0">
              <div className="flex items-center justify-between gap-3 border-b px-5 py-4">
                <h2 className="text-base font-semibold text-slate-900">
                  Guruh a&apos;zolari
                </h2>
                <Button size="sm">
                  <Plus data-icon="inline-start" /> Talaba qo&apos;shish
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table className="min-w-[640px]">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-12 px-5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        №
                      </TableHead>
                      <TableHead className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        F.I.SH.
                      </TableHead>
                      <TableHead className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Telefon
                      </TableHead>
                      <TableHead className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Davomat
                      </TableHead>
                      <TableHead className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        O&apos;rtacha baho
                      </TableHead>
                      <TableHead className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        To&apos;lov
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((m, i) => (
                      <TableRow key={`${m.studentId}-${i}`}>
                        <TableCell className="px-5 text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="size-8">
                              {m.avatar ? (
                                <AvatarImage src={m.avatar} alt={m.name} />
                              ) : null}
                              <AvatarFallback className="bg-blue-100 text-xs font-medium text-blue-700">
                                {getInitials(m.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-slate-900">{m.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{m.phone}</TableCell>
                        <TableCell>
                          <span className={`font-semibold ${attendanceColor(m.attendance)}`}>
                            {m.attendance}%
                          </span>
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">
                          {m.avgGrade}
                        </TableCell>
                        <TableCell>
                          <Badge className={`border-transparent ${paymentBadge[m.payment]}`}>
                            {m.payment}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex flex-col items-center justify-between gap-3 border-t px-5 py-4 sm:flex-row">
                <p className="text-sm text-muted-foreground">
                  Ko&apos;rsatilmoqda 1-{members.length} / {group.studentsCount}
                </p>
                <Pagination className="mx-0 w-fit">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jadval">
          <EmptyTab
            icon={CalendarDays}
            title="Jadval hali mavjud emas"
            description={`${group.name} guruhining dars jadvali bu yerda ko'rsatiladi: ${group.days.join(", ")} · ${group.time}.`}
          />
        </TabsContent>
        <TabsContent value="davomat">
          <EmptyTab
            icon={ClipboardCheck}
            title="Davomat ma'lumotlari"
            description="Guruh davomati tarixini ko'rish uchun Davomat bo'limidan foydalaning."
          />
        </TabsContent>
        <TabsContent value="baholar">
          <EmptyTab
            icon={GraduationCap}
            title="Baholar hali kiritilmagan"
            description="Talabalar baholari imtihon va topshiriqlardan so'ng bu yerda paydo bo'ladi."
          />
        </TabsContent>
        <TabsContent value="materiallar">
          <EmptyTab
            icon={FolderOpen}
            title="Materiallar yuklanmagan"
            description="Dars materiallari, taqdimotlar va qo'shimcha resurslar bu yerda saqlanadi."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
