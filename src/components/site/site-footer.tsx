import { Link } from "react-router-dom";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/site/logo";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const pageLinks = [
  { href: "/biz-haqimizda", label: "Biz haqimizda" },
  { href: "/kurslar", label: "Kurslar" },
  { href: "/oqituvchilar", label: "O'qituvchilar" },
  { href: "/blog", label: "Blog" },
  { href: "/aloqa", label: "Aloqa" },
];

const courseLinks = [
  { href: "/kurslar?kategoriya=Frontend", label: "Frontend" },
  { href: "/kurslar?kategoriya=Backend", label: "Backend" },
  { href: "/kurslar?kategoriya=Dizayn", label: "Dizayn" },
  { href: "/kurslar?kategoriya=Mobil", label: "Mobil" },
];

const socials = [
  { href: "https://t.me", label: "Telegram", icon: Send },
  { href: "https://instagram.com", label: "Instagram", icon: InstagramIcon },
  { href: "https://facebook.com", label: "Facebook", icon: FacebookIcon },
  { href: "https://youtube.com", label: "YouTube", icon: YoutubeIcon },
];

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo light />
            <p className="text-sm leading-relaxed text-slate-400">
              Toshkent shahridagi yetakchi IT va dizayn ta&rsquo;lim markazi.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Sahifalar
            </h3>
            <ul className="space-y-2.5">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Kurslar
            </h3>
            <ul className="space-y-2.5">
              {courseLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Aloqa
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-slate-500" />
                Amir Temur ko&rsquo;chasi 108, Toshkent
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-slate-500" />
                +998 71 123 45 67
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-slate-500" />
                info@oquv.uz
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; 2026 O&rsquo;quv Markaz. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex size-8 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-colors hover:border-slate-500 hover:text-white"
              >
                <social.icon className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
