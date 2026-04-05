const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// 🔥 Middleware
app.use(cors());
app.use(express.json());

// 🔥 Connect DB
connectDB();

// 🔥 Routes
const path = require("path");

app.use("/api/tasks", require(path.join(__dirname, "routes", "taskRoutes")));
app.use("/api/users", require(path.join(__dirname, "routes", "userRoutes")));
app.use("/api/auth", require(path.join(__dirname, "routes", "authRoutes")));

// 🔥 Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ FIXED PORT (IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});