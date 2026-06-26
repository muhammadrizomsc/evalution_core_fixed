import { Link } from "react-router-dom";
import { BookOpen, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { categoryColors, formatPrice, type Course } from "@/lib/data";

export function CourseCard({ course }: { course: Course }) {
  const href = `/kurslar/${course.slug}`;

  return (
    <Card className="group gap-3 pt-0 transition-shadow hover:shadow-lg">
      <Link to={href} className="relative block aspect-video overflow-hidden">
        <img src={course.image} alt={course.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </Link>

      <CardContent className="flex flex-1 flex-col gap-2">
        <div className="flex items-center justify-between">
          <Badge className={categoryColors[course.category]}>
            {course.category}
          </Badge>
          <span className="flex items-center gap-1 text-sm font-medium">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {course.rating}
          </span>
        </div>

        <Link to={href}>
          <h3 className="font-heading text-base font-semibold transition-colors hover:text-primary">
            {course.title}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {course.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-4 pt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {course.durationMonths} oy
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="size-3.5" />
            {course.totalLessons} dars
          </span>
        </div>
      </CardContent>

      <CardFooter className="justify-between bg-transparent py-3">
        <span className="font-heading text-sm font-bold">
          {formatPrice(course.price)}
        </span>
        <Button size="sm" asChild>
          <Link to={href}>Batafsil</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
