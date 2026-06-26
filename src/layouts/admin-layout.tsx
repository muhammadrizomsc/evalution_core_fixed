import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export function AdminLayout() {
  return (
    <div className="min-h-svh bg-slate-50">
      <AdminSidebar />
      <div className="flex min-h-svh flex-col lg:pl-64">
        <AdminTopbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
