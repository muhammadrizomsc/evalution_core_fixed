import { useState } from "react";
import { CheckCircle2, Download, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StudentsTable } from "@/pages/admin/students-table";
import { api } from "@/lib/api";

export function TalabalarPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await api.post("/admin/students", {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        phone: data.get("phone") || undefined,
        password: data.get("password"),
      });
      setSuccess(true);
      form.reset();
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 1500);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Xatolik yuz berdi. Qayta urinib ko'ring.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Talabalar
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Barcha ro&apos;yxatdan o&apos;tgan talabalar
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download data-icon="inline-start" />
            Eksport
          </Button>
          <Button onClick={() => { setOpen(true); setSuccess(false); setError(null); }}>
            <Plus data-icon="inline-start" />
            Talaba qo&apos;shish
          </Button>
        </div>
      </div>

      <StudentsTable />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Yangi talaba qo&apos;shish</DialogTitle>
            <DialogDescription>
              Talabaning asosiy ma&apos;lumotlarini kiriting.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="s-firstName">
                  Ism <span className="text-destructive">*</span>
                </Label>
                <Input id="s-firstName" name="firstName" placeholder="Aziz" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s-lastName">
                  Familiya <span className="text-destructive">*</span>
                </Label>
                <Input id="s-lastName" name="lastName" placeholder="Karimov" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input id="s-email" name="email" type="email" placeholder="aziz@example.uz" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-phone">Telefon</Label>
              <Input id="s-phone" name="phone" type="tel" placeholder="+998 90 123 45 67" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-password">
                Parol <span className="text-destructive">*</span>
              </Label>
              <Input id="s-password" name="password" type="password" placeholder="Kamida 8 belgi" required minLength={8} />
            </div>

            {success && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700">
                <CheckCircle2 className="size-4 shrink-0" />
                Talaba muvaffaqiyatli qo&apos;shildi!
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
              <Button type="submit" disabled={loading}>
                {loading ? "Saqlanmoqda..." : "Saqlash"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
