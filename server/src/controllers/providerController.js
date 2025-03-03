const ServiceProvider = require("../models/ServiceProvider");

exports.registerProvider = async (req, res) => {
  try {
    const { name, email, phone, servicesOffered } = req.body;

    // Check if provider already exists
    const existingProvider = await ServiceProvider.findOne({ email });
    if (existingProvider) {
      return res.status(400).json({ message: "Provider already exists" });
    }

    // Create new provider
    const provider = await ServiceProvider.create({
      name,
      email,
      phone,
      servicesOffered,
      user: req.user.id  // Associate provider with logged-in user
    });

    res.status(201).json({
      message: "Provider registered successfully",
      provider
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProviders = async (req, res) => {
  try {
    const providers = await ServiceProvider.find();
    res.status(200).json({ providers });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProviderProfile = async (req, res) => {
  try {
    const { name, phone, servicesOffered } = req.body;

    if (!req.user || !req.user.email) {
      return res.status(400).json({ 
        message: "User information not found" 
      });
    }

    let provider = await ServiceProvider.findOne({ email: req.user.email });
    
    if (!provider) {
      // Create new provider profile
      provider = new ServiceProvider({
        name,
        email: req.user.email,
        phone,
        servicesOffered,
        user: req.user._id
      });
      await provider.save();
    } else {
      // Update existing provider
      provider.name = name;
      provider.phone = phone;
      provider.servicesOffered = servicesOffered;
      await provider.save();
    }
    
    res.status(200).json({ 
      message: "Provider profile updated successfully",
      provider 
    });
  } catch (error) {
    console.error('Provider update error:', error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};