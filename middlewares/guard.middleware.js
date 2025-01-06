const jwt = require("jsonwebtoken");
const { apiHandler, apiError } = require("../utils/apiHandler");
const { JWT_SECRET } = require("../constants");
const { UNAUTHORIZED } = require("../utils/messages");

const authGuard = (roles = apiHandler(async (req, res, next) => {
  let openRoutes = ["/users/test", "/users/login"];

  if (openRoutes.includes(req.url)) {
    next();
    return;
  }
  const token = req.headers["authorization"];

  if (!token) {
    return apiError(UNAUTHORIZED, "User", null, res);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return apiError(UNAUTHORIZED, "User", null, res);
  }
  if (decodedToken.TYPE !== "LOGIN") {
    return apiError(UNAUTHORIZED, "User", null, res);
  }

  const existingUser = await User.findById(decodedToken.id, { password: 0, refreshToken: 0, OTP: 0 });
  if (!existingUser) {
    return apiError(UNAUTHORIZED, "User", null, res);
  }
  req.user = existingUser;
  next();
}));

module.exports = {
  authGuard,
};
