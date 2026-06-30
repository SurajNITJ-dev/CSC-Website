import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) { setError("Name must be at least 2 characters"); return; }
    if (!email.trim().endsWith("@nitj.ac.in")) { setError("Email must end with @nitj.ac.in"); return; }
    if (password.length < 4) { setError("Password must be at least 4 characters"); return; }

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/api/auth/register`, { name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] grid-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block font-display font-black text-2xl text-[#111] tracking-tight">
            CSCNITJ<span className="text-[#CBFF00] bg-[#111] px-1 rounded text-sm">.</span>
          </Link>
        </div>

        <div className="card-light p-8 md:p-10">
          <div className="mb-8">
            <h1 className="font-display font-black text-3xl text-[#111] mb-2">Create your account</h1>
            <p className="text-[#888] text-sm">
              Join CSC NITJ — use your <span className="font-bold text-[#111]">@nitj.ac.in</span> email
            </p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#555] mb-2 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#111] placeholder-[#bbb] focus:outline-none focus:border-[#CBFF00] focus:ring-2 focus:ring-[#CBFF00]/20 transition bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#555] mb-2 uppercase tracking-wider">Institute Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="rollno@nitj.ac.in"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#111] placeholder-[#bbb] focus:outline-none focus:border-[#CBFF00] focus:ring-2 focus:ring-[#CBFF00]/20 transition bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#555] mb-2 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Min 4 characters"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#111] placeholder-[#bbb] focus:outline-none focus:border-[#CBFF00] focus:ring-2 focus:ring-[#CBFF00]/20 transition bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-lime w-full py-4 text-sm font-bold mt-2 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p className="text-center text-sm text-[#888] mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#111] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#bbb] mt-6 font-mono">
          // Members only — NITJ institute email required
        </p>
      </div>
    </div>
  );
}

export default Register;