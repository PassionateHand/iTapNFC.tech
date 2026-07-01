const API_URL = "https://itapnfc-tech-backend.onrender.com"
const extractedToken = localStorage.getItem("access_token") ?? null;
let token = extractedToken;

token = token ?? extractedToken;

const callApi = async (url, body, method = "GET") => {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: "include",
    });
    if (!response.ok) {
      console.log("Failed to call API");
      throw new Error("Failed to call API");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const login = async (payload) => {
    const data = await callApi(`${API_URL}/api/auth/login`, payload, "POST");
    console.log(data);
    token = data.token;
    if (!token) return;
    localStorage.setItem("access_token", token);
    window.location.href = "dashboard.html";
};
