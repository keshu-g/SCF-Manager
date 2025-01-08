const router = require("express").Router();
const { validate } = require("../middlewares/validation.middleware");
const { addUserBodySchema, loginUserSchema } = require("../validations/user.validation");
const { getProfile, createUser, login } = require("../controllers/user.controller");

router.get("/test", getProfile);
router.post("/", validate(addUserBodySchema, "body"), createUser);
router.post("/login", validate(loginUserSchema, "body"), login);

module.exports = router;
