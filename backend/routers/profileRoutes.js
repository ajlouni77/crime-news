// routes/profileRoutes.js
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware"); // تأكد من المسار الصحيح
const upload = require("../middleware/upload");
const { uploadProfilePicture } = require("../controllers/profileController");

// تفعيل الميدل وير authMiddleware حتى يتم فك تشفير التوكن وتعيين req.user
router.post(
  "/upload-picture",
  authMiddleware, // تأكد من إضافة هذا السطر
  upload.single("profilePicture"),
  uploadProfilePicture
);

module.exports = router;
