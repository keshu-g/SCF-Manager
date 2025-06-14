import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",

  DB_NAME: "SMF-Manager",
  MONGODB_URI: process.env.MONGODB_URI,

  BE_BASE_URL: process.env.BE_BASE_URL,
  FE_BASE_URL: process.env.FE_BASE_URL,

  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  REFRESH_SECRET_EXPIRY: "7d",
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  ACCESS_SECRET_EXPIRY: "15m",

  TOKEN_EXPIRY: "3d",
};

export default config;
