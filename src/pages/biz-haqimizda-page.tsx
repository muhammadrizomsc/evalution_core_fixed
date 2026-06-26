import { Link } from "react-router-dom";
import {
  Award,
  Building2,
  Eye,
  GraduationCap,
  Target,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { teachers } from "@/lib/data";

const milestones = [
  {
    year: "2015",
    title: "Boshlanish",
    text: "Kichik ofisda 2 ta o'qituvchi va 15 ta talaba bilan birinchi JavaScript kursimizni ochdik.",
  },
  {
    year: "2017",
    title: "Birinchi bitiruvchilar",
    text: "100 dan ortiq bitiruvchimiz IT kompaniyalarga ishga joylashdi. Dizayn va backend yo'nalishlari qo'shildi.",
  },
  {
    year: "2019",
    title: "Yangi filial",
    text: "Talabalar soni o'sishi bilan Toshkent markazida zamonaviy jihozlangan yangi binoga ko'chdik.",
  },
  {
    year: "2022",
    title: "Onlayn platforma",
    text: "O'z onlayn ta'lim platformamizni ishga tushirdik — endi darslar yozuvlari va materiallar doim qo'l ostida.",
  },
  {
    year: "2026",
    title: "Bugun",
    text: "5 000+ bitiruvchi, 42 ta o'qituvchi va 35+ kurs bilan O'zbekistondagi yetakchi IT ta'lim markazlaridan biriga aylandik.",
  },
];

const achievements = [
  { icon: GraduationCap, value: "5 ming+", label: "Bitiruvchi" },
  { icon: Award, value: "2000+", label: "Sertifikat" },
  { icon: Building2, value: "50+", label: "Hamkor kompaniya" },
  { icon: Trophy, value: "8+", label: "Yillik tajriba" },
];

export function AboutPage() {
  return (
    <div>
      
      <section className="border-b bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <Badge className="bg-primary/10 text-primary">Biz haqimizda</Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Bizning hikoyamiz
            </h1>
            <p className="mt-5 text-muted-foreground">
              O&rsquo;quv Markaz 2015-yilda kichik bir orzu bilan boshlangan:
              har bir yoshga sifatli IT ta&rsquo;limni yetkazish. Bugun biz
              minglab talabalarning karyerasini o&rsquo;zgartirgan jamoa
              bo&rsquo;lib, O&rsquo;zbekistondagi yetakchi ta&rsquo;lim
              markazlaridan biriga aylandik.
            </p>
            <p className="mt-4 text-muted-foreground">
              Bizning yondashuvimiz oddiy — nazariya emas, amaliyot. Har bir
              talaba real loyihalar ustida ishlaydi, mentor bilan birga
              o&rsquo;sadi va kurs yakunida ishga tayyor mutaxassis sifatida
              bitiradi.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-200/60 to-purple-200/40 blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-white shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=80"
                alt="O'quv Markaz tadbiri"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">
            Maqsadimiz
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Missiya va vizyonimiz
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="size-5" />
              </div>
              <h3 className="text-lg font-semibold">Missiyamiz</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Har bir insonga, qayerda bo&rsquo;lishidan qat&rsquo;i nazar,
                zamonaviy IT kasblarini sifatli va amaliy tarzda
                o&rsquo;rgatish. Biz ta&rsquo;limni imkoniyat deb bilamiz va
                uni hammaga ochiq qilishga intilamiz.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Eye className="size-5" />
              </div>
              <h3 className="text-lg font-semibold">Vizyonimiz</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Markaziy Osiyodagi eng yirik IT ta&rsquo;lim ekotizimiga
                aylanish — minglab yoshlarni xalqaro darajadagi mutaxassislarga
                aylantirib, mintaqa raqamli iqtisodiyotiga hissa qo&rsquo;shish.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      
      <section className="border-y bg-blue-50/40">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-wider text-primary uppercase">
              Yo&rsquo;limiz
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Tarixiy bosqichlar
            </h2>
          </div>
          <div className="relative mt-12">
            <div className="absolute top-0 bottom-0 left-[44px] hidden w-px bg-border sm:block" />
            <div className="flex flex-col gap-8">
              {milestones.map((m) => (
                <div key={m.year} className="flex flex-col gap-3 sm:flex-row sm:gap-8">
                  <div className="relative shrink-0 sm:w-[88px] sm:text-right">
                    <span className="text-2xl font-bold text-primary">
                      {m.year}
                    </span>
                  </div>
                  <Card className="flex-1 transition-shadow hover:shadow-md">
                    <CardContent>
                      <h3 className="font-semibold">{m.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {m.text}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wider text-primary uppercase">
            Jamoa
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Bizning jamoa
          </h2>
          <p className="mt-3 text-muted-foreground">
            Har kuni sizning muvaffaqiyatingiz uchun ishlaydigan mutaxassislar
            bilan tanishing.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {teachers.map((member) => (
            <Card
              key={member.id}
              className="group gap-0 overflow-hidden p-0 transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={member.avatar.replace("/150", "/400")} alt={member.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="text-sm font-semibold">{member.name}</h3>
                <p className="mt-0.5 text-xs text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      
      <section className="border-y bg-blue-50/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-wider text-primary uppercase">
              Natijalar
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Faxrimiz bo&rsquo;lgan yutuqlar
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {achievements.map((item) => (
              <Card key={item.label} className="text-center transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <item.icon className="size-6" />
                  </div>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-14 text-center sm:px-12">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Bizning oilamizga qo&rsquo;shiling
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            5 000 dan ortiq bitiruvchi safiga qo&rsquo;shiling va IT sohasidagi
            karyerangizni biz bilan boshlang.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="h-11 bg-white px-6 text-primary hover:bg-blue-50"
              asChild
            >
              <Link to="/kurslar">Kurslarni ko&rsquo;rish</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 border-white/40 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link to="/aloqa">Biz bilan bog&rsquo;lanish</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
