import api from "./axios";

export const getProfile = async () => {
  const res = await api.get("/user/profile");
  return res.data;
};
