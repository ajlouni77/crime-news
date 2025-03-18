import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import {
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaFileAlt,
  FaGavel,
  FaIdBadge,
  FaBuilding,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";

const ArticleDetails = () => {
  const { id } = useParams(); // Extract ID from URL
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Separate array for author data
  const [author, setAuthor] = useState([
    {
      _id: "67d498ab0c2cb2eb7fa3db7f",
      name: "John Doe",
      email: "johndoe@example.com",
      role: "Detective",
      department: "Homicide",
      badgeNumber: "HD-7721",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    },
  ]);

  useEffect(() => {
    // Fetch data using axios
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/articles/get/${id}`
        );
        setArticle(response.data); // Store data in state
      } catch (err) {
        setError("Failed to fetch article data");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const handleAccept = async (articleId) => {
    try {
      await axios.put("http://localhost:5000/api/articles/accept", {
        articleId,
      });

      Swal.fire({
        icon: "success",
        title: "Published!",
        text: "The article has been successfully accepted 🎉",
      });

      // تحديث البيانات إذا لزم الأمر
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An error occurred!",
        text: "Failed to accept the article. Please try again.",
      });
      console.error("Error accepting article", error);
    }
  };

  const handleReject = async (articleId) => {
    try {
      await axios.put("http://localhost:5000/api/articles/reject", {
        articleId,
      });

      Swal.fire({
        icon: "success",
        title: "Rejected!",
        text: "The article has been successfully rejected ❌",
      });

      // تحديث البيانات إذا لزم الأمر
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An error occurred!",
        text: "Failed to reject the article. Please try again.",
      });
      console.error("Error rejecting article", error);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center text-red-600 mb-4">
            <FaExclamationTriangle className="mr-2" />
            <h2 className="text-xl font-bold">Error</h2>
          </div>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon-700"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen lg:pl-75 bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="relative">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-64 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-white text-3xl font-bold mb-2">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center text-white/80 gap-4">
                  <div className="flex items-center">
                    <FaUser className="mr-1" />
                    <span>{author[0].name || "Unknown"}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    <span>
                      {format(new Date(article.publishDate), "dd/MM/yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>
                      {article.location?.city}, {article.location?.country}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">
                Article Review
              </h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleAccept(id)}
                  disabled={submitting}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaCheckCircle className="mr-2" />
                  Accept Article
                </button>
                <button
                  onClick={() => handleReject(id)}
                  disabled={submitting}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaTimesCircle className="mr-2" />
                  Reject Article
                </button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              {/* Author Section */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-[var(--primary-color)] mb-4">
                  Case Officer
                </h3>
                <div className="flex items-start">
                  <div className="mr-4">
                    <img
                      src={author[0].avatar}
                      alt={author[0].name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-maroon-600"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-[var(--primary-color)]">
                      {author[0].name}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center text-gray-600">
                        <FaIdBadge className="mr-2 text-maroon-600" />
                        <span>{author[0].role}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaBuilding className="mr-2 text-maroon-600" />
                        <span>{author[0].department}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaEnvelope className="mr-2 text-maroon-600" />
                        <span>{author[0].email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="text-xs bg-maroon-100 text-[var(--primary-color)] px-2 py-1 rounded-full">
                          Badge #{author[0].badgeNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-maroon-50 rounded-lg p-4">
                    <h2 className="text-[var(--primary-color)] text-lg font-bold mb-2 flex items-center">
                      <FaFileAlt className="mr-2" /> Case Description
                    </h2>
                    <p className="text-gray-700">
                      {article.content?.description}
                    </p>
                  </div>

                  <div className="bg-maroon-50 rounded-lg p-4">
                    <h2 className="text-[var(--primary-color)] text-lg font-bold mb-2">
                      Victim Information
                    </h2>
                    <p className="text-gray-700">
                      {article.content?.victimInfo}
                    </p>
                  </div>

                  <div className="bg-maroon-50 rounded-lg p-4">
                    <h2 className="text-[var(--primary-color)] text-lg font-bold mb-2">
                      Suspect Information
                    </h2>
                    <p className="text-gray-700">
                      {article.content?.suspectInfo}
                    </p>
                  </div>

                  <div className="bg-maroon-50 rounded-lg p-4">
                    <h2 className="text-[var(--primary-color)] text-lg font-bold mb-2">
                      Weapons Used
                    </h2>
                    <p className="text-gray-700">
                      {article.content?.weaponsUsed}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-maroon-50 rounded-lg p-4">
                    <h2 className="text-[var(--primary-color)] text-lg font-bold mb-2">
                      Suicide Details
                    </h2>
                    <p className="text-gray-700">
                      {article.content?.suicideDetails}
                    </p>
                  </div>

                  <div className="bg-maroon-50 rounded-lg p-4">
                    <h2 className="text-[var(--primary-color)] text-lg font-bold mb-2">
                      Evidence Notes
                    </h2>
                    <p className="text-gray-700">
                      {article.content?.evidenceNotes}
                    </p>
                  </div>

                  <div className="bg-maroon-50 rounded-lg p-4">
                    <h2 className="text-[var(--primary-color)] text-lg font-bold mb-2">
                      Witness Reports
                    </h2>
                    <p className="text-gray-700">
                      {article.content?.witnessReports}
                    </p>
                  </div>
                </div>
              </div>

              {/* Case Status Section */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="bg-maroon-100 rounded-lg p-4">
                  <h2 className="text-[var(--primary-color)] text-lg font-bold mb-4 flex items-center">
                    <FaGavel className="mr-2" /> Case Status
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-bold text-maroon-700">
                        Officer In Charge:
                      </h3>
                      <p className="text-gray-700">
                        {article.content?.officerInCharge}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-maroon-700">
                        Case Status:
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          article.content?.caseStatus === "Closed"
                            ? "bg-gray-200 text-gray-800"
                            : article.content?.caseStatus === "Active"
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {article.content?.caseStatus}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-maroon-700">
                        Public Risk:
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          article.content?.publicRisk === "Low"
                            ? "bg-green-200 text-green-800"
                            : article.content?.publicRisk === "Medium"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {article.content?.publicRisk}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-maroon-700">
                        Related Cases:
                      </h3>
                      <p className="text-gray-700">
                        {article.content?.relatedCases || "None"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetails;
