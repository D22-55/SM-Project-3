const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceType: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "completed"], default: "pending" },
  assignedProvider: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider", default: null },
}, { timestamps: true });

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
