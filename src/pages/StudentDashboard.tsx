import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Play, BarChart3, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getMyCourses } from "@/api/courses";
import { toast } from "sonner";

export default function StudentDashboard() {
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMyCourses();
        setMyCourses(data.courses || data || []);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const completedCount = myCourses.filter((c: any) => (c.progress || 0) >= 100).length;
  const inProgressCount = myCourses.filter((c: any) => (c.progress || 0) > 0 && (c.progress || 0) < 100).length;
  const avgProgress = myCourses.length > 0
    ? Math.round(myCourses.reduce((sum: number, c: any) => sum + (c.progress || 0), 0) / myCourses.length)
    : 0;

  const stats = [
    { label: "Courses Enrolled", value: myCourses.length, icon: BookOpen, color: "text-primary" },
    { label: "In Progress", value: inProgressCount, icon: Clock, color: "text-secondary" },
    { label: "Completed", value: completedCount, icon: Award, color: "text-success" },
    { label: "Avg. Progress", value: `${avgProgress}%`, icon: TrendingUp, color: "text-primary" },
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
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : myCourses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No courses yet.</p>
              <Link to="/courses"><Button>Browse Courses</Button></Link>
            </div>
          ) : (
            <div className="space-y-4">
              {myCourses.map((course: any) => {
                const progress = course.progress || 0;
                return (
                  <div key={course._id || course.id} className="flex flex-col sm:flex-row gap-4 rounded-xl border bg-card p-4 card-shadow">
                    <div className="w-full sm:w-48 aspect-video rounded-lg bg-muted gradient-hero opacity-80 flex items-center justify-center shrink-0">
                      <Play className="h-8 w-8 text-primary-foreground/60" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-foreground">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.instructor?.name || course.instructor}</p>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{progress}% complete</span>
                          <span className="text-muted-foreground">{course.lessonsCount || 0} lessons</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      <Link to={`/player/${course._id || course.id}`}>
                        <Button size="sm" className="mt-1">
                          <Play className="h-3.5 w-3.5 mr-1" /> Continue
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
