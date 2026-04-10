import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Play, Check, Lock, ChevronLeft, FileText,
  MessageSquare, StickyNote, Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courses } from "@/lib/mock-data";

export default function CoursePlayer() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);
  const [activeLesson, setActiveLesson] = useState(0);

  if (!course) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">Course not found</h1>
      </div>
    );
  }

  const lessons = course.lessons || [
    { id: "l1", title: "Introduction", duration: "10:00", isCompleted: true },
    { id: "l2", title: "Getting Started", duration: "15:00", isCompleted: false },
    { id: "l3", title: "Core Concepts", duration: "20:00" },
    { id: "l4", title: "Advanced Topics", duration: "25:00" },
  ];

  const completedCount = lessons.filter((l) => l.isCompleted).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="animate-fade-in flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
      {/* Video Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-3 border-b flex items-center gap-3">
          <Link to={`/course/${id}`}>
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{course.title}</p>
          </div>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-foreground/95 flex items-center justify-center relative">
          <div className="text-center space-y-3">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <Play className="h-8 w-8 text-primary-foreground" />
            </div>
            <p className="text-primary-foreground/60 text-sm">
              {lessons[activeLesson]?.title}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-y-auto p-4">
          <Tabs defaultValue="notes">
            <TabsList>
              <TabsTrigger value="notes" className="gap-1.5">
                <StickyNote className="h-3.5 w-3.5" /> Notes
              </TabsTrigger>
              <TabsTrigger value="attachments" className="gap-1.5">
                <FileText className="h-3.5 w-3.5" /> Attachments
              </TabsTrigger>
              <TabsTrigger value="comments" className="gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" /> Comments
              </TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="mt-4">
              <textarea
                className="w-full min-h-[120px] rounded-lg border bg-muted/50 p-3 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Take notes for this lesson..."
              />
            </TabsContent>
            <TabsContent value="attachments" className="mt-4">
              <div className="rounded-lg border p-4 flex items-center gap-3 hover:bg-muted/50 cursor-pointer transition-colors">
                <Download className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Lesson Resources.pdf</p>
                  <p className="text-xs text-muted-foreground">2.4 MB</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="comments" className="mt-4">
              <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Lesson Sidebar */}
      <div className="w-full lg:w-80 border-l bg-card overflow-y-auto">
        <div className="p-4 border-b space-y-2">
          <h3 className="font-semibold text-sm text-foreground">Course Content</h3>
          <Progress value={progressPercent} className="h-2" />
          <p className="text-xs text-muted-foreground">{completedCount}/{lessons.length} completed</p>
        </div>
        <div className="divide-y">
          {lessons.map((lesson, i) => (
            <button
              key={lesson.id}
              onClick={() => setActiveLesson(i)}
              className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                activeLesson === i ? "bg-primary/10" : "hover:bg-muted/50"
              }`}
            >
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                lesson.isCompleted
                  ? "bg-success text-success-foreground"
                  : activeLesson === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}>
                {lesson.isCompleted ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${activeLesson === i ? "font-medium text-primary" : "text-foreground"}`}>
                  {lesson.title}
                </p>
                <p className="text-xs text-muted-foreground">{lesson.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
