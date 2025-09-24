import axios, { type AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

if (!baseURL) {
  console.warn("[env] VITE_BASE_URL is not set");
}

export const http: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
