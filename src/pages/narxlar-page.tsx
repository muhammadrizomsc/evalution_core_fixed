import { Link } from "react-router-dom";
import { Check, X, Star, Percent, Users, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const plans = [
  {
    name: "Boshlovchi",
    price: "390 000",
    period: "oyiga",
    description: "Dasturlash va dizayn asoslarini o'rganish uchun",
    popular: false,
    features: [
      { label: "Video darslar", included: true },
      { label: "Amaliy topshiriqlar", included: true },
      { label: "Mentor qo'llab-quvvatlashi", included: false },
      { label: "Portfolio loyihalar", included: false },
      { label: "Ishga joylashish yordami", included: false },
      { label: "Sertifikat", included: true },
    ],
  },
  {
    name: "Mashhur",
    price: "590 000",
    period: "oyiga",
    description: "Professional darajaga chiqish uchun eng optimal tanlov",
    popular: true,
    features: [
      { label: "Video darslar", included: true },
      { label: "Amaliy topshiriqlar", included: true },
      { label: "Mentor qo'llab-quvvatlashi", included: true },
      { label: "Portfolio loyihalar", included: true },
      { label: "Ishga joylashish yordami", included: false },
      { label: "Sertifikat", included: true },
    ],
  },
  {
    name: "Kasbiy",
    price: "890 000",
    period: "oyiga",
    description: "To'liq qo'llab-quvvatlash va kasbiy rivojlanish",
    popular: false,
    features: [
      { label: "Video darslar", included: true },
      { label: "Amaliy topshiriqlar", included: true },
      { label: "Mentor qo'llab-quvvatlashi", included: true },
      { label: "Portfolio loyihalar", included: true },
      { label: "Ishga joylashish yordami", included: true },
      { label: "Sertifikat", included: true },
    ],
  },
];

const discounts = [
  { icon: Percent, label: "To'liq to'lov", desc: "Kurs uchun bir marta to'lov qilsangiz", value: "-15%" },
  { icon: Users, label: "Aka-uka / opa-singillar", desc: "Bir oiladan ikki talaba bo'lsa", value: "-10%" },
  { icon: Star, label: "Talabalar uchun", desc: "Oliy ta'lim talabalari uchun", value: "-10%" },
  { icon: CreditCard, label: "Qayta o'qish", desc: "Ikkinchi kursga ro'yxatdan o'tsangiz", value: "-5%" },
];

const comparison = [
  { feature: "Video darslar", boshlovchi: true, mashhur: true, kasbiy: true },
  { feature: "Amaliy topshiriqlar", boshlovchi: true, mashhur: true, kasbiy: true },
  { feature: "Mentor yordami", boshlovchi: false, mashhur: true, kasbiy: true },
  { feature: "Kod review", boshlovchi: false, mashhur: true, kasbiy: true },
  { feature: "Portfolio loyihalar", boshlovchi: false, mashhur: true, kasbiy: true },
  { feature: "Guruh mashg'ulotlari", boshlovchi: false, mashhur: false, kasbiy: true },
  { feature: "Ishga joylashish yordami", boshlovchi: false, mashhur: false, kasbiy: true },
  { feature: "CV tayyorlash", boshlovchi: false, mashhur: false, kasbiy: true },
  { feature: "Sertifikat", boshlovchi: true, mashhur: true, kasbiy: true },
];

function CheckIcon() {
  return <Check className="mx-auto size-4 text-emerald-600" />;
}
function XIcon() {
  return <X className="mx-auto size-4 text-slate-300" />;
}

export function NarxlarPage() {
  return (
    <div className="space-y-16 py-12">
      <div className="text-center">
        <Badge variant="secondary" className="mb-4">Narxlar</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          O'zingizga mos rejani tanlang
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
          Barcha rejalar sertifikat va amaliy mashg'ulotlarni o'z ichiga oladi. Eng maqbul narxlarda sifatli ta'lim.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 pt-5 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative overflow-visible rounded-2xl shadow-xs ${plan.popular ? "border-2 border-blue-500 shadow-blue-100" : "border-slate-200"}`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                <Badge className="bg-blue-600 text-white shadow-md whitespace-nowrap">Eng mashhur</Badge>
              </div>
            )}
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                <span className="ml-1 text-sm text-slate-500">so'm / {plan.period}</span>
              </div>
              <Button className={`mt-6 w-full ${plan.popular ? "" : "variant-outline"}`} variant={plan.popular ? "default" : "outline"} asChild>
                <Link to="/kurslar">Boshlash</Link>
              </Button>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex items-center gap-2.5 text-sm">
                    {f.included ? (
                      <Check className="size-4 text-emerald-600" />
                    ) : (
                      <X className="size-4 text-slate-300" />
                    )}
                    <span className={f.included ? "text-slate-700" : "text-slate-400"}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mx-auto max-w-3xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">Chegirmalar</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {discounts.map((d) => (
            <Card key={d.label} className="rounded-xl border-slate-200 shadow-xs">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <d.icon className="size-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{d.label}</p>
                  <p className="text-sm text-slate-500">{d.desc}</p>
                </div>
                <span className="text-xl font-bold text-emerald-600">{d.value}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">Rejalarni solishtirish</h2>
        <Card className="rounded-xl border-slate-200 shadow-xs overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Xususiyat</TableHead>
                <TableHead className="text-center">Boshlovchi</TableHead>
                <TableHead className="text-center">Mashhur</TableHead>
                <TableHead className="text-center">Kasbiy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparison.map((row) => (
                <TableRow key={row.feature}>
                  <TableCell className="font-medium">{row.feature}</TableCell>
                  <TableCell>{row.boshlovchi ? <CheckIcon /> : <XIcon />}</TableCell>
                  <TableCell>{row.mashhur ? <CheckIcon /> : <XIcon />}</TableCell>
                  <TableCell>{row.kasbiy ? <CheckIcon /> : <XIcon />}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <div className="mx-auto max-w-2xl rounded-2xl bg-slate-900 p-8 text-center text-white sm:p-12">
        <h2 className="text-2xl font-bold">Savolingiz bormi?</h2>
        <p className="mt-2 text-slate-300">
          Bepul konsultatsiya oling — sizga eng mos rejani tanlashga yordam beramiz.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="secondary" size="lg" asChild>
            <Link to="/aloqa">Bog'lanish</Link>
          </Button>
          <Button variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800" asChild>
            <Link to="/kurslar">Kurslarni ko'rish</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
