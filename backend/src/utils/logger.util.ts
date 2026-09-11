import type { LogMetadata } from "@config/logger.js";
import logger from "@config/logger.js";

export const logInfo = (message: string, metadata?: LogMetadata): void => {
  logger.info(message, metadata);
};

export const logWarn = (message: string, metadata?: LogMetadata): void => {
  logger.warn(message, metadata);
};

export const logError = (
  message: string,
  error?: unknown,
  metadata?: LogMetadata,
): void => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : error !== undefined
        ? String(error)
        : undefined;

  const errorStack = error instanceof Error ? error.stack : undefined;

  logger.error(message, {
    ...metadata,
    error: errorMessage,
    metadata: {
      ...(metadata?.metadata as Record<string, unknown> | undefined),
      stack: errorStack,
    },
  });
};

export default logger;
