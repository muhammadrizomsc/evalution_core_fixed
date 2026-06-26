import { Link } from "react-router-dom";
import {
  Award,
  BookOpen,
  CircleDot,
  Clock,
  Edit,
  Info,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const profile = {
  fullName: "Bobur Tojiev",
  firstName: "Bobur",
  lastName: "Tojiev",
  studentId: "ST-0123",
  status: "Aktiv",
  memberSince: "2025-yil sentyabrdan beri",
  email: "bobur@example.uz",
  phone: "+998 90 123 45 67",
  city: "Toshkent, Chilonzor tumani",
  birthDate: "14-mart, 2004",
  gender: "Erkak",
  address: "Toshkent sh., Chilonzor tumani, 19-mavze",
  avatar: "https://i.pravatar.cc/150?img=11",
};

const professional = {
  direction: "Frontend dasturlash",
  level: "O'rta",
  goal: "Frontend dasturchi bo'lib ishga joylashish",
  github: "github.com/boburdev",
  linkedin: "linkedin.com/in/bobur",
};

const statsData = {
  avgScore: 87,
  studyHours: 47,
  totalCourses: 3,
  certificates: 2,
};

const profileCourses = [
  { name: "React.js — zamonaviy frontend", mentor: "Akmal Karimov", progress: 62, status: "active" as const },
  { name: "Python asoslari", mentor: "Dilnoza Yusupova", progress: 33, status: "active" as const },
  { name: "JavaScript asoslari", mentor: "Akmal Karimov", progress: 100, status: "completed" as const },
];

const account = {
  status: "Aktiv",
  registeredDate: "2-sentyabr, 2025",
  purchasedCourses: 3,
  certificates: 2,
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-50 py-3 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900">{value}</span>
    </div>
  );
}

export function ProfilPage() {
  return (
    <div className="space-y-6">
      <Card className="rounded-xl border-slate-200 shadow-xs">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="size-20 border-2 border-white shadow-md">
              <AvatarImage src={profile.avatar} alt={profile.fullName} />
              <AvatarFallback className="text-xl font-bold">BT</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{profile.fullName}</h1>
                <Badge className="bg-emerald-50 text-emerald-700 shadow-none hover:bg-emerald-50">
                  {profile.status}
                </Badge>
              </div>
              <p className="mt-0.5 text-sm text-slate-500">
                Talaba ID: <span className="font-semibold text-slate-700">{profile.studentId}</span>{" · "}{profile.memberSince}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Mail className="size-3.5" />{profile.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="size-3.5" />{profile.phone}</span>
                <span className="flex items-center gap-1.5"><MapPin className="size-3.5" />{profile.city}</span>
              </div>
            </div>
          </div>
          <Button size="sm"><Edit className="mr-2 size-4" />Profilni tahrirlash</Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "O'rtacha natija", value: `${statsData.avgScore}%`, icon: CircleDot, color: "bg-blue-50 text-blue-600" },
          { label: "O'rganilgan soat", value: String(statsData.studyHours), icon: Clock, color: "bg-emerald-50 text-emerald-600" },
          { label: "Jami kurslar", value: String(statsData.totalCourses), icon: BookOpen, color: "bg-amber-50 text-amber-600" },
          { label: "Sertifikat", value: String(statsData.certificates), icon: Award, color: "bg-orange-50 text-orange-600" },
        ].map((stat) => (
          <Card key={stat.label} className="rounded-xl border-slate-200 shadow-xs">
            <CardContent className="p-5">
              <div className={`flex size-10 items-center justify-center rounded-lg ${stat.color}`}>
                <stat.icon className="size-5" />
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="mt-0.5 text-sm text-slate-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-slate-900">Shaxsiy ma'lumotlar</h2>
            <div className="mt-4">
              <InfoRow label="Ism" value={profile.firstName} />
              <InfoRow label="Familiya" value={profile.lastName} />
              <InfoRow label="Tug'ilgan sana" value={profile.birthDate} />
              <InfoRow label="Jins" value={profile.gender} />
              <InfoRow label="Email" value={profile.email} />
              <InfoRow label="Telefon" value={profile.phone} />
              <InfoRow label="Manzil" value={profile.address} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-slate-900">Kasbiy ma'lumotlar</h2>
            <div className="mt-4">
              <InfoRow label="Yo'nalish" value={professional.direction} />
              <InfoRow label="Joriy daraja" value={professional.level} />
              <InfoRow label="Maqsad" value={professional.goal} />
              <InfoRow label="GitHub" value={professional.github} />
              <InfoRow label="LinkedIn" value={professional.linkedin} />
            </div>
            <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-blue-50/70 px-4 py-3">
              <Info className="mt-0.5 size-4 shrink-0 text-blue-500" />
              <p className="text-sm text-slate-600">
                Olgan sertifikatlaringizni LinkedIn profilingizga qo'shing — ish beruvchilar e'tiboriga tushasiz.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Mening kurslarim</h2>
              <Link to="/student/kurslarim" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                Hammasi →
              </Link>
            </div>
            <div className="mt-4 divide-y divide-slate-100">
              {profileCourses.map((course, i) => (
                <div key={i} className="flex items-center justify-between py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{course.name}</p>
                    <p className="mt-0.5 text-xs text-slate-500">Mentor: {course.mentor} · {course.progress}%</p>
                  </div>
                  {course.status === "active" ? (
                    <Badge className="bg-blue-50 text-blue-700 shadow-none hover:bg-blue-50">Davom etmoqda</Badge>
                  ) : (
                    <Badge className="bg-slate-100 text-slate-700 shadow-none hover:bg-slate-100">Tugallangan</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-slate-200 shadow-xs">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-slate-900">Hisob holati</h2>
            <div className="mt-4">
              <div className="flex items-center justify-between border-b border-slate-50 py-3">
                <span className="text-sm text-slate-500">Holat</span>
                <Badge className="bg-emerald-50 text-emerald-700 shadow-none hover:bg-emerald-50">{account.status}</Badge>
              </div>
              <InfoRow label="Ro'yxatdan o'tgan" value={account.registeredDate} />
              <InfoRow label="Sotib olingan kurslar" value={account.purchasedCourses + " ta"} />
              <InfoRow label="Sertifikatlar" value={account.certificates + " ta"} />
            </div>
            <div className="mt-4 flex gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link to="/student/tolovlar">To'lovlar tarixi</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/student/sozlamalar">Sozlamalar</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
