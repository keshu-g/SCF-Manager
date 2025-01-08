const router = require("express").Router();
const { validate } = require("../middlewares/validation.middleware");
const {
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterials,
  getMaterial,
} = require("../controllers/material.controller");
const {
  getMaterialSchema,
  addMaterialSchema,
  updateMaterialSchema,
} = require("../validations/material.validation");

router.get("/", getMaterials);
router.get("/:id", validate(getMaterialSchema, "params"), getMaterial);
router.post("/", validate(addMaterialSchema, "body"), createMaterial);
router.put("/", validate(updateMaterialSchema, "body"), updateMaterial);
router.delete("/:id", validate(getMaterialSchema, "params"), deleteMaterial);

module.exports = router;
