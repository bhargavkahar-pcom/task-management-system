import { Router } from "express";

import authRoutes from "./auth.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import taskRoutes from "./task.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/task", taskRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
