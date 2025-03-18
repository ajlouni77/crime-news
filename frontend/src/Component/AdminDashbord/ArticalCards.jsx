import { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaCheck, FaTimes, FaBars } from "react-icons/fa";
import axios from "axios";
import ArticlePopup from "./Articlepopup";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ArticleManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null); // لتحديد المقالة المفتوحة
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams(); // Extract ID from URL
  const [stats, setStats] = useState({
    total: {
      count: 0,
      change: 0,
      title: "TOTAL ARTICLES",
      color: "bg-[#31090b] text-white",
    },
    published: {
      count: 0,
      change: 0,
      title: "PUBLISHED ARTICLES",
      color: "bg-[var(--screen-red)] text-white",
    },
    pending: {
      count: 0,
      change: 0,
      title: "PENDING ARTICLES",
      color: "bg-gray-400 text-white",
    },
    rejected: {
      count: 0,
      change: 0,
      title: "REJECTED ARTICLES",
      color: "bg-red-100 text-[var(--screen-red)]",
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/articles/get")
      .then((response) => {
        // Convert Firebase data to array (as it comes as an object)
        const fetchedArticles = [];
        for (let key in response.data) {
          fetchedArticles.push({
            id: key,
            ...response.data[key],
          });
        }
        // تحديث الإحصائيات
        setStats((prevStats) => ({
          total: {
            ...prevStats.total,
            count:
              articles.pending +
              articles.published +
              articles.rejected +
              (articles.draft || 0),
            change: 5.2, // تمثيل نسبة التغيير - يجب حسابها من البيانات الفعلية
          },
          published: {
            ...prevStats.published,
            count: articles.published,
            change: 8.1,
          },
          pending: {
            ...prevStats.pending,
            count: articles.pending,
            change: -2.5,
          },
          rejected: {
            ...prevStats.rejected,
            count: articles.rejected,
            change: 1.8,
          },
        }));
        setArticles(fetchedArticles);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (articles && articles.length) {
      // Calculate counts based on status
      const total = articles.length;
      const published = articles.filter(
        (article) => article.status === "Published"
      ).length;
      const pending = articles.filter(
        (article) => article.status === "Pending"
      ).length;
      const rejected = articles.filter(
        (article) => article.status === "Rejected"
      ).length;

      // Update stats with calculated values
      // In a real app, you would calculate the change percentages from previous data
      setStats({
        total: {
          ...stats.total,
          count: total,
          change: "+27.4",
        },
        published: {
          ...stats.published,
          count: published,
          change: "-5.8",
        },
        pending: {
          ...stats.pending,
          count: pending,
          change: "+14.2",
        },
        rejected: {
          ...stats.rejected,
          count: rejected,
          change: "-12.6",
        },
      });
    }
  }, [articles]);

  const openPopup = (article) => {
    setSelectedArticle(article);
  };

  const closePopup = () => {
    setSelectedArticle(null);
  };

  const updateArticleStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/article/${id}/status`,
        {
          status: newStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchArticles();
    } catch (error) {
      console.error("خطأ في تحديث الحالة:", error);
    }
  };

  const filteredArticles = articles.filter((article) => {
    // Convert search term to lowercase for case-insensitive matching
    const searchTermLower = searchTerm.toLowerCase();

    // Check if article title or author contains the search term (case-insensitive)
    const matchesSearch =
      (article.title &&
        article.title.toLowerCase().includes(searchTermLower)) ||
      (article.author &&
        article.author.toLowerCase().includes(searchTermLower));

    // Check if article matches the selected category
    const matchesCategory =
      selectedCategory === "all" || article.status === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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

  // Add these state variables at the top of your component
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5; // Show 5 articles per page as requested

  // Calculate pagination values
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error while fetching data: {error.message}
      </div>
    );
  }

  return (
    <div
      className="w-full p-2 sm:p-4 md:p-6 bg-[#f9f9fb] min-h-screen"
      dir="ltr"
    >
      <div className="w-full lg:max-w-4xl lg:ml-60 flex justify-around flex-wrap xl:max-w-7xl xl:ml-75 mb-10 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {Object.values(stats).map((stat, index) => {
            const isPositive = !stat.change.toString().includes("-");

            return (
              <div
                key={index}
                className={`p-4 sm:p-6 rounded-lg ${stat.color} shadow-md`}
              >
                {/* Title */}
                <div className="uppercase text-xs sm:text-sm font-medium mb-2">
                  {stat.title}
                </div>

                {/* Count */}
                <div className="text-xl sm:text-3xl font-bold mb-2">
                  {stat.count}
                </div>

                {/* Change */}
                <div className="flex justify-between items-center">
                  <span className="text-xs p-2 sm:text-sm">
                    Compared to last week
                  </span>
                  <div className="flex items-center">
                    <span className="text-white flex items-center">
                      <span
                        className={`mr-1 rounded-full bg-white bg-opacity-20 flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6`}
                      >
                        {isPositive ? "↑" : "↓"}
                      </span>
                      <span className="text-xs sm:text-sm">{stat.change}%</span>
                    </span>
                  </div>
                </div>

                {/* SVG Chart */}
                <div className="mt-4 h-8 sm:h-10">
                  <svg viewBox="0 0 100 20" className="w-full h-full">
                    <path
                      d="M0,10 Q15,18 30,12 T60,15 T100,10"
                      fill="none"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl lg:ml-75 flex flex-col ">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[var(--screen-red)] text-center bg-white rounded-lg py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-[var(--screen-red)]">
          ARTICLE
        </h1>

        {/* Mobile View Toggle Filters Button */}
        <button
          className="md:hidden w-full mb-4 p-3 bg-white rounded-lg shadow flex items-center justify-center"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaBars className="mr-2" />
          <span>
            {showFilters ? "Hide Search Options" : "Show Search Options"}
          </span>
        </button>

        {/* Filters Section */}
        <div
          className={`bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md mb-4 sm:mb-6 flex flex-col md:flex-row gap-4 ${
            showFilters ? "block" : "hidden md:flex"
          }`}
        >
          <div className="w-full md:w-1/2 relative">
            <input
              type="text"
              placeholder="Enter search keywords..."
              className="w-full p-3 sm:p-4 pl-10 border border-gray-300 rounded-lg focus:ring-[var(--screen-red)] focus:border-[var(--screen-red)] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="w-full md:w-1/2 relative">
            <select
              className="w-full p-3 sm:p-4 pl-10 border border-gray-300 rounded-lg bg-white focus:ring-[var(--screen-red)] focus:border-[var(--screen-red)] transition-all"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Published">Published</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
            <FaFilter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Articles Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-full hover:shadow-lg transition-all duration-300">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7585ff] mx-auto"></div>
              <p className="text-gray-500 text-lg mt-4">Loading articles...</p>
            </div>
          ) : (
            <>
              {/* Desktop view - table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--screen-red)] text-white">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        #
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium  text-white">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium  text-white">
                        Author
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium  text-white">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium  text-white">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium  text-white">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium  text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentArticles.map((article, index) => (
                      <tr
                        key={article._id}
                        className="hover:bg-[#f9feff] transition-colors duration-200"
                      >
                        <td className="px-6 py-6">{index + 1}</td>
                        <td className="px-4 py-3">
                          <div
                            className="text-sm text-gray-700 font-medium cursor-pointer"
                            onClick={() => setSelectedArticle(article)}
                          >
                            {article.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 h-10 overflow-y-auto">
                            {article.content.description ||
                              "No article summary available"}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-900 font-medium">
                          {article.author}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#fff3f3] text-[var(--screen-red)]">
                            {article.categories}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(article.publishDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              article.status === "Published"
                                ? "bg-[var(--screen-red)] text-white"
                                : article.status === "Pending"
                                ? "bg-gray-400 text-white"
                                : "bg-[#fce9eb] text-[var(--screen-red)]"
                            }`}
                          >
                            {article.status === "Published"
                              ? "Published"
                              : article.status === "Pending"
                              ? "Pending"
                              : "Rejected"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2 justify-end">
                            <button
                              className="p-2 hover:cursor-pointer text-[#51a31d] hover:bg-[#e7f7e1] rounded-full transition-colors duration-200"
                              onClick={() => handleAccept(article._id)}
                              title="Publish Article"
                            >
                              <FaCheck className="w-5 h-5" />
                            </button>
                            <button
                              className="p-2 hover:cursor-pointer text-[#d94e5c] hover:bg-[#fbeaec] rounded-full transition-colors duration-200 ml-2"
                              onClick={() => handleReject(article._id)}
                              title="Convert to Draft"
                            >
                              <FaTimes className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile view - cards */}
              <div className="md:hidden flex flex-col">
                {currentArticles.map((article) => (
                  <div
                    key={article._id}
                    className="border-b border-gray-200 p-4 hover:bg-[#f9feff]"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div
                        className="text-lg hover:cursor-pointer font-medium text-gray-900"
                        onClick={() => setSelectedArticle(article)}
                      >
                        {article.title}
                      </div>
                      <div className="flex">
                        <button
                          className="p-2 hover:cursor-pointer text-[#51a31d] hover:bg-[#e7f7e1] rounded-full transition-colors duration-200 mr-1"
                          onClick={() => handleAccept(article._id)}
                          title="Publish Article"
                        >
                          <FaCheck className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 hover:cursor-pointer text-[#d94e5c] hover:bg-[#fbeaec] rounded-full transition-colors duration-200"
                          onClick={() => handleReject(article._id)}
                          title="Convert to Draft"
                        >
                          <FaTimes className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Author: </span>
                      {article.author}
                    </div>

                    <div className="text-sm text-gray-700 mb-2 h-16 overflow-y-auto bg-gray-50 p-2 rounded">
                      <span className="font-medium">Summary: </span>
                      {article.description || "No article summary available"}
                    </div>

                    <div className="flex flex-wrap gap-2 justify-between items-center mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#f3f4ff] text-[#7585ff]">
                        {article.categories}
                      </span>

                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          article.status === "Published"
                            ? "bg-[var(--screen-red)] text-white"
                            : article.status === "Pending"
                            ? "bg-gray-400 text-white"
                            : "bg-[#fce9eb] text-[var(--screen-red)]"
                        }`}
                      >
                        {article.status === "Published"
                          ? "Published"
                          : article.status === "Pending"
                          ? "Pending"
                          : "Rejected"}
                      </span>

                      <span className="text-xs text-gray-500">
                        {new Date(article.publishedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {filteredArticles.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles match your search
              </p>
            </div>
          )}

          {/* Pagination */}
          {/* Pagination */}
          {filteredArticles.length > 0 && !loading && (
            <div className="flex justify-center items-center p-4 border-t border-gray-200">
              <div className="flex space-x-1">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md text-sm ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-[#fff3f3] hover:text-[var(--screen-red)] border border-gray-300"
                  }`}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-md text-sm ${
                        currentPage === page
                          ? "bg-[var(--screen-red)] text-white"
                          : "bg-white text-gray-700 hover:bg-[#fff3f3] hover:text-[var(--screen-red)] border border-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md text-sm ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-[#fff3f3] hover:text-[var(--screen-red)] border border-gray-300"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
        {selectedArticle && (
          <ArticlePopup
            isOpen={true}
            onClose={closePopup}
            article={selectedArticle}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleManagement;
