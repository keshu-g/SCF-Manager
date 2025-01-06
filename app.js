const express = require("express");
const cors = require("cors");
const compression = require("compression");

const { CORS_ORIGIN } = require("./constants");
const { authGuard } = require("./middlewares/guard.middleware");

const routes = require("./routes");

const app = express();

app.use(cors({ credentials: true, origin: CORS_ORIGIN }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.static("public"));
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

module.exports = app;
