const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").populate("role", "name");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    await User.findByIdAndUpdate(id, { role });
    res.status(200).json({ success: true, message: "User role updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating role" });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUserRole,
};
