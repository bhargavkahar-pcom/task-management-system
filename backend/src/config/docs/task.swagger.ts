import { TASK_PRIORITIES, TASK_STATUSES } from "@models/task.model.js";
import { TASK_SORT_BY } from "@services/task.types.js";
import { SORT_ORDER } from "../../types/common.types.js";

export const taskSwagger = {
  paths: {
    "/task": {
      post: {
        tags: ["Task"],
        summary: "Create a new task",
        description: "Creates a new task for the authenticated user.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateTaskRequest" },
              example: {
                title: "Complete API documentation",
                description: "Prepare Swagger documentation for all APIs",
                status: "Pending",
                priority: "High",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Task created successfully",
            content: {
              "application/json": {
                example: {
                  success: true,
                  message: "Task created successfully",
                  data: {
                    _id: "68c7a8f1c5d123456789abcd",
                    title: "Complete API documentation",
                    description: "Prepare Swagger documentation for all APIs",
                    status: "Pending",
                    priority: "High",
                    createdAt: "2026-09-16T10:00:00.000Z",
                    updatedAt: "2026-09-16T10:00:00.000Z",
                  },
                },
              },
            },
          },
          400: {
            description: "Validation error",
            content: {
              "application/json": {
                example: {
                  success: false,
                  message: "Validation failed",
                  error: { code: "VALIDATION_ERROR" },
                },
              },
            },
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
        },
      },

      get: {
        tags: ["Task"],
        summary: "Get all tasks",
        description:
          "Returns a paginated list of tasks belonging to the authenticated user.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "page",
            in: "query",
            required: false,
            description: "Page number",
            schema: { type: "integer", minimum: 1, default: 1 },
            example: 1,
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "Number of tasks per page",
            schema: { type: "integer", minimum: 1, maximum: 100, default: 10 },
            example: 10,
          },
          {
            name: "status",
            in: "query",
            required: false,
            description: "Filter tasks by status",
            schema: {
              type: "string",
              enum: [...TASK_STATUSES],
            },
            example: "Pending",
          },
          {
            name: "priority",
            in: "query",
            required: false,
            description: "Filter tasks by priority",
            schema: { type: "string", enum: [...TASK_PRIORITIES] },
            example: "High",
          },
          {
            name: "search",
            in: "query",
            required: false,
            description: "Search tasks by title or description",
            schema: { type: "string" },
            example: "documentation",
          },
          {
            name: "sortBy",
            in: "query",
            required: false,
            description: "Field used for sorting",
            schema: {
              type: "string",
              enum: [...TASK_SORT_BY],
              default: "createdAt",
            },
            example: "createdAt",
          },
          {
            name: "sortOrder",
            in: "query",
            required: false,
            description: "Sort direction",
            schema: { type: "string", enum: [...SORT_ORDER], default: "desc" },
            example: "desc",
          },
        ],
        responses: {
          200: {
            description: "Tasks fetched successfully",
            content: {
              "application/json": {
                example: {
                  success: true,
                  message: "Tasks fetched successfully",
                  data: {
                    tasks: [
                      {
                        _id: "68c7a8f1c5d123456789abcd",
                        title: "Complete API documentation",
                        description:
                          "Prepare Swagger documentation for all APIs",
                        status: "pending",
                        priority: "high",
                        createdAt: "2026-09-16T10:00:00.000Z",
                        updatedAt: "2026-09-16T10:00:00.000Z",
                      },
                    ],
                    pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
                  },
                },
              },
            },
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
        },
      },
    },

    "/task/{id}": {
      get: {
        tags: ["Task"],
        summary: "Get task by ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            example: "68c7a8f1c5d123456789abcd",
          },
        ],
        responses: {
          200: {
            description: "Task fetched successfully",
          },
          400: {
            description: "Invalid task ID",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
          404: {
            description: "Task not found",
          },
        },
      },

      patch: {
        tags: ["Task"],
        summary: "Update task",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            example: "68c7a8f1c5d123456789abcd",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateTaskRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Task updated successfully",
          },
          400: {
            description: "Validation error",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
          404: {
            description: "Task not found",
          },
        },
      },

      delete: {
        tags: ["Task"],
        summary: "Delete task",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            example: "68c7a8f1c5d123456789abcd",
          },
        ],
        responses: {
          200: {
            description: "Task deleted successfully",
          },
          400: {
            description: "Invalid task ID",
          },
          401: {
            $ref: "#/components/responses/UnauthorizedError",
          },
          404: {
            description: "Task not found",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      CreateTaskRequest: {
        type: "object",
        required: ["title"],
        properties: {
          title: {
            type: "string",
            description: "Task title",
            example: "Complete API documentation",
          },
          description: {
            type: "string",
            description: "Task description",
            example: "Prepare Swagger documentation for all APIs",
          },
          status: {
            type: "string",
            enum: [...TASK_STATUSES],
            default: "Pending",
            example: "Pending",
          },
          priority: {
            type: "string",
            enum: [...TASK_PRIORITIES],
            default: "Medium",
            example: "High",
          },
        },
      },

      UpdateTaskRequest: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Complete API documentation",
          },
          description: {
            type: "string",
            example: "Update Swagger documentation",
          },
          status: {
            type: "string",
            enum: [...TASK_STATUSES],
            default: "Pending",
            example: "Pending",
          },
          priority: {
            type: "string",
            enum: [...TASK_PRIORITIES],
            default: "Medium",
            example: "High",
          },
        },
      },
    },
  },
};
