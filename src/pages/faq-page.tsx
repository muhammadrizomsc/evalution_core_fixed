import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FaqCategory = "Umumiy" | "Kurslar" | "To'lov" | "Sertifikat" | "Texnik";

interface FaqItem {
  question: string;
  answer: string;
  category: FaqCategory;
}

const faqItems: FaqItem[] = [
  {
    question: "Kurslarni tugatgandan keyin sertifikat beriladimi?",
    answer: "Ha, barcha kurslar yakunida davlat tomonidan tan olingan sertifikat beriladi. Sertifikat olish uchun yakuniy loyihani muvaffaqiyatli topshirish kerak.",
    category: "Sertifikat",
  },
  {
    question: "To'lovni bo'lib-bo'lib qilsam bo'ladimi?",
    answer: "Albatta. Barcha kurslar uchun oylik to'lov rejasi mavjud. Shuningdek, to'liq to'lov qilganlar uchun 15% chegirma beriladi.",
    category: "To'lov",
  },
  {
    question: "Darslar qanday formatda o'tiladi?",
    answer: "Darslar offline (markazimizda) va onlayn formatlarda o'tiladi. Har bir dars yozib olinadi va platformada saqlanadi — istalgan vaqt qayta ko'rishingiz mumkin.",
    category: "Kurslar",
  },
  {
    question: "Hech qanday tajribam yo'q, kursni o'zlashtirolamanmi?",
    answer: "Boshlovchi darajadagi kurslar aynan tajribasizlar uchun mo'ljallangan. Mentorlar har bir talabaga individual yondashadi.",
    category: "Umumiy",
  },
  {
    question: "Ishga joylashishda yordam berasizlarmi?",
    answer: "Ha, bitiruvchilarimizga CV tayyorlash, intervyuga tayyorgarlik va hamkor kompaniyalarga yo'llanma berish xizmatlari mavjud. Bitiruvchilarimizning 84% i 6 oy ichida ishga joylashadi.",
    category: "Umumiy",
  },
  {
    question: "Kursni yarim yo'lda qoldirsam nima bo'ladi?",
    answer: "Kursni istalgan vaqt to'xtatib turish yoki boshqa guruhga ko'chirish mumkin. Qaytarilgan to'lovlar alohida ko'rib chiqiladi.",
    category: "Kurslar",
  },
  {
    question: "Qanday to'lov usullari mavjud?",
    answer: "Payme, Click, Uzcard, Visa va Mastercard orqali to'lov qilish mumkin. Naqd to'lov markazimizda qabul qilinadi.",
    category: "To'lov",
  },
  {
    question: "Sertifikat xalqaro miqyosda tan olinadimi?",
    answer: "Bizning sertifikatlar O'zbekistonda tan olinadi. Xalqaro sertifikatlar uchun alohida tayyorgarlik kurslari mavjud.",
    category: "Sertifikat",
  },
  {
    question: "Platformaga qanday kirish mumkin?",
    answer: "Ro'yxatdan o'tganingizdan so'ng login va parol bilan platformaga kirishingiz mumkin. Mobil ilova ham mavjud.",
    category: "Texnik",
  },
  {
    question: "Texnik muammo yuzaga kelsa kimga murojaat qilaman?",
    answer: "Telegram bot orqali @oquvmarkaz_support ga yoki support@oquvmarkaz.uz emailiga murojaat qilishingiz mumkin. Ish vaqtida 30 daqiqa ichida javob beramiz.",
    category: "Texnik",
  },
];

const categories: FaqCategory[] = ["Umumiy", "Kurslar", "To'lov", "Sertifikat", "Texnik"];

export function FaqPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory | "Barchasi">("Barchasi");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = useMemo(() => {
    let result = faqItems;
    if (selectedCategory !== "Barchasi") {
      result = result.filter((f) => f.category === selectedCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, selectedCategory]);

  return (
    <div className="space-y-16 py-12">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-16 text-center text-white sm:px-12">
        <div className="relative">
          <h1 className="text-3xl font-bold sm:text-4xl">Ko'p beriladigan savollar</h1>
          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            Savolingizga javob topa olmadingizmi? Biz bilan bog'laning — yordam beramiz.
          </p>
          <div className="relative mx-auto mt-8 max-w-md">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-blue-300" />
            <Input
              placeholder="Savolni qidirish..."
              className="border-blue-400/30 bg-white/10 pl-9 text-white placeholder:text-blue-200 focus-visible:ring-white/30"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setOpenIndex(null); }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "Barchasi" ? "default" : "outline"}
            size="sm"
            onClick={() => { setSelectedCategory("Barchasi"); setOpenIndex(null); }}
          >
            Barchasi
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => { setSelectedCategory(cat); setOpenIndex(null); }}
            >
              {cat}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg font-medium text-slate-500">Natija topilmadi</p>
            <p className="mt-1 text-sm text-slate-400">Boshqa kalit so'z yoki kategoriya sinab ko'ring.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={faq.question}
                  className="rounded-xl border bg-card transition-shadow hover:shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mx-auto max-w-2xl rounded-2xl bg-slate-50 p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold text-slate-900">Javob topa olmadingizmi?</h2>
        <p className="mt-2 text-slate-500">
          Biz bilan to'g'ridan-to'g'ri bog'laning — sizga yordam beramiz.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="lg">
            <MessageCircle className="mr-2 size-4" />
            Telegram orqali yozish
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/aloqa">
              <Mail className="mr-2 size-4" />
              Aloqa sahifasi
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
