const Product = require("../models/Product");

/**
 * GET /api/products
 * → get all products
 */
const getProducts = (req, res) => {
    Product.find()
      .populate("provider", "firstName lastName")
      .then(products =>
        res.json({
          success: true,
          data: products,
        })
      )
      .catch(err =>
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: err.message,
        })
      );
  };
  
  /**
   * GET /api/products/:id
   * → get one product by its ID
   */
  const getProductById = (req, res) => {
    Product.findById(req.params.id)
      .populate("provider", "firstName lastName")
      .then(product => {
        if (!product) {
          return res
            .status(404)
            .json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, data: product });
      })
      .catch(err =>
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: err.message,
        })
      );
  };
  
  /**
   * POST /api/products
   * → create a new product (admin or provider)
   */
  const createProduct = (req, res) => {
    const providerId = req.user._id;
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      images: req.body.images,
      stock: req.body.stock,
      provider: providerId,
    });
    newProduct
      .save()
      .then(product =>
        res.status(201).json({
          success: true,
          message: "Product created successfully",
          data: product,
        })
      )
      .catch(err =>
        res.status(400).json({
          success: false,
          message: "Product creation failed",
          error: err.message,
        })
      );
  };
  
  /**
   * PUT /api/products/:id
   * → update a product by its ID
   */
  const updateProduct = (req, res) => {
    Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
      .then(product => {
        if (!product) {
          return res
            .status(404)
            .json({ success: false, message: "Product not found" });
        }
        res.json({
          success: true,
          message: "Product updated successfully",
          data: product,
        });
      })
      .catch(err =>
        res.status(400).json({
          success: false,
          message: "Product update failed",
          error: err.message,
        })
      );
  };
  
  /**
   * DELETE /api/products/:id
   * → delete a product by its ID
   */
  const deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then(result => {
        if (!result) {
          return res
            .status(404)
            .json({ success: false, message: "Product not found" });
        }
        res.json({
          success: true,
          message: "Product deleted successfully",
        });
      })
      .catch(err =>
        res.status(500).json({
          success: false,
          message: "Server Error",
          error: err.message,
        })
      );
  };
  
  module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };