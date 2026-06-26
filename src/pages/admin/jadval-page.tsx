import * as React from "react";
import { Plus, Download, ChevronLeft, ChevronRight, Check, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { weekLessons, roomsToday, teachers, groups, type Lesson } from "@/lib/data";

const dayHeaders = [
  { label: "Du", date: 24, today: true },
  { label: "Se", date: 25 },
  { label: "Cho", date: 26 },
  { label: "Pa", date: 27 },
  { label: "Ju", date: 28 },
  { label: "Sha", date: 29 },
  { label: "Ya", date: 30 },
];

const hours = Array.from({ length: 12 }, (_, i) => 9 + i); // 09:00 .. 20:00

const colorClasses: Record<Lesson["color"], string> = {
  blue: "bg-blue-50 border-blue-400 text-blue-900",
  green: "bg-green-50 border-green-400 text-green-900",
  purple: "bg-purple-50 border-purple-400 text-purple-900",
  red: "bg-red-50 border-red-400 text-red-900",
  yellow: "bg-yellow-50 border-yellow-400 text-yellow-900",
  violet: "bg-violet-50 border-violet-400 text-violet-900",
  sky: "bg-sky-50 border-sky-400 text-sky-900",
};

function teacherShortName(fullName: string): string {
  const [first, ...rest] = fullName.split(" ");
  return `${first[0]}. ${rest.join(" ")}`;
}

export function JadvalPage() {
  const [view, setView] = React.useState<"kun" | "hafta" | "oy">("hafta");
  const [teacher, setTeacher] = React.useState("all");
  const [group, setGroup] = React.useState("all");
  const [room, setRoom] = React.useState("all");

  const rooms = Array.from(new Set(weekLessons.map((l) => l.room))).sort();

  const filtered = weekLessons.filter((l) => {
    if (teacher !== "all" && l.teacherShort !== teacher) return false;
    if (group !== "all" && l.groupName !== group) return false;
    if (room !== "all" && l.room !== room) return false;
    return true;
  });

  function lessonsAt(day: number, hour: number): Lesson[] {
    return filtered.filter(
      (l) => l.day === day && parseInt(l.start.split(":")[0], 10) === hour,
    );
  }

  const busyCount = roomsToday.filter((r) => r.busy).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dars jadvali</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Haftalik darslar va xonalar taqsimoti
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download data-icon="inline-start" /> Eksport
          </Button>
          <Button>
            <Plus data-icon="inline-start" /> Dars qo&apos;shish
          </Button>
        </div>
      </div>

      <Card className="rounded-xl shadow-xs">
        <CardContent className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex w-fit items-center rounded-lg bg-slate-100 p-0.5">
            {(["kun", "hafta", "oy"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`rounded-md px-3.5 py-1.5 text-sm font-medium capitalize transition-colors ${
                  view === v
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-muted-foreground hover:text-slate-900"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" size="icon-sm" aria-label="Oldingi hafta">
              <ChevronLeft />
            </Button>
            <span className="text-sm font-semibold text-slate-900">
              24-noy — 30-noy, 2025
            </span>
            <Button variant="ghost" size="icon-sm" aria-label="Keyingi hafta">
              <ChevronRight />
            </Button>
            <Button variant="outline" size="sm">
              Bugun
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Select value={teacher} onValueChange={setTeacher}>
              <SelectTrigger className="w-full xl:w-44">
                <SelectValue placeholder="Barcha o'qituvchilar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha o&apos;qituvchilar</SelectItem>
                {teachers.map((t) => (
                  <SelectItem key={t.id} value={teacherShortName(t.name)}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={group} onValueChange={setGroup}>
              <SelectTrigger className="w-full xl:w-40">
                <SelectValue placeholder="Barcha guruhlar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha guruhlar</SelectItem>
                {groups.map((g) => (
                  <SelectItem key={g.id} value={g.name}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={room} onValueChange={setRoom}>
              <SelectTrigger className="w-full xl:w-36">
                <SelectValue placeholder="Barcha xonalar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha xonalar</SelectItem>
                {rooms.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl py-0 shadow-xs">
        <CardContent className="overflow-x-auto p-0">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[56px_repeat(7,1fr)] border-b">
              <div />
              {dayHeaders.map((d) => (
                <div
                  key={d.label}
                  className={`border-l px-2 py-3 text-center ${
                    d.today ? "bg-blue-50" : ""
                  }`}
                >
                  <p
                    className={`text-[11px] font-medium tracking-wide uppercase ${
                      d.today ? "text-blue-600" : "text-muted-foreground"
                    }`}
                  >
                    {d.label}
                    {d.today ? " - Bugun" : ""}
                  </p>
                  <p
                    className={`mt-0.5 text-lg font-semibold ${
                      d.today ? "text-blue-600" : "text-slate-900"
                    }`}
                  >
                    {d.date}
                  </p>
                </div>
              ))}
            </div>

            {hours.map((hour) => (
              <div
                key={hour}
                className="grid grid-cols-[56px_repeat(7,1fr)] border-b last:border-b-0"
              >
                <div className="px-2 py-2 text-right text-[11px] text-muted-foreground">
                  {String(hour).padStart(2, "0")}:00
                </div>
                {dayHeaders.map((d, dayIdx) => {
                  const lessons = lessonsAt(dayIdx, hour);
                  return (
                    <div
                      key={d.label}
                      className={`min-h-13 space-y-1 border-l p-1 ${
                        d.today ? "bg-blue-50/30" : ""
                      }`}
                    >
                      {lessons.map((l) => (
                        <div
                          key={l.id}
                          className={`rounded-md border-l-3 px-2 py-1.5 ${colorClasses[l.color]}`}
                        >
                          <p className="truncate text-xs font-semibold">{l.groupName}</p>
                          <p className="truncate text-[11px] opacity-70">
                            {l.teacherShort} · {l.room}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-xs">
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-semibold text-slate-900">
              Xonalar holati — bugun, 24-noyabr
            </h2>
            <p className="text-sm text-muted-foreground">
              {roomsToday.length} xonadan {busyCount} tasi band
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {roomsToday.map((r) => (
              <div
                key={r.name}
                className={`flex items-center gap-3 rounded-lg border p-3 ${
                  r.busy
                    ? "border-rose-200 bg-rose-50"
                    : "border-emerald-200 bg-emerald-50"
                }`}
              >
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-md ${
                    r.busy ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  <DoorOpen className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{r.name}</p>
                  <p
                    className={`flex items-center gap-1 truncate text-xs ${
                      r.busy ? "text-rose-600" : "text-emerald-600"
                    }`}
                  >
                    {!r.busy && <Check className="size-3" />}
                    {r.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
