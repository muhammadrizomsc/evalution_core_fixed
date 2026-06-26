import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { totalStudents } from "@/lib/data";
import { StudentsTable } from "@/pages/admin/students-table";

export function TalabalarPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Talabalar
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Jami {totalStudents} ta faol talaba
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download data-icon="inline-start" />
            Eksport
          </Button>
          <Button>
            <Plus data-icon="inline-start" />
            Talaba qo&apos;shish
          </Button>
        </div>
      </div>

      <StudentsTable />
    </div>
  );
}
