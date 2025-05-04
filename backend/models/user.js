const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  //Associate the user with a Role document
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
});

// Before saving: Convert the email to lowercase,
//  and encrypt the password if it changes.

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = mongoose.model("User", userSchema);
