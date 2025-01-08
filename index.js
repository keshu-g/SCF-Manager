import { join, resolve } from "path";
import { listen, use, get } from "./app.js";
import constants from "./constants.js";
const { NODE_ENV, PORT, BE_BASE_URL } = constants;
import express from "express";
import connectDB from "./database/mongodb.js";

let serverURL =
  NODE_ENV === "production" ? BE_BASE_URL : `http://localhost:${PORT}`;

let logString = `
+++ Server Started +++
ENVIRONMENT : ${NODE_ENV} 
PORT        : ${PORT}
URL         : ${serverURL}
`;

connectDB()
  .then(() => {
    listen(PORT, () => {
      console.log(logString);
    });
  })
  .catch((err) => console.log(`DB Error: ${err.message}`));

if (NODE_ENV === "production") {
  use(express.static(join(__dirname, "client", "build")));
  get("/", (req, res) => {
    res.sendFile(resolve(__dirname, "client", "build", "index.html"));
  });
  get("/*", (req, res) => {
    res.sendFile(resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  get("/", (req, res) => res.send(`ReBudget is running on port: ${PORT}`));
}
