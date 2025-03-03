const express = require("express");
const Provider = require("../models/Provider"); // Ensure you have a Provider model
const router = express.Router();

// Register Provider
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, serviceoffered } = req.body;

    // Validate input
    if (!name || !email || !phone || !password || !serviceoffered) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if provider already exists
    const existingProvider = await Provider.findOne({ email });
    if (existingProvider) {
      return res.status(400).json({ message: "Provider already exists with this email" });
    }

    // Create new provider
    const newProvider = new Provider({
      name,
      email,
      phone,
      password, // Make sure to hash the password before saving
      serviceoffered
    });
    await newProvider.save();

    res.status(201).json({ message: "Provider registered successfully", provider: newProvider });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;