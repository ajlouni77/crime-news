import React, { useState } from "react";
import axios from "axios";

const SubscriptionCardForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [features, setFeatures] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // تحويل سلسلة الميزات إلى مصفوفة باستخدام الفاصلة كفاصل
    const featuresArray = features.split(",").map((feature) => feature.trim());

    const newCard = {
      title,
      description,
      price,
      duration,
      features: featuresArray,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/subscription", newCard);
      if (res.status === 201) {
        setMessage("Subscription card created successfully!");
        // إعادة تعيين الحقول بعد الإضافة الناجحة
        setTitle("");
        setDescription("");
        setPrice("");
        setDuration("");
        setFeatures("");
      } else {
        setMessage("Error creating subscription card.");
      }
    } catch (error) {
      console.error("Error creating subscription card:", error);
      setMessage("Error creating subscription card.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-screen-red">
          Add Subscription Card
        </h2>
        
        {message && (
          <div className={`mb-6 p-3 rounded-md text-center ${message.includes("Error") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-screen-red focus:border-transparent transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter subscription title"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-screen-red focus:border-transparent transition min-h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter subscription description"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-screen-red focus:border-transparent transition"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="e.g. $9.99"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-screen-red focus:border-transparent transition"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                placeholder="e.g. Monthly, Yearly"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Features <span className="text-sm text-gray-500">(comma separated)</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-screen-red focus:border-transparent transition"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              required
              placeholder="e.g. Feature 1, Feature 2, Feature 3"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-screen-red text-white py-3 rounded-md hover:bg-opacity-90 transition duration-300 font-medium flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Add Subscription"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionCardForm;