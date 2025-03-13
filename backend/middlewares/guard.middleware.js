import jwt from "jsonwebtoken";
import { apiError, apiHandler } from "../utils/api.util.js";
import constants from "../constants.js";
import messages from "../utils/messages.util.js";
import { userModel } from "../models/index.js";

const authGuard = apiHandler(async (req, res, next) => {
  const openRoutes = ["/users/test", "/users/login"];

  if (openRoutes.some((route) => req.url.startsWith(route))) {
    return next();
  }

  const token = req.cookies.accessToken;
  if (!token) {
    return apiError(messages.UNAUTHORIZED, "User", null, res);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, constants.ACCESS_SECRET);
  } catch (error) {
    console.error("JWT verification failed:", error);
    return apiError(
      messages.UNAUTHORIZED,
      "Invalid or expired token",
      null,
      res
    );
  }

  const existingUser = await userModel.findById(decodedToken.userId, {
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

export { authGuard };
