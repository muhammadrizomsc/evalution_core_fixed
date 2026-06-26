import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/pages/contact-form";

const contactRows = [
  {
    icon: MapPin,
    label: "Manzil",
    lines: ["Amir Temur ko'chasi 108-uy, Toshkent, O'zbekiston"],
  },
  {
    icon: Phone,
    label: "Telefon",
    lines: ["+998 71 123 45 67", "+998 90 123 45 67"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["info@oquv.uz", "support@oquv.uz"],
  },
  {
    icon: Clock,
    label: "Ish vaqti",
    lines: ["Du-Ju: 09:00 — 18:00", "Sha: 10:00 — 16:00", "Yakshanba: dam olish kuni"],
  },
];

/* Brand icons are not available in the installed lucide-react version. */
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const socials = [
  { icon: Send, label: "Telegram" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: FacebookIcon, label: "Facebook" },
  { icon: YoutubeIcon, label: "YouTube" },
];

export function ContactPage() {
  return (
    <div>
      
      <section className="border-b bg-blue-50/60">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <Breadcrumb className="mb-4 flex justify-center">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Bosh sahifa</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Aloqa</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Biz bilan bog&rsquo;laning
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Savollaringiz bormi? Bepul konsultatsiya olishni xohlaysizmi? Bizga
            yozing — javob beramiz.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          
          <ContactForm />

          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Bog&rsquo;lanish ma&rsquo;lumotlari
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {contactRows.map((row) => (
                  <div key={row.label} className="flex items-start gap-3.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <row.icon className="size-4.5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{row.label}</p>
                      {row.lines.map((line) => (
                        <p key={line} className="text-sm font-medium">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-foreground/10">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="Xarita — O'quv Markaz manzili"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <Card className="py-3">
              <CardContent className="flex items-center justify-between px-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Ijtimoiy
                  <br className="sm:hidden" /> tarmoqlarda
                </span>
                <div className="flex items-center gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      aria-label={social.label}
                      className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <social.icon className="size-4" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
