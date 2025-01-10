import express from "express";
import { validate } from "../middlewares/validation.middleware.js";
import {
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterials,
  getMaterial,
} from "../controllers/material.controller.js";
import {
  getMaterialSchema,
  addMaterialSchema,
  updateMaterialSchema,
} from "../validations/material.validation.js";

const router = express.Router();

router.get("/", getMaterials);
router.get("/:id", validate(getMaterialSchema, "params"), getMaterial);
router.post("/", validate(addMaterialSchema, "body"), createMaterial);
router.put("/", validate(updateMaterialSchema, "body"), updateMaterial);
router.delete("/:id", validate(getMaterialSchema, "params"), deleteMaterial);


export default router;
