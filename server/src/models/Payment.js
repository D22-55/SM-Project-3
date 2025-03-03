const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceRequest: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest", required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["card", "paypal", "bank_transfer"], required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
