import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
// Replace with your own dark/crime themed background image
import photo1 from "../assets/photo1.jpeg";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id:
          "268942872776-ulvhmack82ul53133h6fkdd4f7ehnsgb.apps.googleusercontent.com",
        callback: handleGoogleLogin,
        ux_mode: "popup",
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-btn"),
        { theme: "filled_black", size: "large" }
      );
    };
    document.body.appendChild(script);
  }, [navigate]);

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
        text: "You've successfully joined CRIMEGAZETTE",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#61090b",
      }).then(() => navigate("/"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: error.response?.data?.message || "Google authentication failed.",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#61090b",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsOtpSent(true);

      Swal.fire({
        icon: "success",
        title: "Verification Required",
        text: "A verification code has been sent to your email.",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#61090b",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || "Unable to register. Try again.",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#61090b",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/verify-otp",
        { ...formData, otp } // Include form data and OTP
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
      }

      Swal.fire({
        icon: "success",
        title: "Identity Confirmed",
        text: "Welcome to CRIMEGAZETTE. You now have access to our files.",
        background: "#1a1a1a",
        color: "#ffffff",
        confirmButtonColor: "#61090b",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: error.response?.data?.message || "Invalid verification code.",
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
            {!isOtpSent ? "Enter the case files" : "Verify your identity"}
          </p>
        </div>

        {!isOtpSent ? (
          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border-b border-[#61090b] bg-transparent text-[#ffffff] focus:outline-none focus:border-red-700 placeholder-gray-500"
                required
              />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#61090b] to-transparent"></div>
            </div>

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

            <button
              type="submit"
              className={`w-full px-4 py-2 font-bold text-[#ffffff] bg-[#61090b] rounded hover:bg-[#7a0b0e] transition duration-300 ease-in-out transform hover:scale-105 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "PROCESSING..." : "REGISTER"}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleOtpVerification}>
            <div className="relative">
              <input
                type="text"
                name="otp"
                placeholder="Enter Verification Code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border-b border-[#61090b] bg-transparent text-[#ffffff] focus:outline-none focus:border-red-700 placeholder-gray-500"
                required
              />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#61090b] to-transparent"></div>
            </div>

            <button
              type="submit"
              className={`w-full px-4 py-2 font-bold text-[#ffffff] bg-[#61090b] rounded hover:bg-[#7a0b0e] transition duration-300 ease-in-out transform hover:scale-105 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "VERIFYING..." : "CONFIRM IDENTITY"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-3">OR</p>
          <div id="google-signin-btn" className="flex justify-center"></div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-xs">
            Already have access?{" "}
            <a href="/login" className="text-[#61090b] hover:text-red-700">
              Sign In
            </a>
          </p>
        </div>

        {/* Bottom dripping effect */}
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

export default Signup;
