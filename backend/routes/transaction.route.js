import express from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { manufactureProduct } from "../controllers/transaction.controller.js";
import { manufactureProductSchema } from "../validations/transaction.validation.js";

const router = express.Router();

router.post(
  "/manufacture",
  validate(manufactureProductSchema, "body"),
  manufactureProduct
);

export default router;
