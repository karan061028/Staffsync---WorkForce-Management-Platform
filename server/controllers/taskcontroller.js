const User = require("../models/User");

// ✅ CREATE TASK (ADMIN ONLY)
exports.createTask = async (req, res) => {
  try {
    const { userId, title, description } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.tasks.push({
      title,
      description,
      status: "new",
    });

    await user.save();

    res.json({ message: "Task created", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET TASKS (SECURED)
exports.getTasks = async (req, res) => {
  try {
    const userId = req.params.userId;

    // 🔐 employee can only see own tasks
    if (req.user.role === "employee" && req.user.id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ UPDATE TASK STATUS
exports.updateTaskStatus = async (req, res) => {
  try {
    const { userId, taskId, status } = req.body;

    // 🔐 employee can only update own tasks
    if (req.user.role === "employee" && req.user.id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const task = user.tasks.id(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = status;

    await user.save();

    res.json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ EDIT TASK
exports.editTask = async (req, res) => {
  try {
    const { userId, taskId, title, description } = req.body;

    // 🔐 employee can only edit own tasks
    if (req.user.role === "employee" && req.user.id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const task = user.tasks.id(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title) task.title = title;
    if (description) task.description = description;

    await user.save();

    res.json({ message: "Task edited", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🗑️ DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { userId, taskId } = req.body;

    // 🔐 employee can only delete own tasks
    if (req.user.role === "employee" && req.user.id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const task = user.tasks.id(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.deleteOne();

    await user.save();

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};