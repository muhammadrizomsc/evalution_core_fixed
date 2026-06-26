import { Outlet } from "react-router-dom";
import { StudentSidebar } from "@/components/student/student-sidebar";
import { StudentTopbar } from "@/components/student/student-topbar";

export function StudentLayout() {
  return (
    <div className="min-h-svh bg-slate-50">
      <StudentSidebar />
      <div className="flex min-h-svh flex-col lg:pl-64">
        <StudentTopbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
