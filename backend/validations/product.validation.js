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
    client: idValidation,
    name: stringValidation,
    price: numberValidation,
    formula: joi.array().items(
      joi.object({
        material: idValidation,
        quantity: numberValidation,
      })
    ),
    otherCosts: joi.array().items(
      joi.object({
        name: stringValidation,
        amount: numberValidation,
      })
    ),
  })
  .unknown(false);

const updateProductSchema = addProductSchema.keys({
  id: idValidation,
});

export { getProductSchema, addProductSchema, updateProductSchema };
