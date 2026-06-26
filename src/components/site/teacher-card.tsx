import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getInitials, type Teacher } from "@/lib/data";

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 py-3">
      <span className="font-heading text-sm font-bold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <Card className="gap-3 text-center transition-shadow hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col items-center gap-1">
        <Avatar className="size-24">
          <AvatarImage src={teacher.avatar} alt={teacher.name} />
          <AvatarFallback className="text-lg">
            {getInitials(teacher.name)}
          </AvatarFallback>
        </Avatar>
        <h3 className="mt-3 font-heading text-base font-semibold">
          {teacher.name}
        </h3>
        <p className="text-sm font-medium text-primary">{teacher.role}</p>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {teacher.bio}
        </p>
      </CardContent>
      <CardFooter className="bg-transparent p-0">
        <div className="grid w-full grid-cols-3 divide-x">
          <Stat value={teacher.courses} label="Kurs" />
          <Stat value={teacher.students} label="Talaba" />
          <Stat value={teacher.rating} label="Reyting" />
        </div>
      </CardFooter>
    </Card>
  );
}
