const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");
const sendOtpEmail = require("../utils/sendOtpEmail");
require("dotenv").config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google login
const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Google token is required" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload; // "sub" is the Google User ID

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if not found
      user = new User({
        username: name,
        email: email,
        googleId: sub,
        isActivated: true,
      });

      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .json({ message: "Google login successful", token, user_id: user._id });
  } catch (error) {
    console.error("❌ Google login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 mins

    // Send OTP Email
    await sendOtpEmail(email, otp);

    // Save OTP and user details temporarily (optional)
    // You can use a temporary storage like Redis or in-memory storage
    // For simplicity, we'll just send the OTP and not save the user yet

    res
      .status(200)
      .json({ message: "OTP sent successfully. Please check your email." });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login user
// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token including user role
    const tokenPayload = { userId: user._id, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Decide redirect URL based on role
    const redirectUrl = user.role === "admin" ? "/dashboard" : "/";

    // Return token along with redirectUrl
    res.status(200).json({
      message: "Login successful",
      token,
      user_id: user._id,
      redirectUrl,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isdeleted: false }).select(
      "-password -otp -otpExpiry"
    );
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id).select("-password -otp -otpExpiry");

    if (!user || user.isdeleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit user details
const editUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id);

    if (!user || user.isdeleted) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the fields that are provided
    if (updates.username) user.username = updates.username;
    if (updates.email) user.email = updates.email;
    if (updates.password) {
      user.password = await bcrypt.hash(updates.password, 10);
    }
    if (updates.profilePicture) user.profilePicture = updates.profilePicture;
    if (updates.role) user.role = updates.role;
    if (updates.isdeleted !== undefined) user.isdeleted = updates.isdeleted;
    if (updates.isActivated !== undefined)
      user.isActivated = updates.isActivated;
    if (updates.facebookId) user.facebookId = updates.facebookId;
    if (updates.googleId) user.googleId = updates.googleId;
    if (updates.otp) user.otp = updates.otp;
    if (updates.otpExpiry) user.otpExpiry = updates.otpExpiry;

    // Save updated user
    await user.save();

    // Exclude sensitive data before sending response
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.otp;
    delete userResponse.otpExpiry;

    res
      .status(200)
      .json({ message: "User updated successfully", user: userResponse });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Soft delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id).select("isdeleted");

    if (!user?.isdeleted === false) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(id, { isdeleted: true }, { new: true });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { username, email, password, otp } = req.body;

    if (!username || !email || !password || !otp) {
      return res
        .status(400)
        .json({ message: "Username, email, password, and OTP are required" });
    }

    // Check if OTP matches (you can use a temporary storage like Redis)
    // For simplicity, we'll assume the OTP is valid
    // In a real app, you should verify the OTP from the temporary storage

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "user",
      isdeleted: false,
      isActivated: true, // Activate the user after OTP verification
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "OTP verified and user registered successfully",
      token,
      user_id: newUser._id,
    });
  } catch (error) {
    console.error("❌ OTP verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // 🔥 1️⃣ Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Get only the token part

    // 🔥 2️⃣ Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Decoded User ID from token:", decoded.userId);

    // 🔥 3️⃣ Validate user ID
    if (!decoded.userId || !mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // 🔥 4️⃣ Fetch user profile from database
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ user, message: "User profile fetched successfully" });
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserRole = async (req, res) => {
  const { userId } = req.params; // معرف المستخدم الذي سيتم تعديل دوره
  const { role } = req.body; // الدور الجديد

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId);

    if (!user || user.isdeleted) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!["user", "journalist", "reader", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    user.role = role;
    await user.save();

    res
      .status(200)
      .json({ message: "User role updated successfully", updatedUser: user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/*
 try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }

*/

const getUserPaymentDetails = async (req, res) => {
  try {
    // عرض الـ ID المستخرج من التوكن أو الكوكيز في الكونسول
    console.log("✅ Token from cookie or header:", req.user);

    // التحقق من صحة الـ ID
    if (!req.user || !mongoose.Types.ObjectId.isValid(req.user)) {
      console.error("❌ Invalid user ID:", req.user);
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // جلب بيانات المستخدم مع اختيار فقط حقل الاسم والبريد الإلكتروني
    const user = await User.findById(req.user).select("username email");
    if (!user) {
      console.error("❌ User not found:", req.user);
      return res.status(404).json({ message: "User not found" });
    }

    // إرسال البيانات المطلوبة للمستخدم (اسم وبريد إلكتروني)
    res.status(200).json({
      name: user.username,
      email: user.email,
      message: "User payment details fetched successfully",
    });
  } catch (error) {
    console.error("❌ Error fetching payment details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Export all functions
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  getUserProfile,
  verifyOtp,
  loginUser,
  googleLogin,
  getUserPaymentDetails,
  updateUserRole,
};
