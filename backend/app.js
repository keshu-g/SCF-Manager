import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";

import constants from "./constants.js";
import { authGuard } from "./middlewares/guard.middleware.js";

import routes from "./routes/index.js";

const app = express();

// app.use(cors({ credentials: true, origin: constants.CORS_ORIGIN }));
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    return callback(null, origin); // Reflect the request origin
  },
  credentials: true, // Allow credentials (cookies, headers)
}));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON format" });
  }
  next(err);
});
app.use(
  compression({
    level: 6,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

app.use("/api/v1", authGuard, routes);

export default app;
