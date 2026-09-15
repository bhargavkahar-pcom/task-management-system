import type { ITask, TaskPriority, TaskStatus } from "@models/task.model.js";

export interface CreateTaskRequest {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate: string;
}

export interface GetTasksParams {
  userId: string;
  page: number;
  limit: number;
  search?: string;
  status?: ITask["status"];
  priority?: ITask["priority"];
  sortBy?: "dueDate" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}
