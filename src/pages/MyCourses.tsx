import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getMyCourses } from "@/api/courses";
import { toast } from "sonner";

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMyCourses();
        setMyCourses(data.courses || data || []);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-muted-foreground">Loading your courses...</div>;
  }

  return (
    <div className="p-6 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground">{myCourses.length} courses purchased</p>
        </div>

        {myCourses.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-muted-foreground">You haven't purchased any courses yet.</p>
            <Link to="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((course: any) => {
              const progress = course.progress || 0;
              return (
                <div key={course._id || course.id} className="rounded-xl border bg-card overflow-hidden card-shadow">
                  <div className="aspect-video bg-muted gradient-hero opacity-80 flex items-center justify-center">
                    <Play className="h-10 w-10 text-primary-foreground/60" />
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-foreground">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.instructor?.name || course.instructor}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{progress}% complete</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    <Link to={`/player/${course._id || course.id}`}>
                      <Button size="sm" className="w-full mt-1">
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
  );
}
