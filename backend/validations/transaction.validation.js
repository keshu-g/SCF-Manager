import joi from "joi";
import {
  stringValidation,
  idValidation,
  numberValidation,
  decimalValidation,
} from "../utils/joi.util.js";

const manufactureProductSchema = joi.object({
  productId: idValidation.label("Product ID"),
  quantity: numberValidation.label("Quantity").min(1),
  description: stringValidation.label("Description").optional(),
}).unknown(false);

const materialTransactionSchema = joi.object({
  materials: joi.array().items(
    joi.object({
      materialId: idValidation.label("Material ID"),
      action: joi.string().valid("ADD", "REMOVE").label("Action"),
      actionQuantity: numberValidation.label("Quantity").min(1),
    })
  ),
  description: stringValidation.label("Description").optional(),
}).unknown(false);

export { manufactureProductSchema, materialTransactionSchema };