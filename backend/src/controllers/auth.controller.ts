import type { NextFunction, Request, Response } from "express";

import { loginUser, registerUser } from "@services/auth.service.js";
import { sendSuccess } from "@utils/api-response.js";
import { HTTP_STATUS } from "@constants/http-status.js";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const result = await loginUser({
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

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser({
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
