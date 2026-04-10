import { Link } from "react-router-dom";
import {
  Users, DollarSign, BookOpen, Eye, TrendingUp,
  PlusCircle, Edit, Trash2, MoreVertical, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/mock-data";

export default function InstructorDashboard() {
  const myCourses = courses.slice(0, 3);

  const stats = [
    { label: "Total Students", value: "15,420", icon: Users, color: "text-primary" },
    { label: "Total Revenue", value: "$12,340", icon: DollarSign, color: "text-success" },
    { label: "Courses Created", value: "3", icon: BookOpen, color: "text-secondary" },
    { label: "Course Views", value: "45.2K", icon: Eye, color: "text-primary" },
  ];

  return (
    <div className="p-6 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Instructor Dashboard</h1>
            <p className="text-muted-foreground">Manage your courses and track performance</p>
          </div>
          <Link to="/create-course">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" /> Create Course
            </Button>
          </Link>
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

        {/* Revenue Chart Placeholder */}
        <div className="rounded-xl border bg-card p-6 card-shadow">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" /> Revenue Overview
          </h2>
          <div className="h-48 bg-muted/50 rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Revenue chart — connect analytics to see data</p>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Your Courses</h2>
          <div className="space-y-3">
            {myCourses.map((course) => (
              <div key={course.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border bg-card p-4 card-shadow">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">{course.title}</h3>
                    <Badge variant="secondary" className="shrink-0 text-xs">Published</Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {course.studentCount.toLocaleString()} students
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5" /> ${(course.price * course.studentCount * 0.01).toFixed(0)} revenue
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" /> {(course.studentCount * 3).toLocaleString()} views
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Edit className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
