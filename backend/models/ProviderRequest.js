const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const providerRequestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  storeName: { type: String, required: true },
  storeDescription: { type: String, default: "" },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("ProviderRequest", providerRequestSchema);