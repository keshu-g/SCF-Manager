const express = require("express");
const router = express.Router();

const userRouter = require("./user.route");
const materialRouter = require("./material.route");

router.use("/users", userRouter);
router.use("/materials", materialRouter);

module.exports = router;
