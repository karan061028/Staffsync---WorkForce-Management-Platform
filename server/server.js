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
app.use("/api/tasks", require("./routes/taskroutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// 🔥 Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ FIXED PORT (IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});