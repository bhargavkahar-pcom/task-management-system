import type { ErrorRequestHandler, RequestHandler } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { ApiError } from "@utils/api-error.js";
import { sendError } from "@utils/api-response.js";
import { HTTP_STATUS } from "@constants/http-status.js";

export const validateRequest: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const details: Record<string, string> = {};

    for (const error of errors.array()) {
      if ("path" in error && error.path) {
        /**
         * Keep the first validation error for a field.
         * This prevents duplicate fields in the response.
         */
        if (!details[error.path]) {
          details[error.path] = error.msg;
        }
      }
    }

    sendError(res, {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      details,
    });

    return;
  }

  next();
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  /**
   * Application errors
   */
  if (error instanceof ApiError) {
    sendError(res, {
      statusCode: error.statusCode,
      message: error.message,
      code: error.code,
      ...(error.details !== undefined && {
        details: error.details,
      }),
    });

    return;
  }

  /**
   * MongoDB duplicate key error
   */
  if (error?.code === 11000) {
    sendError(res, {
      statusCode: HTTP_STATUS.CONFLICT,
      message: "Resource already exists",
      code: "CONFLICT",
    });

    return;
  }

  /**
   * Mongoose validation error
   */
  if (error?.name === "ValidationError") {
    const details: Record<string, string> = {};

    Object.values(error.errors).forEach((validationError: any) => {
      details[validationError.path] = validationError.message;
    });

    sendError(res, {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Database validation failed",
      code: "VALIDATION_ERROR",
      details,
    });

    return;
  }

  /**
   * JWT errors
   */
  if (
    error instanceof jwt.JsonWebTokenError ||
    error instanceof jwt.TokenExpiredError
  ) {
    sendError(res, {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Invalid or expired token",
      code: "INVALID_TOKEN",
    });

    return;
  }

  /**
   * Unknown/unhandled errors
   */
  sendError(res, {
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: "Internal server error",
    code: "INTERNAL_SERVER_ERROR",
  });
};
