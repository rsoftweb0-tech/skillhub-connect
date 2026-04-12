import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Phone } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

import { registerUser } from "@/api/auth";
import { setAuth, getToken } from "@/lib/auth";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState<"student" | "teacher">("student");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    age: "",
    country: "",
    password: "",
    profession: "",
    experienceYears: "",
    company: "",
  });

  useEffect(() => {
    if (getToken()) navigate("/profile");
  }, []);

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      toast("Fill required fields ⚠️");
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        ...form,
        role,
        age: Number(form.age),
        experienceYears: Number(form.experienceYears),
      });

      setAuth(data.token, data.user);

      toast("Account created 🚀");

      setTimeout(() => navigate("/profile"), 400);
    } catch (err: any) {
      toast(err.message || "Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-muted/30 animate-fade-in">
      <div className="w-full max-w-xl space-y-6">
        {/* TITLE */}
        <div className="text-center animate-slide-up">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">Start your journey</p>
        </div>

        {/* ROLE */}
        <div className="flex gap-2">
          <button
            onClick={() => setRole("student")}
            className={`flex-1 p-2 rounded transition-all duration-200 hover:scale-[1.02] ${
              role === "student" ? "bg-primary text-primary-foreground" : "bg-gray-200"
            }`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("teacher")}
            className={`flex-1 p-2 rounded transition-all duration-200 hover:scale-[1.02] ${
              role === "teacher" ? "bg-primary text-primary-foreground" : "bg-gray-200"
            }`}
          >
            Teacher
          </button>
        </div>

        {/* FORM */}
        <div className="rounded-xl border bg-card p-6 space-y-4 shadow-sm transition-all hover:shadow-md">
          {[
            ["name", "Name"],
            ["surname", "Surname"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["age", "Age"],
            ["country", "Country"],
            ["password", "Password"],
          ].map(([key, label]) => (
            <div key={key} className="space-y-1 animate-fade-in">
              <Label>{label}</Label>
              <Input
                type={key === "password" ? "password" : "text"}
                className="transition-all focus:scale-[1.01]"
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </div>
          ))}

          {/* TEACHER FIELDS */}
          {role === "teacher" && (
            <div className="space-y-3 animate-fade-in">
              <Input
                placeholder="Profession"
                onChange={(e) =>
                  setForm({ ...form, profession: e.target.value })
                }
                className="transition-all focus:scale-[1.01]"
              />

              <Input
                placeholder="Experience Years"
                type="number"
                onChange={(e) =>
                  setForm({
                    ...form,
                    experienceYears: e.target.value,
                  })
                }
                className="transition-all focus:scale-[1.01]"
              />

              <Input
                placeholder="Company"
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="transition-all focus:scale-[1.01]"
              />
            </div>
          )}

          <Button
            className="w-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </div>

        <p className="text-center text-sm animate-fade-in">
          Already have account?{" "}
          <Link
            className="text-primary font-medium hover:underline"
            to="/login"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
