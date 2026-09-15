import type { NextFunction, Request, Response } from "express";

import { HTTP_STATUS } from "@constants/http-status.js";
import type { TaskPriority, TaskStatus } from "@models/task.model.js";
import taskService from "@services/task.service.js";
import type { TaskSortBy } from "@services/task.types.js";
import { sendError, sendSuccess } from "@utils/api-response.js";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    req.body.dueDate =
      req.body.dueDate && !Number.isNaN(Date.parse(req.body.dueDate))
        ? req.body.dueDate
        : undefined;

    const task = await taskService.createTask({
      ...req.body,
      userId: req.user?.id,
    });

    sendSuccess(res, {
      statusCode: HTTP_STATUS.CREATED,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, {
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: "Unauthorised for this request.",
        code: "UNAUTHORIZED",
      });

      return;
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const status =
      typeof req.query.status === "string" ? req.query.status : undefined;

    const priority =
      typeof req.query.priority === "string" ? req.query.priority : undefined;

    const sortBy =
      typeof req.query.sortBy === "string" ? req.query.sortBy : undefined;

    const sortOrder = req.query.sortOrder === "asc" ? "asc" : "desc";

    const result = await taskService.getAllTasks({
      userId: req.user.id,
      page,
      limit,
      ...(search !== undefined && { search }),
      ...(status !== undefined && {
        status: status as TaskStatus,
      }),
      ...(priority !== undefined && {
        priority: priority as TaskPriority,
      }),
      ...(sortBy !== undefined && {
        sortBy: sortBy as TaskSortBy,
      }),
      sortOrder,
    });

    sendSuccess(res, {
      statusCode: HTTP_STATUS.OK,
      message: "Tasks retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
