const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  serviceoffered: { type: [String], required: true }
}, { timestamps: true });

module.exports = mongoose.model("Provider", providerSchema); 