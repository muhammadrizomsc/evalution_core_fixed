import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Xabar yuborish</CardTitle>
        <CardDescription>24 soat ichida javob beramiz.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first-name">
                Ism <span className="text-destructive">*</span>
              </Label>
              <Input id="first-name" placeholder="Aziz" className="h-10" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Familiya</Label>
              <Input id="last-name" placeholder="Karimov" className="h-10" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="aziz@example.uz"
                className="h-10"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" type="tel" placeholder="+998 90 123 45 67" className="h-10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Mavzu</Label>
            <Select defaultValue="kurs">
              <SelectTrigger id="subject" className="h-10 w-full">
                <SelectValue placeholder="Mavzuni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kurs">Kurs haqida ma&rsquo;lumot</SelectItem>
                <SelectItem value="tolov">To&rsquo;lov va chegirmalar</SelectItem>
                <SelectItem value="hamkorlik">Hamkorlik taklifi</SelectItem>
                <SelectItem value="boshqa">Boshqa savol</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Xabar <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Xabaringizni shu yerda yozing..."
              className="min-h-36"
              required
            />
            <p className="text-xs text-muted-foreground">
              Iltimos, savolingizni iloji boricha aniq yozing.
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <Checkbox id="consent" required className="mt-0.5" />
            <Label htmlFor="consent" className="font-normal leading-snug text-muted-foreground">
              Foydalanish shartlari va shaxsiy ma&rsquo;lumotlarni qayta ishlashga roziman.
            </Label>
          </div>

          {submitted && (
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700">
              <CheckCircle2 className="size-4 shrink-0" />
              Xabaringiz yuborildi! Tez orada siz bilan bog&rsquo;lanamiz.
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" size="lg" className="h-10 px-5">
              Xabarni yuborish
              <Send data-icon="inline-end" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
