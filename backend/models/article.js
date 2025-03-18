const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: {
      type: new mongoose.Schema({
        description: { type: String },
        victimInfo: { type: String },
        suspectInfo: { type: String },
        weaponsUsed: { type: String },
        suicideDetails: { type: String },
        evidenceNotes: { type: String },
        witnessReports: { type: String },
        officerInCharge: { type: String },
        caseStatus: { type: String, default: "open" },
        publicRisk: { type: String, default: "none" },
        relatedCases: { type: String },
      }),
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: {
      type: String,
      required: true,
      enum: [
        "Murder",
        "Theft",
        "Fraud",
        "Cybercrime",
        "Kidnapping",
        "Domestic Violence",
        "Drugs",
        "Awareness",
      ],
    },
    tags: [{ type: String }],
    featuredImage: { type: String },
    mediaSource: [{ type: String }],
    status: {
      type: String,
      enum: ["Rejected", "Pending", "Published"],
      default: "Pending",
    },
    publishDate: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    comments: [commentSchema], // Nested comments array
    likes: { type: Number, default: 0 },
    location: {
      city: { type: String },
      country: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
