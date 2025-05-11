const express = require("express");
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
} = require("../controllers/userController");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const { createRequest } = require("../controllers/providerRequestController");

const router = express.Router();

// only admin
router.get("/", authentication, authorization("admin"), getAllUsers);
router.delete("/:id", authentication, authorization("admin"), deleteUser);
router.put("/:id/role", authentication, authorization("admin"), updateUserRole);
// request for provider

router.post("/request-provider/public", createRequest);
router.post("/request-provider", authentication, createRequest);

module.exports = router;
