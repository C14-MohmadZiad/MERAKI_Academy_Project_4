const Order = require("../models/Order");
const Product = require("../models/Product");

// ✅ Create New Order (مع حساب totalPrice تلقائياً)
const createOrder = (req, res) => {
  const { items } = req.body;

  const productIds = items.map((item) => item.product);

  Product.find({ _id: { $in: productIds } })
    .then((products) => {
      if (products.length !== items.length) {
        return res.status(400).json({
          success: false,
          message: "One or more products not found",
        });
      }

      let totalPrice = 0;
      items.forEach((item) => {
        const product = products.find((p) => p._id.toString() === item.product);
        if (product) {
          totalPrice += product.price * item.quantity;
        }
      });

      const order = new Order({
        user: req.user._id,
        items,
        totalPrice,
      });

      return order.save();
    })
    .then((order) => {
      res.status(201).json({
        success: true,
        data: order,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Order creation failed",
        error: err.message,
      });
    });
};

// ✅ Get all orders for the current user
const getUserOrders = (req, res) => {
  Order.find({ user: req.user._id })
    .populate("items.product")
    .then((orders) => {
      res.json({ success: true, data: orders });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

// ✅ Get order by ID (user or admin only)
const getOrderById = (req, res) => {
  Order.findById(req.params.id)
    .populate("items.product")
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order Not found",
        });
      }

      if (
        order.user.toString() !== req.user._id.toString() &&
        req.user.role.name !== "admin"
      ) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized From OrderController",
        });
      }

      res.json({ success: true, data: order });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

// ✅ Get all orders (admin only)
const getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "firstName lastName")
    .populate("items.product")
    .then((orders) => {
      res.json({ success: true, data: orders });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

// ✅ Update order status (admin only)
const updateOrderStatus = (req, res) => {
  const { status } = req.body;

  Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
      res.json({ success: true, message: "Status updated", data: order });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Update failed",
        error: err.message,
      });
    });
};

// ✅ Delete order (admin or provider)
const deleteOrder = (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then((order) => {
      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }
      res.json({ success: true, message: "Order deleted" });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });
    });
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
