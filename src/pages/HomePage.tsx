import { useState, useEffect } from "react";
import { Search, ArrowRight, Play, Users, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CourseCard from "@/components/CourseCard";
import { categories } from "@/lib/mock-data";
import { getAllCourses } from "@/api/courses";
import { toast } from "sonner";

export default function HomePage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data.courses || data || []);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const featured = courses.filter((c: any) => c.isFeatured);
  const popular = courses.slice(0, 4);
  const newest = courses.filter((c: any) => c.isNew);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="gradient-hero px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight">
            Learn Without Limits
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto">
            Discover thousands of courses taught by industry experts. Start learning today and advance your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="What do you want to learn?"
                className="pl-10 bg-background border-0 h-11"
              />
            </div>
            <Link to="/courses">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
                Explore
              </Button>
            </Link>
          </div>
          <div className="flex justify-center gap-8 pt-4 text-primary-foreground/70 text-sm">
            <span className="flex items-center gap-2"><Users className="h-4 w-4" /> 50K+ Students</span>
            <span className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> 1000+ Courses</span>
            <span className="flex items-center gap-2"><Award className="h-4 w-4" /> Expert Instructors</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Browse Categories</h2>
            <Link to="/courses" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/courses?category=${cat.id}`}
                className="flex items-center gap-3 p-4 rounded-xl border bg-card card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <p className="font-medium text-sm text-card-foreground">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.count} courses</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {!loading && featured.length > 0 && (
        <section className="px-6 py-12 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Featured Courses</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((c: any) => (
                <CourseCard key={c._id || c.id} course={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular */}
      {!loading && popular.length > 0 && (
        <section className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Popular Courses</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popular.map((c: any) => (
                <CourseCard key={c._id || c.id} course={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New */}
      {!loading && newest.length > 0 && (
        <section className="px-6 py-12 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">New Courses</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newest.map((c: any) => (
                <CourseCard key={c._id || c.id} course={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center gradient-hero rounded-2xl p-12 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
            Become an Instructor
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto">
            Share your knowledge with thousands of students worldwide and earn money doing what you love.
          </p>
          <Link to="/instructor-dashboard">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold mt-2">
              <Play className="h-4 w-4 mr-2" /> Start Teaching
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
