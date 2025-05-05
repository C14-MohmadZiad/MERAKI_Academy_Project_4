const Wishlist = require("../models/Wishlist");

// Get/api wish list for user

const getWishlist = (req, res) => {
  Wishlist.findOne({ user: req.user._id })
    .populate("products")
    .then((wl) => {
      if (!wl) {
        return res.json({
          success: true,
          data: { user: req.user._id, products: [] },
        });
      }
      res.json({ success: true, data: wl });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

// post api wishlisa

const addToWishlist = (req, res) => {
  const { product } = req.body;
  Wishlist.findOneAndUpdate(
    { user: req.user._id },
    { $addToSet: { products: product } },
    { new: true, upsert: true }
  )
    .then((wl) => {
      res.status(201).json({ success: true, data: wl });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, message: "Failed to add", error: err.message });
    });
};

//Delete api wishlist/:productId
const removeFromWishlist = (req, res) => {
  const { productId } = req.params;
  Wishlist.findOneAndDelete(
    { user: req.user._id },
    { $pull: { products: productId } },
    { new: true }
  )
    .then((wl) => {
      res.json({ success: true, data: wl });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Failed to remove",
        error: err.message,
      });
    });
};

// DELETE /API /WISHLIST all

const clearWishlist = (req, res) => {
  Wishlist.findByIdAndUpdate(
    { user: req.user._id },
    { $set: { products: [] } },
    { new: true }
  )
    .then((wl) => {
      res.json({ success: true, data: wl });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "failrd to clear",
        error: err.message,
      });
    });
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist,clearWishlist };
