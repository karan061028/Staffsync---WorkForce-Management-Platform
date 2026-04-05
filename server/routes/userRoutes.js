const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getAllEmployees } = require("../controllers/usercontroller");

// 👑 ADMIN ONLY
router.get("/", protect, adminOnly, getAllEmployees);

module.exports = router;