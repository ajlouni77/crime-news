// middleware/subscriptionMiddleware.js
module.exports = (req, res, next) => {
  
    if (req.user && req.user.subscriptionPlan && req.user.subscriptionPlan !== "") {
      return next();
    }
    return res.status(403).json({ message: "Subscription required to access this resource." });
  };
  