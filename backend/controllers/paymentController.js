// controllers/paymentController.js
const Payment = require("../models/Payment");
const SubscriptionCard = require("../models/SubscriptionCard");
const User = require("../models/user");

exports.createPayment = async (req, res) => {
  try {
    const { subscriber_id, subscriptionCard_id, payment_method } = req.body;

    if (!subscriber_id || !subscriptionCard_id || !payment_method) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // جلب بطاقة الاشتراك للحصول على السعر والعنوان
    const subscriptionCard = await SubscriptionCard.findById(
      subscriptionCard_id
    );
    if (!subscriptionCard) {
      return res.status(404).json({ error: "Subscription card not found" });
    }

    // تحويل السعر إلى رقم (نفترض أن السعر محفوظ كنص مثل "$9.99")
    const amount = parseFloat(subscriptionCard.price.replace("$", ""));

    // إنشاء سجل الدفع
    const paymentData = {
      subscriber: subscriber_id,
      subscriptionCard: subscriptionCard_id,
      amount,
      payment_method,
      payment_status: "Completed",
    };

    const payment = await Payment.create(paymentData);

    // تحديث بيانات المستخدم: تخزين عنوان الاشتراك وتاريخ انتهاء الاشتراك
    // مثال: الاشتراك لمدة شهر
    const durationMatch = subscriptionCard.duration.match(/\d+/);
    if (!durationMatch) {
      throw new Error("No numeric value found in duration");
    }
    
    const durationNumber = parseInt(durationMatch[0], 10);
    
    if (isNaN(durationNumber)) {
      throw new Error("Invalid duration value");
    }
    const subscriptionExpiry = new Date();
    subscriptionExpiry.setMonth(subscriptionExpiry.getMonth() +durationNumber);

    await User.findByIdAndUpdate(subscriber_id, {
      subscriptionPlan: subscriptionCard.title,
      subscriptionExpiry,
    });

    return res
      .status(201)
      .json({ message: "Payment recorded successfully", payment });
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
