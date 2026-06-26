import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="text-xl font-semibold">Sahifa topilmadi</h1>
      <p className="max-w-sm text-muted-foreground">
        Siz qidirayotgan sahifa mavjud emas yoki ko&apos;chirilgan.
      </p>
      <Button asChild>
        <Link to="/">Bosh sahifaga qaytish</Link>
      </Button>
    </div>
  );
}
