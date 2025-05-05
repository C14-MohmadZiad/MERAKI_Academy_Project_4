const Order = require("../models/Order");

//create New Order

const createOrder = (req, res) => {
  const { items, totalPrice } = req.body;

  const order = new Order({
    user: req.user._id,
    items,
    totalPrice,
  });

  order
    .save()
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
        erorr: err.message,
      });
    });
};

//get date of  orders users
const getUserOrders = (req, res) => {
  Order.find({ user: req.user._id })
    .populate("items.product") // deatails of product "show"
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

// getOrderById  only for user and admin
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
      // Make sure the owner of request same user or admin
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
      res
        .status(500)
        .json({ success: false, message: "Server Error", error: err.message });
    });
};

//getAllOrders By admin only

const getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "firstName LastName") //only name of user
    .populate("items.product")
    .then((orders) => {
      res.json({ success: true, data: orders });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error ",
        error: err.message,
      });
    });
};

//UpdateOrderSTatus By admin only
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
      res
        .status(400)
        .json({ success: false, message: "Update failed", error: err.message });
    });
};

// delete the request By admin or provider only

const deleteOrder = (req, res) => {
    Order.findByIdAndDelete(req.params.id)
      .then(order => {
        if (!order) {
          return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, message: "Order deleted" });
      })
      .catch(err => 
        res.status(500).json({ success: false, message: "Server Error", error: err.message })
      );
  };
module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
};
