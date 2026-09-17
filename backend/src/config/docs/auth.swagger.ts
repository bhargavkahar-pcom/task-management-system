export const authSwagger = {
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
                $ref: "#/components/schemas/RegisterRequest",
              },
            },
          },
        },

        responses: {
          "201": {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
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
                $ref: "#/components/schemas/LoginRequest",
              },
            },
          },
        },

        responses: {
          "200": {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
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
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GetCurrentUser",
                },
              },
            },
          },
          "401": {
            $ref: "#/components/responses/UnauthorizedError",
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

        parameters: [
          {
            name: "x-refresh-token",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
            description: "Current valid refresh token to revoke",
          },
        ],

        responses: {
          "200": {
            description: "Logged out successfully",
          },
          "400": {
            description: "Refresh token is required",
          },
          "401": {
            $ref: "#/components/responses/UnauthorizedError",
          },
        },
      },
    },

    "/auth/refresh-token": {
      get: {
        tags: ["Auth"],
        summary: "Refresh Access and Refresh Tokens",
        parameters: [
          {
            name: "x-refresh-token",
            in: "header",
            required: true,
            schema: {
              type: "string",
            },
            description: "Current valid refresh token",
          },
        ],
        responses: {
          "200": {
            description: "Tokens refreshed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    accessToken: { type: "string" },
                    refreshToken: { type: "string" },
                  },
                },
              },
            },
          },
          "401": {
            description: "Refresh token has been revoked or is invalid",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      RegisterRequest: {
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
            minLength: 8,
            example: "Password@123",
          },
        },
      },

      LoginRequest: {
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

      LoginResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Login successful",
          },
          user: {
            $ref: "#/components/schemas/GetCurrentUser",
          },
          accessToken: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIs...",
          },
          refreshToken: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIs...",
          },
        },
      },

      LogoutRequest: {
        type: "object",
        required: ["refreshToken"],
        properties: {
          refreshToken: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIs...",
          },
        },
      },

      GetCurrentUser: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "64f123456789abcdef123456",
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-09-17T10:30:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-09-17T10:30:00.000Z",
          },
        },
      },
    },
  },
};
