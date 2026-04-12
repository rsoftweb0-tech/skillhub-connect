import api from "./axios";
import type { LoginPayload, RegisterPayload } from "@/types/auth";

export const loginUser = async (data: LoginPayload) => {
  const res = await api.post("/user/login", data);
  return res.data;
};

export const registerUser = async (data: RegisterPayload) => {
  const res = await api.post("/user/register", data);
  return res.data;
};
