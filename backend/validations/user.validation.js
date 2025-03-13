import joi from "joi";
import {
  emailValidation,
  stringValidation,
  idValidation,
  passwordValidation,
} from "../utils/joi.util.js";

const getUserSchema = joi.object({
  id: idValidation,
});

const addUserBodySchema = joi
  .object({
    fullName: stringValidation,
    email: emailValidation,
    password: stringValidation,
  })
  .unknown(false);

const updateUserSchema = joi
  .object({
    params: joi.object({
      id: idValidation,
    }),
    body: addUserBodySchema.keys({
      changePassword: passwordValidation.optional().allow(""),
    }),
  })
  .unknown(false);

const loginUserSchema = joi
  .object({
    email: stringValidation,
    password: stringValidation,
  })
  .unknown(false);

export {
  getUserSchema,
  addUserBodySchema,
  updateUserSchema,
  loginUserSchema,
};
