import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NeuralNetwork from "../components/NeuralNetwork";

/* User-specific blogs listing page */
const MyBlogs = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect if user is not authenticated
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchMyBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/blogs/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data = await res.json();

        // Normalize backend response for UI rendering
        const formatted = data.map((b) => ({
          id: b._id,
          title: b.title,
          status:
            b.status === "approved"
              ? "Published"
              : b.status === "rejected"
              ? "Rejected"
              : "Pending",
          date: new Date(b.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        }));

        setBlogs(formatted);
        setTimeout(() => setVisible(true), 200);
      } catch (err) {
        console.error("My Blogs fetch error:", err);
      }
    };

    fetchMyBlogs();
  }, [navigate]);

  return (
    <div className="bg-[#010714] text-white min-h-screen relative overflow-x-hidden">
      <NeuralNetwork />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div
          className={`text-center mb-20 transition-all ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            My <span className="text-cyan-400">Blogs</span>
          </h1>
          <p className="text-gray-400 mt-4 text-sm tracking-widest uppercase">
            Your published & submitted knowledge logs
          </p>
        </div>

        <div className="space-y-6">
          {blogs.length === 0 && (
            <p className="text-center text-gray-500 font-mono text-sm">
              No blogs found.
            </p>
          )}

          {blogs.map((blog, i) => (
            <div
              key={blog.id}
              className={`group relative transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/30 to-transparent rounded-2xl blur opacity-30 group-hover:opacity-60 transition" />

              <div className="relative bg-[#0a1628]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold group-hover:text-cyan-400 transition">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 font-mono tracking-wider">
                    {blog.date}
                  </p>
                </div>

                <span
                  className={`text-xs font-mono px-3 py-1 rounded-full border ${
                    blog.status === "Published"
                      ? "text-cyan-400 border-cyan-500/30 bg-cyan-500/5"
                      : "text-yellow-400 border-yellow-500/30 bg-yellow-500/5"
                  }`}
                >
                  {blog.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => navigate("/profile")}
            className="px-10 py-3 rounded-full border border-cyan-500/30 text-cyan-400 text-[10px] uppercase tracking-[0.4em] hover:bg-cyan-500/10 transition"
          >
            Return to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
