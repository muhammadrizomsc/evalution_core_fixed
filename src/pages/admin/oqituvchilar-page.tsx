import * as React from "react";
import { AlertCircle, CheckCircle2, Plus, Search, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { categoryColors, getInitials, type Category } from "@/lib/data";
import { api } from "@/lib/api";

interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  bio?: string;
  specialization?: string;
  avatar?: string;
  totalCourses?: number;
  totalStudents?: number;
  rating?: number;
  // Support legacy shape from mock
  name?: string;
  role?: string;
  category?: Category;
  courses?: number;
  students?: number;
}

function getName(t: Instructor) {
  return t.name ?? `${t.firstName ?? ""} ${t.lastName ?? ""}`.trim();
}

export function OqituvchilarPage() {
  const [query, setQuery] = React.useState("");
  const [instructors, setInstructors] = React.useState<Instructor[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchInstructors = React.useCallback(() => {
    setLoading(true);
    api
      .get<{ data: { items: Instructor[]; total: number } }>("/admin/instructors?limit=50")
      .then((res) => {
        setInstructors(res.data.data.items ?? []);
        setTotal(res.data.data.total ?? 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  const filtered = instructors.filter((t) => {
    const q = query.trim().toLowerCase();
    const name = getName(t);
    return q === "" || name.toLowerCase().includes(q) || (t.specialization ?? t.role ?? "").toLowerCase().includes(q);
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await api.post("/admin/instructors", {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        phone: data.get("phone") || undefined,
        bio: data.get("bio") || undefined,
        specialization: data.get("specialization") || undefined,
      });
      setSuccess(true);
      form.reset();
      fetchInstructors();
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 1500);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Xatolik yuz berdi.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            O&apos;qituvchilar
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Jami {total} ta o&apos;qituvchi
          </p>
        </div>
        <Button onClick={() => { setOpen(true); setSuccess(false); setError(null); }}>
          <Plus data-icon="inline-start" />
          O&apos;qituvchi qo&apos;shish
        </Button>
      </div>


      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O'qituvchi qidiring (ism, lavozim)..."
            className="pl-9"
          />
        </div>
      </div>


      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col items-center gap-3">
              <Skeleton className="size-16 rounded-full" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white py-16 text-center text-sm text-slate-500 shadow-xs">
          Hech qanday o&apos;qituvchi topilmadi
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((t) => {
            const name = getName(t);
            const category = t.category ?? ("Frontend" as Category);
            const role = t.specialization ?? t.role ?? "O'qituvchi";
            const courses = t.totalCourses ?? t.courses ?? 0;
            const students = t.totalStudents ?? t.students ?? 0;
            const rating = t.rating ?? 0;
            return (
              <div
                key={t.id}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm"
              >
                <div className="flex flex-col items-center text-center">
                  <Avatar className="size-16">
                    {t.avatar ? <AvatarImage src={t.avatar} alt={name} /> : null}
                    <AvatarFallback className="bg-blue-100 text-lg font-semibold text-blue-700">
                      {getInitials(name)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="mt-3 font-semibold text-slate-900">{name}</h2>
                  <p className="mt-0.5 text-sm font-medium text-blue-600">{role}</p>
                  {categoryColors[category] && (
                    <Badge className={`mt-2 ${categoryColors[category]}`}>
                      {category}
                    </Badge>
                  )}
                  {t.bio && (
                    <p className="mt-3 line-clamp-2 text-sm text-slate-500">{t.bio}</p>
                  )}
                </div>
                <Separator className="mt-4" />
                <div className="mt-4 grid grid-cols-3 text-center">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{courses}</p>
                    <p className="mt-0.5 text-xs text-slate-500">Kurs</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{students}</p>
                    <p className="mt-0.5 text-xs text-slate-500">Talaba</p>
                  </div>
                  <div>
                    <p className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-slate-900">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      {rating}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">Reyting</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>O&apos;qituvchi qo&apos;shish</DialogTitle>
            <DialogDescription>
              Yangi o&apos;qituvchining ma&apos;lumotlarini kiriting.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="i-firstName">
                  Ism <span className="text-destructive">*</span>
                </Label>
                <Input id="i-firstName" name="firstName" placeholder="Akmal" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="i-lastName">
                  Familiya <span className="text-destructive">*</span>
                </Label>
                <Input id="i-lastName" name="lastName" placeholder="Karimov" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="i-email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input id="i-email" name="email" type="email" placeholder="akmal@example.uz" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="i-phone">Telefon</Label>
              <Input id="i-phone" name="phone" type="tel" placeholder="+998 90 123 45 67" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="i-specialization">Mutaxassislik</Label>
              <Input id="i-specialization" name="specialization" placeholder="React Developer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="i-bio">Bio</Label>
              <Textarea id="i-bio" name="bio" placeholder="Qisqacha tanishuv..." className="min-h-20" />
            </div>

            {success && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700">
                <CheckCircle2 className="size-4 shrink-0" />
                O&apos;qituvchi muvaffaqiyatli qo&apos;shildi!
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
                <AlertCircle className="size-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Bekor qilish
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saqlanmoqda..." : "Saqlash"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
