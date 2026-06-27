import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Award, Download, Eye, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";

interface Certificate {
  id: string;
  courseName?: string;
  course?: { title: string; slug: string };
  studentName?: string;
  issuedDate?: string;
  issuedAt?: string;
  grade?: number;
  gradeLabel?: string;
  certId?: string;
  certificateNumber?: string;
  fileUrl?: string;
}

interface Enrollment {
  id: string;
  courseId: string;
  progress?: number;
  status?: string;
  course?: { title: string; slug: string };
}

export function SertifikatlarimPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [pendingEnrollments, setPendingEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.get<{ data: Certificate[] }>("/student/certificates"),
      api.get<{ data: { items: Enrollment[] } }>("/student/enrollments"),
    ]).then(([certRes, enrollRes]) => {
      if (certRes.status === "fulfilled") {
        setCertificates(Array.isArray(certRes.value.data.data) ? certRes.value.data.data : []);
      }
      if (enrollRes.status === "fulfilled") {
        const allEnrollments = enrollRes.value.data.data.items ?? [];
        // Show enrollments that are not yet completed (no cert yet)
        setPendingEnrollments(
          allEnrollments.filter(
            (e) => e.status !== "completed" && (e.progress ?? 0) < 100
          )
        );
      }
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

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
        {certificates.map((cert) => {
          const courseName = cert.course?.title ?? cert.courseName ?? "Kurs";
          const certId = cert.certificateNumber ?? cert.certId ?? cert.id;
          const issuedDate = cert.issuedAt
            ? new Date(cert.issuedAt).toLocaleDateString("uz-UZ")
            : cert.issuedDate ?? "—";
          return (
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
                    {courseName}
                  </h3>
                  {cert.studentName && (
                    <p className="mt-1 text-sm text-slate-500">{cert.studentName}</p>
                  )}
                </div>

                <div className="space-y-2 border-t border-slate-100 px-6 py-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Berilgan sana</span>
                    <span className="font-medium text-slate-900">{issuedDate}</span>
                  </div>
                  {cert.grade !== undefined && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Yakuniy natija</span>
                      <span className={`font-bold ${cert.grade >= 90 ? "text-emerald-600" : "text-blue-600"}`}>
                        {cert.grade}%{cert.gradeLabel ? ` (${cert.gradeLabel})` : ""}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">ID</span>
                    <span className="font-medium text-slate-900">{certId}</span>
                  </div>
                </div>

                <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Eye className="mr-2 size-4" />
                    Ko'rish
                  </Button>
                  {cert.fileUrl ? (
                    <Button className="flex-1" size="sm" asChild>
                      <a href={cert.fileUrl} download>
                        <Download className="mr-2 size-4" />
                        Yuklash
                      </a>
                    </Button>
                  ) : (
                    <Button className="flex-1" size="sm">
                      <Download className="mr-2 size-4" />
                      Yuklash
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {pendingEnrollments.map((item) => {
          const courseName = item.course?.title ?? "Kurs";
          return (
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
                    {courseName}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">Kursni tugatib oling</p>
                </div>

                <div className="space-y-2 border-t border-slate-100 px-6 py-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-semibold text-slate-900">{item.progress ?? 0}%</span>
                  </div>
                  <Progress value={item.progress ?? 0} className="h-2.5" />
                </div>

                <div className="border-t border-slate-100 px-6 py-4">
                  <Button asChild className="w-full" size="sm">
                    <Link to="/student/kurslarim">Davom ettirish</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {certificates.length === 0 && pendingEnrollments.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 rounded-xl border border-dashed border-slate-200 py-16 text-center text-sm text-slate-500">
            Hali sertifikat yo'q.{" "}
            <Link to="/student/katalog" className="text-blue-600 hover:underline">
              Kurs boshlang
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
