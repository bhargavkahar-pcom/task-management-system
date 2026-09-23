import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { env } from "@/config/env";
import { authStorage } from "@/utils/auth-storage";

const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = authStorage.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      authStorage.clear();
    }

    return Promise.reject(error);
  },
);

export default apiClient;
