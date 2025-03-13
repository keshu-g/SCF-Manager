import joi from "joi";
import {
  stringValidation,
  idValidation,
} from "../utils/joi.util.js";

const getClientSchema = joi.object({
  id: idValidation,
});

const addClientSchema = joi
  .object({
    name: stringValidation,
    address: stringValidation,
  })
  .unknown(false);

const updateClientSchema = addClientSchema.keys({
  id: idValidation,
});

export { getClientSchema, addClientSchema, updateClientSchema };
