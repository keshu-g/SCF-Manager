const path = require("path");
const app = require("./app");
const { PORT, NODE_ENV, BASE_URL } = require("./constants");
const express = require("express");
const connectDB = require("./database/mongodb");

let serverURL = NODE_ENV === "production" ? BASE_URL : `http://localhost:${PORT}`;

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

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send(`ReBudget is running on port: ${PORT}`));
}
