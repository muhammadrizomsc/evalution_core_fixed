import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CoursesExplorer } from "@/components/site/courses-explorer";

export function CoursesPage() {
  return (
    <div>
      <section className="border-b bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <Breadcrumb className="flex justify-center">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Bosh sahifa</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Kurslar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="mt-4 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Barcha kurslarimiz
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            35+ ta zamonaviy yo&rsquo;nalishda o&rsquo;zingizga mosini tanlang.
            Boshlovchidan tortib mutaxassis darajasigacha.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CoursesExplorer />
      </section>
    </div>
  );
}
