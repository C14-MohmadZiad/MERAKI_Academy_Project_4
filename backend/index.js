require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./models/db"); //import to activate the connection.

const app = express();
const PORT = process.env.PORT || 5000;
const authrouter = require('./routes/authRoutes')
const products = require('./routes/productRoutes')
const cartRoutes = require("./routes/cartRoutes");

app.use(cors());
app.use(express.json());
app.use('/api/auth',authrouter)
app.use('/api/products',products)
app.use("/api/cart", cartRoutes);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
