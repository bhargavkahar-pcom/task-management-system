import crypto from "crypto";

import { HTTP_STATUS } from "@constants/http-status.js";
import RefreshToken from "@models/refresh-token.model.js";
import User from "@models/user.model.js";
import { ApiError } from "@utils/api-error.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@utils/jwt.js";

import type {
  CurrentUserResponse,
  LoginUserInput,
  LoginUserResponse,
  RegisterUserInput,
  RegisterUserResponse,
} from "./auth.types.js";

const loginUser = async (
  payload: LoginUserInput,
): Promise<LoginUserResponse> => {
  const email = payload.email.trim().toLowerCase();

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "INVALID_CREDENTIALS",
      "Invalid email or password",
    );
  }

  const isPasswordValid = await user.comparePassword(payload.password);

  if (!isPasswordValid) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "INVALID_CREDENTIALS",
      "Invalid email or password",
    );
  }

  const userId = user._id.toString();

  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await RefreshToken.create({
    userId: user._id,
    tokenHash,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7d
  });

  return {
    user: {
      id: userId,
      name: user.name,
      email: user.email,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

const registerUser = async (
  payload: RegisterUserInput,
): Promise<RegisterUserResponse> => {
  const name = payload.name.trim();
  const email = payload.email.trim().toLowerCase();

  const existingUser = await User.findOne({ email }).lean();

  if (existingUser) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      "CONFLICT",
      "Email already registered",
    );
  }

  const user = await User.create({
    name,
    email,
    password: payload.password,
  });

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
};

const getCurrentUser = async (userId: string): Promise<CurrentUserResponse> => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "USER_NOT_FOUND",
      "User not found",
    );
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const logoutUser = async (
  refreshToken: string,
  userId: string,
): Promise<void> => {
  const payload = verifyRefreshToken(refreshToken);

  if (payload.sub !== userId) {
    throw new Error("Invalid refresh token");
  }

  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await RefreshToken.findOneAndUpdate(
    {
      tokenHash,
      revokedAt: null,
    },
    {
      $set: {
        revokedAt: new Date(),
      },
    },
  );
};

export default { getCurrentUser, loginUser, logoutUser, registerUser };
