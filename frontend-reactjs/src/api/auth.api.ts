import { authStorage } from "@/features/auth.storage";
import type {
  AuthResponse,
  LoginRequest,
  RefreshResponse,
  RegisterRequest,
  User,
} from "@/features/auth/types/auth.types";
import { apiClient } from "./axios";

export const authApi = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: AuthResponse;
    }>("/auth/login", payload);

    return response.data.data;
  },

  async register(payload: RegisterRequest): Promise<User> {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: User;
    }>("/auth/register", payload);

    return response.data.data;
  },

  async refresh(refreshToken: string): Promise<RefreshResponse> {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: RefreshResponse;
    }>("/auth/refresh", {
      refreshToken,
    });

    return response.data.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data: User;
    }>("/auth/me");

    return response.data.data;
  },

  async logout(): Promise<void> {
    const refreshToken = authStorage.getRefreshToken();

    await apiClient.post(
      "/auth/logout",
      {},
      {
        headers: {
          "x-refresh-token": refreshToken,
        },
      },
    );
  },
};
