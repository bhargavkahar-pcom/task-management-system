import { Router } from "express";

import { getMe, login, register } from "@controllers/auth.controller.js";
import { validateRequest } from "@middleware/error.middleware.js";
import {
  loginValidator,
  registerUserValidator,
} from "@validators/auth.validator.js";
import { authenticate } from "@middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUserValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);
router.get("/me", authenticate, getMe);

export default router;
