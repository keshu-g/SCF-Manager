const jwt = require("jsonwebtoken");
const { apiHandler, apiError } = require("../utils/apiHandler");
const { JWT_SECRET } = require("../constants");
const { UNAUTHORIZED } = require("../utils/messages");
const { userModel } = require("../models");

const authGuard = apiHandler(async (req, res, next) => {
  const openRoutes = ["/users/test", "/users/login"];

  if (openRoutes.some((route) => req.url.startsWith(route))) {
    return next();
  }

  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return apiError(UNAUTHORIZED, "Missing authorization token", null, res);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("JWT verification failed:", error);
    return apiError(UNAUTHORIZED, "Invalid or expired token", null, res);
  }

  const existingUser = await userModel.findById(decodedToken.id, {
    password: 0,
    refreshToken: 0,
    OTP: 0,
  });

  if (!existingUser) {
    return apiError(UNAUTHORIZED, "User not found", null, res);
  }

  req.user = existingUser;
  next();
});

module.exports = {
  authGuard,
};
