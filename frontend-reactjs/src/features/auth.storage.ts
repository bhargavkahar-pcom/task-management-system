import type { AuthTokens, User } from "./auth/types/auth.types";

const ACCESS_TOKEN_KEY = "tms_at";
const REFRESH_TOKEN_KEY = "tms_rt";
const USER_KEY = "tms_user";

export const authStorage = {
  getAccessToken(): string | null {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getUser(): User | null {
    const value = sessionStorage.getItem(USER_KEY);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as User;
    } catch {
      return null;
    }
  },

  setAuth(tokens: AuthTokens, user: User): void {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);

    sessionStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);

    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  updateAccessToken(accessToken: string): void {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },

  clear(): void {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },

  isAuthenticated(): boolean {
    return Boolean(this.getAccessToken());
  },
};
