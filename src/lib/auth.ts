export const setAuth = (token: string, user: any) => {
  localStorage.setItem("token", token);
};

export const getToken = () => localStorage.getItem("token");

export const logout = () => {
  localStorage.removeItem("token");
};
