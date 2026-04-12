import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { loginUser } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, []);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const data = await loginUser(form);
      login(data.token, data.user);

      toast.success("Welcome back 🚀");

      setTimeout(() => {
        if (data.user.role === "teacher") navigate("/instructor-dashboard");
        else if (data.user.role === "admin") navigate("/admin");
        else navigate("/student-dashboard");
      }, 400);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-muted/30 animate-fade-in">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2 animate-slide-up">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue</p>
        </div>

        <div className="rounded-xl border bg-card p-6 space-y-4 shadow-sm transition-all duration-300 hover:shadow-md">
          {/* EMAIL */}
          <div className="space-y-1">
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10 transition-all focus:scale-[1.01]"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <Label>Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10 transition-all focus:scale-[1.01]"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 opacity-70 hover:opacity-100 transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
          </div>

          {/* BUTTON */}
          <Button
            className="w-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </div>

        <p className="text-center text-sm animate-fade-in">
          Don't have an account?{" "}
          <Link
            className="text-primary font-medium hover:underline"
            to="/register"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
