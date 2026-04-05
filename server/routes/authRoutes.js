const express = require("express");
const router = express.Router();

// ✅ Import controller functions
const { signup, login } = require("../controllers/authcontroller");

// ✅ Routes
router.post("/signup", signup);
router.post("/login", login);

// ✅ Export router
module.exports = router;