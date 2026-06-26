import { Link } from "react-router-dom";
import { Award, Download, Eye, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Certificate {
  id: string;
  courseName: string;
  studentName: string;
  issuedDate: string;
  grade: number;
  gradeLabel: string;
  certId: string;
  status: "earned";
}

interface PendingCourse {
  id: string;
  courseName: string;
  progress: number;
  status: "pending";
}

type CertItem = Certificate | PendingCourse;

const certItems: CertItem[] = [
  {
    id: "1",
    courseName: "JavaScript asoslari",
    studentName: "Bobur Tojiev",
    issuedDate: "20-noyabr, 2025",
    grade: 94,
    gradeLabel: "A'lo",
    certId: "UM-2025-0942",
    status: "earned",
  },
  {
    id: "2",
    courseName: "Git va GitHub",
    studentName: "Bobur Tojiev",
    issuedDate: "05-sentabr, 2025",
    grade: 88,
    gradeLabel: "Yaxshi",
    certId: "UM-2025-0731",
    status: "earned",
  },
  {
    id: "3",
    courseName: "React.js — zamonaviy frontend",
    progress: 62,
    status: "pending",
  },
];

const earned = certItems.filter((c): c is Certificate => c.status === "earned");
const pending = certItems.filter((c): c is PendingCourse => c.status === "pending");

export function SertifikatlarimPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Sertifikatlarim
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Tugatilgan kurslar bo'yicha olingan raqamli sertifikatlar.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {earned.map((cert) => (
          <Card key={cert.id} className="rounded-xl border-slate-200 shadow-xs">
            <CardContent className="p-0">
              <div className="flex flex-col items-center px-6 pt-8 pb-6">
                <div className="flex size-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Award className="size-7" />
                </div>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-blue-600">
                  Sertifikat
                </p>
                <h3 className="mt-2 text-center text-lg font-bold text-slate-900">
                  {cert.courseName}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{cert.studentName}</p>
              </div>

              <div className="space-y-2 border-t border-slate-100 px-6 py-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Berilgan sana</span>
                  <span className="font-medium text-slate-900">{cert.issuedDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Yakuniy natija</span>
                  <span className={`font-bold ${cert.grade >= 90 ? "text-emerald-600" : "text-blue-600"}`}>
                    {cert.grade}% ({cert.gradeLabel})
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">ID</span>
                  <span className="font-medium text-slate-900">{cert.certId}</span>
                </div>
              </div>

              <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
                <Button variant="outline" className="flex-1" size="sm">
                  <Eye className="mr-2 size-4" />
                  Ko'rish
                </Button>
                <Button className="flex-1" size="sm">
                  <Download className="mr-2 size-4" />
                  Yuklash
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {pending.map((item) => (
          <Card key={item.id} className="rounded-xl border-slate-200 shadow-xs">
            <CardContent className="p-0">
              <div className="flex flex-col items-center px-6 pt-8 pb-6">
                <div className="flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Lock className="size-7" />
                </div>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                  Hali olinmagan
                </p>
                <h3 className="mt-2 text-center text-lg font-bold text-slate-900">
                  {item.courseName}
                </h3>
                <p className="mt-1 text-sm text-slate-500">Kursni tugatib oling</p>
              </div>

              <div className="space-y-2 border-t border-slate-100 px-6 py-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-semibold text-slate-900">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2.5" />
              </div>

              <div className="border-t border-slate-100 px-6 py-4">
                <Button asChild className="w-full" size="sm">
                  <Link to="/student/kurslarim">Davom ettirish</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
