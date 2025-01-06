const Joi = require("joi");
const { emailValidation, stringValidation, idValidation, passwordValidation } = require("../utils/joiValidationHelper");

const getUserSchema = Joi.object({
  id: idValidation,
});

const addUserBodySchema = Joi.object({
  fullName: stringValidation,
  email: emailValidation,
  password: stringValidation,
}).unknown(false);

const updateUserSchema = Joi.object({
  params: Joi.object({
    id: idValidation,
  }),
  body: addUserBodySchema.keys({
    changePassword: passwordValidation.optional().allow(""),
  }),
}).unknown(false);

const loginUserSchema = Joi.object({
  email: stringValidation,
  password: stringValidation,
}).unknown(false);

module.exports = {
  getUserSchema,
  addUserBodySchema,
  updateUserSchema,
  loginUserSchema,
};
