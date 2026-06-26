import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import {
  AdminNavLinks,
  AdminUserCard,
  adminNav,
} from "@/components/admin/admin-sidebar";
import { useAuthStore } from "@/stores/auth-store";
import { getInitials } from "@/lib/data";

const extraTitles: Record<string, string> = {
  "/admin/guruhlar/yangi": "Yangi guruh",
  "/admin/jadval": "Dars jadvali",
  "/admin/talabalar": "Talabalar",
};

function usePageTitle(): string {
  const pathname = useLocation().pathname;
  if (extraTitles[pathname]) return extraTitles[pathname];
  if (pathname.startsWith("/admin/talabalar/")) return "Talaba profili";
  if (pathname.startsWith("/admin/guruhlar/")) return "Guruh tafsiloti";
  const match = [...adminNav]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) =>
      item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
    );
  return match?.label ?? "Dashboard";
}

export function AdminTopbar() {
  const [open, setOpen] = useState(false);
  const title = usePageTitle();
  const user = useAuthStore((s) => s.user);

  const displayName = user ? `${user.firstName} ${user.lastName}` : "Administrator";
  const avatarUrl = user?.avatarUrl || "";
  const roleName = user?.role === "super_admin" ? "Super Admin" : "Administrator";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="Menyu"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" />
      </Button>

      <h1 className="truncate text-sm font-semibold sm:text-base">{title}</h1>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden w-64 md:block">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Qidirish..." className="rounded-full pl-9" />
        </div>
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
            <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
          </Avatar>
          <div className="hidden text-right sm:block">
            <p className="text-sm leading-tight font-semibold">{displayName}</p>
            <p className="text-xs leading-tight text-muted-foreground">{roleName}</p>
          </div>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="border-b">
            <SheetTitle>
              <Logo href="/admin" />
            </SheetTitle>
          </SheetHeader>
          <AdminNavLinks onNavigate={() => setOpen(false)} />
          <AdminUserCard />
        </SheetContent>
      </Sheet>
    </header>
  );
}
