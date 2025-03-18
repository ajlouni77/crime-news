import React, { useState, useEffect } from "react";
import axios from "axios";

// Form component used for both creating and editing a subscription card.
const SubscriptionCardForm = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState(initialData ? initialData.title : "");
  const [description, setDescription] = useState(initialData ? initialData.description : "");
  const [price, setPrice] = useState(initialData ? initialData.price : "");
  const [duration, setDuration] = useState(initialData ? initialData.duration : "");
  const [features, setFeatures] = useState(initialData ? initialData.features.join(", ") : "");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setPrice(initialData.price);
      setDuration(initialData.duration);
      setFeatures(initialData.features.join(", "));
    } else {
      setTitle("");
      setDescription("");
      setPrice("");
      setDuration("");
      setFeatures("");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const featuresArray = features.split(",").map((feature) => feature.trim());
    onSubmit({ title, description, price, duration, features: featuresArray });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md my-6 border border-gray-100">
      <h2 className="text-xl font-bold mb-5 text-[#61090b] pb-2 border-b border-gray-200">
        {initialData ? "Edit Subscription Plan" : "Add New Subscription Plan"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61090b] focus:border-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61090b] focus:border-transparent"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="3"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Price</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61090b] focus:border-transparent"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Duration</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61090b] focus:border-transparent"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-5">
          <label className="block font-medium mb-1 text-gray-700">
            Features <span className="text-sm font-normal">(comma separated)</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61090b] focus:border-transparent"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-[#61090b] text-white py-2 rounded-lg hover:bg-[#8b0d11] transition duration-300 font-medium"
          >
            {initialData ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const SubscriptionDashboard = () => {
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch subscription cards (ignoring soft-deleted items)
  const fetchCards = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/subscription");
      setCards(res.data);
    } catch (error) {
      console.error("Error fetching subscription cards:", error);
      setMessage("Error fetching subscription cards");
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Handle create or update submission from the form
  const handleFormSubmit = async (data) => {
    if (editingCard) {
      // Update existing card
      try {
        await axios.put(`http://localhost:5000/api/subscription/${editingCard._id}`, data);
        setMessage("Subscription plan updated successfully!");
        setEditingCard(null);
        setShowForm(false);
        fetchCards();
      } catch (error) {
        console.error("Error updating subscription card:", error);
        setMessage("Error updating subscription plan");
      }
    } else {
      // Create new card
      try {
        await axios.post("http://localhost:5000/api/subscription", data);
        setMessage("Subscription plan created successfully!");
        setShowForm(false);
        fetchCards();
      } catch (error) {
        console.error("Error creating subscription card:", error);
        setMessage("Error creating subscription plan");
      }
    }
  };

  // Soft delete a subscription card
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/subscription/${id}`);
      setMessage("Subscription plan deleted successfully!");
      fetchCards();
    } catch (error) {
      console.error("Error deleting subscription card:", error);
      setMessage("Error deleting subscription plan");
    }
  };

  // Set editing card and show the form for editing
  const handleEdit = (card) => {
    setEditingCard(card);
    setShowForm(true);
  };

  // Cancel add/edit form
  const handleCancelForm = () => {
    setEditingCard(null);
    setShowForm(false);
  };

  // Show message for 3 seconds then hide it
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 px-6 py-6 w-full pl-[300px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Subscription Plans</h1>
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingCard(null);
            }}
            className="bg-[#61090b] text-white py-2 px-4 rounded-lg hover:bg-[#8b0d11] transition duration-300 text-sm font-medium flex items-center"
          >
            <span className="mr-1">+</span> Add Plan
          </button>
        )}
      </div>
      
      {message && (
        <div className="mb-6 py-2 px-4 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
          {message}
        </div>
      )}
      
      {showForm && (
        <SubscriptionCardForm
          onSubmit={handleFormSubmit}
          initialData={editingCard}
          onCancel={handleCancelForm}
        />
      )}

      {cards.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500">No subscription plans available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div 
              key={card._id} 
              className="bg-white flex flex-col justify-between p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                <div className="px-2.5 py-0.5 bg-[#61090b] text-white rounded-full text-sm font-medium">
                  {card.price}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{card.description}</p>
              
              <div className="text-sm mb-2">
                <span className="text-gray-700 font-medium">Duration: </span>
                <span className="text-gray-600">{card.duration}</span>
              </div>
              
              <div className="mb-3">
                <h4 className="text-sm text-gray-700 font-medium mb-1">Features:</h4>
                <ul className="list-disc list-inside space-y-0.5 text-sm">
                  {card.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-2 mt-3 pt-2 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(card)}
                  className="flex-1 bg-[#61090b] text-white py-1.5 px-3 rounded-md text-sm hover:bg-[#8b0d11] transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(card._id)}
                  className="flex-1 bg-[#61090b] text-white py-1.5 px-3 rounded-md text-sm hover:bg-[#8b0d11] transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionDashboard;
