import { Router } from "express";
const router = Router();
import { validate } from "../middlewares/validation.middleware.js";
import {
  addUserBodySchema,
  loginUserSchema,
} from "../validations/user.validation.js";
import {
  getProfile,
  createUser,
  login,
  logout,
  refreshToken,
} from "../controllers/user.controller.js";

router.get("/profile", getProfile);
router.post("/", validate(addUserBodySchema, "body"), createUser);
router.post("/login", validate(loginUserSchema, "body"), login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);

export default router;
