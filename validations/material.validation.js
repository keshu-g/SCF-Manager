const Joi = require("joi");
const { idValidation } = require("../utils/joiValidationHelper");
const { param } = require("../routes/material.route");

const getMaterialSchema = Joi.object({
  id: idValidation,
});

const addMaterialSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  totalQuantity: Joi.number().required().min(0),
}).unknown(false);

const updateMaterialSchema = addMaterialSchema.keys({
  id: idValidation,
});

module.exports = {
  getMaterialSchema,
  addMaterialSchema,
  updateMaterialSchema,
};
