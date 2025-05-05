const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["user", "admin", "provider"],
    required: true,
    unique: true,
  },
  permissions: {
    type: [String],
    required: true,
    default: [],
  },
});
module.exports = mongoose.model("Role", rolesSchema);
