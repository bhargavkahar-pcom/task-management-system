import { Router } from "express";

import { login, register } from "@controllers/auth.controller.js";
import { validateRequest } from "@middleware/error.middleware.js";
import { loginValidator, registerUserValidator } from "@validators/auth.validator.js";

const router = Router();

router.post("/register", registerUserValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);

export default router;
