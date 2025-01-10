import express from "express";
import { validate } from "../middlewares/validation.middleware.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
  manufactureProduct,
} from "../controllers/product.controller.js";
import {
  getProductSchema,
  addProductSchema,
  updateProductSchema,
} from "../validations/product.validation.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", validate(getProductSchema, "params"), getProduct);
router.post("/", validate(addProductSchema, "body"), createProduct);
router.put("/", validate(updateProductSchema, "body"), updateProduct);
router.delete("/:id", validate(getProductSchema, "params"), deleteProduct);
router.post(
  "/manufacture/:id",
  validate(getProductSchema, "params"),
  manufactureProduct
);

export default router;
