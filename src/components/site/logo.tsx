import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  light = false,
  className,
}: {
  href?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link to={href} className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-xl",
          light ? "bg-white/15 text-white" : "bg-primary text-primary-foreground"
        )}
      >
        <GraduationCap className="size-5" />
      </span>
      <span
        className={cn(
          "text-base font-bold tracking-tight",
          light ? "text-white" : "text-foreground"
        )}
      >
        O&rsquo;quv Markaz
      </span>
    </Link>
  );
}
