const { apiError } = require("../utils/apiHandler");
const { CUSTOM_ERROR } = require("../utils/messages");
const { populateMessage } = require("../utils/joiValidationHelper");

const validate = (schema, type) => (req, res, next) => {
  const { error } = schema.validate(req[type]);
  if (error) {
    return apiError(CUSTOM_ERROR, populateMessage(error), null, res);
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
    return apiError(CUSTOM_ERROR, populateMessage(error), null, res);
  }
  next();
};

module.exports = {
  validate,
  validateMultiple,
};
