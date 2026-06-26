import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCourse, getTeacher, formatPrice } from "@/lib/data";
import { cn } from "@/lib/utils";

type PaymentMethod = "payme" | "click" | "karta";

const methods: { id: PaymentMethod; label: string; desc: string; badge: string }[] = [
  { id: "payme", label: "Payme", desc: "Payme ilovasi orqali tez to'lov", badge: "Payme" },
  { id: "click", label: "Click", desc: "Click orqali to'lov", badge: "Click" },
  { id: "karta", label: "Plastik karta", desc: "UzCard / Humo / Visa", badge: "Karta" },
];

export function TolovCheckoutPage() {
  const { slug } = useParams<{ slug: string }>();
  const course = getCourse(slug ?? "");
  const [method, setMethod] = useState<PaymentMethod>("payme");
  const [saveCard, setSaveCard] = useState(false);

  if (!course) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-medium text-slate-500">Kurs topilmadi</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/student/katalog">Katalogga qaytish</Link>
        </Button>
      </div>
    );
  }

  const teacher = getTeacher(course.teacherId);
  const discount = course.oldPrice ? course.oldPrice - course.price : 0;

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/student/katalog" className="hover:text-slate-900">Katalog</Link>
        <span>/</span>
        <Link to={`/kurslar/${course.slug}`} className="hover:text-slate-900">{course.title}</Link>
        <span>/</span>
        <span className="font-medium text-slate-900">To'lov</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="rounded-xl border-slate-200 shadow-xs">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-slate-900">To'lov usulini tanlang</h2>
              <div className="mt-4 space-y-3">
                {methods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors",
                      method === m.id
                        ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
                        : "border-slate-200 hover:bg-slate-50"
                    )}
                  >
                    <div className={cn(
                      "flex size-5 items-center justify-center rounded-full border-2",
                      method === m.id ? "border-blue-600" : "border-slate-300"
                    )}>
                      {method === m.id && <div className="size-2.5 rounded-full bg-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className={cn("text-sm font-semibold", method === m.id ? "text-blue-700" : "text-slate-900")}>
                        {m.label}
                      </p>
                      <p className="text-xs text-slate-500">{m.desc}</p>
                    </div>
                    <span className="rounded-lg border px-3 py-1 text-xs font-medium text-slate-600">
                      {m.badge}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-slate-200 shadow-xs">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-slate-900">Karta ma'lumotlari</h2>
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label>Karta raqami</Label>
                  <Input placeholder="8600 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Amal qilish muddati</Label>
                    <Input placeholder="OO/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>SMS kod / CVV</Label>
                    <Input placeholder="•••" type="password" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={saveCard}
                    onClick={() => setSaveCard(!saveCard)}
                    className={cn(
                      "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
                      saveCard ? "bg-blue-600" : "bg-slate-200"
                    )}
                  >
                    <span className={cn(
                      "pointer-events-none inline-block size-5 rounded-full bg-white shadow-lg transition-transform",
                      saveCard ? "translate-x-5" : "translate-x-0"
                    )} />
                  </button>
                  <span className="text-sm text-slate-600">Kartani keyingi to'lovlar uchun saqlash</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24 rounded-xl border-slate-200 shadow-xs">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-slate-900">Buyurtma xulosasi</h2>
              <div className="mt-4 flex items-center gap-3">
                <img src={course.image} alt={course.title} className="size-14 rounded-lg object-cover" />
                <div>
                  <p className="font-semibold text-slate-900">{course.title}</p>
                  <p className="text-xs text-slate-500">{teacher.name}</p>
                </div>
              </div>

              <div className="mt-5 space-y-2 border-t pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Kurs narxi</span>
                  <span className="text-slate-900">{formatPrice(course.oldPrice ?? course.price)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Chegirma</span>
                    <span className="font-medium text-emerald-600">-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between border-t pt-3">
                <span className="font-semibold text-slate-900">Jami</span>
                <span className="text-xl font-bold text-slate-900">{formatPrice(course.price)}</span>
              </div>

              <Button size="lg" className="mt-5 w-full text-base">
                To'lovni tasdiqlash
              </Button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <Lock className="size-3" />
                To'lov xavfsiz himoyalangan. Umrbod kirish.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
