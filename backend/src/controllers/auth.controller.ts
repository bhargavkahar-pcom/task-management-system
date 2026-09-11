import type { NextFunction, Request, Response } from "express";

import { HTTP_STATUS } from "@constants/http-status.js";
import authService from "@services/auth.service.js";
import { sendError, sendSuccess } from "@utils/api-response.js";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser({
      email,
      password,
    });

    sendSuccess(res, {
      statusCode: HTTP_STATUS.OK,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const user = await authService.registerUser({
      name,
      email,
      password,
    });

    sendSuccess(res, {
      statusCode: HTTP_STATUS.CREATED,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new Error("Authenticated user not found in request");
    }

    const user = await authService.getCurrentUser(req.user.id);

    sendSuccess(res, {
      statusCode: HTTP_STATUS.OK,
      message: "User profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      sendError(res, {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Invalid request",
        code: "INVALID_REQUEST",
      });

      return;
    }

    await authService.logoutUser(refreshToken, req.user!.id);

    sendSuccess(res, {
      statusCode: HTTP_STATUS.OK,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
