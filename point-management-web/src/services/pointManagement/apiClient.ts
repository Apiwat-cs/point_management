import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Standardized API Response interface matching backend
interface BaseApiResponse {
  success?: boolean;
  message?: string;
  payload?: unknown;
  error?: string;
  errorCode?: string;
}

const API_URL = import.meta.env.VITE_PMS_APP_API_URL || "/api/v1";

const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Dev Logging
    if (import.meta.env.DEV) {
      console.groupCollapsed(
        `[API] Request: ${config.method?.toUpperCase()} ${config.url}`,
      );
      console.log("Headers:", config.headers);
      console.log("Params:", config.params);
      console.log("Data:", config.data);
      console.groupEnd();
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("[API] Request Error:", error);
    return Promise.reject(error);
  },
);

// Response Interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Dev Logging
    if (import.meta.env.DEV) {
      console.groupCollapsed(
        `[API] Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
      );
      console.log("Status:", response.status);
      console.log("Data:", response.data);
      console.groupEnd();
    }

    // Auto-unwrap data if it follows standard envelope
    return response.data;
  },
  (error: AxiosError<BaseApiResponse>) => {
    const status = error.response?.status;
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message;

    // Dev Logging
    if (import.meta.env.DEV) {
      console.groupCollapsed(
        `[API] Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
      );
      console.error("Status:", status);
      console.error("Message:", errorMessage);
      console.error("Full Error:", error);
      console.groupEnd();
    }

    // Global Error Handling
    if (status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // Hard redirect to login — clears all in-memory state
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    } else if (status === 403) {
      console.warn("[API] Forbidden access");
    } else if (status && status >= 500) {
      console.error("[API] Server Error");
    }

    // Return enhanced error object
    return Promise.reject({
      ...error,
      message: errorMessage,
      isNetworkError: !error.response,
      status,
    });
  },
);

const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    instance.get<unknown, T>(url, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    instance.post<unknown, T>(url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    instance.put<unknown, T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    instance.delete<unknown, T>(url, config),
};

export default apiClient;
