const ProviderRequest = require("../models/ProviderRequest");
const User = require("../models/user");

exports.createRequest = async (req, res) => {
  console.log("BODY:", req.body);

  const { storeName, storeDescription, userId } = req.body;

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID not received. Please register again",
    });
  }

  try {
    // Verify that the user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create the request
    const newReq = new ProviderRequest({
      userId,
      storeName,
      storeDescription,
    });

    const saved = await newReq.save();
    res.status(201).json({ success: true, data: saved });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
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
    return res
      .status(400)
      .json({ success: false, message: "Invalid status value" });
  }

  ProviderRequest.findByIdAndUpdate(id, { status }, { new: true })
    .then((updated) => {
      if (!updated) {
        return res
          .status(404)
          .json({ success: false, message: "Request not found" });
      }
      res.status(200).json({ success: true, data: updated });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: err.message });
    });
};
