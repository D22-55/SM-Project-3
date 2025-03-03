const express = require("express");
const { authMiddleware: protect, authorize } = require("../controllers/authMiddleware");
const {
  verifyProvider,
  getAllUsers,
  getAllProviders,
  getDashboardStats,
  toggleUserStatus,
  deleteUser
} = require("../controllers/adminController");
const User = require("../models/User");
const Service = require("../models/Service");
const { authMiddleware } = require("../controllers/authMiddleware");

const router = express.Router();

// Protect all routes with admin authorization
router.use(protect);
router.use(authorize("admin"));

// Provider management
router.put("/verify-provider/:providerId", verifyProvider);
router.get("/providers", getAllProviders);

// User management
router.get("/users", getAllUsers);

// Middleware to check if user is admin
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Not authorized for this route",
      userRole: req.user.role,
      requiredRole: "admin"
    });
  }
  next();
};

// Toggle user status
router.put("/users/:id/toggle-status", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle the user's active status (assuming you have an 'isActive' field)
    user.isActive = !user.isActive; // Toggle the status
    await user.save();

    res.status(200).json({ message: "User status updated successfully", user });
  } catch (error) {
    console.error("Error toggling user status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/users/:userId", deleteUser);

// Dashboard
router.get("/dashboard", getDashboardStats);

// Get all services
router.get("/services", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new service
router.post("/services", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, price, serviceType } = req.body;

    // Validate input
    if (!name || !description || !price || !serviceType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newService = new Service({ name, description, price, serviceType });
    await newService.save();

    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all booked services (for reports)
router.get("/reports", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const services = await Service.find(); // Adjust this to fetch booked services
    res.json(services);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;