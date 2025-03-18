const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  try {
    // 🔥 1️⃣ Get the token from Authorization header (since it's stored in localStorage)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("❌ No token found in Authorization header");
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // 🔥 2️⃣ Extract the token from "Bearer <TOKEN>"
    const token = authHeader.split(" ")[1];

    // 🔥 3️⃣ Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Decoded token:", decoded);

    // 🔥 4️⃣ Validate the extracted user ID
    if (!decoded.userId || !mongoose.Types.ObjectId.isValid(decoded.userId)) {
      console.error("❌ Invalid user ID in token:", decoded.userId);
      return res.status(400).json({ message: "Invalid token" });
    }

    // 🔥 5️⃣ Attach user ID to `req.user`
    req.user = decoded.userId;
    next(); // Move to the next middleware
  } catch (error) {
    console.error("❌ Auth middleware error:", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = authMiddleware;
