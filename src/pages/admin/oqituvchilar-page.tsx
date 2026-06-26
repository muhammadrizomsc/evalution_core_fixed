import * as React from "react";
import { Plus, Search, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { categoryColors, getInitials, teachers } from "@/lib/data";

const categories = [...new Set(teachers.map((t) => t.category))];

export function OqituvchilarPage() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("all");

  const filtered = teachers.filter((t) => {
    const q = query.trim().toLowerCase();
    if (q && !`${t.name} ${t.role}`.toLowerCase().includes(q)) return false;
    if (category !== "all" && t.category !== category) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            O&apos;qituvchilar
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Jami {teachers.length} ta o&apos;qituvchi
          </p>
        </div>
        <Button>
          <Plus data-icon="inline-start" />
          O&apos;qituvchi qo&apos;shish
        </Button>
      </div>

      
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O'qituvchi qidiring (ism, lavozim)..."
            className="pl-9"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-auto">
            <SelectValue placeholder="Barcha yo'nalishlar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barcha yo&apos;nalishlar</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white py-16 text-center text-sm text-slate-500 shadow-xs">
          Hech qanday o&apos;qituvchi topilmadi
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm"
            >
              <div className="flex flex-col items-center text-center">
                <Avatar className="size-16">
                  {t.avatar ? <AvatarImage src={t.avatar} alt={t.name} /> : null}
                  <AvatarFallback className="bg-blue-100 text-lg font-semibold text-blue-700">
                    {getInitials(t.name)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="mt-3 font-semibold text-slate-900">{t.name}</h2>
                <p className="mt-0.5 text-sm font-medium text-blue-600">
                  {t.role}
                </p>
                <Badge className={`mt-2 ${categoryColors[t.category]}`}>
                  {t.category}
                </Badge>
                <p className="mt-3 line-clamp-2 text-sm text-slate-500">
                  {t.bio}
                </p>
              </div>
              <Separator className="mt-4" />
              <div className="mt-4 grid grid-cols-3 text-center">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t.courses}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">Kurs</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t.students}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">Talaba</p>
                </div>
                <div>
                  <p className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-slate-900">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    {t.rating}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">Reyting</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
