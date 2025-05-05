const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization ");

const router = express.Router();

// Public: anyone can list & view products
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected: only provider or admin can create/update/delete
router.post(
  "/",
  authentication,
  authorization("provider", "admin"),
  createProduct
);
router.put(
  "/:id",
  authentication,
  authorization("provider", "admin"),
  updateProduct
);
router.delete(
  "/:id",
  authentication,
  authorization("provider", "admin"),
  deleteProduct
);

module.exports = router;
