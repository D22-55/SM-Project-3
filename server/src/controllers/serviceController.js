const ServiceRequest = require("../models/ServiceRequest");

exports.createServiceRequest = async (req, res) => {
  try {
    const { serviceType, description } = req.body;
    
    const request = await ServiceRequest.create({
      serviceType,
      description,
      user: req.user.id // Get user ID from auth middleware
    });

    res.status(201).json({
      success: true,
      data: request
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find()
      .populate('user', 'name email')
      .populate('assignedProvider', 'name email');
      
    res.status(200).json({
      success: true,
      data: requests
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateServiceRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({ error: 'Service request not found' });
    }

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteServiceRequest = async (req, res) => {
  try {
    const request = await ServiceRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({ error: 'Service request not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Service request deleted successfully'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};