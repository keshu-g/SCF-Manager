import { join, resolve } from "path";
import app from "./app.js";
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
    app.listen(PORT, () => {
      console.log(logString);
    });
  })
  .catch((err) => console.log(`DB Error: ${err.message}`));

app.get("/", (req, res) => res.send(`SCF Manager is running on port: ${PORT}`));
