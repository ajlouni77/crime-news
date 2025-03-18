import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);
// Register necessary elements for Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Overview = () => {
  // State to store articles
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.title.includes(searchTerm) &&
      (filterStatus === "" || article.status === filterStatus)
  );

  const filteredArticlesView = articles.filter(
    (article) => article.status === "Published"
  );

  // Fetch data from Firebase using Axios
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
        setArticles(fetchedArticles);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Slice articles for the current page
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

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

  // دالة لحساب عدد المقالات لكل حالة
  const getStatusCounts = (articles) => {
    return articles.reduce((acc, article) => {
      acc[article.status] = (acc[article.status] || 0) + 1;
      return acc;
    }, {});
  };

  const statusCounts = getStatusCounts(articles);

  // حساب العدد الإجمالي للمقالات
  const totalArticles = Object.values(statusCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  // بيانات الرسم البياني
  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Number of Articles",
        data: Object.values(statusCounts),
        backgroundColor: ["#61090b", "#ffbcbd", "#aeaeae"],
        borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
        borderWidth: 1,
      },
    ],
  };

  // إعدادات الرسم البياني
  const statusOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Article Distribution by Status",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      datalabels: {
        display: true,
        color: "#000000",
        formatter: (value) => {
          const percentage = ((value / totalArticles) * 100).toFixed(1) + "%";
          return percentage;
        },
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
  };

  // Second chart data (views count for each article)
  const viewsData = {
    labels: filteredArticlesView.map((article) =>
      article.title.length > 15
        ? article.title.substring(0, 15) + "..."
        : article.title
    ),
    datasets: [
      {
        label: "Views Count",
        data: filteredArticlesView.map((article) => article.views),
        backgroundColor: "#ffbcbd",
        borderColor: "#FFFFFF",
        borderWidth: 1,
      },
    ],
  };

  // Second chart options
  const viewsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Views Count per Article",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 lg:pl-90 lg:gap-20 items-center justify-center lg:justify-end  bg-gray-100 p-6 lg:px-25">
        {/* First chart: Article distribution by status */}
        <div className="w-full md:w-1/2 max-w-xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-[var(--primary-color)] font-bold text-center mb-4">
            Article State
          </h2>
          <div className="h-64">
            <Pie data={statusData} options={statusOptions} />
          </div>
        </div>

        {/* Second chart: Views count for each article */}
        <div className="w-full md:w-1/2 max-w-xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4 text-[var(--primary-color)]">
            Views Count
          </h2>
          <div className="h-64">
            <Bar data={viewsData} options={viewsOptions} />
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4 items-center lg:pl-30 xl:pl-4 lg:items-end w-[100%] justify-center  bg-gray-100">
        {/* Table */}
        <div className="w-full my-10 max-w-[84%] overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
          {/* Search & Filter Controls */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by title..."
              className="border border-gray-300 p-3 rounded-lg w-full md:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border border-gray-300 p-3 rounded-lg w-full md:w-1/4 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Table for medium screens and larger */}
          <table className="w-full text-sm text-left text-gray-700 hidden lg:table border-collapse">
            <thead className="text-xs uppercase bg-[var(--primary-color)] text-white border-b border-[var(--primary-color)]">
              <tr className="h-[60px]">
                <th scope="col" className="px-6 py-3 font-medium">
                  #
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Article Title
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Views Count
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  username
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Publication Date
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Likes Count
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Location
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedArticles.map((article, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    {(currentPage - 1) * articlesPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {article.title}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        article.status === "Published"
                          ? "bg-[var(--screen-red)] text-white"
                          : article.status === "Pending"
                          ? "bg-[#aeaeae] text-white"
                          : "bg-[#ffbcbd] text-white"
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{article.views}</td>
                  <td className="px-6 py-4">{article.author} </td>
                  <td className="px-6 py-4">
                    {new Date(article.publishDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{article.likes}</td>
                  <td className="px-6 py-4">
                    {article.location.city}, {article.location.country}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Responsive Cards for Small Screens */}
          <div className="lg:hidden space-y-6">
            {paginatedArticles.map((article, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-gray-700">
                    #{(currentPage - 1) * articlesPerPage + index + 1}
                  </span>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      article.status === "Published"
                        ? "bg-[var(--screen-red)] text-white"
                        : article.status === "Pending"
                        ? "bg-[#aeaeae] text-white"
                        : "bg-[#ffbcbd] text-white"
                    }`}
                  >
                    {article.status}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold text-gray-800">
                    {article.title}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Views:</span>{" "}
                    {article.views}
                  </div>
                  <div>
                    <span className="font-semibold">Author:</span>{" "}
                    {article.author}
                  </div>
                  <div>
                    <span className="font-semibold">Published:</span>{" "}
                    {new Date(article.publishDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-semibold">Likes:</span>{" "}
                    {article.likes}
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold">Location:</span>{" "}
                    {article.location.city}, {article.location.country}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Component */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors duration-200"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {/* Display only 5 pages at a time */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(
                Math.max(0, currentPage - 3),
                Math.min(totalPages, currentPage + 1)
              )
              .map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === page
                      ? "bg-[var(--primary-color)] text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  } transition-colors duration-200`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

            <button
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors duration-200"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
