const express = require("express");
const router = express.Router();
const addMessages = require("../controllers/messagecontrollers");

router.post("/message", addMessages); // تأكد من أن المسار متطابق مع ما في الـ frontend

module.exports = router;
