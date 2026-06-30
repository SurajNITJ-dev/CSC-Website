import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LuArrowLeft, LuHeart, LuMessageSquare, LuUser, LuFileText, LuTrash2, LuArrowRight } from "react-icons/lu";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const token = localStorage.getItem("token");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const fetchBlog = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/blogs/${slug}`);
      const data = await res.json();
      setBlog({ ...data, image: data.image ? `${API_BASE}${data.image}` : "" });
    } catch (err) {
      console.error("Failed to fetch blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlog(); }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = async () => {
    if (!token) return alert("Please login to like this blog");
    try {
      setActionLoading(true);
      const res = await fetch(`${API_BASE}/api/blogs/${slug}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = await res.json();
      setBlog((prev) => ({ ...prev, likes: updated.likes }));
    } catch (err) {
      console.error("Like failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please login to comment");
    if (!commentText.trim()) return;
    try {
      setActionLoading(true);
      await fetch(`${API_BASE}/api/blogs/${slug}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text: commentText }),
      });
      setCommentText("");
      fetchBlog();
    } catch (err) {
      console.error("Comment failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!token) return;
    try {
      setActionLoading(true);
      await fetch(`${API_BASE}/api/blogs/${slug}/comment/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBlog();
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#CBFF00] border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-[#888] text-sm font-mono">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-center">
        <div>
          <div className="w-16 h-16 rounded-full bg-[#f0f0f0] flex items-center justify-center mx-auto mb-4">
                <LuFileText size={28} className="text-[#bbb]" />
              </div>
          <h2 className="font-display font-black text-3xl text-[#111] mb-2">Article not found</h2>
          <Link to="/blog" className="text-[#CBFF00] bg-[#111] px-5 py-2 rounded-full text-sm font-bold hover:bg-[#222] transition inline-flex items-center gap-2 mt-4">
            <LuArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  let userId = null;
  if (token) {
    try { userId = JSON.parse(atob(token.split(".")[1])).id; } catch {}
  }
  const isLiked = userId && blog.likes?.some((id) => id.toString() === userId);

  return (
    <div className="bg-white text-[#111] min-h-screen font-sans">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-gray-100">
        <div
          className="h-full bg-[#CBFF00] transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hero / Header */}
      <section className="pt-36 pb-12 px-6 md:px-10 border-b border-gray-100 grid-bg">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#888] hover:text-[#111] text-xs font-bold uppercase tracking-wider font-mono transition mb-8"
          >
            <LuArrowLeft size={14} /> Back to Blog
          </Link>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-5">
              {blog.tags.map((tag) => (
                <span key={tag} className="pill-badge">{tag}</span>
              ))}
            </div>
          )}

          <h1 className="font-display font-black text-4xl md:text-6xl text-[#111] leading-tight mb-8">
            {blog.title}
          </h1>

          {/* Author + date */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#CBFF00] flex items-center justify-center text-[#111] font-black text-sm flex-shrink-0">
              {blog.author?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-sm font-bold text-[#111]">{blog.author?.name || "Anonymous"}</p>
              <p className="text-xs text-[#aaa] font-mono">
                {new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
              </p>
            </div>
            {/* Like button */}
            <button
              onClick={handleLike}
              disabled={actionLoading}
              className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition cursor-pointer ${
                isLiked
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "border-gray-200 text-[#888] hover:border-red-200 hover:text-red-500"
              }`}
            >
              <LuHeart size={14} fill={isLiked ? 'currentColor' : 'none'} /> {blog.likes?.length || 0}
            </button>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {blog.coverImage?.url && (
        <div className="max-w-3xl mx-auto px-6 md:px-0 mt-10">
          <div className="w-full aspect-video rounded-3xl overflow-hidden bg-gray-50">
            <img src={blog.coverImage.url} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 md:px-0 py-16">
        <div
          className="prose prose-lg max-w-none text-[#333] leading-relaxed
            prose-h1:font-display prose-h1:font-black prose-h1:text-[#111]
            prose-h2:font-display prose-h2:font-black prose-h2:text-[#111]
            prose-h3:font-display prose-h3:font-bold prose-h3:text-[#111]
            prose-a:text-[#CBFF00] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-code:font-mono prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-[#111] prose-pre:text-white prose-pre:rounded-2xl
            prose-blockquote:border-l-4 prose-blockquote:border-[#CBFF00] prose-blockquote:bg-[#CBFF00]/5 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

      {/* Comments Section */}
      <div className="max-w-3xl mx-auto px-6 md:px-0 pb-24">
        <div className="border-t border-gray-100 pt-12">
          <h3 className="font-display font-black text-2xl text-[#111] mb-8">
            <LuMessageSquare size={20} className="inline mr-2 text-[#aaa]" />
            Comments <span className="text-[#aaa] font-medium text-lg">({blog.comments?.length || 0})</span>
          </h3>

          {/* Comment form */}
          <form onSubmit={handleComment} className="mb-10">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={token ? "Share your thoughts..." : "Login to leave a comment"}
              rows={3}
              disabled={!token}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 text-sm text-[#111] placeholder-[#bbb] focus:outline-none focus:border-[#CBFF00] focus:ring-2 focus:ring-[#CBFF00]/20 transition resize-none bg-[#f8f8f8] disabled:opacity-50"
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={actionLoading || !token}
                className="btn-lime px-6 py-2.5 text-sm font-bold disabled:opacity-50 flex items-center gap-1.5"
            >
              Post Comment <LuArrowRight size={14} />
            </button>
            </div>
          </form>

          {/* Comment list */}
          <div className="space-y-5">
            {blog.comments?.length === 0 ? (
              <p className="text-[#888] text-sm text-center py-8">No comments yet. Be the first!</p>
            ) : (
              blog.comments?.map((comment) => (
                <div key={comment._id} className="card-light p-5 flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-[#CBFF00] flex items-center justify-center text-[#111] font-black text-sm flex-shrink-0">
                    <LuUser size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-[#111]">{comment.user?.name || "Anonymous"}</p>
                      <p className="text-xs text-[#bbb] font-mono">
                        {new Date(comment.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <p className="text-[#555] text-sm leading-relaxed">{comment.text}</p>
                    {(userId === comment.user?._id || userId === comment.user?.toString()) && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 mt-2 transition cursor-pointer"
                      >
                        <LuTrash2 size={12} /> Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
