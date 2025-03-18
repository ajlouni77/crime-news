import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import photo1 from "../assets/photo1.jpeg";

const Login = () => {
  // Define states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  // Load Google Sign-In library when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id:
          "268942872776-ulvhmack82ul53133h6fkdd4f7ehnsgb.apps.googleusercontent.com", // Replace with your client ID
        callback: handleGoogleLogin,
        ux_mode: "popup",
      });

      // Display Google sign-in button
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-btn"),
        { theme: "filled_black", size: "large" }
      );
    };
    document.body.appendChild(script);
  }, [navigate]);

  // Handle Google login
  const handleGoogleLogin = async (response) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/google-login",
        { credential: response.credential }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token); // Store token in localStorage
      }

      Swal.fire({
        icon: "success",
        title: "Access Granted",
        text: "You've successfully accessed CRIMEGAZETTE",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#61090b",
      }).then(() => navigate("/"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: error.response?.data?.message || "Authentication failed.",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#61090b",
      });
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        if (rememberMe) {
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 30); // 30 days expiry
          localStorage.setItem("token_expiry", expiryDate.toISOString());
        }
      }

      Swal.fire({
        icon: "success",
        title: "Access Granted",
        text: "Welcome back to CRIMEGAZETTE",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#61090b",
      }).then(() => {
         navigate(response.data.redirectUrl || "/");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: error.response?.data?.message || "Invalid credentials.",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#61090b",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${photo1})`,
        backgroundColor: "#000000",
      }}
    >
      <div className="relative w-full max-w-md p-8 space-y-6 bg-black bg-opacity-80 shadow-2xl rounded-lg border border-gray-800 overflow-hidden">
        {/* Red dripping effect at the top */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#61090b]">
          <div className="absolute -bottom-4 left-5 w-1 h-4 bg-[#61090b]"></div>
          <div className="absolute -bottom-6 left-12 w-1 h-6 bg-[#61090b]"></div>
          <div className="absolute -bottom-5 left-24 w-1 h-5 bg-[#61090b]"></div>
          <div className="absolute -bottom-7 right-16 w-1 h-7 bg-[#61090b]"></div>
          <div className="absolute -bottom-4 right-8 w-1 h-4 bg-[#61090b]"></div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#61090b] tracking-wider">
            CRIMEGAZETTE
          </h2>
          <p className="text-[#ffffff] text-sm mt-1 italic">
            Access classified files
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border-b border-[#61090b] bg-transparent text-[#ffffff] focus:outline-none focus:border-red-700 placeholder-gray-500"
              required
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#61090b] to-transparent"></div>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border-b border-[#61090b] bg-transparent text-[#ffffff] focus:outline-none focus:border-red-700 placeholder-gray-500"
              required
            />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#61090b] to-transparent"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 bg-transparent border-[#61090b] rounded text-[#61090b] focus:ring-[#61090b]"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-400"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="/forgot-password"
                className="text-[#61090b] hover:text-red-700"
              >
                Reset password
              </a>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 font-bold text-[#ffffff] bg-[#61090b] rounded hover:bg-[#7a0b0e] transition duration-300 ease-in-out transform hover:scale-105 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "VERIFYING..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-3">OR</p>
          <div id="google-signin-btn" className="flex justify-center"></div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-xs">
            Need access?{" "}
            <a href="/signup" className="text-[#61090b] hover:text-red-700">
              Sign Up
            </a>
          </p>
        </div>

        {/* Red dripping effect at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#61090b]">
          <div className="absolute -top-4 left-7 w-1 h-4 bg-[#61090b]"></div>
          <div className="absolute -top-8 left-20 w-1 h-8 bg-[#61090b]"></div>
          <div className="absolute -top-5 right-14 w-1 h-5 bg-[#61090b]"></div>
          <div className="absolute -top-7 right-24 w-1 h-7 bg-[#61090b]"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
