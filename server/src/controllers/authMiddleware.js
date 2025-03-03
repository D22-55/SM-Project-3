const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

const authorize = (role) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
      }

      if (req.user.role !== role) {
        return res.status(403).json({ 
          message: "Not authorized for this route",
          userRole: req.user.role,
          requiredRole: role
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Authorization error" });
    }
  };
};

module.exports = { authMiddleware, authorize };
