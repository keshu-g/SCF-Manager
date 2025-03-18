import { userModel } from "../models/index.js";
import { apiResponse, apiError, apiHandler } from "../utils/api.util.js";
import {
  encrypt,
  generatePassword,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/helper.util.js";
import messages from "../utils/messages.util.js";
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
  // const token = jwt.sign({ id: userData._id }, constants.JWT_SECRET, {
  //   expiresIn: constants.TOKEN_EXPIRY,
  // });

  const accessToken = generateAccessToken(userData._id);
  const refreshToken = generateRefreshToken(userData._id);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return apiResponse(messages.LOGIN, "user", null, res);
});

const logout = apiHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return apiResponse(messages.LOGOUT, "user", null, res);
});

const refreshToken = apiHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return apiError(messages.INVALID_AUTH, null, null, res);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(refreshToken, constants.REFRESH_SECRET);
  } catch (error) {
    console.error("JWT verification failed:", error);
    return apiError(messages.UNAUTHORIZED, null, null, res);
  }

  const userId = decodedToken.userId;
  const accessToken = generateAccessToken(userId);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  return apiResponse(messages.CUSTOM_SUCCESS, "Token refreshed successfully", null, res);
});

export { getProfile, createUser, login, logout, refreshToken };
