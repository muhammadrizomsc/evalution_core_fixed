import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UsersRound,
  CalendarDays,
  ClipboardCheck,
  Star,
  CreditCard,
  Wallet,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export const adminNavGroups: NavGroup[] = [
  {
    group: "Asosiy",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/talabalar", label: "Talabalar", icon: Users, badge: 124 },
      { href: "/admin/oqituvchilar", label: "O'qituvchilar", icon: GraduationCap },
      { href: "/admin/guruhlar", label: "Guruhlar", icon: UsersRound },
      { href: "/admin/jadval", label: "Jadval", icon: CalendarDays },
      { href: "/admin/davomat", label: "Davomat", icon: ClipboardCheck },
      { href: "/admin/baholar", label: "Baholar", icon: Star },
    ],
  },
  {
    group: "Moliya",
    items: [
      { href: "/admin/tolovlar", label: "To'lovlar", icon: CreditCard, badge: 3 },
      { href: "/admin/moliya", label: "Moliya", icon: Wallet },
    ],
  },
  {
    group: "Aloqa",
    items: [
      { href: "/admin/xabarlar", label: "Xabarlar", icon: MessageSquare, badge: 12 },
      { href: "/admin/hisobotlar", label: "Hisobotlar", icon: FileText },
    ],
  },
  {
    group: "Tizim",
    items: [
      { href: "/admin/sozlamalar", label: "Sozlamalar", icon: Settings },
    ],
  },
];

export const adminNav = adminNavGroups.flatMap((g) => g.items);

export function AdminNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useLocation().pathname;

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
      {adminNavGroups.map((group) => (
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
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
              {item.badge != null && (
                <Badge
                  variant="secondary"
                  className={cn(
                    "ml-auto h-5 min-w-5 justify-center rounded-full px-1.5 text-[10px] font-semibold",
                    isActive(item.href)
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}

export function AdminUserCard() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const displayName = user ? `${user.firstName} ${user.lastName}` : "Administrator";
  const avatarUrl = user?.avatarUrl || "";
  const roleName = user?.role === "super_admin" ? "Super Admin" : "Administrator";

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
          <p className="truncate text-xs text-muted-foreground">{roleName}</p>
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

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-background lg:flex">
      <div className="flex h-16 items-center border-b px-5">
        <Logo href="/admin" />
      </div>
      <AdminNavLinks />
      <AdminUserCard />
    </aside>
  );
}
