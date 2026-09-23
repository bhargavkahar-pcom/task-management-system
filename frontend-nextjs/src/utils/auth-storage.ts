import type { AuthUser } from "@/types/auth.types";

const ACCESS_TOKEN_KEY = "tms_at";
const REFRESH_TOKEN_KEY = "tms_rt";
const USER_KEY = "tms_user";

export const authStorage = {
  getAccessToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  getUser(): AuthUser | null {
    if (typeof window === "undefined") {
      return null;
    }

    const user = localStorage.getItem(USER_KEY);
    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user) as AuthUser;
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  },

  setUser(user: AuthUser): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clear(): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
