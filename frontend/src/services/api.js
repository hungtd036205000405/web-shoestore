import axios from "axios";

// 🔧 Tự động chọn baseURL
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080";


console.log("Base URL đang dùng:", baseURL);

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Thêm interceptor để gắn token nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && !config.url.includes("/auth/token")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
