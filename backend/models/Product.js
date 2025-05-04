const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, requierd: true },
  description: { tpye: String },
  price: { type: Number, requierd: true },

  //Provider for this product
  provider: { type: Schema.types.ObjectId, ref: "User", requierd: true },
  catgegory: { type: String },
  image: { type: String },
  stock: { type: Number, default: 0 },
});

module.exports = mongoose.modal("Product", ProductSchema);
