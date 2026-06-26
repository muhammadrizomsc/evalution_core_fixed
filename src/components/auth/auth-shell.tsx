import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Logo } from "@/components/site/logo";

export function AuthShell({
  heading,
  description,
  bullets,
  children,
}: {
  heading: React.ReactNode;
  description: string;
  bullets: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-10 text-white lg:flex">
        <Logo light />

        <div className="max-w-md space-y-6">
          <h1 className="text-4xl leading-tight font-bold">{heading}</h1>
          <p className="text-base leading-relaxed text-blue-100">{description}</p>
          <ul className="space-y-3">
            {bullets.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-blue-50">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Check className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between text-xs text-blue-200">
          <span>&copy; 2026 O&rsquo;quv Markaz</span>
          <Link to="/aloqa" className="transition-colors hover:text-white">
            Yordam kerakmi?
          </Link>
        </div>
      </div>

      <div className="flex flex-col p-6 sm:p-10">
        <div className="flex items-center justify-between">
          <Logo className="lg:hidden" />
          <Link
            to="/"
            className="ml-auto flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Bosh sahifaga
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
