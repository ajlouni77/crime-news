// routes/subscriptionRoutes.js
const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");


router.post("/subscription", subscriptionController.createSubscriptionCard);

router.get("/subscription", subscriptionController.getSubscriptionCards);

router.put("/subscription/:id", subscriptionController.updateSubscriptionCard);

router.delete("/subscription/:id", subscriptionController.deleteSubscriptionCard);

module.exports = router;
