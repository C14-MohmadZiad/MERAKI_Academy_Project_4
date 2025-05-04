const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Wishlist", WishlistSchema);
