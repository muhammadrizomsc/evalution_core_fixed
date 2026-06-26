import { Link } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  Bookmark,
  Calendar,
  Clock,
  Eye,
  Link2,
  Quote,
  ThumbsUp,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { blogPosts, categoryColors, getInitials, type Category } from "@/lib/data";
import { cn } from "@/lib/utils";

function badgeColor(category: string): string {
  return categoryColors[category as Category] ?? "bg-sky-100 text-sky-700";
}

function headingId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

function formatViews(views: number): string {
  return views >= 1000 ? `${(views / 1000).toFixed(1).replace(".0", "")}k` : String(views);
}

const sampleComments = [
  {
    name: "Jasur Toshpo'latov",
    avatar: "https://i.pravatar.cc/150?img=13",
    date: "11-iyun, 2026",
    text: "Juda foydali maqola bo'libdi! Ayniqsa o'rganish yo'li bosqichlari aniq yozilgan. Rahmat!",
  },
  {
    name: "Malika Sodiqova",
    avatar: "https://i.pravatar.cc/150?img=41",
    date: "11-iyun, 2026",
    text: "Men ham shu yo'ldan boshlagandim — HTML/CSS dan keyin JavaScript. Hozir frontend dasturchiman. Yangi boshlovchilarga tavsiya qilaman.",
  },
  {
    name: "Bekzod Nurmatov",
    avatar: "https://i.pravatar.cc/150?img=52",
    date: "10-iyun, 2026",
    text: "Portfolio haqidagi qism juda muhim. GitHub profilini tartibga keltirish haqiqatan ham intervyuda katta rol o'ynaydi.",
  },
];

export function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/404" replace />;

  const headings = post.content
    .filter((block) => block.heading)
    .map((block) => block.heading as string);

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
        
        <article className="min-w-0">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Bosh sahifa</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-wrap items-center gap-3">
            <Badge className={cn("border-0", badgeColor(post.category))}>
              {post.category}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="size-3.5" />
              {post.readMinutes} daqiqa o&rsquo;qish
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2.5">
              <Avatar size="lg">
                <AvatarImage src={post.authorAvatar} alt={post.author} />
                <AvatarFallback>{getInitials(post.author)}</AvatarFallback>
              </Avatar>
              <span>
                <span className="block font-medium text-foreground">{post.author}</span>
                <span className="text-xs">Muallif</span>
              </span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="size-3.5" />
              {formatViews(post.views)} ko&rsquo;rishlar
            </span>
          </div>

          <div className="relative mt-7 aspect-video overflow-hidden rounded-xl">
            <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
          </div>

          
          <div className="mt-8 space-y-6 leading-relaxed text-foreground/90">
            {post.content.map((block, index) => (
              <section key={index} className="space-y-4">
                {block.heading && (
                  <h2
                    id={headingId(block.heading)}
                    className="scroll-mt-24 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
                  >
                    {block.heading}
                  </h2>
                )}
                {block.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
                {block.list && (
                  <ul className="space-y-2 pl-1">
                    {block.list.map((item, lIndex) => (
                      <li key={lIndex} className="flex items-start gap-2.5">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {post.featured && index === 1 && (
                  <blockquote className="rounded-r-xl border-l-4 border-primary bg-blue-50/70 p-5">
                    <Quote className="mb-2 size-5 text-primary" />
                    <p className="font-medium text-foreground">
                      &ldquo;Eng yaxshi vaqt — kecha edi. Ikkinchi eng yaxshi vaqt —
                      bugun. Dasturlashni o&rsquo;rganishni bugun boshlang.&rdquo;
                    </p>
                  </blockquote>
                )}
              </section>
            ))}
          </div>

          
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t pt-6">
            <span className="text-sm font-medium text-muted-foreground">Teglar:</span>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          
          <Card className="mt-6 py-3">
            <CardContent className="flex items-center justify-between px-4">
              <span className="text-sm text-muted-foreground">
                Maqola foydali bo&rsquo;ldimi?
              </span>
              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="sm">
                  <ThumbsUp data-icon="inline-start" />
                  124
                </Button>
                <Button variant="outline" size="icon" aria-label="Saqlash">
                  <Bookmark />
                </Button>
                <Button variant="outline" size="icon" aria-label="Havolani nusxalash">
                  <Link2 />
                </Button>
              </div>
            </CardContent>
          </Card>

          
          <Card className="mt-10">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Izohlar ({sampleComments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="comment-name">Ism</Label>
                    <Input id="comment-name" placeholder="Ismingiz" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comment-email">Email</Label>
                    <Input
                      id="comment-email"
                      type="email"
                      placeholder="email@example.uz"
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment-text">Izoh</Label>
                  <Textarea
                    id="comment-text"
                    placeholder="Fikringizni yozing..."
                    className="min-h-24"
                  />
                </div>
                <div className="flex justify-end">
                  <Button size="lg" type="submit">
                    Yuborish
                  </Button>
                </div>
              </form>

              <Separator />

              <div className="space-y-6">
                {sampleComments.map((comment) => (
                  <div key={comment.name} className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={comment.avatar} alt={comment.name} />
                      <AvatarFallback>{getInitials(comment.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="text-sm font-medium">{comment.name}</span>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="mt-1 text-sm text-foreground/90">{comment.text}</p>
                      <button
                        type="button"
                        className="mt-1.5 text-xs font-medium text-primary hover:underline"
                      >
                        Javob berish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </article>

        
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Mundarija
                </CardTitle>
              </CardHeader>
              <CardContent>
                {headings.length > 0 ? (
                  <ul className="space-y-1 border-l">
                    {headings.map((heading) => (
                      <li key={heading}>
                        <a
                          href={`#${headingId(heading)}`}
                          className="-ml-px block border-l-2 border-transparent py-1 pl-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          {heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Bo&rsquo;limlar mavjud emas.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">O&rsquo;xshash maqolalar</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((relatedPost) => (
            <Card
              key={relatedPost.slug}
              className="group overflow-hidden p-0 transition-shadow hover:shadow-lg"
            >
              <Link to={`/blog/${relatedPost.slug}`} className="relative block aspect-video">
                <img src={relatedPost.image} alt={relatedPost.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center justify-between gap-2">
                  <Badge className={cn("border-0", badgeColor(relatedPost.category))}>
                    {relatedPost.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    {relatedPost.readMinutes} daqiqa
                  </span>
                </div>
                <Link to={`/blog/${relatedPost.slug}`}>
                  <h3 className="font-semibold leading-snug transition-colors group-hover:text-primary">
                    {relatedPost.title}
                  </h3>
                </Link>
                <Link
                  to={`/blog/${relatedPost.slug}`}
                  className="mt-auto flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  O&rsquo;qish
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
