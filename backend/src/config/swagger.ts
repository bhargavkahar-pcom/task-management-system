import type { Express } from "express";
import swaggerUi from "swagger-ui-express";

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
  ],

  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: {
                    type: "string",
                    example: "John Doe",
                  },
                  email: {
                    type: "string",
                    format: "email",
                    example: "john@example.com",
                  },
                  password: {
                    type: "string",
                    format: "password",
                    example: "Password@123",
                  },
                },
              },
            },
          },
        },

        responses: {
          "201": {
            description: "User registered successfully",
          },
          "400": {
            description: "Validation error",
          },
          "409": {
            description: "Email already exists",
          },
        },
      },
    },

    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "john@example.com",
                  },
                  password: {
                    type: "string",
                    format: "password",
                    example: "Password@123",
                  },
                },
              },
            },
          },
        },

        responses: {
          "200": {
            description: "Login successful",
          },
          "401": {
            description: "Invalid email or password",
          },
        },
      },
    },

    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get current user profile",

        security: [
          {
            bearerAuth: [],
          },
        ],

        responses: {
          "200": {
            description: "User profile retrieved successfully",
          },
          "401": {
            description: "Unauthorized",
          },
        },
      },
    },

    "/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout current user",

        security: [
          {
            bearerAuth: [],
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["refreshToken"],
                properties: {
                  refreshToken: {
                    type: "string",
                    example: "eyJhbGciOiJIUzI1NiIs...",
                  },
                },
              },
            },
          },
        },

        responses: {
          "200": {
            description: "Logged out successfully",
          },

          "400": {
            description: "Refresh token is required",
          },

          "401": {
            description: "Unauthorized",
          },
        },
      },
    },
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
