import { Navigate } from "react-router-dom";
import { getToken } from "@/lib/auth";

export default function ProtectedRoute({ children }: any) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}