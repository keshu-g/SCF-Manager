import { Router } from "express";
const router = Router();

import userRouter from "./user.route.js";
import materialRouter from "./material.route.js";
import clientRouter from "./client.route.js";
import productRouter from "./product.route.js";
import transactionRouter from "./transaction.route.js";

router.use("/user", userRouter);
router.use("/material", materialRouter);
router.use("/client", clientRouter);
router.use("/product", productRouter);
router.use("/transaction", transactionRouter);

export default router;
