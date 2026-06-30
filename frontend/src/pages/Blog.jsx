import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowRight, LuUser, LuFileText, LuSearch } from "react-icons/lu";

const stripHtml = (html = "") => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const getPreview = (html, limit = 130) => {
  const text = stripHtml(html);
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/blog/${blog._id}`)} className="card-light p-7 cursor-pointer group">
      {/* Author */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-[#CBFF00] flex items-center justify-center text-[#111] font-black text-sm flex-shrink-0">
          {blog.author?.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="text-sm font-bold text-[#111] leading-none">
            {blog.author?.name || "Anonymous"}
          </p>
          <p className="text-[10px] text-[#aaa] font-mono mt-1">
            {new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
          </p>
        </div>
        <div className="ml-auto">
          <div className="w-8 h-8 rounded-full border border-gray-100 bg-gray-50 flex items-center justify-center text-[#aaa] group-hover:bg-[#CBFF00] group-hover:border-[#CBFF00] group-hover:text-[#111] transition-all">
            <LuArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* Cover image */}
      {blog.coverImage?.url && (
        <div className="w-full h-40 rounded-2xl overflow-hidden mb-5 bg-gray-50">
          <img src={blog.coverImage.url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}

      <h3 className="font-display font-black text-xl text-[#111] leading-tight mb-3">{blog.title}</h3>
      <div className="flex gap-1 mb-3">
        {[...Array(10)].map((_, i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#e0e0e0]" />)}
      </div>
      <p className="text-[#666] text-sm leading-relaxed">{getPreview(blog.content)}</p>

      {blog.tags?.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-5">
          {blog.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="pill-badge">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs`);
        const data = await res.json();
        const arr = Array.isArray(data) ? data : data.blogs || [];
        setBlogs(arr);
      } catch (err) {
        console.error("Fetch blogs error:", err);
        // Fallback for static demo
        setBlogs([
          { _id: "1", title: "Demystifying OWASP Top 10 in 2026", content: "Understanding current application vulnerabilities like broken access controls and injection threats with code-level remedies.", author: { name: "Vikash Yadav" }, createdAt: new Date().toISOString(), tags: ["Web Security", "OWASP"] },
          { _id: "2", title: "A Guide to Docker Container Hardening", content: "Learn how to secure container namespaces, restrict privileges, and avoid common configuration errors.", author: { name: "Kritika Aggarwal" }, createdAt: new Date().toISOString(), tags: ["Docker", "DevSecOps"] },
          { _id: "3", title: "Getting Started with reverse engineering using Ghidra", content: "A walk-through tutorial detailing how to load a simple compiled binary and translate assembly into readable C code.", author: { name: "Jashanpreet Singh" }, createdAt: new Date().toISOString(), tags: ["Reverse Engineering", "Binaries"] }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filtered = blogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white text-[#111] min-h-screen font-sans">

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 md:px-10 grid-bg border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <p className="section-label mb-4">Knowledge Base / Articles</p>
            <h1 className="font-display font-black text-6xl md:text-8xl text-[#111] leading-none">
              Blog <span className="lime-highlight">Posts.</span>
            </h1>
          </div>
          <div className="relative">
            <LuSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72 pl-10 pr-5 py-3 rounded-full border border-gray-200 text-sm text-[#111] placeholder-[#aaa] focus:outline-none focus:border-[#CBFF00] focus:ring-2 focus:ring-[#CBFF00]/20 transition bg-white"
            />
          </div>
        </div>
      </section>

      {/* Blog grid */}
      <section className="py-16 px-6 md:px-10 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-light p-7 animate-pulse">
                  <div className="flex gap-3 mb-6">
                    <div className="w-9 h-9 rounded-full bg-gray-200" />
                    <div className="space-y-2">
                      <div className="h-3 w-24 bg-gray-200 rounded" />
                      <div className="h-2 w-16 bg-gray-200 rounded" />
                    </div>
                  </div>
                  <div className="h-5 bg-gray-200 rounded mb-3 w-3/4" />
                  <div className="h-3 bg-gray-100 rounded mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-16 h-16 rounded-full bg-[#f0f0f0] flex items-center justify-center mx-auto mb-4">
                <LuFileText size={28} className="text-[#bbb]" />
              </div>
              <h3 className="font-display font-black text-3xl text-[#111] mb-2">
                {search ? "No posts matching your search" : "No Blog Posts Yet"}
              </h3>
              <p className="text-[#888]">Check back soon for articles, writeups, and tutorials.</p>
            </div>
          ) : (
            <>
              <p className="text-[#888] text-sm font-mono mb-8">
                {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
