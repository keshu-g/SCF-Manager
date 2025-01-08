import { Router } from "express";
const router = Router();

import userRouter from "./user.route.js";
import materialRouter from "./material.route.js";

router.use("/users", userRouter);
router.use("/materials", materialRouter);

export default router;
