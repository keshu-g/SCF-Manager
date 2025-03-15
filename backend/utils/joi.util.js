import joi from "joi";
import regex from "./regex.util.js";
const { PASSWORD, PHONE_NUMBER } = regex;
import { toObjectId, isValidObjId } from "./helper.util.js";
import _ from "lodash";

const joiMessages = {
  "date.base": ":key must be a valid date",
  "date.empty": ":key is required",
  "date.format": ":key must be a valid date",
  "date.min": ":key can not be a date in the past",
  "string.base": ":key must be a string",
  "string.email": ":key is invalid",
  "string.empty": ":key is required",
  "string.pattern.base": ":key is invalid",
  "number.base": ":key must be a number",
  "number.integer": ":key must be a valid number",
  "number.empty": ":key is required",
  "boolean.base": ":key must be true/false",
  "any.required": ":key is required",
  "any.invalid": ":key is invalid",
  "any.only": ":value is not a valid :key",
  "any.unknown": ":key is not allowed",
  "object.unknown": ":key is not allowed",
  "array.includesRequiredUnknowns": ":key cannot be empty",
  "array.includesRequiredKnowns": ":key cannot be empty",
  "array.base": ":key must be an array",
  "array.unique": ":label :path :key already exists",
  "password.invalid":
    ":key must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
  "Id.invalid": ":key must be a valid ObjectId",
  "any.custom": "Something went wrong with : :key | :value",
  "object.base": ":key must be an object",
};

const idValidation = joi.string()
  .trim()
  .required()
  .custom((value, helper) =>
    isValidObjId(value) ? toObjectId(value) : helper.error("any.invalid")
  );

const emailValidation = joi.string().trim().required().email();

const passwordValidation = joi.string()
  .required()
  .custom((value, helper) =>
    PASSWORD.test(value) ? value : helper.error("password.invalid")
  );

const phoneNumberValidation = joi.string().regex(PHONE_NUMBER).required();

const stringValidation = joi.string().trim().required();

const dateValidation = joi.date().iso().required();

const pastDateValidation = joi.date().iso().min(new Date()).required();

const numberValidation = joi.number().integer().required();

const decimalValidation = joi.number().required();

const booleanValidation = joi.boolean().required();

const objectValidation = joi.object().required().unknown();

const populateMessage = (error) => {
  let errorDetails = error.details[0];
  console.log("errorDetails", errorDetails);
  let message = joiMessages[errorDetails.type];
  if (_.isEmpty(message)) {
    errorDetails.type = "any.custom";
    message = joiMessages["any.custom"];
  }
  switch (errorDetails.type) {
    case "any.custom":
      message = errorDetails.message;
      break;

    case "array.unique":
      message = message.replace(
        ":key",
        errorDetails.context?.value[errorDetails.context?.path]
      );
      message = message.replace(":path", errorDetails.context?.path);
      message = message.replace(":label", errorDetails.context?.label);
      break;

    default:
      message = message.replace(
        ":key",
        `${errorDetails.context.label}`.includes(".")
          ? errorDetails.context.key
          : errorDetails.context.label
      );
      message = message.replace(":value", errorDetails.context?.value);
      break;
  }
  return message;
};

export {
  joiMessages,
  idValidation,
  emailValidation,
  passwordValidation,
  phoneNumberValidation,
  stringValidation,
  dateValidation,
  pastDateValidation,
  numberValidation,
  decimalValidation,
  booleanValidation,
  objectValidation,
  populateMessage,
};
