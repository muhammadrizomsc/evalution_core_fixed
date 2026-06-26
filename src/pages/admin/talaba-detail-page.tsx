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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInitials, groups, students } from "@/lib/data";

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
            Ma&apos;lumotlar tez orada qo&apos;shiladi
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function StudentProfilePage() {
  const { id } = useParams();
  const student = students.find((s) => s.id === id);
  if (!student) return <Navigate to="/404" replace />;

  const group = groups.find((g) => g.id === student.groupId);
  const courseBadge = group ? `${group.courseTitle.split(" ")[0]} kursi` : null;

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
            <BreadcrumbPage>{student.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="size-16 sm:size-20">
              {student.avatar ? (
                <AvatarImage src={student.avatar} alt={student.name} />
              ) : null}
              <AvatarFallback className="bg-blue-100 text-xl font-semibold text-blue-700">
                {getInitials(student.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {student.name}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                <span>ID: {student.code}</span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" />
                  {student.joinedAt}&apos;dan beri
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="size-3.5" />
                  {student.phone}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge className="bg-blue-100 text-blue-700">
                  {student.groupName}
                </Badge>
                <Badge className="bg-emerald-50 text-emerald-700">
                  {student.status === "Faol" ? "Faol talaba" : "Nofaol talaba"}
                </Badge>
                {courseBadge ? (
                  <Badge className="bg-slate-100 text-slate-600">
                    {courseBadge}
                  </Badge>
                ) : null}
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
                <InfoRow label="F.I.Sh." value={student.name} />
                <InfoRow label="Tug'ilgan sana" value={student.birthDate} />
                <InfoRow label="Yosh" value={`${student.age} yosh`} />
                <InfoRow label="Jins" value={student.gender} />
                <InfoRow label="Millati" value={student.nationality} />
                <InfoRow label="Pasport" value={student.passport} />
              </CardContent>
            </Card>

            <Card className="rounded-xl border-slate-200 shadow-xs">
              <CardHeader>
                <CardTitle className="text-base">
                  Aloqa ma&apos;lumotlari
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-slate-100">
                <InfoRow label="Telefon" value={student.phone} />
                <InfoRow label="Email" value={student.email} />
                <InfoRow label="Telegram" value={student.telegram} />
                <InfoRow label="Manzil" value={student.address} />
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-xl border-slate-200 shadow-xs">
            <CardHeader>
              <CardTitle className="text-base">
                Ota-ona ma&apos;lumotlari
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs font-semibold tracking-wide text-blue-600 uppercase">
                    Otasi
                  </p>
                  <div className="divide-y divide-slate-100">
                    <InfoRow label="F.I.Sh." value={student.father.name} />
                    <InfoRow
                      label="Tug'ilgan sana"
                      value={student.father.birthDate}
                    />
                    <InfoRow label="Telefon" value={student.father.phone} />
                    <InfoRow label="Ish joy" value={student.father.work} />
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold tracking-wide text-purple-600 uppercase">
                    Onasi
                  </p>
                  <div className="divide-y divide-slate-100">
                    <InfoRow label="F.I.Sh." value={student.mother.name} />
                    <InfoRow
                      label="Tug'ilgan sana"
                      value={student.mother.birthDate}
                    />
                    <InfoRow label="Telefon" value={student.mother.phone} />
                    <InfoRow label="Kasbi" value={student.mother.work} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="davomat">
          <EmptyTab icon={ClipboardCheck} title="Davomat tarixi" />
        </TabsContent>
        <TabsContent value="baholar">
          <EmptyTab icon={GraduationCap} title="Baholar tarixi" />
        </TabsContent>
        <TabsContent value="tolovlar">
          <EmptyTab icon={CreditCard} title="To'lovlar tarixi" />
        </TabsContent>
        <TabsContent value="hujjatlar">
          <EmptyTab icon={FileText} title="Hujjatlar" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
