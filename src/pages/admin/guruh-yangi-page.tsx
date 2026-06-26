import * as React from "react";
import { Link } from "react-router-dom";
import { Check, CheckCircle2, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { courses, teachers, getInitials } from "@/lib/data";

const weekDays = [
  { short: "Du", full: "Dushanba" },
  { short: "Se", full: "Seshanba" },
  { short: "Cho", full: "Chorshanba" },
  { short: "Pa", full: "Payshanba" },
  { short: "Ju", full: "Juma" },
  { short: "Sha", full: "Shanba" },
  { short: "Ya", full: "Yakshanba" },
];

const timeSlots = ["09:00", "10:30", "11:00", "13:00", "14:00", "15:30", "17:30", "19:00"];

const extras = [
  { id: "tahsil", label: "Doimiy tahsil imkoniyati" },
  { id: "sertifikat", label: "Sertifikat berish" },
  { id: "mentor", label: "Mentor bilan birga ishlash" },
  { id: "ish", label: "Ish topishga yordam" },
];

export function YangiGuruhPage() {
  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState("yangi");
  const [course, setCourse] = React.useState("");
  const [teacherId, setTeacherId] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [duration, setDuration] = React.useState("3");
  const [days, setDays] = React.useState<string[]>(["Du", "Cho", "Ju"]);
  const [time, setTime] = React.useState("09:00");
  const [room, setRoom] = React.useState("1");
  const [format, setFormat] = React.useState("offline");
  const [maxStudents, setMaxStudents] = React.useState("20");
  const [minStudents, setMinStudents] = React.useState("8");
  const [price, setPrice] = React.useState("490000");
  const [checkedExtras, setCheckedExtras] = React.useState<string[]>([
    "tahsil",
    "sertifikat",
  ]);
  const [created, setCreated] = React.useState(false);

  const teacher = teachers.find((t) => t.id === teacherId);

  const isValid =
    name.trim() !== "" &&
    course !== "" &&
    teacherId !== "" &&
    startDate !== "" &&
    days.length > 0 &&
    time !== "" &&
    maxStudents.trim() !== "" &&
    price.trim() !== "";

  function toggleDay(day: string) {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  }

  function toggleExtra(id: string) {
    setCheckedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );
  }

  const orderedDays = weekDays
    .filter((d) => days.includes(d.short))
    .map((d) => d.short);

  if (created) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="rounded-xl shadow-xs">
          <CardContent className="flex flex-col items-center gap-4 py-14 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="size-8 text-emerald-500" />
            </div>
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-slate-900">
                Guruh muvaffaqiyatli yaratildi!
              </h1>
              <p className="text-sm text-muted-foreground">
                &quot;{name}&quot; guruhi tizimga qo&apos;shildi. Endi talabalarni
                guruhga biriktirishingiz mumkin.
              </p>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <Button asChild>
                <Link to="/admin/guruhlar">Guruhlar ro&apos;yxatiga qaytish</Link>
              </Button>
              <Button variant="outline" onClick={() => setCreated(false)}>
                Yana guruh yaratish
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
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
            <BreadcrumbPage>Yangi guruh</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Yangi guruh yaratish</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Yangi guruh asosiy ma&apos;lumotlarini to&apos;liq kiriting
        </p>
      </div>

      <Card className="rounded-xl shadow-xs">
        <CardHeader>
          <CardTitle className="text-base">Asosiy ma&apos;lumotlar</CardTitle>
          <CardDescription>Guruh nomi, kursi va o&apos;qituvchini tanlash</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="group-name">
                Guruh nomi <span className="text-red-500">*</span>
              </Label>
              <Input
                id="group-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masalan: Frontend-03"
              />
              <p className="text-xs text-muted-foreground">K-raqam + segment raqami</p>
            </div>
            <div className="space-y-2">
              <Label>Boshlang&apos;ich holat</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yangi">Yangi (boshlanmagan)</SelectItem>
                  <SelectItem value="faol">Faol</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>
                Kurs <span className="text-red-500">*</span>
              </Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Kursni tanlang..." />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.slug} value={c.slug}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>
                O&apos;qituvchi <span className="text-red-500">*</span>
              </Label>
              <Select value={teacherId} onValueChange={setTeacherId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="O'qituvchini tanlang..." />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {teacher && (
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <Avatar className="size-10">
                <AvatarImage src={teacher.avatar} alt={teacher.name} />
                <AvatarFallback className="bg-blue-100 text-xs font-medium text-blue-700">
                  {getInitials(teacher.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">{teacher.name}</p>
                <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                  <span>{teacher.role}</span>
                  <span>· {teacher.courses} ta faol kurs</span>
                  <span className="inline-flex items-center gap-0.5">
                    · <Users className="size-3" /> {teacher.students} talaba
                  </span>
                  <span className="inline-flex items-center gap-0.5">
                    · <Star className="size-3 fill-amber-400 text-amber-400" />{" "}
                    {teacher.rating}
                  </span>
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="group-desc">Tavsif</Label>
            <Textarea
              id="group-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Guruh haqida qisqacha ma'lumot..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-xs">
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Barcha majburiy maydonlarni to&apos;ldiring
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/admin/guruhlar">Bekor qilish</Link>
            </Button>
            <Button variant="outline">Qoralama saqlash</Button>
            <Button disabled={!isValid} onClick={() => setCreated(true)}>
              <Check data-icon="inline-start" /> Guruhni yaratish
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-xs">
        <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="start-date">
              Boshlanish sanasi <span className="text-red-500">*</span>
            </Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">Tugash sanasi</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Davomiyligi</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["2", "3", "4", "5", "6"].map((m) => (
                  <SelectItem key={m} value={m}>
                    {m} oy
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-xs">
        <CardHeader>
          <CardTitle className="text-base">Dars jadvali</CardTitle>
          <CardDescription>
            Hafta kunlari va dars vaqtini, xona va formatni belgilang
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>
              Hafta kunlari <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {weekDays.map((d) => {
                const active = days.includes(d.short);
                return (
                  <button
                    key={d.short}
                    type="button"
                    onClick={() => toggleDay(d.short)}
                    className={`flex flex-col items-center gap-0.5 rounded-lg border px-1 py-2.5 text-sm transition-colors ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-border bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-semibold">{d.short}</span>
                    <span
                      className={`text-[10px] ${active ? "text-blue-100" : "text-muted-foreground"}`}
                    >
                      {d.full}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Eng kamida 1 ta kun tanlang.{" "}
              {orderedDays.length > 0
                ? `Hozir tanlangan: ${orderedDays.join(", ")}`
                : "Hali kun tanlanmagan"}
            </p>
          </div>

          <div className="space-y-2">
            <Label>
              Dars vaqti <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((t) => {
                const active = time === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-border bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Dars vaqti tanlandi: {time}. Har dars 2 soat davom etadi.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Xona</Label>
              <Select value={room} onValueChange={setRoom}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["1", "2", "3", "4", "5"].map((r) => (
                    <SelectItem key={r} value={r}>
                      Xona {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="offline">Offline (yo&apos;lda)</SelectItem>
                  <SelectItem value="onlayn">Onlayn</SelectItem>
                  <SelectItem value="aralash">Aralash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-xs">
        <CardHeader>
          <CardTitle className="text-base">Talabalar va narx</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="max-students">
                Maks. talabalar soni <span className="text-red-500">*</span>
              </Label>
              <Input
                id="max-students"
                type="number"
                value={maxStudents}
                onChange={(e) => setMaxStudents(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">8-30 oralig&apos;ida</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-students">Min. talabalar soni</Label>
              <Input
                id="min-students"
                type="number"
                value={minStudents}
                onChange={(e) => setMinStudents(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">
                Oylik narx (so&apos;m) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-900">
              Qo&apos;shimcha imkoniyatlar
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {extras.map((e) => (
                <label
                  key={e.id}
                  className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700"
                >
                  <Checkbox
                    checked={checkedExtras.includes(e.id)}
                    onCheckedChange={() => toggleExtra(e.id)}
                  />
                  {e.label}
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
