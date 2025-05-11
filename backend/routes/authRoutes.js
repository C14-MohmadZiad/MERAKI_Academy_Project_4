const express = require("express");
const authentication = require("../middleware/authentication");

const { register, login, getMe } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authentication, getMe);

module.exports = router;