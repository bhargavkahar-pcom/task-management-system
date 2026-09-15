import { Router } from "express";

import { createTask, getAllTasks } from "@controllers/task.controller.js";
import { authenticate } from "@middleware/auth.middleware.js";

const router = Router();

router.post("/", /* authenticate,  */ createTask);

router.get("/", /* authenticate, */ getAllTasks);

export default router;
