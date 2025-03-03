const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  servicesOffered: [{ type: String, required: true }],
  rating: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema);
