import * as React from "react";
import { Link } from "react-router-dom";
import { Plus, Search, ArrowRight, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  groups,
  teachers,
  courses,
  categoryColors,
  getTeacher,
  getInitials,
  students,
  type Group,
} from "@/lib/data";

const memberAvatars = students
  .filter((s) => s.avatar)
  .map((s) => ({ avatar: s.avatar, name: s.name }));

function GroupCard({ group }: { group: Group }) {
  const teacher = getTeacher(group.teacherId);
  const faol = group.status === "Faol";
  const avatars = memberAvatars.slice(0, 3);
  const extra = Math.max(group.studentsCount - avatars.length, 0);

  return (
    <Card className="rounded-xl shadow-xs transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-slate-900">{group.name}</h3>
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
        </div>

        <Badge className={`border-transparent ${categoryColors[group.category]}`}>
          {group.courseTitle}
        </Badge>

        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage src={teacher.avatar} alt={teacher.name} />
            <AvatarFallback className="bg-blue-100 text-xs font-medium text-blue-700">
              {getInitials(teacher.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">O&apos;qituvchi</p>
            <p className="truncate text-sm font-medium text-slate-900">{teacher.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="size-3" /> Talabalar
            </p>
            <p className="mt-0.5 text-sm font-semibold text-slate-900">
              {group.studentsCount} ta
            </p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="size-3" /> Boshlanish
            </p>
            <p className="mt-0.5 text-sm font-semibold text-slate-900">{group.startDate}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {group.days.map((day) => (
            <Badge key={day} variant="outline" className="rounded-md font-normal text-slate-600">
              {day} · {group.time}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t pt-4">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {avatars.map((m) => (
                <Avatar key={m.name} className="size-7 ring-2 ring-white">
                  <AvatarImage src={m.avatar} alt={m.name} />
                  <AvatarFallback className="bg-blue-100 text-[10px] font-medium text-blue-700">
                    {getInitials(m.name)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            {extra > 0 && (
              <span className="ml-2 text-xs text-muted-foreground">+{extra}</span>
            )}
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/admin/guruhlar/${group.id}`}>
              Batafsil <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function GuruhlarPage() {
  const [query, setQuery] = React.useState("");
  const [course, setCourse] = React.useState("all");
  const [teacher, setTeacher] = React.useState("all");
  const [status, setStatus] = React.useState("all");

  const faolCount = groups.filter((g) => g.status === "Faol").length;
  const yangiCount = groups.filter((g) => g.status === "Boshlanmagan").length;

  const filtered = groups.filter((g) => {
    const q = query.trim().toLowerCase();
    if (
      q &&
      !g.name.toLowerCase().includes(q) &&
      !g.courseTitle.toLowerCase().includes(q)
    )
      return false;
    if (course !== "all" && g.courseSlug !== course) return false;
    if (teacher !== "all" && g.teacherId !== teacher) return false;
    if (status !== "all" && g.status !== status) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Guruhlar</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Jami {groups.length} ta guruh — {faolCount} ta faol, {yangiCount} ta yangi
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/guruhlar/yangi">
            <Plus data-icon="inline-start" /> Guruh yaratish
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Guruh nomi yoki kursi..."
            className="bg-white pl-9"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex">
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger className="w-full bg-white lg:w-44">
              <SelectValue placeholder="Barcha kurslar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha kurslar</SelectItem>
              {courses.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={teacher} onValueChange={setTeacher}>
            <SelectTrigger className="w-full bg-white lg:w-48">
              <SelectValue placeholder="Barcha o'qituvchilar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha o&apos;qituvchilar</SelectItem>
              {teachers.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full bg-white lg:w-40">
              <SelectValue placeholder="Barcha holatlar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha holatlar</SelectItem>
              <SelectItem value="Faol">Faol</SelectItem>
              <SelectItem value="Boshlanmagan">Boshlanmagan</SelectItem>
              <SelectItem value="Tugagan">Tugagan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="rounded-xl shadow-xs">
          <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
            <Search className="size-8 text-muted-foreground/50" />
            <p className="text-sm font-medium text-slate-900">Guruh topilmadi</p>
            <p className="text-sm text-muted-foreground">
              Qidiruv yoki filtrlarni o&apos;zgartirib ko&apos;ring.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((g) => (
            <GroupCard key={g.id} group={g} />
          ))}
        </div>
      )}
    </div>
  );
}
