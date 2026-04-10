import { Link } from "react-router-dom";
import { Star, Users, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/lib/mock-data";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link to={`/course/${course.id}`} className="group block">
      <div className="rounded-xl border bg-card overflow-hidden card-shadow transition-all duration-200 hover:card-shadow-hover hover:-translate-y-1">
        <div className="relative aspect-video bg-muted overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-80 flex items-center justify-center">
            <BookOpen className="h-10 w-10 text-primary-foreground/60" />
          </div>
          {course.isNew && (
            <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground font-semibold text-xs">
              NEW
            </Badge>
          )}
          {course.isFeatured && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground font-semibold text-xs">
              FEATURED
            </Badge>
          )}
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          <p className="text-sm text-muted-foreground">{course.instructor}</p>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span className="font-semibold text-foreground">{course.rating}</span>
            </div>
            <span className="text-muted-foreground">({course.reviewCount.toLocaleString()})</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {course.studentCount.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-lg font-bold text-foreground">${course.price}</span>
            {course.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${course.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
