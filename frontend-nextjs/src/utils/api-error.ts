import axios from "axios";

export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage: string,
): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? fallbackMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};
