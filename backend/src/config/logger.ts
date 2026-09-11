import fs from "node:fs";
import path from "node:path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logsDirectory = path.resolve(process.cwd(), "logs");

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory, { recursive: true });
}

export interface LogMetadata {
  method?: string;
  statusCode?: number;
  url?: string;
  errorCode?: string;
  stack?: unknown;
  [key: string]: unknown;
}

const logFormat = winston.format.printf(
  ({
    timestamp,
    level,
    method,
    statusCode,
    url: requestPath,
    errorCode,
    stack: metadata,
  }) => {
    const formattedMethod = method ?? "-";
    const formattedStatusCode = statusCode ?? "-";
    const formattedPath = requestPath ?? "-";
    const formattedError = errorCode ?? "-";

    const formattedMetadata =
      metadata !== undefined ? JSON.stringify(metadata) : "-";

    return [
      `${"-".repeat(2)}\n`,
      `${timestamp}`,
      `[${level}] |`,
      `${formattedMethod}`,
      `${formattedStatusCode}`,
      `${formattedPath} |`,
      `${formattedError} |`,
      `${formattedMetadata}`,
    ].join(" ");
  },
);

const baseFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DDTHH:mm:ss.SSSZ",
  }),
  logFormat,
  // winston.format.printf((arg: any) => {
  //   console.log(JSON.stringify(arg));
  //   return "-";
  // }),
);

const errorFileTransport = new DailyRotateFile({
  filename: path.join(logsDirectory, "error-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  level: "error",
  maxFiles: "30d",
  zippedArchive: false,
  format: baseFormat,
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",

  transports: [
    errorFileTransport,

    new winston.transports.Console({
      format: baseFormat,
    }),
  ],

  exitOnError: false,
});

export default logger;
