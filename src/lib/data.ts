/**
 * Mock data for O'quv Markaz — learning center management platform.
 * All content is in Uzbek (latin). Replace with real API calls in production.
 */

export type Category =
  | "Frontend"
  | "Backend"
  | "Dizayn"
  | "Mobil"
  | "Data Science"
  | "Marketing"
  | "DevOps";

export const categoryColors: Record<Category, string> = {
  Frontend: "bg-blue-100 text-blue-700",
  Backend: "bg-emerald-100 text-emerald-700",
  Dizayn: "bg-purple-100 text-purple-700",
  Mobil: "bg-orange-100 text-orange-700",
  "Data Science": "bg-red-100 text-red-700",
  Marketing: "bg-pink-100 text-pink-700",
  DevOps: "bg-violet-100 text-violet-700",
};

/* ------------------------------- Teachers ------------------------------- */

export interface Teacher {
  id: string;
  name: string;
  role: string;
  category: Category;
  bio: string;
  courses: number;
  students: number;
  rating: number;
  avatar: string;
}

export const teachers: Teacher[] = [
  { id: "t1", name: "Akmal Karimov", role: "JavaScript Lead", category: "Frontend", bio: "8 yillik frontend tajriba. EPAM va Uzcard'da ishlagan.", courses: 12, students: 540, rating: 4.9, avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "t2", name: "Madina Ergasheva", role: "UX/UI dizayner", category: "Dizayn", bio: "7 yillik tajriba. Yandex va Behance loyihalari.", courses: 8, students: 320, rating: 4.9, avatar: "https://i.pravatar.cc/150?img=47" },
  { id: "t3", name: "Sherzod Rahimov", role: "Python / Django Senior", category: "Backend", bio: "10 yillik backend tajriba. AWS sertifikatli.", courses: 15, students: 680, rating: 4.8, avatar: "https://i.pravatar.cc/150?img=53" },
  { id: "t4", name: "Nodira Yusupova", role: "React Developer", category: "Frontend", bio: "5 yillik React tajribasi. Fintech mahsulotlar muallifi.", courses: 6, students: 280, rating: 4.8, avatar: "https://i.pravatar.cc/150?img=44" },
  { id: "t5", name: "Sevara Tursunova", role: "Data Scientist", category: "Data Science", bio: "6 yillik ML tajribasi. Kaggle Master.", courses: 4, students: 160, rating: 4.7, avatar: "https://i.pravatar.cc/150?img=45" },
  { id: "t6", name: "Otabek Salimov", role: "Flutter Developer", category: "Mobil", bio: "5+ yillik mobil ilovalar tajribasi. 30+ ilova.", courses: 5, students: 210, rating: 4.8, avatar: "https://i.pravatar.cc/150?img=59" },
  { id: "t7", name: "Diloraxon Nazarova", role: "Marketing Expert", category: "Marketing", bio: "7 yillik raqamli marketing tajribasi. Google Ads sertifikatli.", courses: 3, students: 140, rating: 4.8, avatar: "https://i.pravatar.cc/150?img=32" },
  { id: "t8", name: "Jasur Mahmudov", role: "DevOps muhandisi", category: "DevOps", bio: "8 yillik DevOps tajribasi. AWS va Kubernetes mutaxassisi.", courses: 4, students: 180, rating: 4.7, avatar: "https://i.pravatar.cc/150?img=60" },
  { id: "t9", name: "Bekzod Salimov", role: "Backend Developer", category: "Backend", bio: "6 yillik Node.js tajribasi. Yirik fintech loyihalarida ishtirok etgan.", courses: 5, students: 220, rating: 4.7, avatar: "https://i.pravatar.cc/150?img=68" },
  { id: "t10", name: "Kamola Yusupova", role: "Grafik dizayner", category: "Dizayn", bio: "6 yillik tajriba. Adobe sertifikatli mutaxassis.", courses: 6, students: 280, rating: 4.9, avatar: "https://i.pravatar.cc/150?img=49" },
  { id: "t11", name: "Aziz Inomov", role: "Java Developer", category: "Backend", bio: "7 yillik enterprise Java tajribasi. Spring mutaxassisi.", courses: 4, students: 190, rating: 4.6, avatar: "https://i.pravatar.cc/150?img=66" },
  { id: "t12", name: "Gulnora Rasulova", role: "Product Designer", category: "Dizayn", bio: "6 yillik mahsulot dizayni tajribasi. Tinkoff loyihasida ishlagan.", courses: 7, students: 250, rating: 4.8, avatar: "https://i.pravatar.cc/150?img=31" },
];

/* -------------------------------- Courses ------------------------------- */

export interface Course {
  slug: string;
  title: string;
  category: Category;
  rating: number;
  reviews: number;
  durationMonths: number;
  lessonsPerWeek: number;
  totalLessons: number;
  price: number;
  oldPrice?: number;
  level: "Boshlovchi" | "O'rtacha" | "Mutaxassis";
  teacherId: string;
  image: string;
  excerpt: string;
  description: string;
  outcomes: string[];
  audience: string[];
  startDate: string;
  seatsLeft: number;
  seatsTotal: number;
  popular?: boolean;
}

export const courses: Course[] = [
  {
    slug: "javascript-dasturlash",
    title: "JavaScript dasturlash",
    category: "Frontend",
    rating: 4.8,
    reviews: 124,
    durationMonths: 5,
    lessonsPerWeek: 3,
    totalLessons: 60,
    price: 490000,
    oldPrice: 590000,
    level: "Boshlovchi",
    teacherId: "t1",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    excerpt: "ES6+, DOM, asinxronlik va real loyihalar bilan to'liq kurs.",
    description:
      "JavaScript — zamonaviy web ilovalarning asosi. Bu kurs sizga hech qanday oldindan tajriba kerak emas — biz noldan boshlab to'liq fullstack JavaScript dasturchisigacha ko'tarmiz. Har dars nazariy va amaliy mashg'ulotlardan iborat bo'lib, kurs davomida 5 ta real loyiha ustida ishlaysiz va portfolioga ega bo'lasiz.",
    outcomes: [
      "JavaScript asoslari va sintaksisi",
      "ES6+: arrow, destructuring, spread",
      "DOM va hodisalar bilan ishlash",
      "Asinxronlik va Promise",
      "Fetch va REST API bilan ishlash",
      "OOP prinsiplari",
      "5 ta real loyiha portfolio uchun",
      "Test asoslari (Jest)",
    ],
    audience: [
      "JavaScript'dan ishlash boshlamoqchi dasturchilar uchun",
      "Karyerasini o'zgartirmoqchi bo'lganlar uchun",
      "Frontend yoki fullstack dasturchi bo'lishni xohlaganlar uchun",
      "Yangi mahorat o'rganishga qiziqqan har kim uchun",
    ],
    startDate: "1-iyun, 2026",
    seatsLeft: 8,
    seatsTotal: 20,
    popular: true,
  },
  {
    slug: "react-js-asoslari",
    title: "React.js asoslari",
    category: "Frontend",
    rating: 4.9,
    reviews: 98,
    durationMonths: 3,
    lessonsPerWeek: 3,
    totalLessons: 36,
    price: 790000,
    level: "O'rtacha",
    teacherId: "t4",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    excerpt: "Komponentlar, Hooks, Redux va Next.js bilan zamonaviy frontend.",
    description:
      "React — dunyodagi eng mashhur frontend kutubxonasi. Bu kursda komponentlar, hooks, state boshqaruvi va Next.js framework'i bilan zamonaviy web ilovalar qurishni o'rganasiz.",
    outcomes: ["Komponentlar va props", "Hooks va state boshqaruvi", "Redux Toolkit", "Next.js asoslari", "Real SPA loyihalar", "Deploy va optimizatsiya"],
    audience: ["JavaScript bilan tanish bo'lganlar uchun", "Frontend yo'nalishini chuqurlashtirmoqchi bo'lganlar uchun"],
    startDate: "15-iyun, 2026",
    seatsLeft: 5,
    seatsTotal: 18,
    popular: true,
  },
  {
    slug: "ux-ui-dizayn",
    title: "UX/UI dizayn",
    category: "Dizayn",
    rating: 4.9,
    reviews: 86,
    durationMonths: 4,
    lessonsPerWeek: 3,
    totalLessons: 48,
    price: 890000,
    level: "Boshlovchi",
    teacherId: "t2",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    excerpt: "Figma, foydalanuvchi tadqiqoti, wireframe, prototip va portfolio yaratish.",
    description:
      "UX/UI dizayn kursida foydalanuvchi tadqiqotidan tortib pixel-perfect interfeyslar yaratishgacha bo'lgan to'liq jarayonni o'rganasiz. Kurs yakunida professional portfolio bilan chiqasiz.",
    outcomes: ["Figma professional darajada", "UX tadqiqot usullari", "Wireframe va prototiplash", "Dizayn tizimlari", "Portfolio yaratish"],
    audience: ["Dizaynga qiziquvchilar uchun", "Grafik dizaynerlar uchun", "Frontend dasturchilar uchun"],
    startDate: "10-iyun, 2026",
    seatsLeft: 7,
    seatsTotal: 15,
  },
  {
    slug: "python-dasturchilik",
    title: "Python dasturchilik",
    category: "Backend",
    rating: 4.7,
    reviews: 112,
    durationMonths: 5,
    lessonsPerWeek: 3,
    totalLessons: 60,
    price: 790000,
    level: "Boshlovchi",
    teacherId: "t3",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80",
    excerpt: "Python asoslari, OOP, Django, REST API va ma'lumotlar bazasi.",
    description:
      "Python — eng ko'p qo'llaniladigan dasturlash tillaridan biri. Kursda til asoslaridan tortib Django framework bilan to'liq backend tizimlar qurishgacha o'rganasiz.",
    outcomes: ["Python sintaksisi va OOP", "Django framework", "REST API yaratish", "PostgreSQL bilan ishlash", "Deploy jarayoni"],
    audience: ["Backend yo'nalishini tanlaganlar uchun", "Dasturlashni noldan boshlaganlar uchun"],
    startDate: "5-iyun, 2026",
    seatsLeft: 10,
    seatsTotal: 20,
  },
  {
    slug: "flutter-mobil-ilovalar",
    title: "Flutter mobil ilovalar",
    category: "Mobil",
    rating: 4.8,
    reviews: 64,
    durationMonths: 4,
    lessonsPerWeek: 3,
    totalLessons: 48,
    price: 990000,
    level: "O'rtacha",
    teacherId: "t6",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80",
    excerpt: "Dart tili, CIS va Android uchun yagona kod — mobil dasturlash.",
    description:
      "Flutter yordamida bitta kod bazasi bilan iOS va Android ilovalar yaratishni o'rganasiz. Dart tilidan boshlab App Store va Play Market'ga ilova chiqarishgacha.",
    outcomes: ["Dart tili", "Flutter widgets", "State management", "Firebase integratsiya", "Store'ga chiqarish"],
    audience: ["Mobil dasturlashga qiziquvchilar uchun", "Dasturlash asoslarini bilganlar uchun"],
    startDate: "20-iyun, 2026",
    seatsLeft: 6,
    seatsTotal: 15,
  },
  {
    slug: "data-science-va-ml",
    title: "Data Science va ML",
    category: "Data Science",
    rating: 4.6,
    reviews: 42,
    durationMonths: 6,
    lessonsPerWeek: 3,
    totalLessons: 72,
    price: 1200000,
    level: "Mutaxassis",
    teacherId: "t5",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    excerpt: "Pandas, NumPy, vizualizatsiya va Machine Learning modellar.",
    description:
      "Ma'lumotlar tahlili va sun'iy intellekt sohasiga kirish. Pandas, NumPy, scikit-learn va chuqur o'rganish asoslari bilan real loyihalar ustida ishlaysiz.",
    outcomes: ["Python for Data Science", "Pandas va NumPy", "Ma'lumotlar vizualizatsiyasi", "ML algoritmlar", "Real dataset loyihalar"],
    audience: ["Matematikaga qiziquvchilar uchun", "Tahlilchi bo'lishni xohlaganlar uchun"],
    startDate: "1-iyul, 2026",
    seatsLeft: 9,
    seatsTotal: 12,
  },
  {
    slug: "devops-muhandisi",
    title: "DevOps muhandisi",
    category: "DevOps",
    rating: 4.7,
    reviews: 38,
    durationMonths: 6,
    lessonsPerWeek: 3,
    totalLessons: 72,
    price: 1500000,
    level: "Mutaxassis",
    teacherId: "t8",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80",
    excerpt: "Linux, Docker, Kubernetes, CI/CD va AWS bulut infratuzilmasi.",
    description:
      "DevOps muhandisligi — eng yuqori maoshli IT yo'nalishlaridan biri. Linux asoslaridan Kubernetes klasterlari boshqaruvigacha amaliy o'rganasiz.",
    outcomes: ["Linux administrlash", "Docker va konteynerlar", "Kubernetes", "CI/CD pipeline", "AWS xizmatlari"],
    audience: ["Tizim administratorlari uchun", "Backend dasturchilar uchun"],
    startDate: "10-iyul, 2026",
    seatsLeft: 4,
    seatsTotal: 10,
  },
  {
    slug: "raqamli-marketing",
    title: "Raqamli marketing",
    category: "Marketing",
    rating: 4.6,
    reviews: 56,
    durationMonths: 3,
    lessonsPerWeek: 3,
    totalLessons: 36,
    price: 690000,
    level: "Boshlovchi",
    teacherId: "t7",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    excerpt: "SMM, kontent marketing, Google Ads, SEO va analitika.",
    description:
      "Raqamli marketing kursida ijtimoiy tarmoqlar, reklama kampaniyalari va analitika asboblarini professional darajada boshqarishni o'rganasiz.",
    outcomes: ["SMM strategiya", "Google Ads va Target", "SEO asoslari", "Kontent marketing", "Analitika"],
    audience: ["Marketing sohasiga kiruvchilar uchun", "Tadbirkorlar uchun"],
    startDate: "8-iyun, 2026",
    seatsLeft: 12,
    seatsTotal: 25,
  },
  {
    slug: "nodejs-dasturlash",
    title: "Node.js dasturlash",
    category: "Backend",
    rating: 4.7,
    reviews: 47,
    durationMonths: 4,
    lessonsPerWeek: 3,
    totalLessons: 48,
    price: 890000,
    level: "O'rtacha",
    teacherId: "t9",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
    excerpt: "Express.js, MongoDB, REST API va WebSocket bilan backend qurish.",
    description:
      "JavaScript bilimingizni server tomonga olib chiqing. Express.js, MongoDB va real-time texnologiyalar bilan professional backend tizimlar yaratasiz.",
    outcomes: ["Node.js asoslari", "Express.js", "MongoDB va Mongoose", "REST API va autentifikatsiya", "WebSocket"],
    audience: ["JavaScript bilganlar uchun", "Fullstack bo'lishni xohlaganlar uchun"],
    startDate: "25-iyun, 2026",
    seatsLeft: 8,
    seatsTotal: 16,
  },
  {
    slug: "html-css-asoslari",
    title: "HTML & CSS asoslari",
    category: "Frontend",
    rating: 4.8,
    reviews: 156,
    durationMonths: 2,
    lessonsPerWeek: 3,
    totalLessons: 24,
    price: 390000,
    level: "Boshlovchi",
    teacherId: "t1",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    excerpt: "Semantik HTML, zamonaviy CSS, Flexbox, Grid va responsive dizayn.",
    description:
      "Web dasturlashning poydevori. Semantik HTML, zamonaviy CSS, Flexbox, Grid va responsive dizayn bilan professional saytlar yaratishni o'rganasiz.",
    outcomes: ["Semantik HTML5", "CSS3 va animatsiyalar", "Flexbox va Grid", "Responsive dizayn", "Sass asoslari"],
    audience: ["Noldan boshlaganlar uchun", "Dizaynerlar uchun"],
    startDate: "3-iyun, 2026",
    seatsLeft: 15,
    seatsTotal: 25,
  },
  {
    slug: "grafik-dizayn",
    title: "Grafik dizayn",
    category: "Dizayn",
    rating: 4.7,
    reviews: 73,
    durationMonths: 3,
    lessonsPerWeek: 3,
    totalLessons: 36,
    price: 690000,
    level: "Boshlovchi",
    teacherId: "t10",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    excerpt: "Adobe Illustrator, Photoshop va branding — grafik dizayn poydevori.",
    description:
      "Grafik dizayn kursida Adobe dasturlari, kompozitsiya, tipografika va brend identifikatsiyasi yaratishni professional darajada o'rganasiz.",
    outcomes: ["Adobe Photoshop", "Adobe Illustrator", "Tipografika", "Logo va branding", "Portfolio"],
    audience: ["Ijodkorlar uchun", "Marketing mutaxassislari uchun"],
    startDate: "12-iyun, 2026",
    seatsLeft: 9,
    seatsTotal: 18,
  },
  {
    slug: "typescript",
    title: "TypeScript",
    category: "Frontend",
    rating: 4.8,
    reviews: 39,
    durationMonths: 2,
    lessonsPerWeek: 3,
    totalLessons: 24,
    price: 590000,
    level: "O'rtacha",
    teacherId: "t4",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
    excerpt: "Tip xavfsizligi, generic, dekorator va katta loyihalarda TS.",
    description:
      "TypeScript — katta loyihalarning standarti. Tip tizimi, generics va zamonaviy patterns bilan ishonchli kod yozishni o'rganasiz.",
    outcomes: ["Tip tizimi", "Interfaces va generics", "Utility types", "React + TypeScript", "Katta loyiha arxitekturasi"],
    audience: ["JavaScript dasturchilar uchun", "React dasturchilar uchun"],
    startDate: "18-iyun, 2026",
    seatsLeft: 11,
    seatsTotal: 16,
  },
];

/* -------------------------------- Groups -------------------------------- */

export type GroupStatus = "Faol" | "Boshlanmagan" | "Tugagan";

export interface Group {
  id: string;
  name: string;
  courseSlug: string;
  courseTitle: string;
  category: Category;
  teacherId: string;
  studentsCount: number;
  startDate: string;
  endDate?: string;
  days: string[];
  time: string;
  room: string;
  status: GroupStatus;
  attendanceRate: number;
}

export const groups: Group[] = [
  { id: "frontend-01", name: "Frontend-01", courseSlug: "javascript-dasturlash", courseTitle: "JavaScript dasturlash", category: "Frontend", teacherId: "t1", studentsCount: 18, startDate: "15-okt, 2025", endDate: "15-yan, 2026", days: ["Du", "Cho", "Ju"], time: "09:00", room: "Xona 3", status: "Faol", attendanceRate: 94 },
  { id: "frontend-02", name: "Frontend-02", courseSlug: "javascript-dasturlash", courseTitle: "JavaScript dasturlash", category: "Frontend", teacherId: "t1", studentsCount: 16, startDate: "1-noy, 2025", days: ["Du", "Cho", "Ju"], time: "15:30", room: "Xona 3", status: "Faol", attendanceRate: 91 },
  { id: "react-01", name: "React-01", courseSlug: "react-js-asoslari", courseTitle: "React.js asoslari", category: "Frontend", teacherId: "t4", studentsCount: 14, startDate: "1-dek, 2025", days: ["Se", "Pa", "Sha"], time: "11:00", room: "Xona 2", status: "Boshlanmagan", attendanceRate: 0 },
  { id: "backend-03", name: "Backend-03", courseSlug: "python-dasturchilik", courseTitle: "Python dasturchilik", category: "Backend", teacherId: "t3", studentsCount: 20, startDate: "10-sen, 2025", days: ["Du", "Cho", "Ju"], time: "13:30", room: "Xona 1", status: "Faol", attendanceRate: 89 },
  { id: "backend-04", name: "Backend-04", courseSlug: "nodejs-dasturlash", courseTitle: "Node.js dasturlash", category: "Backend", teacherId: "t9", studentsCount: 12, startDate: "5-dek, 2025", days: ["Se", "Pa", "Sha"], time: "17:30", room: "Xona 4", status: "Boshlanmagan", attendanceRate: 0 },
  { id: "dizayn-01", name: "Dizayn-01", courseSlug: "ux-ui-dizayn", courseTitle: "UX/UI dizayn", category: "Dizayn", teacherId: "t2", studentsCount: 15, startDate: "1-okt, 2025", days: ["Se", "Cho", "Ju"], time: "11:30", room: "Xona 2", status: "Faol", attendanceRate: 92 },
  { id: "dizayn-02", name: "Dizayn-02", courseSlug: "ux-ui-dizayn", courseTitle: "UX/UI dizayn", category: "Dizayn", teacherId: "t2", studentsCount: 14, startDate: "15-noy, 2025", days: ["Se", "Pa", "Sha"], time: "09:30", room: "Xona 5", status: "Faol", attendanceRate: 90 },
  { id: "mobil-01", name: "Mobil-01", courseSlug: "flutter-mobil-ilovalar", courseTitle: "Flutter", category: "Mobil", teacherId: "t6", studentsCount: 13, startDate: "10-noy, 2025", days: ["Du", "Cho", "Ju"], time: "17:30", room: "Xona 4", status: "Faol", attendanceRate: 88 },
  { id: "data-01", name: "Data-01", courseSlug: "data-science-va-ml", courseTitle: "Data Science", category: "Data Science", teacherId: "t5", studentsCount: 10, startDate: "5-okt, 2025", days: ["Se", "Pa", "Sha"], time: "13:30", room: "Xona 1", status: "Faol", attendanceRate: 86 },
  { id: "devops-01", name: "DevOps-01", courseSlug: "devops-muhandisi", courseTitle: "DevOps muhandisi", category: "DevOps", teacherId: "t8", studentsCount: 8, startDate: "1-dek, 2025", days: ["Du", "Cho", "Ju"], time: "19:00", room: "Xona 1", status: "Boshlanmagan", attendanceRate: 0 },
  { id: "marketing-01", name: "Marketing-01", courseSlug: "raqamli-marketing", courseTitle: "Raqamli marketing", category: "Marketing", teacherId: "t7", studentsCount: 22, startDate: "20-okt, 2025", days: ["Du", "Cho", "Ju"], time: "14:00", room: "Xona 5", status: "Faol", attendanceRate: 93 },
  { id: "java-01", name: "Java-01", courseSlug: "nodejs-dasturlash", courseTitle: "Java + Spring", category: "Backend", teacherId: "t11", studentsCount: 9, startDate: "1-dek, 2025", days: ["Se", "Pa", "Sha"], time: "15:30", room: "Xona 2", status: "Boshlanmagan", attendanceRate: 0 },
];

/* ------------------------------- Students ------------------------------- */

export type PaymentStatus = "To'langan" | "Qarzdor" | "Kutilmoqda";
export type StudentStatus = "Faol" | "Nofaol";

export interface Student {
  id: string;
  code: string;
  name: string;
  phone: string;
  email: string;
  telegram: string;
  address: string;
  groupId: string;
  groupName: string;
  payment: PaymentStatus;
  status: StudentStatus;
  attendance: number;
  avgGrade: number;
  avatar: string;
  birthDate: string;
  age: number;
  gender: "Erkak" | "Ayol";
  nationality: string;
  passport: string;
  joinedAt: string;
  father: { name: string; birthDate: string; phone: string; work: string };
  mother: { name: string; birthDate: string; phone: string; work: string };
}

const parentDefaults = {
  father: { name: "Tojiev Akmal Karimovich", birthDate: "6-iyun, 1975", phone: "+998 93 111 22 33", work: "\"Uztelecom\" AJ — muhandis" },
  mother: { name: "Tojieva Munira Rasulovna", birthDate: "22-aprel, 1978", phone: "+998 91 222 33 44", work: "O'qituvchi (matematika)" },
};

export const students: Student[] = [
  { id: "s1", code: "ST-0123", name: "Bobur Tojiev", phone: "+998 90 123 45 67", email: "bobur.tojiev@gmail.com", telegram: "@bobur_dev", address: "Toshkent shahar, Mirzo Ulug'bek tumani, Sayilgoh ko'chasi 24-uy", groupId: "frontend-01", groupName: "Frontend-01", payment: "To'langan", status: "Faol", attendance: 94, avgGrade: 86, avatar: "https://i.pravatar.cc/150?img=11", birthDate: "12-mart, 2003-yil", age: 22, gender: "Erkak", nationality: "O'zbek", passport: "AA 1234567", joinedAt: "15-iyul, 2025", ...parentDefaults },
  { id: "s2", code: "ST-0124", name: "Zilola Ahmedova", phone: "+998 91 234 56 78", email: "zilola.a@gmail.com", telegram: "@zilola_a", address: "Toshkent shahar, Chilonzor tumani", groupId: "dizayn-02", groupName: "Dizayn-02", payment: "To'langan", status: "Faol", attendance: 92, avgGrade: 88, avatar: "https://i.pravatar.cc/150?img=20", birthDate: "5-may, 2004-yil", age: 21, gender: "Ayol", nationality: "O'zbek", passport: "AA 2234567", joinedAt: "1-avg, 2025", ...parentDefaults },
  { id: "s3", code: "ST-0125", name: "Rustam Olimov", phone: "+998 93 345 67 89", email: "rustam.o@gmail.com", telegram: "@rustam_o", address: "Toshkent shahar, Yunusobod tumani", groupId: "backend-03", groupName: "Backend-03", payment: "Kutilmoqda", status: "Faol", attendance: 80, avgGrade: 84, avatar: "https://i.pravatar.cc/150?img=15", birthDate: "18-yan, 2002-yil", age: 24, gender: "Erkak", nationality: "O'zbek", passport: "AA 3234567", joinedAt: "10-sen, 2025", ...parentDefaults },
  { id: "s4", code: "ST-0126", name: "Lola Karimova", phone: "+998 94 456 78 90", email: "lola.k@gmail.com", telegram: "@lola_k", address: "Toshkent shahar, Shayxontohur tumani", groupId: "frontend-01", groupName: "Frontend-01", payment: "Qarzdor", status: "Faol", attendance: 92, avgGrade: 85, avatar: "https://i.pravatar.cc/150?img=24", birthDate: "2-fev, 2003-yil", age: 23, gender: "Ayol", nationality: "O'zbek", passport: "AA 4234567", joinedAt: "15-iyul, 2025", ...parentDefaults },
  { id: "s5", code: "ST-0127", name: "Madina Nazarova", phone: "+998 95 567 89 01", email: "madina.n@gmail.com", telegram: "@madina_n", address: "Toshkent shahar, Olmazor tumani", groupId: "dizayn-02", groupName: "Dizayn-02", payment: "To'langan", status: "Faol", attendance: 95, avgGrade: 90, avatar: "https://i.pravatar.cc/150?img=26", birthDate: "30-iyun, 2004-yil", age: 21, gender: "Ayol", nationality: "O'zbek", passport: "AA 5234567", joinedAt: "15-noy, 2025", ...parentDefaults },
  { id: "s6", code: "ST-0128", name: "Davron Saidov", phone: "+998 97 678 90 12", email: "davron.s@gmail.com", telegram: "@davron_s", address: "Toshkent shahar, Bektemir tumani", groupId: "backend-03", groupName: "Backend-03", payment: "To'langan", status: "Faol", attendance: 95, avgGrade: 87, avatar: "https://i.pravatar.cc/150?img=33", birthDate: "9-okt, 2001-yil", age: 24, gender: "Erkak", nationality: "O'zbek", passport: "AA 6234567", joinedAt: "10-sen, 2025", ...parentDefaults },
  { id: "s7", code: "ST-0129", name: "Sevinch Rahmatova", phone: "+998 98 789 01 23", email: "sevinch.r@gmail.com", telegram: "@sevinch_r", address: "Toshkent shahar, Uchtepa tumani", groupId: "frontend-02", groupName: "Frontend-02", payment: "Qarzdor", status: "Faol", attendance: 93, avgGrade: 91, avatar: "https://i.pravatar.cc/150?img=29", birthDate: "14-dek, 2003-yil", age: 22, gender: "Ayol", nationality: "O'zbek", passport: "AA 7234567", joinedAt: "1-noy, 2025", ...parentDefaults },
  { id: "s8", code: "ST-0130", name: "Sardor Yusupov", phone: "+998 99 890 12 34", email: "sardor.y@gmail.com", telegram: "@sardor_y", address: "Toshkent shahar, Sergeli tumani", groupId: "mobil-01", groupName: "Mobil-01", payment: "To'langan", status: "Nofaol", attendance: 70, avgGrade: 72, avatar: "https://i.pravatar.cc/150?img=51", birthDate: "21-mart, 2000-yil", age: 26, gender: "Erkak", nationality: "O'zbek", passport: "AA 8234567", joinedAt: "10-noy, 2025", ...parentDefaults },
  { id: "s9", code: "ST-0131", name: "Mavluda Ergasheva", phone: "+998 90 901 23 45", email: "mavluda.e@gmail.com", telegram: "@mavluda_e", address: "Toshkent shahar, Yakkasaroy tumani", groupId: "dizayn-02", groupName: "Dizayn-02", payment: "To'langan", status: "Faol", attendance: 82, avgGrade: 79, avatar: "https://i.pravatar.cc/150?img=21", birthDate: "8-avg, 2004-yil", age: 21, gender: "Ayol", nationality: "O'zbek", passport: "AA 9234567", joinedAt: "15-noy, 2025", ...parentDefaults },
  { id: "s10", code: "ST-0132", name: "Zafar Aliyev", phone: "+998 91 012 34 56", email: "zafar.a@gmail.com", telegram: "@zafar_a", address: "Toshkent shahar, Mirobod tumani", groupId: "devops-01", groupName: "DevOps-01", payment: "To'langan", status: "Faol", attendance: 90, avgGrade: 83, avatar: "https://i.pravatar.cc/150?img=56", birthDate: "3-noy, 1999-yil", age: 26, gender: "Erkak", nationality: "O'zbek", passport: "AB 1234567", joinedAt: "1-dek, 2025", ...parentDefaults },
  { id: "s11", code: "ST-0133", name: "Akmal Karimov", phone: "+998 93 111 22 33", email: "akmal.k@gmail.com", telegram: "@akmal_k", address: "Toshkent shahar, Mirzo Ulug'bek tumani", groupId: "frontend-01", groupName: "Frontend-01", payment: "To'langan", status: "Faol", attendance: 96, avgGrade: 92, avatar: "", birthDate: "25-iyul, 2003-yil", age: 22, gender: "Erkak", nationality: "O'zbek", passport: "AB 2234567", joinedAt: "15-iyul, 2025", ...parentDefaults },
  { id: "s12", code: "ST-0134", name: "Gulshan Tursunova", phone: "+998 94 222 33 44", email: "gulshan.t@gmail.com", telegram: "@gulshan_t", address: "Toshkent shahar, Chilonzor tumani", groupId: "marketing-01", groupName: "Marketing-01", payment: "Kutilmoqda", status: "Faol", attendance: 88, avgGrade: 82, avatar: "https://i.pravatar.cc/150?img=23", birthDate: "11-sen, 2002-yil", age: 23, gender: "Ayol", nationality: "O'zbek", passport: "AB 3234567", joinedAt: "20-okt, 2025", ...parentDefaults },
  { id: "s13", code: "ST-0135", name: "Murod Bekov", phone: "+998 95 333 44 55", email: "murod.b@gmail.com", telegram: "@murod_b", address: "Toshkent shahar, Yashnobod tumani", groupId: "backend-03", groupName: "Backend-03", payment: "To'langan", status: "Faol", attendance: 87, avgGrade: 80, avatar: "https://i.pravatar.cc/150?img=61", birthDate: "29-apr, 2001-yil", age: 25, gender: "Erkak", nationality: "O'zbek", passport: "AB 4234567", joinedAt: "10-sen, 2025", ...parentDefaults },
  { id: "s14", code: "ST-0136", name: "Nargiza Salimova", phone: "+998 97 444 55 66", email: "nargiza.s@gmail.com", telegram: "@nargiza_s", address: "Toshkent shahar, Olmazor tumani", groupId: "dizayn-01", groupName: "Dizayn-01", payment: "To'langan", status: "Faol", attendance: 91, avgGrade: 89, avatar: "https://i.pravatar.cc/150?img=27", birthDate: "17-okt, 2003-yil", age: 22, gender: "Ayol", nationality: "O'zbek", passport: "AB 5234567", joinedAt: "1-okt, 2025", ...parentDefaults },
  { id: "s15", code: "ST-0137", name: "Iroda Mahmudova", phone: "+998 98 555 66 77", email: "iroda.m@gmail.com", telegram: "@iroda_m", address: "Toshkent shahar, Yunusobod tumani", groupId: "frontend-02", groupName: "Frontend-02", payment: "To'langan", status: "Faol", attendance: 89, avgGrade: 85, avatar: "https://i.pravatar.cc/150?img=37", birthDate: "6-yan, 2004-yil", age: 22, gender: "Ayol", nationality: "O'zbek", passport: "AB 6234567", joinedAt: "1-noy, 2025", ...parentDefaults },
];

export const totalStudents = 124;

/* ---------------------------- Group members ----------------------------- */

export interface GroupMember {
  studentId: string;
  name: string;
  phone: string;
  attendance: number;
  avgGrade: number;
  payment: PaymentStatus;
  avatar: string;
}

export const frontendGroupMembers: GroupMember[] = [
  { studentId: "s1", name: "Bobur Tojiev", phone: "+998 90 123 45 67", attendance: 94, avgGrade: 86, payment: "To'langan", avatar: "https://i.pravatar.cc/150?img=11" },
  { studentId: "s4", name: "Lola Karimova", phone: "+998 94 456 78 90", attendance: 92, avgGrade: 85, payment: "Qarzdor", avatar: "https://i.pravatar.cc/150?img=24" },
  { studentId: "s11", name: "Akmal Karimov", phone: "+998 93 111 22 33", attendance: 96, avgGrade: 92, payment: "To'langan", avatar: "" },
  { studentId: "s9", name: "Mavluda Ergasheva", phone: "+998 90 901 23 45", attendance: 82, avgGrade: 79, payment: "To'langan", avatar: "https://i.pravatar.cc/150?img=21" },
  { studentId: "s6", name: "Davron Saidov", phone: "+998 97 678 90 12", attendance: 95, avgGrade: 87, payment: "To'langan", avatar: "https://i.pravatar.cc/150?img=33" },
  { studentId: "s3", name: "Rustam Olimov", phone: "+998 93 345 67 89", attendance: 80, avgGrade: 84, payment: "Kutilmoqda", avatar: "https://i.pravatar.cc/150?img=15" },
  { studentId: "s7", name: "Sevinch Rahmatova", phone: "+998 98 789 01 23", attendance: 93, avgGrade: 91, payment: "Qarzdor", avatar: "https://i.pravatar.cc/150?img=29" },
  { studentId: "s12", name: "Gulshan Tursunova", phone: "+998 94 222 33 44", attendance: 88, avgGrade: 82, payment: "To'langan", avatar: "https://i.pravatar.cc/150?img=23" },
];

/* ------------------------------ Attendance ------------------------------ */

export type AttendanceStatus = "keldi" | "kechikdi" | "kelmadi";

export interface AttendanceEntry {
  studentId: string;
  name: string;
  code: string;
  avatar: string;
  status: AttendanceStatus;
  note: string;
}

export const attendanceToday: AttendanceEntry[] = [
  { studentId: "s1", name: "Bobur Tojiev", code: "ST-0123", avatar: "https://i.pravatar.cc/150?img=11", status: "keldi", note: "" },
  { studentId: "s4", name: "Lola Karimova", code: "ST-0126", avatar: "https://i.pravatar.cc/150?img=24", status: "keldi", note: "" },
  { studentId: "s11", name: "Akmal Karimov", code: "ST-0133", avatar: "", status: "keldi", note: "" },
  { studentId: "s9", name: "Mavluda Ergasheva", code: "ST-0131", avatar: "https://i.pravatar.cc/150?img=21", status: "kechikdi", note: "15 daqiqa kechikdi" },
  { studentId: "s6", name: "Davron Saidov", code: "ST-0128", avatar: "https://i.pravatar.cc/150?img=33", status: "keldi", note: "" },
  { studentId: "s3", name: "Rustam Olimov", code: "ST-0125", avatar: "https://i.pravatar.cc/150?img=15", status: "kelmadi", note: "Kasal, oilasidan xabar bor" },
  { studentId: "s7", name: "Sevinch Rahmatova", code: "ST-0129", avatar: "https://i.pravatar.cc/150?img=29", status: "keldi", note: "" },
  { studentId: "s12", name: "Gulshan Tursunova", code: "ST-0134", avatar: "https://i.pravatar.cc/150?img=23", status: "kechikdi", note: "Transport muammosi" },
];

/* ------------------------------- Schedule ------------------------------- */

export interface Lesson {
  id: string;
  groupName: string;
  teacherShort: string;
  room: string;
  day: number; // 0 = Dushanba ... 6 = Yakshanba
  start: string; // "09:00"
  durationHours: number;
  color: "blue" | "green" | "purple" | "red" | "yellow" | "violet" | "sky";
}

export const weekLessons: Lesson[] = [
  { id: "l1", groupName: "Frontend-01", teacherShort: "A. Karimov", room: "Xona 3", day: 0, start: "09:00", durationHours: 1, color: "blue" },
  { id: "l2", groupName: "Frontend-01", teacherShort: "A. Karimov", room: "Xona 3", day: 2, start: "09:00", durationHours: 1, color: "blue" },
  { id: "l3", groupName: "Frontend-01", teacherShort: "A. Karimov", room: "Xona 3", day: 4, start: "09:00", durationHours: 1, color: "blue" },
  { id: "l4", groupName: "Dizayn-02", teacherShort: "M. Ergasheva", room: "Xona 5", day: 5, start: "09:00", durationHours: 1, color: "purple" },
  { id: "l5", groupName: "Dizayn-01", teacherShort: "M. Ergasheva", room: "Xona 2", day: 0, start: "11:00", durationHours: 1, color: "purple" },
  { id: "l6", groupName: "React-01", teacherShort: "N. Yusupova", room: "Xona 2", day: 1, start: "11:00", durationHours: 1, color: "sky" },
  { id: "l7", groupName: "Dizayn-01", teacherShort: "M. Ergasheva", room: "Xona 2", day: 2, start: "11:00", durationHours: 1, color: "purple" },
  { id: "l8", groupName: "React-01", teacherShort: "N. Yusupova", room: "Xona 2", day: 3, start: "11:00", durationHours: 1, color: "sky" },
  { id: "l9", groupName: "Dizayn-01", teacherShort: "M. Ergasheva", room: "Xona 2", day: 4, start: "11:00", durationHours: 1, color: "purple" },
  { id: "l10", groupName: "React-01", teacherShort: "N. Yusupova", room: "Xona 2", day: 5, start: "11:00", durationHours: 1, color: "sky" },
  { id: "l11", groupName: "Backend-03", teacherShort: "S. Rahimov", room: "Xona 1", day: 0, start: "13:00", durationHours: 1, color: "green" },
  { id: "l12", groupName: "Data-01", teacherShort: "S. Tursunova", room: "Xona 1", day: 1, start: "13:00", durationHours: 1, color: "red" },
  { id: "l13", groupName: "Backend-03", teacherShort: "S. Rahimov", room: "Xona 1", day: 2, start: "13:00", durationHours: 1, color: "green" },
  { id: "l14", groupName: "Data-01", teacherShort: "S. Tursunova", room: "Xona 1", day: 3, start: "13:00", durationHours: 1, color: "red" },
  { id: "l15", groupName: "Backend-03", teacherShort: "S. Rahimov", room: "Xona 1", day: 4, start: "13:00", durationHours: 1, color: "green" },
  { id: "l16", groupName: "Data-01", teacherShort: "S. Tursunova", room: "Xona 1", day: 5, start: "13:00", durationHours: 1, color: "red" },
  { id: "l17", groupName: "Marketing-01", teacherShort: "D. Nazarova", room: "Xona 5", day: 0, start: "14:00", durationHours: 1, color: "blue" },
  { id: "l18", groupName: "Marketing-01", teacherShort: "D. Nazarova", room: "Xona 5", day: 2, start: "14:00", durationHours: 1, color: "blue" },
  { id: "l19", groupName: "Marketing-01", teacherShort: "D. Nazarova", room: "Xona 5", day: 4, start: "14:00", durationHours: 1, color: "blue" },
  { id: "l20", groupName: "Frontend-02", teacherShort: "A. Karimov", room: "Xona 3", day: 0, start: "15:00", durationHours: 1, color: "blue" },
  { id: "l21", groupName: "Java-01", teacherShort: "A. Inomov", room: "Xona 2", day: 1, start: "15:00", durationHours: 1, color: "green" },
  { id: "l22", groupName: "Frontend-02", teacherShort: "A. Karimov", room: "Xona 3", day: 2, start: "15:00", durationHours: 1, color: "blue" },
  { id: "l23", groupName: "Java-01", teacherShort: "A. Inomov", room: "Xona 2", day: 3, start: "15:00", durationHours: 1, color: "green" },
  { id: "l24", groupName: "Frontend-02", teacherShort: "A. Karimov", room: "Xona 3", day: 4, start: "15:00", durationHours: 1, color: "blue" },
  { id: "l25", groupName: "Java-01", teacherShort: "A. Inomov", room: "Xona 2", day: 5, start: "15:00", durationHours: 1, color: "green" },
  { id: "l26", groupName: "Mobil-01", teacherShort: "O. Salimov", room: "Xona 4", day: 0, start: "17:30", durationHours: 1, color: "yellow" },
  { id: "l27", groupName: "Backend-04", teacherShort: "B. Salimov", room: "Xona 4", day: 1, start: "17:30", durationHours: 1, color: "green" },
  { id: "l28", groupName: "Mobil-01", teacherShort: "O. Salimov", room: "Xona 4", day: 2, start: "17:30", durationHours: 1, color: "yellow" },
  { id: "l29", groupName: "Backend-04", teacherShort: "B. Salimov", room: "Xona 4", day: 3, start: "17:30", durationHours: 1, color: "green" },
  { id: "l30", groupName: "Mobil-01", teacherShort: "O. Salimov", room: "Xona 4", day: 4, start: "17:30", durationHours: 1, color: "yellow" },
  { id: "l31", groupName: "Backend-04", teacherShort: "B. Salimov", room: "Xona 4", day: 5, start: "17:30", durationHours: 1, color: "green" },
  { id: "l32", groupName: "DevOps-01", teacherShort: "J. Mahmudov", room: "Xona 1", day: 0, start: "19:00", durationHours: 1, color: "violet" },
  { id: "l33", groupName: "DevOps-01", teacherShort: "J. Mahmudov", room: "Xona 1", day: 2, start: "19:00", durationHours: 1, color: "violet" },
  { id: "l34", groupName: "DevOps-01", teacherShort: "J. Mahmudov", room: "Xona 1", day: 4, start: "19:00", durationHours: 1, color: "violet" },
];

export interface RoomStatus {
  name: string;
  busy: boolean;
  detail: string;
}

export const roomsToday: RoomStatus[] = [
  { name: "Xona 1", busy: true, detail: "Marketing-01 · 14:00" },
  { name: "Xona 2", busy: true, detail: "Backend-03 · 13:00" },
  { name: "Xona 3", busy: true, detail: "Frontend-01 · 09:00" },
  { name: "Xona 4", busy: false, detail: "Bo'sh" },
  { name: "Xona 5", busy: false, detail: "Bo'sh" },
];

/* --------------------------------- Blog --------------------------------- */

export interface BlogPost {
  slug: string;
  title: string;
  category: Category | "Karyera";
  excerpt: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  readMinutes: number;
  views: number;
  featured?: boolean;
  content: { heading?: string; paragraphs: string[]; list?: string[] }[];
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "2026-yilda-dasturchilik-karyerasi",
    title: "2026-yilda dasturchilik karyerasini qanday boshlash kerak?",
    category: "Karyera",
    excerpt:
      "Dasturlash sohasiga kirishni rejalashtirayotgan bo'lsangiz, qaysi yo'nalishni tanlash, qancha vaqt ketishi va birinchi ishga qanday tayyorlanish haqida to'liq qo'llanma.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    author: "Akmal Karimov",
    authorAvatar: "https://i.pravatar.cc/150?img=12",
    date: "10-iyun, 2026",
    readMinutes: 8,
    views: 2400,
    featured: true,
    tags: ["Karyera", "Dasturlash", "Frontend", "Yangi boshlovchilar"],
    content: [
      {
        paragraphs: [
          "Dasturlash sohasiga kirish hech qachon hozirgidek qulay bo'lmagan. Bepul resurslar, onlayn kurslar va mentorlik dasturlari — barchasi qo'l ostingizda. Lekin aynan shu ko'plik ko'pchilikni chalg'itadi: nimadan boshlash kerak?",
          "Bu maqolada biz 2026-yilda dasturchilik karyerasini boshlashning eng samarali yo'lini bosqichma-bosqich ko'rib chiqamiz.",
        ],
      },
      {
        heading: "Nima uchun dasturchilik?",
        paragraphs: [
          "IT-soha — eng tez o'sayotgan sohalardan biri. O'zbekistonda IT Park rezidentlari soni har yili 40% ga oshmoqda, junior dasturchilar uchun ham o'rtacha maosh boshqa sohalardan sezilarli yuqori.",
          "Lekin eng muhimi — bu soha sizga masofadan ishlash, xalqaro loyihalarda qatnashish va doimiy o'sish imkonini beradi.",
        ],
      },
      {
        heading: "Qaysi yo'nalishni tanlash?",
        paragraphs: ["Asosiy yo'nalishlar va ularning xususiyatlari:"],
        list: [
          "Frontend — eng tez kirish yo'li, vizual natija, ko'p vakansiya",
          "Backend — server mantiq, ma'lumotlar bazasi, barqaror talab",
          "Mobil — Flutter yoki React Native bilan ikki platforma",
          "Data Science — matematika talab qiladi, yuqori maosh",
          "DevOps — tajribali dasturchilar uchun keyingi bosqich",
        ],
      },
      {
        heading: "O'rganish yo'li",
        paragraphs: [
          "1-bosqich: asoslar (1-2 oy) — HTML va CSS dan boshlang. Bu eng oson kirish nuqtasi bo'lib, birinchi haftadayoq natija ko'rasiz.",
          "2-bosqich: JavaScript (3-4 oy) — dasturlash mantiqini chuqur o'rganing. Bu eng muhim bosqich.",
          "3-bosqich: framework (2-3 oy) — React yoki Vue tanlang va real loyihalar ustida ishlang.",
          "4-bosqich: portfolio (1 oy) — kamida 3 ta sifatli loyiha tayyorlang va GitHub profilingizni tartibga keltiring.",
        ],
      },
      {
        heading: "Birinchi ishga qanday tayyorlanish?",
        paragraphs: ["Quyidagi qadamlar sizga birinchi ishni topishda yordam beradi:"],
        list: [
          "Portfolio — 3-5 ta real loyiha bilan",
          "GitHub — muntazam commit tarixi",
          "LinkedIn — to'g'ri to'ldirilgan professional profil",
          "Networking — IT meetup va hackathonlarda qatnashing",
          "Amaliyot — stajirovka yoki open-source loyihalarga hissa qo'shing",
        ],
      },
      {
        heading: "Xulosa",
        paragraphs: [
          "Dasturchilik karyerasi — marafon, sprint emas. 6-9 oylik izchil o'rganish bilan junior darajaga chiqish mumkin. Eng muhimi — har kuni kod yozish va to'xtamaslik.",
          "Agar yo'lni yolg'iz bosib o'tish qiyin bo'lsa, bizning mentorlik dasturlarimiz sizga tezroq va samaraliroq natijaga erishishda yordam beradi.",
        ],
      },
    ],
  },
  {
    slug: "react-19-yangiliklar",
    title: "React 19'dagi yangi imkoniyatlar",
    category: "Frontend",
    excerpt: "React'ning yangi versiyasida Server Components, Actions va boshqa muhim yangiliklar bilan tanishing.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    author: "Nodira Yusupova",
    authorAvatar: "https://i.pravatar.cc/150?img=44",
    date: "5-iyun, 2026",
    readMinutes: 6,
    views: 1800,
    tags: ["React", "Frontend"],
    content: [
      { paragraphs: ["React 19 bilan kelgan asosiy yangiliklar: Server Components, Actions, use() hook va boshqalar haqida batafsil."] },
      { heading: "Server Components", paragraphs: ["Server komponentlar yordamida bundle hajmini kamaytirish va sahifa tezligini oshirish mumkin."] },
    ],
  },
  {
    slug: "ux-ui-dizayn-trendlari",
    title: "UX/UI dizayn: 2026 trendlari",
    category: "Dizayn",
    excerpt: "Yangi yilda eng dolzarb dizayn yo'nalishlari, ranglar va interfeys yondashuvlari.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    author: "Madina Ergasheva",
    authorAvatar: "https://i.pravatar.cc/150?img=47",
    date: "1-iyun, 2026",
    readMinutes: 5,
    views: 1400,
    tags: ["Dizayn", "UX/UI"],
    content: [{ paragraphs: ["2026-yilda dizayn sohasida minimalizm, AI-yordamchi interfeyslar va micro-interactions yetakchi trend bo'lib qolmoqda."] }],
  },
  {
    slug: "python-kasb-tanlash",
    title: "Qaysi yo'nalishda Python kerak bo'ladi?",
    category: "Backend",
    excerpt: "Web, avtomatlashtirish, ma'lumotlar tahlili — Python qo'llaniladigan sohalar va ish bozori.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80",
    author: "Sherzod Rahimov",
    authorAvatar: "https://i.pravatar.cc/150?img=53",
    date: "28-may, 2026",
    readMinutes: 7,
    views: 1200,
    tags: ["Python", "Backend"],
    content: [{ paragraphs: ["Python — universal til. Web dasturlash, ma'lumotlar tahlili, sun'iy intellekt va avtomatlashtirish sohalarida keng qo'llaniladi."] }],
  },
  {
    slug: "flutter-bitta-kod-ikki-platforma",
    title: "Flutter: bitta kod bilan ikki platforma",
    category: "Mobil",
    excerpt: "Mobil dasturlashda cross-platform yondashuvning afzalliklari va kamchiliklari.",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80",
    author: "Otabek Salimov",
    authorAvatar: "https://i.pravatar.cc/150?img=59",
    date: "25-may, 2026",
    readMinutes: 6,
    views: 980,
    tags: ["Flutter", "Mobil"],
    content: [{ paragraphs: ["Flutter yordamida iOS va Android uchun yagona kod bazasi bilan professional ilovalar yaratish mumkin."] }],
  },
  {
    slug: "machine-learning-kerakmi",
    title: "Machine Learning'ga kirish: matematika qanchalik kerak?",
    category: "Data Science",
    excerpt: "ML o'rganish uchun qanday matematik bilimlar zarur va ularni qanday to'ldirish mumkin.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    author: "Sevara Tursunova",
    authorAvatar: "https://i.pravatar.cc/150?img=45",
    date: "20-may, 2026",
    readMinutes: 9,
    views: 860,
    tags: ["ML", "Data Science"],
    content: [{ paragraphs: ["Machine Learning uchun chiziqli algebra, statistika va ehtimollar nazariyasi asoslari yetarli. Ularni amaliyot bilan birga o'rganish eng samarali yo'l."] }],
  },
  {
    slug: "kod-review-amaliyoti",
    title: "Kod review: nima uchun muhim?",
    category: "Backend",
    excerpt: "Sifatli kod yozish madaniyati va jamoaviy ishlash ko'nikmalarini rivojlantirish.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    author: "Bekzod Salimov",
    authorAvatar: "https://i.pravatar.cc/150?img=68",
    date: "15-may, 2026",
    readMinutes: 5,
    views: 720,
    tags: ["Kod sifati", "Jamoa"],
    content: [{ paragraphs: ["Kod review — jamoa ichida bilim almashish va xatolarni erta aniqlashning eng samarali usuli."] }],
  },
  {
    slug: "docker-asoslari",
    title: "Docker'dan ishlatishning 5 ta yaxshi amaliyoti",
    category: "DevOps",
    excerpt: "Konteynerlash texnologiyasidan samarali foydalanish bo'yicha maslahatlar.",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
    author: "Jasur Mahmudov",
    authorAvatar: "https://i.pravatar.cc/150?img=60",
    date: "10-may, 2026",
    readMinutes: 7,
    views: 650,
    tags: ["Docker", "DevOps"],
    content: [{ paragraphs: ["Docker image hajmini kamaytirish, multi-stage build va xavfsizlik bo'yicha eng yaxshi amaliyotlar."] }],
  },
  {
    slug: "css-grid-flexbox",
    title: "CSS Grid'mi Flexbox — qaysi birini tanlash?",
    category: "Frontend",
    excerpt: "Ikkala layout tizimining farqlari va qachon qaysi birini ishlatish kerak.",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80",
    author: "Akmal Karimov",
    authorAvatar: "https://i.pravatar.cc/150?img=12",
    date: "5-may, 2026",
    readMinutes: 4,
    views: 590,
    tags: ["CSS", "Frontend"],
    content: [{ paragraphs: ["Grid — ikki o'lchovli layoutlar uchun, Flexbox — bir o'lchovli kontent oqimi uchun ideal tanlov."] }],
  },
];

/* ----------------------------- Testimonials ----------------------------- */

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  { name: "Jasur Toshpo'latov", role: "Frontend dasturchi — EPAM", avatar: "https://i.pravatar.cc/150?img=13", text: "JavaScript kursini tugatib, 3 oy ichida ishga joylashdim. Mentorlar har doim yordamga tayyor, real loyihalar juda foydali bo'ldi.", rating: 5 },
  { name: "Malika Sodiqova", role: "UX dizayner — Uzum", avatar: "https://i.pravatar.cc/150?img=41", text: "Dizayn kursi kutganimdan ham yaxshi chiqdi. Portfolio bilan birga ishonch ham paydo bo'ldi. Hozir yirik kompaniyada ishlayapman.", rating: 5 },
  { name: "Bekzod Nurmatov", role: "Python dasturchi — Payme", avatar: "https://i.pravatar.cc/150?img=52", text: "Noldan boshlagandim, 6 oyda junior darajaga chiqdim. Amaliy mashg'ulotlar va kod review tizimi juda zo'r yo'lga qo'yilgan.", rating: 5 },
];

/* --------------------------------- FAQ ---------------------------------- */

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  { question: "Kurslarni tugatgandan keyin sertifikat beriladimi?", answer: "Ha, barcha kurslar yakunida davlat tomonidan tan olingan sertifikat beriladi. Sertifikat olish uchun yakuniy loyihani muvaffaqiyatli topshirish kerak." },
  { question: "To'lovni bo'lib-bo'lib qilsam bo'ladimi?", answer: "Albatta. Barcha kurslar uchun oylik to'lov rejasi mavjud. Shuningdek, to'liq to'lov qilganlar uchun 15% chegirma beriladi." },
  { question: "Darslar qanday formatda o'tiladi?", answer: "Darslar offline (markazimizda) va onlayn formatlarda o'tiladi. Har bir dars yozib olinadi va platformada saqlanadi — istalgan vaqt qayta ko'rishingiz mumkin." },
  { question: "Hech qanday tajribam yo'q, kursni o'zlashtirolamanmi?", answer: "Boshlovchi darajadagi kurslar aynan tajribasizlar uchun mo'ljallangan. Mentorlar har bir talabaga individual yondashadi." },
  { question: "Ishga joylashishda yordam berasizlarmi?", answer: "Ha, bitiruvchilarimizga CV tayyorlash, intervyuga tayyorgarlik va hamkor kompaniyalarga yo'llanma berish xizmatlari mavjud. Bitiruvchilarimizning 84% i 6 oy ichida ishga joylashadi." },
];

/* ------------------------------ Site stats ------------------------------ */

export const siteStats = [
  { value: "5 000+", label: "Bitiruvchilar" },
  { value: "35+", label: "Kurslar" },
  { value: "42", label: "O'qituvchilar" },
  { value: "84%", label: "Ishga joylashish" },
];

export const currentUser = {
  name: "Anvar Yo'ldoshev",
  role: "Administrator",
  avatar: "https://i.pravatar.cc/150?img=8",
};

/* ------------------------------- Helpers -------------------------------- */

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("uz-UZ").format(value).replace(/,/g, " ") + " so'm";
}

export function getTeacher(id: string): Teacher {
  return teachers.find((t) => t.id === id) ?? teachers[0];
}

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
