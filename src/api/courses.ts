import api from "./axios";

export const getAllCourses = async () => {
  const res = await api.get("/courses");
  return res.data;
};

export const getCourseById = async (id: string) => {
  const res = await api.get(`/courses/${id}`);
  return res.data;
};

export const getMyCourses = async () => {
  const res = await api.get("/my-courses");
  return res.data;
};

export const checkoutCourse = async (id: string) => {
  const res = await api.post(`/courses/${id}/checkout`);
  return res.data;
};
