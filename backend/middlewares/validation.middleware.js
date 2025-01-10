import { apiError } from "../utils/apiHelper.js";
import messages from "../utils/messages.js";
import { populateMessage } from "../utils/joiValidationHelper.js";

const validate = (schema, type) => (req, res, next) => {
  const { error } = schema.validate(req[type]);
  if (error) {
    return apiError(messages.CUSTOM_ERROR, populateMessage(error), null, res);
  }
  next();
};

const validateMultiple = (schema, types) => (req, res, next) => {
  validationData = {};
  types.forEach((type) => {
    validationData[type] = req[type];
  });
  const { error } = schema.validate(validationData);
  if (error) {
    return apiError(messages.CUSTOM_ERROR, populateMessage(error), null, res);
  }
  next();
};

export { validate, validateMultiple };
