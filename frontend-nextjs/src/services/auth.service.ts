import apiClient from "@/lib/axios";

import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/types/auth.types";

export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auth/login", payload);

    return response.data;
  },

  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/auth/register",
      payload,
    );

    return response.data;
  },
};
