import joi from "joi";
import {
  stringValidation,
  idValidation,
  numberValidation,
} from "../utils/joiValidationHelper.js";

const getMaterialSchema = joi.object({
  id: idValidation,
});

const addMaterialSchema = joi
  .object({
    name: stringValidation,
    description: stringValidation,
    totalQuantity: numberValidation,
  })
  .unknown(false);

const updateMaterialSchema = addMaterialSchema.keys({
  id: idValidation,
});

export { getMaterialSchema, addMaterialSchema, updateMaterialSchema };
