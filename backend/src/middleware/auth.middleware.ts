import type { NextFunction, Request, Response } from "express";

import { HTTP_STATUS } from "@constants/http-status.js";
import { sendError } from "@utils/api-response.js";
import { verifyAccessToken } from "@utils/jwt.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authorization = req.headers.authorization;

  /**
   * Authorization: Bearer <access-token>
   */
  if (!authorization) {
    sendError(res, {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Authentication failed",
      code: "UNAUTHORIZED",
    });

    return;
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    sendError(res, {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Invalid authorization header",
      code: "INVALID_AUTHORIZATION_HEADER",
    });

    return;
  }

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.sub,
    };

    next();
  } catch {
    sendError(res, {
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message: "Invalid or expired access token",
      code: "INVALID_ACCESS_TOKEN",
    });
  }
};
