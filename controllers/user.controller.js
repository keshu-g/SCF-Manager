const { userModel } = require("../models");
const { apiResponse, apiError, apiHandler } = require("../utils/apiHandler");
const { encrypt, generatePassword } = require("../utils/helper");
const { FETCH, EXISTS, INVALID_AUTH } = require("../utils/messages");
const jwt = require("jsonwebtoken");
const constants = require("../constants");
const bcrypt = require("bcrypt");

const getProfile = async (req, res) => {
  let ttest = {
    name: "test",
    email: "test",
  };

  return apiResponse(FETCH, "user", ttest, res);
};
const createUser = apiHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const existingUser = await userModel.findOne({ email }, { password: 0, refreshToken: 0, OTP: 0 });

  if (existingUser) {
    return apiError(EXISTS, "User with this email", null, res);
  }

  let encryptedPassword = await encrypt(password, 10);

  const user = await userModel.create({ fullName, email, password: encryptedPassword });
  return apiResponse(FETCH, "user", user, res);
});

const login = apiHandler(async (req, res) => {
  const { email, password } = req.body;

  const userData = await userModel.findOne({ email });

  if (!userData) {
    return apiError(INVALID_AUTH, null, null, res);
  }

  const isMatch = await bcrypt.compare(password, userData.password);
  if (!isMatch) {
    return apiError(INVALID_AUTH, null, null, res);
  }
  const token = jwt.sign({ id: userData._id }, constants.JWT_SECRET, {
    expiresIn: constants.TOKEN_EXPIRY,
  });

  let output = {
    id: userData._id,
    fullName: userData.fullName,
    email: userData.email,
    token,
  };

  return apiResponse(FETCH, "user", output, res);
});

module.exports = {
  getProfile,
  createUser,
  login,
};
