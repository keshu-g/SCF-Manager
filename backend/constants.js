import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  DB_NAME: "SMF-Manager",
  MONGODB_URI: process.env.MONGODB_URI,
  BE_BASE_URL: process.env.BASE_URL,
  FE_BASE_URL: process.env.BASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || "defaultSecret",

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN: "15m",
  REFRESH_TOKEN_EXPIRES_IN: "7d",

  TOKEN_EXPIRY: "3d",
};

export default config;
