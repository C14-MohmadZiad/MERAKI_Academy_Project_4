const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { schema } = require("./Role");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  //Associate the user with a Role document
  role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
});

// Before saving: Convert the email to lowercase,
//  and encrypt the password if it changes.

userSchema.pre("save", async function () {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = mongoose.model("User", userSchema);
