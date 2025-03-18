// controllers/subscriptionController.js
const SubscriptionCard = require("../models/SubscriptionCard");


exports.createSubscriptionCard = async (req, res) => {
  try {
    const { title, description, price, duration, features } = req.body;
    const newCard = await SubscriptionCard.create({
      title,
      description,
      price,
      duration,
      features,
    });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Error creating subscription card", error });
  }
};


exports.getSubscriptionCards = async (req, res) => {
  try {
    const cards = await SubscriptionCard.find({ isDeleted: { $ne: true } });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscription cards", error });
  }
};

exports.updateSubscriptionCard = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCard = await SubscriptionCard.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCard) {
      return res.status(404).json({ message: "Subscription card not found" });
    }
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: "Error updating subscription card", error });
  }
};

exports.deleteSubscriptionCard = async (req, res) => {
  try {
    const { id } = req.params;
    // Soft delete: set isDeleted to true and mark deletedAt timestamp
    const deletedCard = await SubscriptionCard.findByIdAndUpdate(
      id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!deletedCard) {
      return res.status(404).json({ message: "Subscription card not found" });
    }
    res.status(200).json({ message: "Subscription card soft deleted successfully", deletedCard });
  } catch (error) {
    res.status(500).json({ message: "Error soft deleting subscription card", error });
  }
};