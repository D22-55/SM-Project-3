const ServiceProvider = require("../models/ServiceProvider");
const User = require("../models/User");
const ServiceRequest = require("../models/ServiceRequest");

// Verify Service Provider
exports.verifyProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    
    // Validate providerId
    if (!providerId) {
      return res.status(400).json({ message: "Provider ID is required" });
    }

    const provider = await ServiceProvider.findByIdAndUpdate(
      providerId,
      { verified: true },
      { new: true }
    );

    if (!provider) {
      return res.status(404).json({ 
        message: "Provider not found",
        providerId 
      });
    }

    res.status(200).json({
      success: true,
      message: "Provider verified successfully",
      provider: {
        id: provider._id,
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        servicesOffered: provider.servicesOffered,
        verified: provider.verified
      }
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Providers
exports.getAllProviders = async (req, res) => {
  try {
    const providers = await ServiceProvider.find()
      .populate('user', 'name email');
    
    res.status(200).json({
      success: true,
      count: providers.length,
      providers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Dashboard Analytics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProviders = await ServiceProvider.countDocuments();
    const totalRequests = await ServiceRequest.countDocuments();
    const pendingRequests = await ServiceRequest.countDocuments({ status: 'pending' });
    const completedRequests = await ServiceRequest.countDocuments({ status: 'completed' });

    // Get recent service requests
    const recentRequests = await ServiceRequest.find()
      .populate('user', 'name email')
      .populate('assignedProvider', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProviders,
        totalRequests,
        pendingRequests,
        completedRequests
      },
      recentRequests
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Block/Unblock User
exports.toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`,
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};