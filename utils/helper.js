import _mongoose from "mongoose";
const {
  isValidObjectId,
  Types: { ObjectId },
} = _mongoose;
import { genSalt, hash } from "bcrypt";
import _ from "lodash";

const toObjectId = (entryId) => {
  if (Array.isArray(entryId)) {
    return entryId.map((entryId) => new ObjectId(entryId));
  }

  return new ObjectId(entryId);
};

const isValidObjId = (entryId) => {
  if (Array.isArray(entryId)) {
    return entryId.every((entryId) => isValidObjectId(entryId));
  }

  return isValidObjectId(entryId);
};

const encrypt = async (value, saltRounds) => {
  const salt = await genSalt(saltRounds);
  let output = await hash(value, salt);
  return output;
};

const generatePassword = (
  length = 8,
  useNumbers = true,
  useLowercase = true,
  useUppercase = true,
  useSpecialChars = true
) => {
  const numbers = "0123456789";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let characterPool = "";

  if (useNumbers) characterPool += numbers;
  if (useLowercase) characterPool += lowercase;
  if (useUppercase) characterPool += uppercase;
  if (useSpecialChars) characterPool += specialChars;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  return password;
};

export { toObjectId, isValidObjId, encrypt, generatePassword };
