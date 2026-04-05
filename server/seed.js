require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

// 🔥 Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const seedUsers = async () => {
  try {
    // ❌ delete old users (optional)
    await User.deleteMany();

    const users = [
      {
        name: "Admin",
        email: "admin@gmail.com",
        password: await bcrypt.hash("123", 10),
        role: "admin",
      },
      {
        name: "Karan",
        email: "emp@gmail.com",
        password: await bcrypt.hash("123", 10),
        role: "employee",
      },
      {
        name: "Rahul",
        email: "rahul@gmail.com",
        password: await bcrypt.hash("123", 10),
        role: "employee",
      },
      {
        name: "Priya",
        email: "priya@gmail.com",
        password: await bcrypt.hash("123", 10),
        role: "employee",
      },
      {
        name: "Amit",
        email: "amit@gmail.com",
        password: await bcrypt.hash("123", 10),
        role: "employee",
      },
      {
        name: "Neha",
        email: "neha@gmail.com",
        password: await bcrypt.hash("123", 10),
        role: "employee",
      },
      {
        name: "Rohan",
        email: "rohan@gmail.com",
        password: await bcrypt.hash("123", 10),
        role: "employee",
      },
      {
        name: "Sneha",
        email: "sneha@gmail.com",
        password: await bcrypt.hash("123", 10),
        role: "employee",
      },
      {
        name: "Vikas",
        email: "vikas@gmail.com",
        password: await bcrypt.hash("123", 10),
        role: "employee",
      },
      {
        name: "Anjali",
        email: "anjali@gmail.com",
        password: await bcrypt.hash("123", 10),
        role: "employee",
      },
    ];

    await User.insertMany(users);

    console.log("🔥 10+ Users Inserted Successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedUsers();