const mongoose = require("mongoose");

const Cart =require("../models/cart")


// ✅ get cart
const getCart = (req, res) => {
  Cart.findOne({ user: req.user._id })
    .populate("items.product") 
    .then((cart) => {
   
      if (!cart) {
        return res.json({
          success: true,
          data: { user: req.user._id, items: [] },
        });
      }
      res.json({ success: true, data: cart });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      })
    );
};

// ✅ add item
const addItem = (req, res) => {
  const { product, quantity } = req.body;

  Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $push: {
        items: {product: new mongoose.Types.ObjectId(product),
            quantity: Number(quantity), },
      },
    },
    { new: true, upsert: true } 
  )
    .then((cart) =>
      res.status(201).json({
        success: true,
        message: "Item added to cart",
        data: cart,
      })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message: "Failed to add item",
        error: err.message,
      })
    );
};

// ✅ update quantity
const updateItem = (req, res) => {
  const { product, quantity } = req.body;

  Cart.findOneAndUpdate(
    {
      user: req.user._id,
      "items.product": product,
    },
    {
      $set: {
        "items.$.quantity": quantity,
      },
    },
    { new: true }
  )
    .then((cart) =>
      res.json({
        success: true,
        message: "Quantity updated",
        data: cart,
      })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message: "Failed to update quantity",
        error: err.message,
      })
    );
};

// ✅ remove item
const removeItem = (req, res) => {
  const itemId = req.params.itemId;

  Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: {
        items: { product: itemId },
      },
    },
    { new: true }
  )
    .then((cart) =>
      res.json({
        success: true,
        message: "Item removed",
        data: cart,
      })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message: "Failed to remove item",
        error: err.message,
      })
    );
};

module.exports = { getCart, addItem, updateItem, removeItem };
