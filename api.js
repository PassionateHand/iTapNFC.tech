const API_URL = "https://itapnfc-tech-backend.onrender.com";

const getToken = () => localStorage.getItem("access_token");

const callApi = async (url, body, method = "GET") => {
  try {
    const response = await fetch(url, {
      method,
      body: method !== "GET" ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
      },
      credentials: "include",
    });

     const data = await response.json();

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      networkError: true,
      message: "Network Error",
    };
  }
};

export const login = async (payload) => {
  const response = await callApi(`${API_URL}/api/auth/login`, payload, "POST");
  let status;

   if (response.networkError) {
    return { message: "Network Error" };
  }

  if (!response.ok) {
    return response.data;
  }
  console.log(response.data)
  const token = response.data.token;
  if (!token) return response.data;
;
  localStorage.setItem("access_token", token);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  window.location.href = "dashboard.html";
};

export const register = async (payload) => {
  const response = await callApi(`${API_URL}/api/auth/register`, payload, "POST");
  let status;

   if (response.networkError) {
    return { message: "Network Error" };
  }

  if (!response.ok) {
    return response.data;
  }
  console.log(response.data);
  return response.data;
};


export const changePasswordInApp = async (payload) => {
  const response = await callApi(`${API_URL}/api/auth/change-password`, payload, "POST");
  let status;

   if (response.networkError) {
    return { message: "Network Error" };
  }

  if (!response.ok) {
    return response.data;
  }
  console.log(response.data);
  return response.data;
};

export const adminUsers = async () => {
  const response = await callApi(`${API_URL}/api/admin/users`, undefined, "GET");
  let status;

   if (response.networkError) {
    return { message: "Network Error" };
  }

  if (!response.ok) {
    return response.data;
  }
  console.log(response.data);
  return response.data;
};

export const createProduct = async (payload) => {
  const response = await callApi(`${API_URL}/api/products`, payload, "POST");

  if (response.networkError) {
    return { message: "Network Error" };
  }

  if (!response.ok) {
    return response.data;
  }

  return response.data;
};
