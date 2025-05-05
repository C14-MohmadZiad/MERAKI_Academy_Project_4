const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },

  //Provider for this product
  provider: { type: mongoose.Types.ObjectId, ref: "User", requierd: true },
  category: { type: String },
  image: { type: String },
  stock: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", ProductSchema);
