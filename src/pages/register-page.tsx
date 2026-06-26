import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
} from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { SocialAuth } from "@/components/auth/social-auth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const STRONG_PASSWORD_RE = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

const validInput =
  "border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/25";
const invalidInput =
  "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20";

export function RegisterPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    phone: false,
    password: false,
    confirm: false,
  });

  const emailValid = EMAIL_RE.test(email);
  const phoneValid = phoneDigits.length === 9;
  const passwordValid = STRONG_PASSWORD_RE.test(password);
  const confirmValid = confirm.length > 0 && confirm === password;
  const formValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    emailValid &&
    phoneValid &&
    passwordValid &&
    confirmValid &&
    agreed;

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPhoneDigits(event.target.value.replace(/\D/g, "").slice(0, 9));
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useAuthStore((s) => s.setUser);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);
    setTouched({ email: true, phone: true, password: true, confirm: true });
    if (!formValid) return;

    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/register", {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email,
        phone: `+998${phoneDigits}`,
        password,
      });
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      setUser(data.data.user);
      navigate("/student");
    } catch (err: any) {
      const msg = err.response?.data?.message;
      setError(Array.isArray(msg) ? msg[0] : msg || "Ro'yxatdan o'tishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  }

  const showEmailValid = email.length > 0 && emailValid;
  const showEmailError = touched.email && email.length > 0 && !emailValid;
  const showPhoneError =
    (touched.phone || submitAttempted) && phoneDigits.length > 0 && !phoneValid;
  const showPasswordError = touched.password && password.length > 0 && !passwordValid;
  const showConfirmError = touched.confirm && confirm.length > 0 && !confirmValid;

  return (
    <AuthShell
      heading={
        <>
          Bizning oilamizga
          <br />
          qo&rsquo;shiling.
        </>
      }
      description="Ro'yxatdan o'ting va bepul birinchi darsga taklif oling. 5000+ talaba bilan birga o'rganing va karyera yo'lingizni boshlang."
      bullets={[
        "Birinchi darslar bepul",
        "35+ ta yo'nalish — o'zingizniki tanlang",
        "Ish ko'rinishi — 100+ hamkor kompaniya",
      ]}
    >
      <div className="space-y-6">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight">Yangi hisob yarating</h1>
          <p className="text-sm text-muted-foreground">
            Ma&rsquo;lumotlaringizni kiriting va bepul ro&rsquo;yxatdan o&rsquo;ting.
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="first-name">
                Ism <span className="text-destructive">*</span>
              </Label>
              <Input
                id="first-name"
                placeholder="Aziz"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">
                Familiya <span className="text-destructive">*</span>
              </Label>
              <Input
                id="last-name"
                placeholder="Karimov"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="aziz@example.uz"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                className={cn(
                  "h-11 pl-9",
                  showEmailValid && validInput,
                  showEmailError && invalidInput
                )}
              />
            </div>
            {showEmailValid && (
              <p className="flex items-center gap-1 text-xs text-emerald-600">
                <Check className="size-3.5" />
                Email mavjud va to&rsquo;g&rsquo;ri formatda
              </p>
            )}
            {showEmailError && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <CircleAlert className="size-3.5" />
                Email manzilini to&rsquo;g&rsquo;ri kiriting
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Telefon raqam <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <span className="pointer-events-none absolute top-1/2 left-9 -translate-y-1/2 text-sm font-medium">
                +998
              </span>
              <Input
                id="phone"
                type="tel"
                inputMode="numeric"
                placeholder="90 123 45 67"
                autoComplete="tel-national"
                value={phoneDigits}
                onChange={handlePhoneChange}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                className={cn(
                  "h-11 pl-[4.75rem]",
                  phoneValid && validInput,
                  showPhoneError && invalidInput
                )}
              />
            </div>
            {phoneValid ? (
              <p className="flex items-center gap-1 text-xs text-emerald-600">
                <Check className="size-3.5" />
                Telefon raqam to&rsquo;g&rsquo;ri kiritildi
              </p>
            ) : (
              showPhoneError && (
                <p className="flex items-center gap-1 text-xs text-destructive">
                  <CircleAlert className="size-3.5" />
                  Telefon raqam to&rsquo;liq emas — 9 raqam kiriting
                </p>
              )
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Parol <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Kamida 8 ta belgi"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                className={cn(
                  "h-11 pr-10 pl-9",
                  password.length > 0 && passwordValid && validInput,
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
            <p
              className={cn(
                "text-xs",
                showPasswordError ? "text-destructive" : "text-muted-foreground"
              )}
            >
              Kamida 8 ta belgi, harf va raqam aralash bo&rsquo;lsin.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">
              Parolni tasdiqlang <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder="Parolni qaytadan kiriting"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
                className={cn(
                  "h-11 pr-10 pl-9",
                  confirmValid && validInput,
                  showConfirmError && invalidInput
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Parolni yashirish" : "Parolni ko'rsatish"}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {showConfirmError && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <CircleAlert className="size-3.5" />
                Parollar mos kelmadi
              </p>
            )}
          </div>

          <div className="flex items-start gap-2.5">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(value) => setAgreed(value === true)}
              className="mt-0.5"
            />
            <Label
              htmlFor="terms"
              className="block font-normal leading-snug text-muted-foreground"
            >
              <Link to="#" className="font-medium text-primary hover:underline">
                Foydalanish shartlari
              </Link>{" "}
              va{" "}
              <Link to="#" className="font-medium text-primary hover:underline">
                Maxfiylik siyosati
              </Link>
              ga roziman
            </Label>
          </div>
          {submitAttempted && !agreed && (
            <p className="flex items-center gap-1 text-xs text-destructive">
              <CircleAlert className="size-3.5" />
              Davom etish uchun shartlarga rozilik bildiring
            </p>
          )}

          <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={loading}>
            {loading ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
            {!loading && <ArrowRight data-icon="inline-end" />}
          </Button>
        </form>

        <SocialAuth />

        <p className="text-center text-sm text-muted-foreground">
          Hisobingiz bormi?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Kirish
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
