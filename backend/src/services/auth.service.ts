import { HTTP_STATUS } from "@constants/http-status.js";
import User from "@models/user.model.js";
import { ApiError } from "@utils/api-error.js";
import { generateAccessToken, generateRefreshToken } from "@utils/jwt.js";
import type {
  LoginUserInput,
  LoginUserResponse,
  RegisterUserInput,
  RegisterUserResponse,
} from "./auth.types.js";

export const loginUser = async (
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

export const registerUser = async (
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
