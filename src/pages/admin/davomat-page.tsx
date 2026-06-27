import * as React from "react";
import { Check, X, Clock, CheckCircle2, Users, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  attendanceToday,
  groups,
  getInitials,
  type AttendanceStatus,
} from "@/lib/data";

interface Row {
  studentId: string;
  name: string;
  code: string;
  avatar: string;
  status: AttendanceStatus;
  note: string;
}

const statusButtons: {
  value: AttendanceStatus;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: string;
}[] = [
  {
    value: "keldi",
    label: "Keldi",
    icon: Check,
    active: "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-600",
  },
  {
    value: "kechikdi",
    label: "Kechikdi",
    icon: Clock,
    active: "border-amber-500 bg-amber-500 text-white hover:bg-amber-500",
  },
  {
    value: "kelmadi",
    label: "Kelmadi",
    icon: X,
    active: "border-red-500 bg-red-500 text-white hover:bg-red-500",
  },
];

export function DavomatPage() {
  const [groupId, setGroupId] = React.useState("frontend-01");
  const [date, setDate] = React.useState(() => new Date().toISOString().slice(0, 10));
  const [rows, setRows] = React.useState<Row[]>(() =>
    attendanceToday.map((e) => ({ ...e })),
  );
  const [saved, setSaved] = React.useState(false);
  const savedTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const group = groups.find((g) => g.id === groupId) ?? groups[0];
  const total = group.studentsCount;
  const unlisted = Math.max(total - rows.length, 0); // hisobda "keldi" deb olinadi

  const keldi = rows.filter((r) => r.status === "keldi").length + unlisted;
  const kechikdi = rows.filter((r) => r.status === "kechikdi").length;
  const kelmadi = rows.filter((r) => r.status === "kelmadi").length;
  const percent = total > 0 ? Math.round(((keldi + kechikdi) / total) * 100) : 0;

  function setStatus(studentId: string, status: AttendanceStatus) {
    setRows((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, status } : r)),
    );
  }

  function setNote(studentId: string, note: string) {
    setRows((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, note } : r)),
    );
  }

  function save() {
    setSaved(true);
    if (savedTimer.current) clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setSaved(false), 2500);
  }

  React.useEffect(() => {
    return () => {
      if (savedTimer.current) clearTimeout(savedTimer.current);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Davomat</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Guruhdagi talabalar davomatini saqlang
        </p>
      </div>

      <Card className="rounded-xl shadow-xs">
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Guruh
              </Label>
              <Select value={groupId} onValueChange={setGroupId}>
                <SelectTrigger className="w-full sm:w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.name} ({g.studentsCount} talaba)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="att-date"
                className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
              >
                Sana
              </Label>
              <Input
                id="att-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full sm:w-44"
              />
            </div>
          </div>
          <Button onClick={save}>
            <Check data-icon="inline-start" /> Saqlash
          </Button>
        </CardContent>
      </Card>

      {saved && (
        <Card className="rounded-xl border-emerald-200 bg-emerald-50 shadow-xs">
          <CardContent className="flex items-center gap-2 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle2 className="size-4" />
            Davomat muvaffaqiyatli saqlandi!
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-xl shadow-xs">
          <CardContent className="space-y-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50">
              <Check className="size-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">{percent}%</p>
              <p className="text-sm text-muted-foreground">Bugungi davomat foizi</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-xs">
          <CardContent className="space-y-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50">
              <Users className="size-4 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {keldi} / {total}
              </p>
              <p className="text-sm text-muted-foreground">Kelganlar</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-xs">
          <CardContent className="space-y-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-orange-50">
              <Clock className="size-4 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-500">{kechikdi}</p>
              <p className="text-sm text-muted-foreground">Kechikkanlar</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-xs">
          <CardContent className="space-y-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-red-50">
              <UserX className="size-4 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-500">{kelmadi}</p>
              <p className="text-sm text-muted-foreground">Kelmaganlar</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl py-0 shadow-xs">
        <CardContent className="divide-y p-0">
          {rows.map((r, i) => (
            <div
              key={r.studentId}
              className="flex flex-col gap-3 px-5 py-4 lg:flex-row lg:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <span className="w-6 shrink-0 text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Avatar className="size-9">
                  {r.avatar ? <AvatarImage src={r.avatar} alt={r.name} /> : null}
                  <AvatarFallback className="bg-blue-100 text-xs font-medium text-blue-700">
                    {getInitials(r.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.code}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex shrink-0 items-center gap-1.5">
                  {statusButtons.map((sb) => {
                    const ActiveIcon = sb.icon;
                    const active = r.status === sb.value;
                    return (
                      <button
                        key={sb.value}
                        type="button"
                        onClick={() => setStatus(r.studentId, sb.value)}
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          active
                            ? sb.active
                            : "border-border bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <ActiveIcon className="size-3" />
                        {sb.label}
                      </button>
                    );
                  })}
                </div>
                <Input
                  value={r.note}
                  onChange={(e) => setNote(r.studentId, e.target.value)}
                  placeholder="Izoh (ixtiyoriy)..."
                  className="w-full sm:w-56"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-xs">
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Jami
              </p>
              <p className="text-sm font-semibold text-slate-900">{total} talaba</p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Belgilangan
              </p>
              <p className="text-sm font-semibold text-blue-600">
                {keldi + kechikdi + kelmadi} / {total}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Davomat
              </p>
              <p className="text-sm font-semibold text-blue-600">{percent}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setRows(attendanceToday.map((e) => ({ ...e })))}
            >
              Bekor qilish
            </Button>
            <Button onClick={save}>
              <Check data-icon="inline-start" /> Davomatni saqlash
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
