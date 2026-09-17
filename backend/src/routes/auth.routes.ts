import { Router } from "express";

import {
  getUserProfile,
  loginUser,
  logoutUser,
  getRefreshToken,
  registerUser,
} from "@controllers/auth.controller.js";
import { authenticate } from "@middleware/auth.middleware.js";
import { validateRequest } from "@middleware/error.middleware.js";
import {
  loginValidator,
  registerUserValidator,
} from "@validators/auth.validator.js";

const router = Router();

router.post("/register", registerUserValidator, validateRequest, registerUser);
router.post("/login", loginValidator, validateRequest, loginUser);
router.post("/logout", authenticate, logoutUser);

router.get("/me", authenticate, getUserProfile);
router.get("/refresh-token", getRefreshToken);

export default router;
