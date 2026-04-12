import { useState, useCallback, type ReactNode } from "react";
import { AuthContext } from "@/hooks/useAuth";
import { getToken, getUser, setAuth, logout as logoutFn } from "@/lib/auth";
import type { User } from "@/types/auth";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getUser);
  const [token, setToken] = useState<string | null>(getToken);

  const login = useCallback((newToken: string, newUser: User) => {
    setAuth(newToken, newUser);
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    logoutFn();
    setToken(null);
    setUser(null);
    window.location.href = "/login";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
