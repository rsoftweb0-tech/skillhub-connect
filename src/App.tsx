import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import CourseListing from "@/pages/CourseListing";
import CourseDetail from "@/pages/CourseDetail";
import CoursePlayer from "@/pages/CoursePlayer";
import StudentDashboard from "@/pages/StudentDashboard";
import InstructorDashboard from "@/pages/InstructorDashboard";
import CreateCourse from "@/pages/CreateCourse";
import MyCourses from "@/pages/MyCourses";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/courses" element={<CourseListing />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
                  <Route path="/player/:id" element={<CoursePlayer />} />
                  <Route path="/my-courses" element={<MyCourses />} />
                  <Route
                    path="/student-dashboard"
                    element={<StudentDashboard />}
                  />
                  <Route
                    path="/instructor-dashboard"
                    element={<InstructorDashboard />}
                  />
                  <Route path="/create-course" element={<CreateCourse />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
