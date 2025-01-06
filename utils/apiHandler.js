const { isEmpty } = require("lodash");
const { SERVER_ERROR } = require("./messages");

const apiHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (err) {
      console.log(err);
      return apiError(SERVER_ERROR, null, err, res);
    }
  };
};

const apiResponse = async ([statusCode, msg], item, data, res) => {
  const message = msg.replace(new RegExp(":item", "g"), item);
  const success = statusCode < 400;
  const response = {
    success,
    message,
  };

  if (!isEmpty(data)) {
    response["data"] = data;
  }

  if (res) {
    return res.status(statusCode).json(response);
  }
  return response;
};

const apiError = async ([statusCode, msg], item, err, res) => {
  const message = msg.replace(new RegExp(":item", "g"), item);
  const success = statusCode < 400;
  const error = {
    success,
    message,
  };

  if (process.env.NODE_ENV === "local" && err) {
    if (Array.isArray(err)) {
      error["errors"] = err;
    } else {
      error["error"] = err.message;
      const stackLines = err.stack.split("\n");
      if (stackLines.length >= 2) {
        error["stack"] = stackLines[1].trim();
      }
    }
  }

  if (res) {
    return res.status(statusCode).json(error);
  }
  return error;
};

module.exports = {
  apiHandler,
  apiResponse,
  apiError,
};
