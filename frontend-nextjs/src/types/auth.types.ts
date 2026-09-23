export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    tokens: AuthTokens;
  };
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: {
    code?: string;
    details?: unknown;
  };
}
