const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  createTask,
  updateTaskStatus,
  getTasks,
  editTask,
  deleteTask,
} = require("../controllers/taskController");

// 👑 ADMIN
router.post("/create", protect, adminOnly, createTask);

// 👨‍💻 USER
router.put("/update", protect, updateTaskStatus);
router.get("/:userId", protect, getTasks);

// ✏️ EDIT
router.put("/edit", protect, editTask);

// 🗑️ DELETE
router.delete("/delete", protect, deleteTask);

module.exports = router;