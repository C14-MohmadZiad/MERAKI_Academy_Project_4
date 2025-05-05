const mongoose = require("mongoose");
const Product = require("./Product");

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true ,unique:true},

  items: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});
module.exports = mongoose.model("Cart", CartSchema);
