const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const adminRoutes = require("./routes/adminRoutes");
const providersRoutes = require("./routes/providersRoutes");

// Load env vars
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const providerRoutes = require("./routes/providerRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/providers", providersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);

const PORT = process.env.PORT || 5001;

// Start the server and connect to MongoDB
const startServer = async () => {
  await connectDB(); // Connect to MongoDB
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer(); // Call the function to start the server