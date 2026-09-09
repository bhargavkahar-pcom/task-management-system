import "dotenv/config";

import config from "@config/config.js";
import app from "./app.js";
import connectDB from "./database/connection.js";

const { PORT, NODE_ENV, API_PREFIX } = config;

let server: ReturnType<typeof app.listen>;

const startServer = async (): Promise<void> => {
  try {
    server = app.listen(PORT, () => {
      console.log("========================================");
      console.log("Task Management API");
      console.log("========================================");
      console.log(`Environment : ${NODE_ENV}`);
      console.log(`Port        : ${PORT}`);
      console.log(`URL         : http://localhost:${PORT}`);
      console.log(`API Prefix  : ${API_PREFIX}`);
      console.log("========================================");
    });

    // Connect to database before starting the HTTP server
    await connectDB();
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

/**
 * Gracefully shutdown the application.
 */
const shutdown = (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);

  if (!server) {
    process.exit(0);
  }

  server.close((error) => {
    if (error) {
      console.error("Error while shutting down server:", error);
      process.exit(1);
    }

    console.log("HTTP server closed successfully.");
    process.exit(0);
  });
};

/**
 * Handle unhandled promise rejections.
 */
process.on("unhandledRejection", (error: unknown) => {
  console.error("Unhandled Promise Rejection:", error);

  shutdown("UNHANDLED_REJECTION");
});

/**
 * Handle uncaught exceptions.
 */
process.on("uncaughtException", (error: unknown) => {
  console.error("Uncaught Exception:", error);

  shutdown("UNCAUGHT_EXCEPTION");
});

/**
 * Handle termination signals.
 */
process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});

process.on("SIGINT", () => {
  shutdown("SIGINT");
});

startServer();
