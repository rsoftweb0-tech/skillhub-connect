const API_URL = "http://localhost:3001/api";

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  // ✅ store only token
  localStorage.setItem("token", result.token);

  return result;
};

export const registerUser = async (data: any) => {
  const res = await fetch(`${API_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message);
  }

  return result;
};
