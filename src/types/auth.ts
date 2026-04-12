export interface User {
  _id: string;
  name: string;
  surname?: string;
  email: string;
  phone?: string;
  age?: number;
  country?: string;
  role: "student" | "teacher" | "admin";
  profession?: string;
  experienceYears?: number;
  company?: string;
  coursesCount?: number;
  certificates?: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  surname?: string;
  email: string;
  phone?: string;
  age?: number;
  country?: string;
  password: string;
  role: "student" | "teacher";
  profession?: string;
  experienceYears?: number;
  company?: string;
}
