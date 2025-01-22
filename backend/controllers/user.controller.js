import { userModel } from "../models/index.js";
import { apiResponse, apiError, apiHandler } from "../utils/apiHelper.js";
import { encrypt, generatePassword } from "../utils/helper.js";
import messages from "../utils/messages.js";
import jwt from "jsonwebtoken";
import constants from "../constants.js";
import { compare } from "bcrypt";

const getProfile = async (req, res) => {
  const id = req.user._id;

  const userData = await userModel.findById(id).select("-password --v");

  if (!userData) {
    return apiError(messages.NOT_FOUND, "User", null, res);
  }

  return apiResponse(messages.FETCH, "user", userData, res);
};

const createUser = apiHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const existingUser = await userModel.findOne(
    { email },
    { password: 0, refreshToken: 0, OTP: 0 }
  );

  if (existingUser) {
    return apiError(messages.EXISTS, "User with this email", null, res);
  }

  let encryptedPassword = await encrypt(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: encryptedPassword,
  });
  return apiResponse(messages.FETCH, "user", user, res);
});

const login = apiHandler(async (req, res) => {
  const { email, password } = req.body;

  const userData = await userModel.findOne({ email });

  if (!userData) {
    return apiError(messages.INVALID_AUTH, null, null, res);
  }

  const isMatch = await compare(password, userData.password);
  if (!isMatch) {
    return apiError(messages.INVALID_AUTH, null, null, res);
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

  return apiResponse(messages.LOGIN, "user", output, res);
});

export { getProfile, createUser, login };
