import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "INTERN",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", form);
      setSuccessMsg(res.data.msg || "Registered successfully!");
      setForm({ username: "", password: "", role: "INTERN" });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black w-screen">
      <div className="bg-gray-950 p-8 rounded-xl shadow-md w-[90%] md:w-[30%] border border-gray-700 text-white">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Register</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMsg && <p className="text-green-500 text-sm mb-4">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="flex items-center border border-gray-700 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full bg-transparent text-white outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-700 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full bg-transparent text-white outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="INTERN">INTERN</option>
              <option value="DEVELOPER">DEVELOPER</option>
              <option value="MANAGER">MANAGER</option>
              <option value="ADMIN">ADMIN</option>
              <option value="QA">QA</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white py-2 rounded-lg font-semibold transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
