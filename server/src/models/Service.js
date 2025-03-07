const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  serviceType: { type: String, required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the provider
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);