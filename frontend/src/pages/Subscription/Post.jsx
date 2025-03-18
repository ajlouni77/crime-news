import React, { useState, useEffect } from "react";
import axios from "axios";

// Form component used for both creating and editing a post.
const PostForm = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState(initialData ? initialData.title : "");
  const [description, setDescription] = useState(initialData ? initialData.description : "");
  const [details, setDetails] = useState(initialData ? initialData.details : "");
  const [imageSrc, setImageSrc] = useState(initialData ? initialData.imageSrc : "");
  const [imageAlt, setImageAlt] = useState(initialData ? initialData.imageAlt : "");
  const [date, setDate] = useState(initialData ? initialData.date : "");
  const [tags, setTags] = useState(initialData ? initialData.tags.join(", ") : "");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDetails(initialData.details);
      setImageSrc(initialData.imageSrc);
      setImageAlt(initialData.imageAlt);
      setDate(initialData.date);
      setTags(initialData.tags.join(", "));
    } else {
      setTitle("");
      setDescription("");
      setDetails("");
      setImageSrc("");
      setImageAlt("");
      setDate("");
      setTags("");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = tags.split(",").map((tag) => tag.trim());
    onSubmit({ title, description, details, imageSrc, imageAlt, date, tags: tagsArray });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md my-6 border border-gray-100">
      <h2 className="text-xl font-bold mb-5 text-[#61090b] pb-2 border-b border-gray-200">
        {initialData ? "Edit Post" : "Add New Post"}
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
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700">Details</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61090b] focus:border-transparent"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            rows="3"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700">Image Source</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61090b] focus:border-transparent"
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700">Image Alt Text</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61090b] focus:border-transparent"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1 text-gray-700">Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61090b] focus:border-transparent"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label className="block font-medium mb-1 text-gray-700">
            Tags <span className="text-sm font-normal">(comma separated)</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61090b] focus:border-transparent"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
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

const PostDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts/admin");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setMessage("Error fetching posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle create or update submission from the form
  const handleFormSubmit = async (data) => {
    if (editingPost) {
      // Update existing post
      try {
        await axios.put(`http://localhost:5000/api/posts/${editingPost._id}`, data);
        setMessage("Post updated successfully!");
        setEditingPost(null);
        setShowForm(false);
        fetchPosts();
      } catch (error) {
        console.error("Error updating post:", error);
        setMessage("Error updating post");
      }
    } else {
      // Create new post
      try {
        await axios.post("http://localhost:5000/api/posts", data);
        setMessage("Post created successfully!");
        setShowForm(false);
        fetchPosts();
      } catch (error) {
        console.error("Error creating post:", error);
        setMessage("Error creating post");
      }
    }
  };

  // Soft delete a post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setMessage("Post deleted successfully!");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      setMessage("Error deleting post");
    }
  };

  // Set editing post and show the form for editing
  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  // Cancel add/edit form
  const handleCancelForm = () => {
    setEditingPost(null);
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
        <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingPost(null);
            }}
            className="bg-[#61090b] text-white py-2 px-4 rounded-lg hover:bg-[#8b0d11] transition duration-300 text-sm font-medium flex items-center"
          >
            <span className="mr-1">+</span> Add Post
          </button>
        )}
      </div>

      {message && (
        <div className="mb-6 py-2 px-4 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
          {message}
        </div>
      )}

      {showForm && (
        <PostForm
          onSubmit={handleFormSubmit}
          initialData={editingPost}
          onCancel={handleCancelForm}
        />
      )}

      {posts.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500">No posts available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div 
              key={post._id} 
              className="bg-white flex flex-col justify-between p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
               {post.imageSrc && (
                <img
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
              )}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.description}</p>
              {post.details && (
                  <p className="text-gray-500 text-xs mt-1">{post.details}</p>
                )}
              <div className="text-sm mb-2">
                <span className="text-gray-700 font-medium">Date: </span>
                <span className="text-gray-600">{post.date}</span>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))} </div>   )}
              <div className="flex gap-2 mt-3 pt-2 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(post)}
                  className="flex-1 bg-[#61090b] text-white py-1.5 px-3 rounded-md text-sm hover:bg-[#8b0d11] transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
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

export default PostDashboard;
