// src/api/axiosInstance.js
import axios from "axios";
import { toast } from "sonner";

// Axios instance
export const axiosInstance = axios.create({
  baseURL: import.meta?.env?.VITE_API_BASE_URL || "http://localhost:4000/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" && localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.info("[Axios] Authorization header attached");
    } else {
      console.warn("[Axios] No accessToken found");
    }
    return config;
  },
  (error) => {
    console.error("[Axios] Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error("Network error. Please check your internet connection.");
      console.error("[Axios] Network error:", error);
      return Promise.reject(new Error("Network Error"));
    }

    const { status, data } = error.response;
    const message = data?.message || "Unexpected error occurred";

    if (status === 401 && message.toLowerCase().includes("token")) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    } else {
      toast.error(message);
    }

    console.error(`[Axios] Response error (status: ${status}):`, message);
    return Promise.reject(error);
  }
);
