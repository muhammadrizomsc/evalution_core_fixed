import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  LayoutGrid,
  BarChart3,
  Award,
  User,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Logo } from "@/components/site/logo";
import { useAuthStore } from "@/stores/auth-store";
import { getInitials } from "@/lib/data";
import { cn } from "@/lib/utils";

export const studentNav = [
  {
    group: "Online ta'lim",
    items: [
      { href: "/student", label: "Dashboard", icon: LayoutDashboard },
      { href: "/student/kurslarim", label: "Mening kurslarim", icon: BookOpen },
      { href: "/student/katalog", label: "Kurslar katalogi", icon: LayoutGrid },
      { href: "/student/natijalarim", label: "Natijalarim", icon: BarChart3 },
      { href: "/student/sertifikatlarim", label: "Sertifikatlarim", icon: Award },
    ],
  },
  {
    group: "Hisob",
    items: [
      { href: "/student/profil", label: "Profil", icon: User },
      { href: "/student/tolovlar", label: "To'lovlar", icon: CreditCard },
      { href: "/student/sozlamalar", label: "Sozlamalar", icon: Settings },
    ],
  },
];

export function StudentNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useLocation().pathname;

  const isActive = (href: string) =>
    href === "/student" ? pathname === "/student" : pathname.startsWith(href);

  return (
    <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
      {studentNav.map((group) => (
        <div key={group.group}>
          <p className="mb-2 mt-4 first:mt-0 px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            {group.group}
          </p>
          {group.items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-[18px]" />
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}

export function StudentUserCard() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const displayName = user ? `${user.firstName} ${user.lastName}` : "Talaba";
  const avatarUrl = user?.avatarUrl || "";

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <>
      <div className="flex items-center gap-3 border-t p-4">
        <Avatar className="size-9">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
          <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{displayName}</p>
          <p className="truncate text-xs text-muted-foreground">Online talaba</p>
        </div>
        <button
          onClick={() => setShowLogout(true)}
          aria-label="Chiqish"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut className="size-4" />
        </button>
      </div>

      <Dialog open={showLogout} onOpenChange={setShowLogout}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tizimdan chiqasizmi?</DialogTitle>
            <DialogDescription>
              Hisobingizdan chiqmoqchimisiz? Davom etish uchun qaytadan login va parolingiz bilan tizimga kirishingiz kerak bo'ladi.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogout(false)}>
              Bekor qilish
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Ha, chiqish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function StudentSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-background lg:flex">
      <div className="flex h-16 items-center border-b px-5">
        <Logo href="/student" />
      </div>
      <StudentNavLinks />
      <StudentUserCard />
    </aside>
  );
}
