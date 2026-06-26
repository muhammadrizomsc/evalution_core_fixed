import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TeachersExplorer } from "@/pages/teachers-explorer";

export function TeachersPage() {
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
                <BreadcrumbPage>{"O'qituvchilar"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="mt-4 text-center font-heading text-3xl font-bold tracking-tight md:text-4xl">
            {"Bizning o'qituvchilar"}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            {"42 ta tajribali mutaxassis o'z bilim va tajribasini siz bilan ulashishga tayyor."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <TeachersExplorer />
      </section>
    </div>
  );
}
