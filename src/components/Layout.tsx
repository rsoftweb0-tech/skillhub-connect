import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  GraduationCap,
  BarChart3,
  PlusCircle,
  User,
  LogIn,
  Menu,
  X,
  Search,
  Bell,
  ShoppingCart,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "../assets/images/logos.png";

const studentNav = [
  { title: "Home", url: "/", icon: Home },
  { title: "Courses", url: "/courses", icon: BookOpen },
  { title: "My Learning", url: "/my-courses", icon: GraduationCap },
  { title: "Dashboard", url: "/student-dashboard", icon: LayoutDashboard },
];

const instructorNav = [
  { title: "Dashboard", url: "/instructor-dashboard", icon: BarChart3 },
  { title: "Create Course", url: "/create-course", icon: PlusCircle },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // or navigate("/login")
  };

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-4 md:px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-foreground"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl shrink-0"
          >
            <div className="h-14 w-14 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={logo} alt="ArvesTech logo" className="scale-120" />
            </div>
            <span className="hidden sm:inline text-foreground">
              Arves<span className="text-primary">Tech</span>
            </span>
          </Link>
          <div className="flex-1 max-w-xl mx-auto hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for courses..."
                className="pl-10 bg-muted border-0 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* NOT LOGGED IN */}
            {!token ? (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex gap-2"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>

                <Link to="/register">
                  <Button size="sm" className="hidden sm:flex">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              /* LOGGED IN */
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Bell className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>

                {/* PROFILE ICON */}
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>

                {/* LOGOUT */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="hidden sm:flex"
                >
                  Log Out
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-card transition-transform duration-200 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <nav className="flex flex-col gap-1 p-4 overflow-y-auto h-full">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
              Learn
            </p>
            {studentNav.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.url)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}

            <div className="my-4 border-t" />

            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
              Teach
            </p>
            {instructorNav.map((item) => (
              <Link
                key={item.url}
                to={item.url}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.url)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}

            <div className="my-4 border-t" />

            <Link
              to="/profile"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive("/profile")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
          </nav>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-foreground/20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  );
}
