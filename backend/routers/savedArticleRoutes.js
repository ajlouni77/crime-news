const express = require("express");
const router = express.Router();
const { removeSavedArticle } = require("../controllers/savedArticleController"); // استدعاء الكونترولر

// مسار حذف مقال من savedArticles
router.delete("/remove-saved-article/:articleId", removeSavedArticle);

module.exports = router;
