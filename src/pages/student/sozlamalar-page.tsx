import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Globe,
  Camera,
  Trash2,
  Monitor,
  Smartphone,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Tab = "profil" | "bildirishnomalar" | "xavfsizlik" | "til";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "profil", label: "Profil", icon: User },
  { id: "bildirishnomalar", label: "Bildirishnomalar", icon: Bell },
  { id: "xavfsizlik", label: "Xavfsizlik", icon: Shield },
  { id: "til", label: "Til va mintaqa", icon: Globe },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
        checked ? "bg-blue-600" : "bg-slate-200"
      )}
    >
      <span className={cn(
        "pointer-events-none inline-block size-5 rounded-full bg-white shadow-lg transition-transform",
        checked ? "translate-x-5" : "translate-x-0"
      )} />
    </button>
  );
}

const notifications = [
  { key: "dars", label: "Dars eslatmasi", desc: "Dars boshlanishidan 1 soat oldin eslatma", default: true },
  { key: "baho", label: "Yangi baho qo'yilganda", desc: "Imtihon yoki vazifa baholanganda xabar", default: true },
  { key: "tolov", label: "To'lov eslatmasi", desc: "To'lov muddatidan 3 kun oldin eslatma", default: true },
  { key: "imtihon", label: "Imtihon e'lonlari", desc: "Yangi imtihon belgilanganda xabar", default: true },
  { key: "yangilik", label: "Markaz yangiliklari", desc: "Tadbirlar va yangi kurslar haqida", default: false },
];

const sessions = [
  { device: "Redmi Note 13 · Chrome", location: "Toshkent · Bugun 08:45", icon: Smartphone, current: true },
  { device: "Acer Aspire · Firefox", location: "Toshkent · Kecha 19:12", icon: Monitor, current: false },
];

export function SozlamalarPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profil");
  const [notifState, setNotifState] = useState<Record<string, boolean>>(
    Object.fromEntries(notifications.map((n) => [n.key, n.default]))
  );
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sozlamalar</h1>
        <p className="mt-1 text-sm text-slate-500">
          Hisobingiz, bildirishnomalar va xavfsizlik sozlamalari.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <nav className="flex lg:w-48 lg:flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-left",
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <tab.icon className="size-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 space-y-6">
          {activeTab === "profil" && (
            <>
              <Card className="rounded-xl border-slate-200 shadow-xs">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-slate-900">Profil rasmi</h2>
                  <p className="mt-1 text-sm text-slate-500">Mentorlar va boshqa o'quvchilar sizni shunday ko'radi</p>
                  <div className="mt-4 flex items-center gap-4">
                    <Avatar className="size-16">
                      <AvatarImage src="https://i.pravatar.cc/150?img=11" />
                      <AvatarFallback>BT</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs text-slate-500 mb-2">JPG yoki PNG · Max 2 MB</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Camera className="mr-1.5 size-3.5" />
                          Rasmni o'zgartirish
                        </Button>
                        <Button variant="outline" size="sm" className="text-slate-500">
                          <Trash2 className="mr-1.5 size-3.5" />
                          O'chirish
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl border-slate-200 shadow-xs">
                <CardContent className="p-6 space-y-5">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Shaxsiy ma'lumotlar</h2>
                    <p className="mt-1 text-sm text-slate-500">Telefon raqamingiz o'zgargan bo'lsa, yangilab qo'ying</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Ism</Label>
                      <Input defaultValue="Bobur" />
                    </div>
                    <div className="space-y-2">
                      <Label>Familiya</Label>
                      <Input defaultValue="Tojiev" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue="bobur@example.uz" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label>Telefon</Label>
                      <Input defaultValue="+998 90 123 45 67" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Manzil</Label>
                    <Input defaultValue="Toshkent sh., Chilonzor tumani, 19-mavze" />
                  </div>
                  <div className="space-y-2">
                    <Label>Talaba ID</Label>
                    <Input defaultValue="ST-0123" disabled className="bg-slate-50" />
                    <p className="text-xs text-slate-400">Talaba ID tizim tomonidan beriladi va o'zgartirilmaydi.</p>
                  </div>
                  <div className="flex justify-end">
                    <Button>Saqlash</Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "bildirishnomalar" && (
            <Card className="rounded-xl border-slate-200 shadow-xs">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Bildirishnoma sozlamalari</h2>
                  <p className="mt-1 text-sm text-slate-500">Qaysi voqealar haqida xabardor bo'lasiz</p>
                </div>
                <div className="space-y-1">
                  {notifications.map((n) => (
                    <div key={n.key} className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{n.label}</p>
                        <p className="text-xs text-slate-500">{n.desc}</p>
                      </div>
                      <Toggle
                        checked={notifState[n.key]}
                        onChange={(v) => setNotifState({ ...notifState, [n.key]: v })}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "xavfsizlik" && (
            <>
              <Card className="rounded-xl border-slate-200 shadow-xs">
                <CardContent className="p-6 space-y-5">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Parolni o'zgartirish</h2>
                    <p className="mt-1 text-sm text-slate-500">Hisobingizni himoyalash uchun kuchli parol tanlang</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Joriy parol</Label>
                      <Input type="password" defaultValue="12345678" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Yangi parol</Label>
                        <Input type="password" placeholder="Kamida 8 ta belgi" />
                      </div>
                      <div className="space-y-2">
                        <Label>Tasdiqlash</Label>
                        <Input type="password" placeholder="Yangi parol qaytadan" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Parolni yangilash</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl border-slate-200 shadow-xs">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Aktiv sessiyalar</h2>
                      <p className="mt-1 text-sm text-slate-500">Hisobingizga ulangan qurilmalar</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                      Hammasidan chiqish
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {sessions.map((s, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100">
                            <s.icon className="size-5 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {s.device}
                              {s.current && (
                                <Badge className="ml-2 bg-blue-50 text-blue-700 shadow-none">Joriy</Badge>
                              )}
                            </p>
                            <p className="text-xs text-slate-500">{s.location}</p>
                          </div>
                        </div>
                        {!s.current && (
                          <button className="text-sm font-medium text-slate-500 hover:text-slate-900">
                            Chiqish
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "til" && (
            <Card className="rounded-xl border-slate-200 shadow-xs">
              <CardContent className="p-6 space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Til va mintaqa</h2>
                  <p className="mt-1 text-sm text-slate-500">Interfeys tili va vaqt mintaqasi</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Interfeys tili</Label>
                    <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs">
                      <option>O'zbek</option>
                      <option>Русский</option>
                      <option>English</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Vaqt mintaqasi</Label>
                    <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs">
                      <option>Toshkent (UTC+5)</option>
                      <option>Moskva (UTC+3)</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Qorong'u rejim</p>
                    <p className="text-xs text-slate-500">Interfeysni qorong'u temada ko'rsatish</p>
                  </div>
                  <Toggle checked={darkMode} onChange={setDarkMode} />
                </div>
                <div className="flex justify-end">
                  <Button>Saqlash</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
