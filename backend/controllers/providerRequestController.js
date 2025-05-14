const ProviderRequest = require("../models/ProviderRequest");
const User = require("../models/user");
const Role = require("../models/Role")

exports.createRequest = (req, res) => {
  const { storeName, storeDescription, userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID not received. Please register again",
    });
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const newReq = new ProviderRequest({
        userId,
        storeName,
        storeDescription,
      });

      return newReq.save();
    })
    .then((saved) => {
      if (saved) {
        res.status(201).json({ success: true, data: saved });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err.message });
    });
};

exports.getAllRequests = (req, res) => {
  ProviderRequest.find()
    .populate("userId", "username email")
    .then((list) => {
      res.status(200).json({ success: true, data: list });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err.message });
    });
};

exports.updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value",
    });
  }

  ProviderRequest.findByIdAndUpdate(id, { status }, { new: true })
    .then((updated) => {
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Request not found",
        });
      }

      if (status === "approved") {
        const userId = updated.userId._id || updated.userId;

        return Role.findOne({ name: "provider" }).then((roleDoc) => {
          if (!roleDoc) {
            return res
              .status(404)
              .json({ success: false, message: "Provider role not found" });
          }

          return User.findByIdAndUpdate(userId, { role: roleDoc._id }).then(
            () => {
              res.status(200).json({ success: true, data: updated });
            }
          );
        });
      }

      res.status(200).json({ success: true, data: updated });
    })
    .catch((err) => {
      console.error("❌ Failed to update user role", err);
      res.status(500).json({
        success: false,
        message: "Failed to update user role",
      });
    });
};
