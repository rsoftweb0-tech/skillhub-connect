import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Phone } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { registerUser } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [role, setRole] = useState<"student" | "teacher">("student");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (isAuthenticated) navigate("/profile");
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await registerUser({
        name: form.name,
        surname: form.surname,
        email: form.email,
        phone: form.phone,
        age: form.age ? Number(form.age) : undefined,
        country: form.country,
        password: form.password,
        role,
        profession: form.profession || undefined,
        experienceYears: form.experienceYears ? Number(form.experienceYears) : undefined,
        company: form.company || undefined,
      });

      toast.success("Account created 🚀 Please login.");
      setTimeout(() => navigate("/login"), 400);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Registration failed";
      toast.error(msg);
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
              role === "student" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("teacher")}
            className={`flex-1 p-2 rounded transition-all duration-200 hover:scale-[1.02] ${
              role === "teacher" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            Teacher
          </button>
        </div>

        {/* FORM */}
        <div className="rounded-xl border bg-card p-6 space-y-4 shadow-sm transition-all hover:shadow-md">
          {(
            [
              ["name", "Name"],
              ["surname", "Surname"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["age", "Age"],
              ["country", "Country"],
              ["password", "Password"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="space-y-1 animate-fade-in">
              <Label>{label}</Label>
              <Input
                type={key === "password" ? "password" : "text"}
                className="transition-all focus:scale-[1.01]"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
              {errors[key] && <p className="text-xs text-destructive">{errors[key]}</p>}
            </div>
          ))}

          {/* TEACHER FIELDS */}
          {role === "teacher" && (
            <div className="space-y-3 animate-fade-in">
              <Input
                placeholder="Profession"
                value={form.profession}
                onChange={(e) =>
                  setForm({ ...form, profession: e.target.value })
                }
                className="transition-all focus:scale-[1.01]"
              />

              <Input
                placeholder="Experience Years"
                type="number"
                value={form.experienceYears}
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
                value={form.company}
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
