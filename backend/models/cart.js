const mongoose = require("mongoose");
const Product = require("./Product");

const CartSchema = new mongoose.Schema({
  user: { type: Schema.types.ObjectId, ref: "Product", required: true },

  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});
module.exports = mongoose.model("Cart", CartSchema);
