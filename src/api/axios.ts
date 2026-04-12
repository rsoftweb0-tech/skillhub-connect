import axios from "axios";
import { getToken } from "@/lib/auth";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

// ✅ attach token
api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ HANDLE TOKEN EXPIRE GLOBALLY
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");

      // 🔥 redirect globally
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

export default api;
