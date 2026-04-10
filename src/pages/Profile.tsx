import { User, Mail, BookOpen, Award, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  return (
    <div className="p-6 animate-fade-in">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>

        {/* Avatar */}
        <div className="rounded-xl border bg-card p-6 card-shadow flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-2xl font-bold">JD</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">John Doe</h2>
            <p className="text-muted-foreground">Student · Member since 2024</p>
            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> 3 courses</span>
              <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5" /> 1 certificate</span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="rounded-xl border bg-card p-6 card-shadow space-y-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Settings className="h-4 w-4" /> Account Settings
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fname">First Name</Label>
              <Input id="fname" defaultValue="John" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="lname">Last Name</Label>
              <Input id="lname" defaultValue="Doe" className="mt-1" />
            </div>
          </div>
          <div>
            <Label htmlFor="pemail">Email</Label>
            <Input id="pemail" type="email" defaultValue="john@example.com" className="mt-1" />
          </div>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
