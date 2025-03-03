const dotenv = require("dotenv");

// Load environment variables from .env file
const loadEnv = () => {
  const result = dotenv.config();
  if (result.error) {
    throw new Error("Error loading .env file");
  }
};

module.exports = loadEnv;
