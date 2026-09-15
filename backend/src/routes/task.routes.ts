import { Router } from "express";

import { createTask, getAllTasks } from "@controllers/task.controller.js";
import { authenticate } from "@middleware/auth.middleware.js";
import {
  createTaskValidator,
  taskListValidator,
} from "@validators/task.validator.js";
import { validateRequest } from "@middleware/error.middleware.js";

const router = Router();

router.post(
  "/",
  createTaskValidator,
  validateRequest,
  authenticate,
  createTask,
);

router.get("/", taskListValidator, authenticate, getAllTasks);

export default router;
