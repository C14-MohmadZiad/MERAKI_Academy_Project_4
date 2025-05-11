const express = require("express");
const {
  getCart,
  addItem,
  updateItem,
  removeItem,
} = require("../controllers/cartController");
const authentication = require("../middleware/authentication");

const router = express.Router();

router.get("/", authentication, getCart);
router.post("/", authentication, addItem);
router.put("/", authentication, updateItem);
router.delete("/:itemId", authentication, removeItem);

module.exports = router;