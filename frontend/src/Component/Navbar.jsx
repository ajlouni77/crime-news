import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import arabicIcon from "../assets/translation.png";
import englishIcon from "../assets/translation (1).png";
import { useLanguage } from "../Context//LanguageContext";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  // const [language, setLanguage] = useState("en");
  const { language, toggleLanguage } = useLanguage()
  // Check if the user is logged in by checking localStorage for a token
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if a token exists
  }, []);

  // Listen for changes in localStorage (e.g., after signup or login)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Add event listener for localStorage changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Change language
  // const changeLanguage = () => {
  //   const newLang = language === "en" ? "ar" : "en";
  //   setLanguage(newLang);
  //   i18n.changeLanguage(newLang); // Change the language in the i18n library
  // };

  const changeLanguage = () => {
    const newLang = language === "en" ? "ar" : "en"; // تحديد اللغة الجديدة
    toggleLanguage(); // تغيير اللغة في Context
    i18n.changeLanguage(newLang); // استخدام i18next لتغيير اللغة فعليًا
  };


  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("user_id"); // Remove user_id if it exists
    setIsLoggedIn(false); // Update login status
    navigate("/"); // Redirect to the login page
  };

  return (
    <>
      {/* Top Red Banner with Logo and Search */}
      <div className="w-full bg-screen-red text-white py-3">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-6xl font-bold tracking-tighter transition-transform duration-300 hover:scale-105 hover:text-gray-200 cursor-pointer"
            >
              <span className="font-extrabold">CRIME</span>
              <span className="font-light">GAZETTE</span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center mt-3 md:mt-0">
            {/* Auth Links */}
            <div className="hidden md:flex space-x-4 text-md font-semibold mr-6">
              {isLoggedIn ? (
                <>
                  {/* User Profile Button */}
                  <Link
                    to="/userprofile"
                    className="hover:bg-screen-red transition-all duration-300 px-4 py-1 rounded"
                  >
                    PROFILE
                  </Link>
                  <span>|</span>
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="hover:bg-screen-red transition-all duration-300 px-4 py-1 rounded"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="hover:bg-screen-red transition-all duration-300 px-4 py-1 rounded"
                  >
                    REGISTER
                  </Link>
                  <span>|</span>
                  <Link
                    to="/subscribe"
                    className="hover:bg-screen-red transition-all duration-300 px-4 py-1 rounded"
                  >
                    SUBSCRIBE
                  </Link>
                  <span>|</span>
                  <Link
                    to="/login"
                    className="flex items-center hover:bg-screen-red transition-all duration-300 px-4 py-1 rounded"
                  >
                    SIGN IN
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </Link>
                </>
              )}
            </div>

            {/* Language Toggle Buttons */}
            <button onClick={changeLanguage}>
              <img
                src={language === "en" ? arabicIcon : englishIcon}
                alt="Language Icon"
                className="w-11 h-11 transition-transform duration-300 hover:scale-110 mr-3"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Black Navigation Menu */}
      <div className="w-full bg-screen-dark text-white">
        <div className="container mx-auto px-4">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-between items-center py-3">
            <button className="p-2" onClick={toggleMobileMenu}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-wrap items-center justify-center py-2">
            <Link
              to="/"
              className="relative px-5 py-3 text-lg font-semibold group"
            >
              <span className="relative inline-block px-2 py-1 transition-all duration-300 bg-transparent rounded group-hover:bg-[#b21e23] group-hover:scale-110">
                HOME
              </span>
            </Link>

            <Link
              to="/ArticlesPage"
              className="relative px-5 py-3 text-lg font-semibold group"
            >
              <span className="relative inline-block px-2 py-1 transition-all duration-300 bg-transparent rounded group-hover:bg-[#b21e23] group-hover:scale-110">
                NEWS
              </span>
            </Link>

            <Link
              to="/AboutUs"
              className="relative px-5 py-3 text-lg font-semibold group"
            >
              <span className="relative inline-block px-2 py-1 transition-all duration-300 bg-transparent rounded group-hover:bg-[#b21e23] group-hover:scale-110">
                ABOUT US
              </span>
            </Link>

            <Link
              to="/contact"
              className="relative px-5 py-3 text-lg font-semibold group"
            >
              <span className="relative inline-block px-2 py-1 transition-all duration-300 bg-transparent rounded group-hover:bg-[#b21e23] group-hover:scale-110">
                CONTACT US
              </span>
            </Link>

            <Link
              to="/Blog"
              className="relative px-5 py-3 text-lg font-semibold group"
            >
              <span className="relative inline-block px-2 py-1 transition-all duration-300 bg-transparent rounded group-hover:bg-[#b21e23] group-hover:scale-110">
                Blogs
              </span>
            </Link>
            <Link
              to="/SubscriptionCardDisplay"
              className="relative px-5 py-3 text-lg font-semibold group"
            >
              <span className="relative inline-block px-2 py-1 transition-all duration-300 bg-transparent rounded group-hover:bg-[#b21e23] group-hover:scale-110">
                Get premium
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
