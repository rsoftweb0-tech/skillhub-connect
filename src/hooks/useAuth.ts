import { createContext, useContext } from "react";
import type { User } from "@/types/auth";
import { getToken, getUser, setAuth, logout as logoutFn } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const getAuthValue = (): AuthContextType => {
  const token = getToken();
  const user = getUser();

  return {
    user,
    token,
    isAuthenticated: !!token,
    login: (token: string, user: User) => {
      setAuth(token, user);
      // Force re-render by reloading — simple approach for SPA
    },
    logout: () => {
      logoutFn();
      window.location.href = "/login";
    },
  };
};
