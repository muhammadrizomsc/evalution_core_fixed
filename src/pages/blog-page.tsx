import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Eye } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { categoryColors, getInitials, type Category } from "@/lib/data";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar?: string;
  date: string;
  readMinutes: number;
  views: number;
  image: string;
  featured?: boolean;
}

const popularTags = [
  "Frontend",
  "Backend",
  "Dizayn",
  "Python",
  "React",
  "JavaScript",
  "Karyera",
  "ML",
  "DevOps",
  "Mobil",
];

function badgeColor(category: string): string {
  return categoryColors[category as Category] ?? "bg-sky-100 text-sky-700";
}

function formatViews(views: number): string {
  return views >= 1000 ? `${(views / 1000).toFixed(1).replace(".0", "")}k` : String(views);
}

const LIMIT = 9;

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    api
      .get<{ data: { items: Post[]; total: number } }>(`/public/blog?page=${page}&limit=${LIMIT}`)
      .then((res) => {
        setPosts(res.data.data.items ?? []);
        setTotal(res.data.data.total ?? 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : [];
  const totalPages = Math.ceil(total / LIMIT);

  const categoryCounts = posts.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] ?? 0) + 1;
    return acc;
  }, {});

  const popular = [...posts].sort((a, b) => b.views - a.views).slice(0, 4);

  return (
    <div>

      <section className="border-b bg-blue-50/60">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <Breadcrumb className="mb-4 flex justify-center">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Bosh sahifa</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Foydali maqolalar va yangiliklar
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            IT, dasturlash, dizayn va karyera bo&rsquo;yicha eng so&rsquo;nggi
            maqolalar va amaliy maslahatlar.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-72 w-full rounded-xl" />
            <div className="grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          </div>
        ) : featured ? (
          <>
            <Link to={`/blog/${featured.slug}`} className="group block">
              <Card className="overflow-hidden p-0 transition-shadow hover:shadow-lg lg:grid lg:grid-cols-2">
                <div className="relative aspect-video lg:aspect-auto lg:min-h-72">
                  <img src={featured.image} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="flex flex-col justify-center gap-4 p-6 lg:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-primary text-primary-foreground">Asosiy maqola</Badge>
                    <Badge className={cn("border-0", badgeColor(featured.category))}>
                      {featured.category}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary lg:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground">{featured.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarImage src={featured.authorAvatar} alt={featured.author} />
                        <AvatarFallback>{getInitials(featured.author)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{featured.author}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {featured.readMinutes} daqiqa o&rsquo;qish
                    </span>
                  </div>
                </div>
              </Card>
            </Link>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
              <div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {rest.map((post) => (
                    <Card key={post.slug} className="group overflow-hidden p-0 transition-shadow hover:shadow-lg">
                      <Link to={`/blog/${post.slug}`} className="relative block aspect-video">
                        <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      </Link>
                      <div className="flex flex-1 flex-col gap-3 p-5">
                        <div className="flex items-center justify-between gap-2">
                          <Badge className={cn("border-0", badgeColor(post.category))}>
                            {post.category}
                          </Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="size-3" />
                            {post.readMinutes} daqiqa
                          </span>
                        </div>
                        <Link to={`/blog/${post.slug}`}>
                          <h3 className="font-semibold leading-snug transition-colors group-hover:text-primary">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                        <div className="mt-auto flex items-center justify-between border-t pt-3">
                          <span className="flex items-center gap-2 text-sm">
                            <Avatar size="sm">
                              <AvatarImage src={post.authorAvatar} alt={post.author} />
                              <AvatarFallback>{getInitials(post.author)}</AvatarFallback>
                            </Avatar>
                            <span className="text-muted-foreground">{post.author}</span>
                          </span>
                          <Link
                            to={`/blog/${post.slug}`}
                            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                          >
                            O&rsquo;qish
                            <ArrowRight className="size-3.5" />
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination className="mt-10">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          text="Oldingi"
                          onClick={(e) => { e.preventDefault(); if (page > 1) setPage(page - 1); }}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i + 1}>
                          <PaginationLink
                            href="#"
                            isActive={page === i + 1}
                            onClick={(e) => { e.preventDefault(); setPage(i + 1); }}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          text="Keyingi"
                          onClick={(e) => { e.preventDefault(); if (page < totalPages) setPage(page + 1); }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>

              <aside className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Kategoriyalar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {Object.entries(categoryCounts).map(([category, count]) => (
                        <li key={category}>
                          <Link
                            to="/blog"
                            className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted"
                          >
                            <span>{category}</span>
                            <span className="text-muted-foreground">{count}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Mashhur maqolalar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {popular.map((post) => (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="group flex items-start gap-3"
                      >
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                          <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="line-clamp-2 text-sm font-medium leading-snug transition-colors group-hover:text-primary">
                            {post.title}
                          </p>
                          <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="size-3" />
                            {formatViews(post.views)} ko&rsquo;rishlar
                          </span>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Mashhur teglar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-muted"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </>
        ) : (
          <div className="py-16 text-center text-muted-foreground">
            Maqolalar topilmadi
          </div>
        )}
      </div>
    </div>
  );
}
