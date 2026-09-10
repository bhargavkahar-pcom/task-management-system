import type { Response } from "express";

import { HTTP_STATUS } from "@constants/http-status.js";

interface SuccessResponseOptions<T> {
  statusCode?: number;
  message: string;
  data?: T;
}

interface ErrorResponseOptions {
  statusCode: number;
  message: string;
  code: string;
  details?: Record<string, string>;
}

export const sendSuccess = <T>(
  res: Response,
  options: SuccessResponseOptions<T>,
): Response => {
  const { statusCode = HTTP_STATUS.OK, message, data } = options;

  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
};

export const sendError = (
  res: Response,
  options: ErrorResponseOptions,
): Response => {
  const { statusCode, message, code, details } = options;

  return res.status(statusCode).json({
    success: false,
    message,
    error: {
      code,
      ...(details && Object.keys(details).length > 0 && { details }),
    },
  });
};
