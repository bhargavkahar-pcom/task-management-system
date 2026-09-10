import type { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

import config from "@config/config.js";

const {
  JWT_ACCESS_EXPIRES_IN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
} = config;

export interface AccessTokenPayload {
  sub: string;
  type: "access";
}

export interface RefreshTokenPayload {
  sub: string;
  type: "refresh";
}

const createToken = <T extends object>(
  payload: T,
  secret: string,
  expiresIn: string,
): string => {
  const options: SignOptions = {
    expiresIn: expiresIn as NonNullable<SignOptions["expiresIn"]>,
  };

  return jwt.sign(payload, secret, options);
};

export const generateAccessToken = (userId: string): string => {
  const payload: AccessTokenPayload = {
    sub: userId,
    type: "access",
  };

  return createToken(payload, JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRES_IN);
};

export const generateRefreshToken = (userId: string): string => {
  const payload: RefreshTokenPayload = {
    sub: userId,
    type: "refresh",
  };

  return createToken(payload, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN);
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as JwtPayload &
    AccessTokenPayload;

  if (decoded.type !== "access" || typeof decoded.sub !== "string") {
    throw new Error("Invalid access token");
  }

  return {
    sub: decoded.sub,
    type: "access",
  };
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload &
    RefreshTokenPayload;

  if (decoded.type !== "refresh" || typeof decoded.sub !== "string") {
    throw new Error("Invalid refresh token");
  }

  return {
    sub: decoded.sub,
    type: "refresh",
  };
};
