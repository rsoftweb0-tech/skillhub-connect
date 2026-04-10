export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  category: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  lessonsCount: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  isFeatured?: boolean;
  isNew?: boolean;
  progress?: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  videoUrl?: string;
}

export const categories = [
  { id: "web-dev", name: "Web Development", icon: "🌐", count: 245 },
  { id: "design", name: "Design", icon: "🎨", count: 189 },
  { id: "programming", name: "Programming", icon: "💻", count: 312 },
  { id: "marketing", name: "Marketing", icon: "📈", count: 156 },
  { id: "business", name: "Business", icon: "💼", count: 203 },
  { id: "ai", name: "Artificial Intelligence", icon: "🤖", count: 98 },
  { id: "mobile", name: "Mobile Development", icon: "📱", count: 134 },
  { id: "data", name: "Data Science", icon: "📊", count: 167 },
];

export const courses: Course[] = [
  {
    id: "1",
    title: "Complete React Developer Course 2024",
    description: "Master React, Redux, Hooks, Context API, Next.js, and build real-world projects from scratch. This comprehensive course covers everything you need to become a professional React developer.",
    instructor: "Sarah Johnson",
    instructorAvatar: "SJ",
    price: 49.99,
    originalPrice: 99.99,
    thumbnail: "",
    category: "Web Development",
    rating: 4.8,
    reviewCount: 2341,
    studentCount: 15420,
    lessonsCount: 42,
    duration: "28h 30min",
    level: "Intermediate",
    isFeatured: true,
    lessons: [
      { id: "l1", title: "Introduction to React", duration: "12:30", isCompleted: true },
      { id: "l2", title: "Setting Up Your Environment", duration: "8:45", isCompleted: true },
      { id: "l3", title: "JSX Deep Dive", duration: "15:20", isCompleted: false },
      { id: "l4", title: "Components & Props", duration: "22:10", isCompleted: false },
      { id: "l5", title: "State Management", duration: "18:45", isLocked: true },
      { id: "l6", title: "useEffect & Lifecycle", duration: "20:00", isLocked: true },
      { id: "l7", title: "Custom Hooks", duration: "16:30", isLocked: true },
      { id: "l8", title: "Context API", duration: "14:15", isLocked: true },
    ],
  },
  {
    id: "2",
    title: "UI/UX Design Masterclass",
    description: "Learn modern UI/UX design principles, Figma, prototyping, and create stunning user interfaces that delight users.",
    instructor: "Mike Chen",
    instructorAvatar: "MC",
    price: 39.99,
    originalPrice: 79.99,
    thumbnail: "",
    category: "Design",
    rating: 4.9,
    reviewCount: 1876,
    studentCount: 12300,
    lessonsCount: 36,
    duration: "24h 15min",
    level: "Beginner",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Python for Data Science & Machine Learning",
    description: "Complete Python bootcamp covering data analysis, visualization, machine learning algorithms, and deep learning fundamentals.",
    instructor: "Dr. Emily Park",
    instructorAvatar: "EP",
    price: 59.99,
    originalPrice: 129.99,
    thumbnail: "",
    category: "Artificial Intelligence",
    rating: 4.7,
    reviewCount: 3102,
    studentCount: 23100,
    lessonsCount: 58,
    duration: "42h 00min",
    level: "Intermediate",
    isFeatured: true,
  },
  {
    id: "4",
    title: "Digital Marketing Strategy 2024",
    description: "Master SEO, social media marketing, content strategy, PPC advertising, and analytics to grow any business online.",
    instructor: "Alex Rivera",
    instructorAvatar: "AR",
    price: 34.99,
    thumbnail: "",
    category: "Marketing",
    rating: 4.6,
    reviewCount: 987,
    studentCount: 8900,
    lessonsCount: 28,
    duration: "18h 45min",
    level: "Beginner",
    isNew: true,
  },
  {
    id: "5",
    title: "Flutter Mobile App Development",
    description: "Build beautiful, native mobile apps for iOS and Android using Flutter and Dart. From zero to app store.",
    instructor: "James Kim",
    instructorAvatar: "JK",
    price: 44.99,
    originalPrice: 89.99,
    thumbnail: "",
    category: "Mobile Development",
    rating: 4.8,
    reviewCount: 1543,
    studentCount: 11200,
    lessonsCount: 45,
    duration: "32h 20min",
    level: "Intermediate",
    isNew: true,
  },
  {
    id: "6",
    title: "Business Analytics & Intelligence",
    description: "Learn Power BI, Tableau, SQL, and Excel to transform raw data into actionable business insights.",
    instructor: "Lisa Wong",
    instructorAvatar: "LW",
    price: 54.99,
    thumbnail: "",
    category: "Business",
    rating: 4.5,
    reviewCount: 756,
    studentCount: 6700,
    lessonsCount: 32,
    duration: "22h 10min",
    level: "Advanced",
  },
  {
    id: "7",
    title: "Node.js & Express Backend Development",
    description: "Build scalable REST APIs, real-time apps with WebSockets, authentication systems, and deploy to the cloud.",
    instructor: "David Brown",
    instructorAvatar: "DB",
    price: 44.99,
    originalPrice: 94.99,
    thumbnail: "",
    category: "Web Development",
    rating: 4.7,
    reviewCount: 2100,
    studentCount: 14500,
    lessonsCount: 38,
    duration: "26h 45min",
    level: "Intermediate",
  },
  {
    id: "8",
    title: "Advanced CSS & Modern Layouts",
    description: "Master CSS Grid, Flexbox, animations, custom properties, and build stunning responsive layouts.",
    instructor: "Anna Martinez",
    instructorAvatar: "AM",
    price: 29.99,
    thumbnail: "",
    category: "Web Development",
    rating: 4.6,
    reviewCount: 1230,
    studentCount: 9800,
    lessonsCount: 24,
    duration: "16h 30min",
    level: "Beginner",
    isNew: true,
  },
];

export const purchasedCourseIds = ["1", "2", "5"];
