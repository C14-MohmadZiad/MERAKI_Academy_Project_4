const mongoose = require("mongoose");

// We load environment variables first so we can use process.env
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mz_store";

mongoose
  .connect(URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err.message);
  });
