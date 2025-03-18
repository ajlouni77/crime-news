// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import {
//   FaCalendarAlt,
//   FaEye,
//   FaHeart,
//   FaSort,
//   FaNewspaper,
//   FaSearch,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const CategoryPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortOption, setSortOption] = useState("newest");
//   const [showSortDropdown, setShowSortDropdown] = useState(false);
//   const [articles, setArticles] = useState([]);
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch articles from backend
//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/articles/get",
//           {
//             params: {
//               category: selectedCategory === "All" ? "" : selectedCategory,
//               sortBy: sortOption,
//             },
//           }
//         );
//         setArticles(response.data);
//         setFilteredArticles(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching articles:", error);
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, [selectedCategory, sortOption]);

//   // Apply search filter
//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       setFilteredArticles(articles);
//     } else {
//       const filtered = articles.filter(
//         (article) =>
//           article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           article.category?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredArticles(filtered);
//     }
//   }, [searchQuery, articles]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = () => {
//       if (showSortDropdown) setShowSortDropdown(false);
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [showSortDropdown]);

//   // Mapping for sort option display names
//   const sortOptionNames = {
//     newest: "Newest First",
//     oldest: "Oldest First",
//     "most-viewed": "Most Viewed",
//     "most-liked": "Most Liked",
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-[#0a1625] to-[#1a3a63] flex items-center justify-center">
//         <div className="text-white text-xl">
//           <FaNewspaper className="animate-pulse text-4xl mb-4 mx-auto" />
//           <p>Loading crime reports...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0a1625] to-[#1a3a63] text-white p-6 relative">
//       {/* Background Effect */}
//       <div className="absolute inset-0 overflow-hidden z-0 opacity-5">
//         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://via.placeholder.com/100')] bg-repeat opacity-10"></div>
//         <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-l from-red-900 to-transparent opacity-20"></div>
//       </div>

//       {/* Content Container with z-index */}
//       <div className="relative z-10">
//         {/* Header Section */}
//         <header className="mb-12 text-center">
//           <div className="inline-block mb-4 relative">
//             <h1 className="text-5xl font-bold text-white mb-2 relative">
//               <span className="relative z-10">CRIME WATCH</span>
//               <span className="absolute -left-2 -top-2 text-red-800 opacity-50 z-0">
//                 CRIME WATCH
//               </span>
//             </h1>
//             <div className="h-1 w-32 bg-red-700 mx-auto mt-2"></div>
//           </div>
//           <p className="text-gray-300 text-lg max-w-2xl mx-auto">
//             Unveiling the shadows: Stay informed about the latest crime-related
//             news and investigations.
//           </p>
//         </header>

//         {/* Search Bar */}
//         <div className="max-w-xl mx-auto mb-10 relative">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search criminal activities..."
//               className="w-full bg-[#0a1625]/50 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 pl-12"
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//             <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//         </div>

//         {/* Categories Filter */}
//         <div className="flex flex-wrap justify-center gap-3 mb-10">
//           <button
//             className={`px-4 py-3 rounded-md transition duration-300 transform hover:scale-105 ${
//               selectedCategory === "All"
//                 ? "bg-red-800 text-white shadow-lg shadow-red-900/40"
//                 : "bg-[#1a3a63]/70 hover:bg-[#1a3a63] text-white border border-[#2c4b74]"
//             }`}
//             onClick={() => setSelectedCategory("All")}
//           >
//             All Cases
//           </button>
//           {[
//             "Murder",
//             "Theft",
//             "Fraud",
//             "Cybercrime",
//             "Kidnapping",
//             "Domestic Violence",
//             "Drugs",
//             "Awareness",
//           ].map((category, index) => (
//             <button
//               key={index}
//               className={`px-4 py-3 rounded-md transition duration-300 transform hover:scale-105 ${
//                 selectedCategory === category
//                   ? "bg-red-800 text-white shadow-lg shadow-red-900/40"
//                   : "bg-[#1a3a63]/70 hover:bg-[#1a3a63] text-white border border-[#2c4b74]"
//               }`}
//               onClick={() => setSelectedCategory(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Sort Options - Modern Dropdown */}
//         <div className="flex justify-end items-center mb-8 max-w-6xl mx-auto">
//           <div className="relative">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setShowSortDropdown(!showSortDropdown);
//               }}
//               className="flex items-center gap-2 bg-[#0c1e36] border border-[#2c4b74] text-gray-200 px-4 py-2 rounded-md hover:bg-[#152a45] transition duration-300 shadow-lg shadow-black/20"
//             >
//               <FaSort className="text-red-600" />
//               <span>Sort: {sortOptionNames[sortOption]}</span>
//             </button>

//             {showSortDropdown && (
//               <div className="absolute top-full right-0 mt-2 bg-[#0c1e36] rounded-md shadow-xl z-10 w-48 border border-[#2c4b74] overflow-hidden backdrop-blur-sm">
//                 {Object.entries(sortOptionNames).map(([value, name]) => (
//                   <div
//                     key={value}
//                     className={`px-4 py-3 cursor-pointer hover:bg-[#1a3a63] transition duration-200 ${
//                       sortOption === value
//                         ? "bg-[#1a3a63] text-white"
//                         : "text-gray-300"
//                     }`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setSortOption(value);
//                       setShowSortDropdown(false);
//                     }}
//                   >
//                     {name}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Articles List */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {filteredArticles.length > 0 ? (
//             filteredArticles.map((article) => (
//               <Link to={`/details/${article._id}`} key={article._id}>
//                 <motion.div
//                   className="bg-[#0c1e36]/90 rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 border border-[#2c4b74] shadow-xl hover:shadow-red-900/20"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   {/* Featured Image with Overlay */}
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#0c1e36] to-transparent z-10"></div>
//                     <img
//                       src={article.featuredImage}
//                       alt={article.title}
//                       className="w-full h-48 object-cover brightness-75"
//                     />
//                     <div className="absolute top-2 right-2 bg-red-800 text-white text-xs px-2 py-1 rounded z-20">
//                       {article.category || selectedCategory}
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="p-5">
//                     <h2 className="text-xl font-bold text-white line-clamp-2 mb-3 hover:text-red-400 transition duration-300">
//                       {article.title}
//                     </h2>
//                     <p className="text-gray-400 line-clamp-2 mb-4">
//                       {article.content?.description ||
//                         "Breaking news about this criminal case that has shocked the local community..."}
//                     </p>
//                     <div className="flex justify-between items-center text-gray-400 text-sm">
//                       <span className="flex items-center gap-1">
//                         <FaCalendarAlt className="text-red-700" />
//                         {new Date(article.publishDate).toLocaleDateString()}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <FaEye className="text-red-700" />
//                         {article.views}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <FaHeart className="text-red-700" />
//                         {article.likes}
//                       </span>
//                     </div>
//                   </div>
//                 </motion.div>
//               </Link>
//             ))
//           ) : (
//             <div className="text-center text-gray-400 col-span-full py-16 bg-[#0c1e36]/50 rounded-lg border border-[#2c4b74]">
//               <FaNewspaper className="text-5xl mb-4 mx-auto text-gray-500" />
//               <p className="text-xl">
//                 No results found{" "}
//                 {searchQuery ? `for "${searchQuery}"` : "in this category"}.
//               </p>
//               <p className="mt-2">
//                 {searchQuery
//                   ? "Try different keywords or clear your search."
//                   : "Try selecting a different category or check back later."}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center mt-12">
//           <button className="px-6 py-3 bg-red-800 text-white rounded-md hover:bg-red-900 transition duration-300 shadow-lg shadow-red-900/30 flex items-center gap-2">
//             <span>View More Cases</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import {
  FaCalendarAlt,
  FaEye,
  FaHeart,
  FaSort,
  FaNewspaper,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState("");
  

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9; // Number of articles per page

  // Fetch articles from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/articles/getA",
          {
            params: {
              category: selectedCategory === "All" ? "" : selectedCategory,
              sortBy: sortOption,
            },
          }
        );
        setArticles(response.data);
        setFilteredArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory, sortOption]);

  //كود محمود 
   useEffect(() => {
     const fetchUserProfile = async () => {
       try {
         // 🔥 1️⃣ Retrieve the token from localStorage
         const token = localStorage.getItem("token");

         if (!token) {
           console.error("❌ No token found in localStorage");
           return;
         }

         // 🔥 2️⃣ Decode the token to extract user ID
         const decodedToken = jwtDecode(token); // Extracts { userId: "67d44acc1bdee5c049d5519e", iat: ..., exp: ... }

         if (!decodedToken.userId) {
           console.error("❌ No user ID found in token");
           return;
         }

         console.log("✅ Extracted User ID from token:", decodedToken.userId);

         // 🔥 3️⃣ Fetch user profile using token (No need to send user ID in request)
         const response = await axios.get(
           "http://localhost:5000/api/users/profile",
           {
             headers: {
               Authorization: `Bearer ${token}`, // Send token in headers
             },
           }
         );

         console.log("✅ User profile fetched:", response.data);
         setUser(response.data.user);
       } catch (error) {
         console.error(
           "❌ Error fetching profile:",
           error.response?.data || error.message
         );
       }
     };
     fetchUserProfile();
   }, []);

  // Apply search filter
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [searchQuery, articles]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showSortDropdown) setShowSortDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showSortDropdown]);

  // Mapping for sort option display names
  const sortOptionNames = {
    newest: "Newest First",
    oldest: "Oldest First",
    "most-viewed": "Most Viewed",
    "most-liked": "Most Liked",
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Get the current articles for the current page
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-xl">
          <FaNewspaper className="animate-pulse text-4xl mb-4 mx-auto" />
          <p>Loading crime reports...</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  return (
    <div className="min-h-screen bg-white text-black p-6 relative">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-5"></div>

      {/* Content Container with z-index */}
      <div className="relative z-10">
        {/* Search Bar and Create Article Button */}
        <div className="flex justify-between max-w-xl mx-auto mb-10 relative">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search criminal activities..."
              className="w-full bg-white border border-gray-700 text-black px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 pl-12"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {user.role === "journalist" && (
            <Link
              to="/aform"
              className="ml-4 bg-red-800 text-white py-3 px-6 rounded-md hover:bg-red-900 transition duration-300"
            >
              Create Article
            </Link>
          )}
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            className={`px-4 py-3 rounded-md transition duration-300 transform hover:scale-105 ${
              selectedCategory === "All"
                ? "bg-red-800 text-white shadow-lg shadow-red-900/40"
                : "bg-[#1a3a63]/70 hover:bg-[#1a3a63] text-white border border-[#2c4b74]"
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All Cases
          </button>
          {[
            "Murder",
            "Theft",
            "Fraud",
            "Cybercrime",
            "Kidnapping",
            "Domestic Violence",
            "Drugs",
            "Awareness",
          ].map((category, index) => (
            <button
              key={index}
              className={`px-4 py-3 rounded-md transition duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? "bg-red-800 text-white shadow-lg shadow-red-900/40"
                  : "bg-gray-500/80 hover:bg-red-900 text-white border border-[#2c4b74]"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Options - Modern Dropdown */}
        <div className="flex justify-end items-center mb-8 max-w-6xl mx-auto">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSortDropdown(!showSortDropdown);
              }}
              className="flex items-center gap-2 bg-[#be2222] border border-[#74342c] text-gray-200 px-4 py-2 rounded-md hover:bg-[#4d2b2b] transition duration-300 shadow-lg shadow-black/20"
            >
              <FaSort className="text-white-900" />
              <span>Sort: {sortOptionNames[sortOption]}</span>
            </button>

            {showSortDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-[#fd5555ee] rounded-md shadow-xl z-10 w-48 border border-[#2c4b74] overflow-hidden backdrop-blur-sm">
                {Object.entries(sortOptionNames).map(([value, name]) => (
                  <div
                    key={value}
                    className={`px-4 py-3 cursor-pointer hover:bg-[#ecd3d17d] transition duration-200 ${
                      sortOption === value
                        ? "bg-[#be2222] text-white"
                        : "text-gray-300"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSortOption(value);
                      setShowSortDropdown(false);
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentArticles.length > 0 ? (
            currentArticles.map((article) => (
              <Link to={`/details/${article._id}`} key={article._id}>
                <motion.div
                  className="bg-gray-100 rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 border border-[#ececec] shadow-xl hover:shadow-red-900/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Featured Image with Overlay */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#757070] to-transparent z-10"></div>
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-48 object-cover brightness-75"
                    />
                    <div className="absolute top-2 right-2 bg-red-800 text-white text-xs px-2 py-1 rounded z-20">
                      {article.category || selectedCategory}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-black line-clamp-1 mb-3 hover:text-red-400 transition duration-300">
                      {article.title}
                    </h2>
                    <p className="text-gray-700 line-clamp-1 mb-4">
                      {article.content?.description ||
                        "Breaking news about this criminal case that has shocked the local community..."}
                    </p>
                    <div className="flex justify-between items-center text-gray-500 text-sm">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-red-700" />
                        {new Date(article.publishDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaEye className="text-red-700" />
                        {article.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaHeart className="text-red-700" />
                        {article.likes}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-full py-16">
              <FaNewspaper className="text-5xl mb-4 mx-auto" />
              <p className="text-xl">
                No results found{" "}
                {searchQuery ? `for "${searchQuery}"` : "in this category"}.
              </p>
              <p className="mt-2">
                {searchQuery
                  ? "Try different keywords or clear your search."
                  : "Try selecting a different category or check back later."}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <button
            className="px-6 py-3 bg-red-800 text-white rounded-md hover:bg-red-900 transition duration-300 shadow-lg shadow-red-900/30 flex items-center gap-2"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
          <span className="mx-4 text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className="px-6 py-3 bg-red-800 text-white rounded-md hover:bg-red-900 transition duration-300 shadow-lg shadow-red-900/30 flex items-center gap-2"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
