const ProviderRequest = require("../models/ProviderRequest");

exports.createRequest = (req, res) => {
  const { storeName, storeDescription } = req.body;

  exports.createRequest = (req, res) => {
    const { storeName, storeDescription } = req.body;

    const newReq = new ProviderRequest({
      userId: req.user.id,
      storeName,
      storeDescription,
    });

    newReq
      .save()
      .then((saved) => {
        res.status(201).json({ success: true, data: saved });
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
};