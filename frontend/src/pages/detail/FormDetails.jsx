import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import axios from "axios";
import html2canvas from "html2canvas";

function FormDetails() {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(
          `http://localhost:5000/api/articles/get-articles/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the header
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }

        const data = await response.json();
        setFormData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleBackToForm = () => {
    navigate("/");
  };

  const handleShare = (platform) => {
    const currentUrl = window.location.href;
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "gmail":
        shareUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=Check%20this%20out&body=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  const handleExportPDF = () => {
    const element = document.querySelector("#caseDetails"); // Ensure this ID exists in your JSX

    if (!element) {
      console.error("Element not found for PDF export.");
      return;
    }

    // Use html2canvas to capture the content as an image
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Convert the canvas to an image
      const pdf = new jsPDF("p", "mm", "a4"); // Create a new PDF instance

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height to maintain aspect ratio

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // Save the PDF
      pdf.save("case_details.pdf");
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const getCaseStatusBadge = (status) => {
    const statusMap = {
      open: "bg-blue-500 text-white",
      solved: "bg-green-500 text-white",
      cold: "bg-gray-500 text-white",
      closed: "bg-purple-500 text-white",
    };
    return statusMap[status] || "bg-gray-500 text-white";
  };

  const getRiskBadge = (risk) => {
    const riskMap = {
      none: "bg-green-500 text-white",
      low: "bg-yellow-500 text-white",
      moderate: "bg-orange-500 text-white",
      high: "bg-red-500 text-white",
    };
    return riskMap[risk] || "bg-gray-500 text-white";
  };

  const getCrimeTypeBadge = (type) => {
    const typeMap = {
      murder: "bg-red-500 text-white",
      suicide: "bg-gray-500 text-white",
      assault: "bg-orange-500 text-white",
      robbery: "bg-yellow-500 text-white",
      kidnapping: "bg-purple-500 text-white",
      other: "bg-blue-500 text-white",
    };
    return typeMap[type] || "bg-gray-500 text-white";
  };

  const handleAddComment = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to add a comment.");
      }

      const response = await axios.post(
        `http://localhost:5000/api/articles/addComents-articles/${id}/comments`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Comment added successfully:", response.data);

      setComments((prevComments) => [response.data.comment, ...prevComments]);

      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:5000/api/articles/getComment-articles/${id}/comments`
        );

        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError(error.response?.data?.message || "Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#b21e23] mx-auto"></div>
          <p className="mt-4 text-white text-xl">Loading Case Details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  {formData.title || "Untitled Case"}
                </h1>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getCrimeTypeBadge(
                      formData.categories
                    )}`}
                  >
                    {formData.categories || "Unknown Type"}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getCaseStatusBadge(
                      formData.content?.caseStatus
                    )}`}
                  >
                    {formData.content?.caseStatus === "open"
                      ? "Open Case"
                      : formData.content?.caseStatus === "solved"
                      ? "Solved"
                      : formData.content?.caseStatus === "cold"
                      ? "Cold Case"
                      : formData.content?.caseStatus === "closed"
                      ? "Closed"
                      : "Unknown Status"}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskBadge(
                      formData.content?.publicRisk
                    )}`}
                  >
                    {formData.content?.publicRisk === "none"
                      ? "No Public Risk"
                      : formData.content?.publicRisk === "low"
                      ? "Low Risk"
                      : formData.content?.publicRisk === "moderate"
                      ? "Moderate Risk"
                      : formData.content?.publicRisk === "high"
                      ? "High Risk"
                      : "Unknown Risk"}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-4">
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  WhatsApp
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                    />
                  </svg>
                  Facebook
                </button>
                <button
                  onClick={() => handleShare("gmail")}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Gmail
                </button>
                <button
                  onClick={handleExportPDF}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md shadow flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Export PDF
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-300">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 opacity-75 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>{formatDate(formData.publishDate)}</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 opacity-75 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>
                  {formData.location?.city}, {formData.location?.country}
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 opacity-75 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                <span>
                  Lead: {formData.content?.officerInCharge || "Unassigned"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:w-2/3">
              {/* Case Description */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                  The Story
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                    {formData.content?.description ||
                      "No description provided."}
                  </p>
                </div>
              </section>

              {/* Case Details Tabs */}
              <div className="mb-12">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    <a
                      href="#"
                      className="border-[#b21e23] text-[#b21e23] whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    >
                      Case Details
                    </a>
                  </nav>
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  {/* Victim Information */}
                  <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Victim Information
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 whitespace-pre-line">
                        {formData.content?.victimInfo ||
                          "No victim information provided."}
                      </p>
                    </div>
                  </div>

                  {/* Suspect Information */}
                  {formData.categories !== "suicide" && (
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                      <div className="px-6 py-4 bg-gray-50 border-b">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Suspect Information
                        </h3>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-700 whitespace-pre-line">
                          {formData.content?.suspectInfo ||
                            "No suspect information provided."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Suicide Details */}
                  {formData.categories === "suicide" && (
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                      <div className="px-6 py-4 bg-gray-50 border-b">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Suicide Details
                        </h3>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-700 whitespace-pre-line">
                          {formData.content?.suicideDetails ||
                            "No details provided."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Weapons Used */}
                  <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Weapons/Method Used
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700">
                        {formData.content?.weaponsUsed ||
                          "No weapon information provided."}
                      </p>
                    </div>
                  </div>

                  {/* Witness Reports */}
                  <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Witness Statements
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 whitespace-pre-line">
                        {formData.content?.witnessReports ||
                          "No witness statements provided."}
                      </p>
                    </div>
                  </div>

                  {/* Evidence Notes */}
                  <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Evidence Notes
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 whitespace-pre-line">
                        {formData.content?.evidenceNotes ||
                          "No evidence notes provided."}
                      </p>
                    </div>
                  </div>

                  {/* Related Cases */}
                  <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Related Cases
                      </h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 whitespace-pre-line">
                        {formData.content?.relatedCases ||
                          "No related cases information provided."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Timeline */}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:w-1/3">
              {/* Case Meta Information */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
                <div className="px-6 py-4 bg-gray-50 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Case Information
                  </h3>
                </div>
                <div className="p-6">
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Case ID
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        #{Math.floor(Math.random() * 900000) + 100000}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCaseStatusBadge(
                            formData.content?.caseStatus
                          )}`}
                        >
                          {formData.content?.caseStatus === "open"
                            ? "Open Case"
                            : formData.content?.caseStatus === "solved"
                            ? "Solved"
                            : formData.content?.caseStatus === "cold"
                            ? "Cold Case"
                            : formData.content?.caseStatus === "closed"
                            ? "Closed"
                            : "Unknown Status"}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Officer In Charge
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formData.content?.officerInCharge || "Unassigned"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Public Risk
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskBadge(
                            formData.content?.publicRisk
                          )}`}
                        >
                          {formData.content?.publicRisk === "none"
                            ? "No Public Risk"
                            : formData.content?.publicRisk === "low"
                            ? "Low Risk"
                            : formData.content?.publicRisk === "moderate"
                            ? "Moderate Risk"
                            : formData.content?.publicRisk === "high"
                            ? "High Risk"
                            : "Unknown Risk"}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formatDate(formData.publishDate) || "Unknown Date"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Location
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formData.location?.city}, {formData.location?.country}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Comments Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Discussion ({comments.length})
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="text-sm border-0 bg-transparent font-medium text-gray-700 focus:ring-0 focus:outline-none cursor-pointer">
                <option>Newest</option>
                <option>Oldest</option>
                <option>Most Relevant</option>
              </select>
            </div>
          </div>

          {/* Add Comment Form */}
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow"
                  src="https://ui-avatars.com/api/?background=random&size=100&font-size=0.4"
                  alt="Your avatar"
                />
              </div>
              <div className="min-w-0 flex-1">
                {error && (
                  <div className="mb-3 rounded-md bg-red-50 p-3">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                  <textarea
                    rows="4"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="block w-full py-4 px-5 border-0 resize-none focus:ring-0 text-gray-700"
                    placeholder="Share your thoughts on this case..."
                  ></textarea>
                  <div className="px-5 py-3 bg-white flex justify-between items-center border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <button className="p-1 rounded-full text-gray-500 hover:text-gray-700">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                      <button className="p-1 rounded-full text-gray-500 hover:text-gray-700">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={handleAddComment}
                      disabled={loading || !commentText.trim()}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#b21e23] hover:bg-[#9a1a1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b21e23] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Posting...
                        </>
                      ) : (
                        "Post Comment"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="divide-y divide-gray-100">
            {comments.length === 0 ? (
              <div className="text-center py-14">
                <svg
                  className="mx-auto h-16 w-16 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No comments yet
                </h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                  Be the first to share your thoughts on this case. Your
                  insights could help shed light on this investigation.
                </p>
              </div>
            ) : (
              <>
                {comments.map((comment, index) => (
                  <div key={comment._id} className="py-6 px-6">
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full object-cover border-2 border-white shadow"
                          src={`https://ui-avatars.com/api/?name=${comment.author.username}&background=random&size=100&font-size=0.4`}
                          alt={comment.author.username}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-base font-bold text-gray-900 hover:underline cursor-pointer">
                            {comment.author?.username || "Anonymous"}
                          </h4>
                          <div className="text-xs text-gray-500 flex items-center">
                            <time dateTime={comment.createdAt}>
                              {new Date(comment.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </time>
                            <span className="mx-1.5">·</span>
                            <time dateTime={comment.createdAt}>
                              {new Date(comment.createdAt).toLocaleTimeString(
                                undefined,
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </time>
                            <div className="ml-2 relative">
                              <button className="text-gray-400 hover:text-gray-600">
                                <svg
                                  className="h-4 w-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700 whitespace-pre-line mb-3">
                          <p>{comment.text}</p>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <button className="flex items-center text-gray-500 hover:text-gray-700">
                            <svg
                              className="h-4 w-4 mr-1.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                              />
                            </svg>
                            <span>Like</span>
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-gray-700">
                            <svg
                              className="h-4 w-4 mr-1.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                              />
                            </svg>
                            <span>Reply</span>
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-gray-700">
                            <svg
                              className="h-4 w-4 mr-1.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                              />
                            </svg>
                            <span>Share</span>
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-gray-700">
                            <svg
                              className="h-4 w-4 mr-1.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                              />
                            </svg>
                            <span>Report</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default FormDetails;
