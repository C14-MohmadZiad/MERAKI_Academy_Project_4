const Product = require("../models/Product");

/* 
GET/api/products
*/

const getProducts = (req, res) => {
  Product.find()
    .populate("provider", "username")
    .then((products) =>
      res.json({
        success: true,
        data: products,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      })
    );

  /* 
    post/api/products
    */
  const createProduct = (req, res) => {
    const providerId = req.user._id;
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.price,
      category: req.body.category,
      images: req.body.images,
      stock: req.body.stock,
      provider: providerId,
    });
    newProduct
      .save()
      .then((Product) => {
        res.status(201).json({
          success: true,
          message: "Product created successFully",
          data: Product,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: "Product creation failed",
          error: err.message,
        });
      });
  };
};

module.exports = {
  getProducts,
  createProduct,
};
