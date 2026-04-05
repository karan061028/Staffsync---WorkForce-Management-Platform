const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["new", "active", "completed", "failed"],
    default: "new",
  },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  tasks: [taskSchema], // 🔥 IMPORTANT
});

module.exports = mongoose.model("User", userSchema);