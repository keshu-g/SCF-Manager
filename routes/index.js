import { Router } from "express";
const router = Router();

import userRouter from "./user.route.js";
import materialRouter from "./material.route.js";
import clientRouter from "./client.route.js";
import productRouter from "./product.route.js";

router.use("/users", userRouter);
router.use("/materials", materialRouter);
router.use("/clients", clientRouter);
router.use("/products", productRouter);

export default router;
