import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { SocialAuth } from "@/components/auth/social-auth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?\d{9,12}$/;

const validInput =
  "border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/25";
const invalidInput =
  "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20";

export function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ identifier: false, password: false });

  const identifierIsPhone = PHONE_RE.test(identifier.replace(/[\s-]/g, ""));
  const identifierValid = EMAIL_RE.test(identifier) || identifierIsPhone;
  const passwordValid = password.length >= 8;

  const showIdentifierValid = identifier.length > 0 && identifierValid;
  const showIdentifierError =
    touched.identifier && identifier.length > 0 && !identifierValid;
  const showPasswordError = touched.password && password.length > 0 && !passwordValid;

  const login = useAuthStore((s) => s.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ identifier: true, password: true });
    if (!identifierValid || !passwordValid) return;

    setLoading(true);
    setError("");
    try {
      const user = await login(identifier, password);
      navigate(user.role === "student" ? "/student" : "/admin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Email yoki parol noto'g'ri");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      heading={
        <>
          Bilim — kelajakka eng
          <br />
          yaxshi sarmoyadir.
        </>
      }
      description="5000+ bitiruvchi bizning oilamiz tarkibida. Endi navbat sizniki. Bilim olishni davom ettiring va karyera maqsadlaringizga yeting."
      bullets={[
        "Onlayn platforma — istalgan vaqtda darslar",
        "Mentor bilan to'g'ridan-to'g'ri aloqa",
        "Davlat tomonidan tan olingan sertifikat",
      ]}
    >
      <div className="space-y-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight">Hisobingizga kiring</h1>
          <p className="text-sm text-muted-foreground">
            Ma&rsquo;lumotlaringizni kiriting va o&rsquo;quv jarayonini davom
            ettiring.
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="identifier">Email yoki telefon raqam</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="identifier"
                type="email"
                placeholder="aziz@example.uz"
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, identifier: true }))}
                className={cn(
                  "h-11 pl-9",
                  showIdentifierValid && validInput,
                  showIdentifierError && invalidInput
                )}
              />
            </div>
            {showIdentifierValid && (
              <p className="flex items-center gap-1 text-xs text-emerald-600">
                <Check className="size-3.5" />
                {identifierIsPhone
                  ? "Telefon raqam to'g'ri formatda"
                  : "Email manzili to'g'ri formatda"}
              </p>
            )}
            {showIdentifierError && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <CircleAlert className="size-3.5" />
                Email yoki telefon raqamni to&rsquo;g&rsquo;ri kiriting
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Parol</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                className={cn(
                  "h-11 pr-10 pl-9",
                  showPasswordError && invalidInput
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {showPasswordError && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <CircleAlert className="size-3.5" />
                Parol kamida 8 ta belgidan iborat bo&rsquo;lishi kerak
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="font-normal text-muted-foreground">
                Meni eslab qol
              </Label>
            </div>
            <Link
              to="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              Parolni unutdingizmi?
            </Link>
          </div>

          <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={loading}>
            {loading ? "Kirilyapti..." : "Kirish"}
            {!loading && <ArrowRight data-icon="inline-end" />}
          </Button>
        </form>

        <SocialAuth />

        <p className="text-center text-sm text-muted-foreground">
          Hisobingiz yo&rsquo;qmi?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Ro&rsquo;yxatdan o&rsquo;ting
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
