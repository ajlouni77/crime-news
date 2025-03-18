import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Comment = () => {
  const { id: articleId } = useParams(); // Get the article ID from the URL
  const [commentText, setCommentText] = useState(""); // State for the comment input
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(""); // State for error messages

  const handleAddComment = async () => {
    try {
      setLoading(true);
      setError("");

      // Get the token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to add a comment.");
      }

      // Make the API request to add the comment
      const response = await axios.post(
        `http://localhost:5000/api/articles/${articleId}/comments`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success
      console.log("Comment added successfully:", response.data);
      setCommentText(""); // Clear the input field
    } catch (error) {
      console.error("Error adding comment:", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between py-2 px-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddComment}
          disabled={loading || !commentText.trim()}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Comment;
