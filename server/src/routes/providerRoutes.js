const express = require("express");
const { authMiddleware: protect } = require("../controllers/authMiddleware");
const {
  registerProvider,
  getProviders,
  updateProviderProfile,
} = require("../controllers/providerController");

const router = express.Router();

router.post("/register", protect, registerProvider); // Register as a service provider
router.get("/", protect, getProviders); // Get list of providers
router.put("/profile", protect, updateProviderProfile); // Update provider profile

module.exports = router;
