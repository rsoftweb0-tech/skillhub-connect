import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Plus, X, Image, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/lib/mock-data";

export default function CreateCourse() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([{ title: "", description: "" }]);

  const addLesson = () => setLessons([...lessons, { title: "", description: "" }]);
  const removeLesson = (i: number) => setLessons(lessons.filter((_, idx) => idx !== i));

  return (
    <div className="p-6 animate-fade-in">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create New Course</h1>
          <p className="text-muted-foreground">Fill in the details to publish your course</p>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="rounded-xl border bg-card p-6 space-y-4 card-shadow">
            <h2 className="font-semibold text-foreground">Basic Information</h2>
            <div className="space-y-3">
              <div>
                <Label htmlFor="title">Course Title</Label>
                <Input id="title" placeholder="e.g. Complete React Developer Course" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" placeholder="Describe your course..." className="mt-1 min-h-[100px]" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="49.99" className="mt-1" />
                </div>
              </div>
              <div>
                <Label>Level</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="rounded-xl border bg-card p-6 space-y-4 card-shadow">
            <h2 className="font-semibold text-foreground">Course Thumbnail</h2>
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <Image className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload thumbnail</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {/* Lessons */}
          <div className="rounded-xl border bg-card p-6 space-y-4 card-shadow">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Lessons</h2>
              <Button variant="outline" size="sm" onClick={addLesson} className="gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Add Lesson
              </Button>
            </div>
            <div className="space-y-3">
              {lessons.map((_, i) => (
                <div key={i} className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Lesson {i + 1}</span>
                    {lessons.length > 1 && (
                      <button onClick={() => removeLesson(i)} className="text-muted-foreground hover:text-destructive">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <Input placeholder="Lesson title" />
                  <Textarea placeholder="Lesson description" className="min-h-[60px]" />
                  <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <Video className="h-6 w-6 mx-auto text-muted-foreground mb-1" />
                    <p className="text-xs text-muted-foreground">Upload video</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button size="lg" className="flex-1">Publish Course</Button>
            <Button variant="outline" size="lg">Save as Draft</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
