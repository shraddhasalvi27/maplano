import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      login(user, token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black w-screen text-white">
      <div className="w-[90%] md:w-[30%] bg-gray-950 shadow-2xl border border-gray-800 rounded-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Log In</h1>
          <p className="text-gray-400 text-sm mt-1">
            Enter your credentials to access your account
          </p>
        </div>

        {error && (
          <div className="p-3 text-red-400 bg-red-900 bg-opacity-30 rounded-md text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border border-gray-700 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full bg-transparent text-white outline-none"
            />
          </div>
          <div className="flex items-center border border-gray-700 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 bg-gray-800">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-transparent outline-none text-white"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold py-2 rounded-md transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>

        {/* Signup link */}
        <p className="mt-6 text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
