import joi from "joi";
import {
  stringValidation,
  idValidation,
  numberValidation,
} from "../utils/joi.util.js";

const getMaterialSchema = joi.object({
  id: idValidation,
});

const addMaterialSchema = joi
  .object({
    name: stringValidation,
    description: stringValidation.optional().allow(""),
    quantity: numberValidation,
  })
  .unknown(false);

const updateMaterialSchema = addMaterialSchema.keys({
  id: idValidation,
});

export { getMaterialSchema, addMaterialSchema, updateMaterialSchema };
