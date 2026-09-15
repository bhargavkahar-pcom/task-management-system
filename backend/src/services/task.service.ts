import type { QueryFilter } from "mongoose";

import Task, { type ITask } from "@models/task.model.js";
import type { CreateTaskRequest, GetTasksParams } from "./task.types.js";

interface CreateTaskServiceInput extends CreateTaskRequest {
  userId: NonNullable<Express.Request["user"]>["id"];
}

const createTask = async ({
  title,
  description,
  status,
  priority,
  dueDate,
  userId,
}: CreateTaskServiceInput) => {
  const task = await Task.create({
    title,
    ...(description !== undefined && { description }),
    ...(status !== undefined && { status }),
    ...(priority !== undefined && { priority }),
    ...(dueDate !== undefined && { dueDate: new Date(dueDate) }),
    userId,
  });

  return task;
};

const getAllTasks = async ({
  userId,
  page,
  limit,
  search,
  status,
  priority,
  sortBy = "createdAt",
  sortOrder = "desc",
}: GetTasksParams) => {
  const filter: QueryFilter<ITask> = {
    userId,
  };

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (status) {
    filter.status = status;
  }

  if (priority) {
    filter.priority = priority;
  }

  const skip = (page - 1) * limit;

  const sort = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  } as Record<string, 1 | -1>;

  const [tasks, total] = await Promise.all([
    Task.find(filter).sort(sort).skip(skip).limit(limit).lean(),

    Task.countDocuments(filter),
  ]);

  return {
    tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPreviousPage: page > 1,
    },
  };
};

export default { createTask, getAllTasks };
