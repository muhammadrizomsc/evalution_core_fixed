import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { SiteLayout } from "@/layouts/site-layout";
import { AdminLayout } from "@/layouts/admin-layout";
import { StudentLayout } from "@/layouts/student-layout";
import { PrivateRoute } from "@/components/auth/private-route";
import { useAuthStore } from "@/stores/auth-store";
import { HomePage } from "@/pages/home-page";
import { CoursesPage } from "@/pages/kurslar-page";
import { CourseDetailPage } from "@/pages/kurslar-detail-page";
import { TeachersPage } from "@/pages/oqituvchilar-page";
import { BlogPage } from "@/pages/blog-page";
import { BlogPostPage } from "@/pages/blog-detail-page";
import { ContactPage } from "@/pages/aloqa-page";
import { AboutPage } from "@/pages/biz-haqimizda-page";
import { NarxlarPage } from "@/pages/narxlar-page";
import { FaqPage } from "@/pages/faq-page";
import { LoginPage } from "@/pages/login-page";
import { RegisterPage } from "@/pages/register-page";
import { DashboardPage } from "@/pages/admin/dashboard-page";
import { TalabalarPage } from "@/pages/admin/talabalar-page";
import { StudentProfilePage } from "@/pages/admin/talaba-detail-page";
import { GuruhlarPage } from "@/pages/admin/guruhlar-page";
import { GuruhDetailPage } from "@/pages/admin/guruh-detail-page";
import { YangiGuruhPage } from "@/pages/admin/guruh-yangi-page";
import { JadvalPage } from "@/pages/admin/jadval-page";
import { DavomatPage } from "@/pages/admin/davomat-page";
import { OqituvchilarPage as AdminOqituvchilarPage } from "@/pages/admin/oqituvchilar-page";
import { AdminTolovlarPage } from "@/pages/admin/tolovlar-page";
import { StudentDashboardPage } from "@/pages/student/dashboard-page";
import { KatalogPage } from "@/pages/student/katalog-page";
import { KurslarimPage } from "@/pages/student/kurslarim-page";
import { NatijalarimPage } from "@/pages/student/natijalarim-page";
import { SertifikatlarimPage } from "@/pages/student/sertifikatlarim-page";
import { TolovlarPage } from "@/pages/student/tolovlar-page";
import { ProfilPage } from "@/pages/student/profil-page";
import { SozlamalarPage } from "@/pages/student/sozlamalar-page";
import { TolovCheckoutPage } from "@/pages/student/tolov-checkout-page";
import { StudentKursDetailPage } from "@/pages/student/kurs-detail-page";
import { NotFoundPage } from "@/pages/not-found-page";

export default function App() {
  const fetchMe = useAuthStore((s) => s.fetchMe);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="kurslar" element={<CoursesPage />} />
        <Route path="kurslar/:slug" element={<CourseDetailPage />} />
        <Route path="oqituvchilar" element={<TeachersPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="aloqa" element={<ContactPage />} />
        <Route path="biz-haqimizda" element={<AboutPage />} />
        <Route path="narxlar" element={<NarxlarPage />} />
        <Route path="faq" element={<FaqPage />} />
      </Route>

      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      <Route element={<PrivateRoute allowedRoles={["admin", "super_admin"]} />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="talabalar" element={<TalabalarPage />} />
          <Route path="talabalar/:id" element={<StudentProfilePage />} />
          <Route path="guruhlar" element={<GuruhlarPage />} />
          <Route path="guruhlar/yangi" element={<YangiGuruhPage />} />
          <Route path="guruhlar/:id" element={<GuruhDetailPage />} />
          <Route path="jadval" element={<JadvalPage />} />
          <Route path="davomat" element={<DavomatPage />} />
          <Route path="oqituvchilar" element={<AdminOqituvchilarPage />} />
          <Route path="tolovlar" element={<AdminTolovlarPage />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute allowedRoles={["student"]} />}>
        <Route path="student" element={<StudentLayout />}>
          <Route index element={<StudentDashboardPage />} />
          <Route path="katalog" element={<KatalogPage />} />
          <Route path="katalog/:slug" element={<StudentKursDetailPage />} />
          <Route path="katalog/:slug/tolov" element={<TolovCheckoutPage />} />
          <Route path="kurslarim" element={<KurslarimPage />} />
          <Route path="natijalarim" element={<NatijalarimPage />} />
          <Route path="sertifikatlarim" element={<SertifikatlarimPage />} />
          <Route path="tolovlar" element={<TolovlarPage />} />
          <Route path="profil" element={<ProfilPage />} />
          <Route path="sozlamalar" element={<SozlamalarPage />} />
        </Route>
      </Route>

      <Route path="404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
