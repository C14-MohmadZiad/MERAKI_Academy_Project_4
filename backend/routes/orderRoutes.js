const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const router = express.Router();

//path User

router.post("/", authentication, createOrder);
router.get("/", authentication, getUserOrders);
router.get(
  "/:id",
  authentication,
  authorization("admin", "user"),
  getOrderById
);

//patch admin
router.get("/all", authentication, authorization("admin"), getAllOrders);
router.put(
  "/:id/status",
  authentication,
  authorization("admin"), updateOrderStatus
);
//path provider
router.delete(
  "/:id",
  authentication,
  authorization("admin", "provider"),
  deleteOrder
);

module.exports = router;
