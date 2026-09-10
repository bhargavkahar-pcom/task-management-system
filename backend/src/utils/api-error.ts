import type { HttpStatusCode } from "@constants/http-status.js";

export class ApiError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly code: string;
  public readonly details?: Record<string, string>;

  constructor(
    statusCode: HttpStatusCode,
    code: string,
    message: string,
    details?: Record<string, string>,
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;

    if (details !== undefined) {
      this.details = details;
    }

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
