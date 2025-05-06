import express from "express";
import { validate } from "../middlewares/validation.middleware.js";
import {
  manufactureProduct,
  materialTransaction,
} from "../controllers/transaction.controller.js";
import {
  manufactureProductSchema,
  materialTransactionSchema,
} from "../validations/transaction.validation.js";

const router = express.Router();

router.post(
  "/manufacture",
  validate(manufactureProductSchema, "body"),
  manufactureProduct
);

router.post(
  "/material",
  validate(materialTransactionSchema, "body"),
  materialTransaction
);

export default router;
