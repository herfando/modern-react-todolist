import axios from "axios";

const api = axios.create({
  baseURL: "https://todolistbeformentee-production.up.railway.app",
});

// interceptor untuk otomatis tambahin token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
