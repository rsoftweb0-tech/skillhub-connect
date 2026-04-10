import { useParams, Link } from "react-router-dom";
import {
  Star, Users, Clock, BookOpen, Play, Check, Lock,
  Award, Globe, FileText, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { courses, purchasedCourseIds } from "@/lib/mock-data";

export default function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);
  const isPurchased = purchasedCourseIds.includes(id || "");

  if (!course) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">Course not found</h1>
        <Link to="/courses" className="text-primary hover:underline mt-2 inline-block">
          Browse courses
        </Link>
      </div>
    );
  }

  const lessons = course.lessons || [
    { id: "l1", title: "Introduction", duration: "10:00", isCompleted: false },
    { id: "l2", title: "Getting Started", duration: "15:00", isCompleted: false },
    { id: "l3", title: "Core Concepts", duration: "20:00", isLocked: true },
    { id: "l4", title: "Advanced Topics", duration: "25:00", isLocked: true },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="gradient-hero px-6 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Badge variant="secondary" className="font-medium">
              {course.category}
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              {course.title}
            </h1>
            <p className="text-primary-foreground/80">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="font-semibold text-primary-foreground">{course.rating}</span>
                ({course.reviewCount.toLocaleString()} reviews)
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {course.studentCount.toLocaleString()} students
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {course.duration}
              </span>
            </div>
            <p className="text-sm text-primary-foreground/70">
              Created by <span className="text-primary-foreground underline">{course.instructor}</span>
            </p>
          </div>

          {/* Price Card */}
          <div className="bg-card rounded-xl p-6 card-shadow space-y-4 self-start">
            <div className="aspect-video rounded-lg bg-muted flex items-center justify-center gradient-hero opacity-80">
              <Play className="h-12 w-12 text-primary-foreground/60" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-foreground">${course.price}</span>
              {course.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">${course.originalPrice}</span>
              )}
            </div>
            {isPurchased ? (
              <Link to={`/player/${course.id}`}>
                <Button className="w-full" size="lg">
                  <Play className="h-4 w-4 mr-2" /> Continue Learning
                </Button>
              </Link>
            ) : (
              <div className="space-y-2">
                <Button className="w-full" size="lg">
                  Buy Now
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Add to Cart
                </Button>
              </div>
            )}
            <div className="text-sm text-muted-foreground space-y-2 pt-2">
              <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> {course.duration} of content</p>
              <p className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> {course.lessonsCount} lessons</p>
              <p className="flex items-center gap-2"><Globe className="h-4 w-4" /> Full lifetime access</p>
              <p className="flex items-center gap-2"><Award className="h-4 w-4" /> Certificate of completion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8 max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* What you'll learn */}
          <div className="rounded-xl border p-6 space-y-4">
            <h2 className="text-xl font-bold text-foreground">What you'll learn</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {["Build real-world projects", "Master core concepts", "Industry best practices", "Deploy to production", "Advanced techniques", "Professional workflow"].map((item) => (
                <p key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-success shrink-0 mt-0.5" /> {item}
                </p>
              ))}
            </div>
          </div>

          {/* Lessons */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Course Content</h2>
            <p className="text-sm text-muted-foreground">{lessons.length} lessons · {course.duration}</p>
            <div className="rounded-xl border overflow-hidden divide-y">
              {lessons.map((lesson, i) => (
                <div key={lesson.id} className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0">
                    {lesson.isCompleted ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : lesson.isLocked ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{lesson.title}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{lesson.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor */}
          <div className="rounded-xl border p-6 space-y-4">
            <h2 className="text-xl font-bold text-foreground">Instructor</h2>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                {course.instructorAvatar}
              </div>
              <div>
                <p className="font-semibold text-foreground">{course.instructor}</p>
                <p className="text-sm text-muted-foreground">Senior Developer & Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
