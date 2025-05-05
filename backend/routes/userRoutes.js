const express = require("express");
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
} = require("../controllers/userController");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const router = express.Router();

// only admin
router.get("/", authentication, authorization("admin"), getAllUsers);
router.delete("/:id", authentication, authorization("admin"), deleteUser);
router.put("/:id/role", authentication, authorization("admin"), updateUserRole);

module.exports = router;
