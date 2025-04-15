import joi from "joi";
import {
  stringValidation,
  idValidation,
  numberValidation,
} from "../utils/joi.util.js";

const getProductSchema = joi.object({
  id: idValidation,
});

const addProductSchema = joi
  .object({
    client: idValidation.label("Client ID"),
    name: stringValidation.label("Product Name"),
    price: numberValidation.label("Product Price"),
    formula: joi.array().items(
      joi.object({
        material: idValidation.label("Material ID"),
        quantity: numberValidation.label("Material Quantity"),
      })
    ),
    otherCosts: joi.array().items(
      joi.object({
        _id: idValidation.label("Other Cost ID").optional(),
        name: stringValidation.label("Other Cost Name"),
        amount: numberValidation.label("Other Cost Amount"),
      })
    ),
  })
  .unknown(false);

const updateProductSchema = addProductSchema.keys({
  id: idValidation,
});

export { getProductSchema, addProductSchema, updateProductSchema };
