const Article = require("../models/article");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const Comment = require("../models/comment");
const User = require("../models/user");

// Get all articles with filters
const getArticlesJenan = async (req, res) => {
  try {
    const { category, sortBy } = req.query;
    let query = {};
    if (category) query.categories = category;

// let articles = Article.find(query).populate("author");
    let articles = Article.find(query);

    // Sorting
    if (sortBy === "newest") articles = articles.sort({ publishDate: -1 });
    if (sortBy === "oldest") articles = articles.sort({ publishDate: 1 });
    if (sortBy === "most-viewed") articles = articles.sort({ views: -1 });
    if (sortBy === "most-liked") articles = articles.sort({ likes: -1 });

    const result = await articles.exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error });
  }
};

const getArticles = async (req, res) => {
  try {
    const { category, sortBy } = req.query;

    const query = {
      status: "Published",
      ...(category && category !== "All" ? { categories: category } : {}),
    };
    let sortOption = {};
    switch (sortBy) {
      case "newest":
        sortOption = { publishDate: -1 };
        break;
      case "oldest":
        sortOption = { publishDate: 1 };
        break;
      case "most-viewed":
        sortOption = { views: -1 };
        break;
      case "most-liked":
        sortOption = { likes: -1 };
        break;
      default:
        sortOption = { publishDate: -1 };
    }

    const articles = await Article.find(query).sort(sortOption);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error });
  }
};

const getArticlesByIdjenan = async (req, res) => {
  try {
    const { category, sortBy } = req.query;
    const { id } = req.params; // جلب الـ ID من الـ URL

    if (id) {
      // إذا كان هناك ID، جلب مقال واحد فقط
      const article = await Article.findById(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      return res.json(article);
    }

    // إذا لم يكن هناك ID، جلب كل المقالات مع الفلترة والفرز
    const query =
      category && category !== "All" ? { categories: category } : {};

    let sortOption = {};
    switch (sortBy) {
      case "newest":
        sortOption = { publishDate: -1 };
        break;
      case "oldest":
        sortOption = { publishDate: 1 };
        break;
      case "most-viewed":
        sortOption = { views: -1 };
        break;
      case "most-liked":
        sortOption = { likes: -1 };
        break;
      default:
        sortOption = { publishDate: -1 };
    }

    const articles = await Article.find(query).sort(sortOption);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error });
  }
};

const acceptArticle = async (req, res) => {
  const { articleId } = req.body;

  try {
    const article = await Article.findByIdAndUpdate(
      articleId,
      { status: "Published" },
      { new: true }
    );
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error accepting article", error });
  }
};

const rejectArticle = async (req, res) => {
  const { articleId } = req.body;

  try {
    const article = await Article.findByIdAndUpdate(
      articleId,
      { status: "Rejected" },
      { new: true }
    );
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error rejecting article", error });
  }
};

const getTop5Articles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ views: -1 }).limit(5);
    res.json(articles);
  } catch (error) {
    console.error('Error fetching top 5 articles:', error);
    res.status(500).json({ message: 'Error fetching top 5 articles', error });
  }
};

function getUserIdFromToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    return decoded.userId; // Ensure this matches the field in your token payload
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

async function createArticle(req, res) {
  // Extract token from the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const token = authHeader.split(" ")[1]; // Get the token after "Bearer "

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const authorId = getUserIdFromToken(token); // Decode the token to get the user ID

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
      author: authorId,
      categories: req.body.categories,
      tags: req.body.tags,
      featuredImage: req.body.featuredImage,
      mediaSource: req.body.mediaSource,
      status: req.body.status || "Pending",
      location: req.body.location,
    });

    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getArticleById = async (req, res) => {
  try {
    const articleId = req.params.id; // Extract the article ID from the request parameters

    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1]; // Get the token after "Bearer "

    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Find the article by ID
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Increase the article's views by 0.5
    await Article.findByIdAndUpdate(
      articleId,
      { $inc: { views: 0.5 } }, // Increase views by 0.5
      { new: true } // Return the updated document
    );

    // Add the article to the user's reading history
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { readingHistory: articleId } }, // Use $addToSet to avoid duplicates
      { new: true }
    );

    // Return the article
    res.json(article);
  } catch (error) {
    console.error("❌ Error fetching article:", error);
    res.status(500).json({ message: "Error fetching article", error });
  }
};

const addCommentToArticle = async (req, res) => {
  try {
    const articleId = req.params.id; // Extract article ID from the URL
    const { text } = req.body; // Extract comment text from the request body

    // Extract token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = authHeader.split(" ")[1]; // Get the token after "Bearer "

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Decode the token to get the user ID (author of the comment)
    const authorId = getUserIdFromToken(token);

    // Find the article by ID
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Add the new comment to the comments array
    article.comments.push({
      text,
      author: authorId,
    });

    // Save the updated article
    const updatedArticle = await article.save();

    res.status(201).json({
      message: "Comment added successfully",
      article: updatedArticle,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

const getArticleComments = async (req, res) => {
  try {
    const articleId = req.params.id; // Extract article ID from the URL

    // Find the article and populate the author field in the comments array
    const article = await Article.findById(articleId).populate({
      path: "comments.author",
      select: "username email", // Include only the fields you need
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Return the comments with user details
    res.status(200).json({
      message: "Comments retrieved successfully",
      comments: article.comments,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving comments", error });
  }
};

const getArticleAuthorComments = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    console.log("✅ Extracted User ID:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Use `new` to properly instantiate ObjectId
    const articles = await Article.find({
      "comments.author": new mongoose.Types.ObjectId(userId),
    }).populate({
      path: "comments.author",
      select: "username email",
    });

    console.log("✅ Articles containing user comments:", articles);

    if (!articles || articles.length === 0) {
      return res
        .status(200)
        .json({ message: "User has no comments", comments: [] });
    }

    // Extract user-specific comments
    const userComments = articles.flatMap((article) =>
      article.comments.filter(
        (comment) => comment.author._id.toString() === userId
      )
    );

    console.log("✅ User Comments Extracted:", userComments);

    res.status(200).json({
      message: "User comments fetched successfully",
      comments: userComments,
    });
  } catch (error) {
    console.error("❌ Server Error fetching user comments:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getSavedArticles = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];

    // Verify the token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    console.log("✅ Extracted User ID:", userId);

    // Validate the user ID format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Fetch the user and populate the savedArticles field
    const user = await User.findById(userId).populate("savedArticles");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ savedArticles: user.savedArticles });
  } catch (error) {
    console.error("❌ Server error fetching saved articles:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLatestReadingForUser = async (req, res) => {
  try {
    // Extract userId from the JWT token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    console.log("✅ Extracted User ID:", userId);

    // Validate the user ID format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find the user and populate the readingHistory field
    const user = await User.findById(userId)
      .populate({
        path: "readingHistory",
        select: "title content createdAt views likes categories featuredImage", // Include the fields you need
        options: { strictPopulate: false }, // Add this line to bypass the error
      })
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the reading history articles for the user
    res.status(200).json({
      message: "Reading history retrieved successfully",
      readingHistory: user.readingHistory,
    });
  } catch (error) {
    console.error("❌ Error retrieving reading history:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


module.exports = {
  getArticles,
  createArticle,
  getArticleById,
  addCommentToArticle,
  getArticleComments,
  getArticleAuthorComments,
  getArticlesByIdjenan,
  acceptArticle,
  rejectArticle,
  getArticlesJenan,
  getSavedArticles,
  getLatestReadingForUser

  // getTop5Articles,
};
