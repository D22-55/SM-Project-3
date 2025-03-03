const express = require("express");
const { authMiddleware: protect } = require("../controllers/authMiddleware");
const {
  createServiceRequest,
  getServiceRequests,
  updateServiceRequest,
  deleteServiceRequest
} = require("../controllers/serviceController");
const Service = require("../models/Service");

const router = express.Router();

// Protect all routes
router.use(protect);

router.route('/')
  .post(createServiceRequest)
  .get(getServiceRequests);

router.route('/:id')
  .put(updateServiceRequest)
  .delete(deleteServiceRequest);

// Create a new service
router.post("/", async (req, res) => {
  try {
    const { name, description, price, provider } = req.body;
    const newService = new Service({ name, description, price, provider });
    await newService.save();
    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().populate("provider", "name email"); // Populate provider details
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("provider", "name email");
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a service
router.put("/:id", async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service updated successfully", service: updatedService });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a service
router.delete("/:id", async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
