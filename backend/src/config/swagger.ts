import type { Express } from "express";
import swaggerUi from "swagger-ui-express";

import { authSwagger } from "./docs/auth.swagger.js";
import { taskSwagger } from "./docs/task.swagger.js";

const swaggerDocument = {
  openapi: "3.0.0",

  info: {
    title: "Task Management System API",
    version: "1.0.0",
    description: "REST APIs for the Task Management System",
  },

  servers: [
    {
      url: "/api/v1",
      description: "API Server",
    },
  ],

  tags: [
    {
      name: "Auth",
      description: "User authentication and profile APIs",
    },

    {
      name: "Task",
      description: "Task management APIs",
    },
  ],

  paths: {
    ...authSwagger.paths,
    ...taskSwagger.paths,
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },

    // Global Reusable Responses
    responses: {
      UnauthorizedError: {
        description: "Unauthorized access - missing or invalid token",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: false },
                message: { type: "string", example: "Unauthorized" },
                error: {
                  type: "object",
                  properties: {
                    code: { type: "string", example: "UNAUTHORIZED" },
                  },
                },
              },
            },
          },
        },
      },
    },

    schemas: {
      ...authSwagger.components.schemas,
      ...taskSwagger.components.schemas,
    },
  },
};

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
