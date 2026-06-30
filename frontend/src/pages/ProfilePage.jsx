import React, { useState, useEffect } from 'react';
import { LuUser, LuFileText, LuHeart, LuArrowRight, LuLogOut, LuPencil } from 'react-icons/lu';
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const text = await res.text();
        let data;
        try { data = JSON.parse(text); } catch { throw new Error("Server response invalid"); }
        if (!res.ok) throw new Error(data.message || "Profile fetch failed");

        setUser({
          name: data.name,
          email: data.email,
          role: data.role,
          joinedAt: new Date(data.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
          blogs: data.blogsCount || 0,
          likes: data.likesCount || 0,
        });
      } catch (err) {
        console.error("Profile error:", err.message);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#CBFF00] border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-[#888] text-sm font-mono">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f8f8] text-[#111] min-h-screen font-sans grid-bg">
      <div className="max-w-4xl mx-auto px-6 pt-36 pb-24">

        {/* Header */}
        <div className="mb-10">
          <p className="section-label mb-4">Account / Profile</p>
          <h1 className="font-display font-black text-5xl md:text-6xl text-[#111] leading-none">
            Your <span className="lime-highlight">Profile.</span>
          </h1>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Identity card */}
          <div className="card-light p-8 flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-[#CBFF00] flex items-center justify-center text-[#111] font-black text-4xl font-display mb-5">
              <LuUser size={36} />
            </div>
            <h2 className="font-display font-black text-xl text-[#111] mb-1">{user.name}</h2>
            <p className="text-[#aaa] text-xs font-mono mb-4">{user.email}</p>
            <div className="bg-[#111] text-[#CBFF00] text-[9px] font-black px-3 py-1 rounded-full font-mono mb-6">
              {user.role.toUpperCase()}
            </div>
            <div className="w-full space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-[#aaa]">Joined</span>
                <span className="font-mono text-[#111] text-xs">{user.joinedAt}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-[#aaa]">Status</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-green-600">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats + actions */}
          <div className="md:col-span-2 flex flex-col gap-6">

            {/* Stats */}
            <div className="card-light p-8">
              <p className="section-label mb-6">Activity</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#f0f0f0] rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <LuFileText size={16} className="text-[#aaa]" />
                  </div>
                  <p className="stat-number text-5xl text-[#111] mb-1">
                    {user.blogs < 10 ? `0${user.blogs}` : user.blogs}
                  </p>
                  <p className="text-[#888] text-xs font-medium">Blog Posts</p>
                </div>
                <div className="bg-[#CBFF00]/10 border border-[#CBFF00]/30 rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <LuHeart size={16} className="text-[#6b7700]" />
                  </div>
                  <p className="stat-number text-5xl text-[#111] mb-1">
                    {user.likes < 10 ? `0${user.likes}` : user.likes}
                  </p>
                  <p className="text-[#888] text-xs font-medium">Likes Received</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/edit-profile')}
                className="btn-lime py-3 text-sm font-bold text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <LuPencil size={14} /> Edit Profile
              </button>
              <button
                onClick={() => navigate('/my-blogs')}
                className="btn-outline py-3 text-sm font-bold text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <LuFileText size={14} /> My Blogs
              </button>
              <button
                onClick={() => { localStorage.removeItem("token"); navigate("/"); }}
                className="py-3 rounded-full border border-red-200 text-red-500 hover:bg-red-50 text-sm font-bold transition cursor-pointer flex items-center justify-center gap-2"
              >
                <LuLogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
