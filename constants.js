require("dotenv").config({
  path: "./.env",
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  CORS_ORIGIN: process.env.CORS_ORIGIN,

  DB_NAME: "SMF-Manager",
  MONGODB_URI: process.env.MONGODB_URI,

  BE_BASE_URL: process.env.BASE_URL,
  FE_BASE_URL: process.env.BASE_URL,

  JWT_SECRET: process.env.JWT_SECRET,
  TOKEN_EXPIRY: "3d",
};
