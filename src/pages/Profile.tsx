import { useEffect, useState } from "react";
import { BookOpen, Award, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

import { getProfile } from "@/api/user";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
      } catch (err: any) {
        toast(err.message || "Failed to load profile ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">No user found</p>
      </div>
    );
  }

  const initials = (user.name?.[0] || "") + (user.surname?.[0] || "");

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account</p>
        </div>

        <div className="rounded-xl border p-6 flex gap-6">
          <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {initials || "U"}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold">
              
              {user.name} {user.surname}
            </h2>

            <p className="text-muted-foreground">
              {user.role} · {user.country || "No country"}
            </p>

            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {user.coursesCount || 0}
              </span>

              <span className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                {user.certificates?.length || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border p-6 space-y-4">
          <h2 className="flex items-center gap-2 font-semibold">
            <Settings className="h-4 w-4" />
            Account Settings
          </h2>

          <Input value={user.name || ""} readOnly />
          <Input value={user.surname || ""} readOnly />
          <Input value={user.email || ""} readOnly />
          <Input value={user.phone || ""} readOnly />
          <Input value={user.country || ""} readOnly />

          {user.role === "teacher" && (
            <>
              <Input value={user.profession || ""} readOnly />
              <Input value={user.company || ""} readOnly />
              <Input value={user.experienceYears || ""} readOnly />
            </>
          )}

          <Button disabled>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
