import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, form);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      onLogin(user.role);
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] grid-bg flex items-center justify-center px-4">
      {/* Center card */}
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block font-display font-black text-2xl text-[#111] tracking-tight">
            CSCNITJ<span className="text-[#CBFF00] bg-[#111] px-1 rounded text-sm">.</span>
          </Link>
        </div>

        <div className="card-light p-8 md:p-10">
          <div className="mb-8">
            <h1 className="font-display font-black text-3xl text-[#111] mb-2">Welcome back</h1>
            <p className="text-[#888] text-sm">Sign in to your CSC NITJ account</p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#555] mb-2 uppercase tracking-wider">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#111] placeholder-[#bbb] focus:outline-none focus:border-[#CBFF00] focus:ring-2 focus:ring-[#CBFF00]/20 transition bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#555] mb-2 uppercase tracking-wider">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#111] placeholder-[#bbb] focus:outline-none focus:border-[#CBFF00] focus:ring-2 focus:ring-[#CBFF00]/20 transition bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-lime w-full py-4 text-sm font-bold mt-2 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p className="text-center text-sm text-[#888] mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#111] font-bold hover:underline">
              Create one
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#bbb] mt-6 font-mono">
          // Secure login powered by CSC NITJ
        </p>
      </div>
    </div>
  );
}