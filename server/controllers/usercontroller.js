const User = require("../models/User");

// 👥 GET ALL EMPLOYEES
exports.getAllEmployees = async (req, res) => {
  try {
    const users = await User.find({ role: "employee" }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};