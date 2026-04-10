import { Link } from "react-router-dom";
import { BookOpen, Clock, Play, BarChart3, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { courses, purchasedCourseIds } from "@/lib/mock-data";

export default function StudentDashboard() {
  const myCourses = courses.filter((c) => purchasedCourseIds.includes(c.id));

  const stats = [
    { label: "Courses Enrolled", value: myCourses.length, icon: BookOpen, color: "text-primary" },
    { label: "In Progress", value: 2, icon: Clock, color: "text-secondary" },
    { label: "Completed", value: 1, icon: Award, color: "text-success" },
    { label: "Avg. Progress", value: "65%", icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div className="p-6 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>
          <p className="text-muted-foreground">Track your learning progress</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-card p-5 card-shadow">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Continue Learning */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Continue Learning</h2>
          <div className="space-y-4">
            {myCourses.map((course, i) => {
              const progress = [72, 45, 20][i] || 0;
              return (
                <div key={course.id} className="flex flex-col sm:flex-row gap-4 rounded-xl border bg-card p-4 card-shadow">
                  <div className="w-full sm:w-48 aspect-video rounded-lg bg-muted gradient-hero opacity-80 flex items-center justify-center shrink-0">
                    <Play className="h-8 w-8 text-primary-foreground/60" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-foreground">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{progress}% complete</span>
                        <span className="text-muted-foreground">{course.lessonsCount} lessons</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    <Link to={`/player/${course.id}`}>
                      <Button size="sm" className="mt-1">
                        <Play className="h-3.5 w-3.5 mr-1" /> Continue
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Recommended for You</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.filter((c) => !purchasedCourseIds.includes(c.id)).slice(0, 3).map((c) => (
              <Link key={c.id} to={`/course/${c.id}`} className="group rounded-xl border bg-card p-4 card-shadow hover:card-shadow-hover transition-all">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{c.instructor}</p>
                <p className="text-sm font-bold text-foreground mt-2">${c.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
