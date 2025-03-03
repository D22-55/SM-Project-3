const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { authMiddleware } = require("../controllers/authMiddleware");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Route to handle user registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/login", loginUser);

// Add this temporary route to check user role
router.get("/check-role", authMiddleware, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// Add this temporary route to update user role
router.post("/update-role", async (req, res) => {
  try {
    const { email, role } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new token with updated role
    const token = jwt.sign(
      { 
        id: user._id,
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Role updated successfully",
      user,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
