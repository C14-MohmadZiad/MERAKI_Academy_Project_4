const User = require("../models/user");
//get api for admin only
const getAllUsers = (req, res) => {
    User.find()
      .select("-password")
      .populate("role", "name permissions")
      .then(users => res.json({ success: true, data: users }))
      .catch(err => res.status(500).json({ success: false, message: "Server Error", error: err.message }));
  };


  