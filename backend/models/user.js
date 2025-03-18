const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    isdeleted: { type: Boolean, default: false },
    isActivated: { type: Boolean, default: true },
    facebookId: { type: String },
    googleId: { type: String },
    otp: String,
    otpExpiry: Date,

    role: {
      type: String,
      enum: ["user", "journalist", "reader", "admin"],
      required: true,
      default: "user",
    },
    subscriptionPlan: {type: String, default: ""},
    subscriptionExpiry: {type: Date,default: null },
    profilePicture: { type: String }, 
    savedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
    readingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

// module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
