import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LuBookOpen,
  LuShieldAlert,
  LuTrophy,
  LuChevronDown,
  LuMenu,
  LuX,
} from "react-icons/lu";

const exploreLinks = [
  {
    to: "/education",
    label: "Education",
    desc: "Learning tracks & workshops",
    Icon: LuBookOpen,
  },
  {
    to: "/awareness",
    label: "Cyber Awareness",
    desc: "Digital self-defense guides",
    Icon: LuShieldAlert,
  },
  {
    to: "/competitions",
    label: "Competitions",
    desc: "CTFs & global platforms",
    Icon: LuTrophy,
  },
];

export default function Navbar({ isLoggedIn, onLogout }) {
  const [open, setOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  useEffect(() => { setOpen(false); setExploreOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (path) =>
    location.pathname === path
      ? "text-[#111] font-semibold"
      : "text-[#555] hover:text-[#111] transition-colors duration-200";

  const isExploreActive = exploreLinks.some((l) => location.pathname === l.to);

  const handleLogoutClick = () => { onLogout(); navigate("/"); };

  return (
    <>
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-6xl transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
        <div className="nav-pill px-5 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link
            to={isAdmin ? "/admin" : "/"}
            className="text-[#111] font-black text-lg tracking-tight select-none font-display z-[60] cursor-pointer flex-shrink-0"
          >
            CSC<span className="text-[#111]">NITJ</span><span className="text-[#CBFF00] bg-[#111] px-1 rounded ml-0.5">.</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center bg-[#f0f0f0] rounded-full px-2 py-1.5 gap-1">
            {isAdmin ? (
              <>
                <NavLink to="/admin" label="Dashboard" active={isActive("/admin")} />
                <NavLink to="/admin/events" label="Events" active={isActive("/admin/events")} />
                <NavLink to="/admin/blogs" label="Blogs" active={isActive("/admin/blogs")} />
              </>
            ) : (
              <>
                <NavLink to="/" label="Home" active={isActive("/")} />
                <NavLink to="/about" label="About" active={isActive("/about")} />
                <NavLink to="/events" label="Events" active={isActive("/events")} />
                <NavLink to="/team" label="Team" active={isActive("/team")} />
                <NavLink to="/blog" label="Blog" active={isActive("/blog")} />

                {/* Explore Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setExploreOpen(!exploreOpen)}
                    className={`flex items-center gap-1 text-sm px-4 py-2 rounded-full transition-all duration-200 hover:bg-white hover:shadow-sm cursor-pointer ${
                      isExploreActive ? "text-[#111] font-semibold bg-white shadow-sm" : "text-[#555] hover:text-[#111]"
                    }`}
                  >
                    Explore
                    <LuChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${exploreOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Panel */}
                  {exploreOpen && (
                    <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 overflow-hidden">
                      {/* Arrow */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                      {exploreLinks.map(({ to, label, desc, Icon }) => (
                        <Link
                          key={to}
                          to={to}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all group ${
                            location.pathname === to
                              ? "bg-[#CBFF00]/15"
                              : "hover:bg-[#f8f8f8]"
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                            location.pathname === to
                              ? "bg-[#CBFF00] text-[#111]"
                              : "bg-[#f0f0f0] text-[#666] group-hover:bg-[#CBFF00]/20 group-hover:text-[#6b7700]"
                          }`}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <p className={`text-sm font-bold leading-tight ${
                              location.pathname === to ? "text-[#111]" : "text-[#333]"
                            }`}>
                              {label}
                            </p>
                            <p className="text-[10px] text-[#aaa] mt-0.5">{desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right side CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin ? (
              <button
                onClick={handleLogoutClick}
                className="text-sm px-4 py-2 rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition font-medium cursor-pointer"
              >
                Sign Out
              </button>
            ) : !isLoggedIn ? (
              <>
                <Link to="/login" className="text-sm text-[#555] hover:text-[#111] transition font-medium cursor-pointer">
                  Login
                </Link>
                <Link to="/register" className="btn-lime text-sm px-5 py-2.5 font-bold flex items-center gap-1.5">
                  Get Started →
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="text-sm text-[#555] hover:text-[#111] transition font-medium cursor-pointer">
                  Profile
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="text-sm px-4 py-2 rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition font-medium cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#111] z-[60] cursor-pointer p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <LuX size={22} /> : <LuMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out z-[55] shadow-2xl md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 mt-20">
          {isAdmin ? (
            <div className="flex flex-col gap-2">
              <MobileLink to="/admin" label="Dashboard" />
              <MobileLink to="/admin/events" label="Events" />
              <MobileLink to="/admin/blogs" label="Blogs" />
              <button onClick={handleLogoutClick} className="text-red-500 text-left text-sm font-medium py-2 cursor-pointer">Sign Out</button>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-1 mb-6">
                <p className="text-[9px] font-mono text-[#bbb] uppercase tracking-widest mb-2 px-3">Navigation</p>
                <MobileLink to="/" label="Home" />
                <MobileLink to="/about" label="About" />
                <MobileLink to="/events" label="Events" />
                <MobileLink to="/team" label="Team" />
                <MobileLink to="/blog" label="Blog" />
              </div>

              <div className="flex flex-col gap-1 mb-6">
                <p className="text-[9px] font-mono text-[#bbb] uppercase tracking-widest mb-2 px-3">Explore</p>
                {exploreLinks.map(({ to, label, Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      location.pathname === to
                        ? "bg-[#CBFF00]/15 text-[#111] font-bold"
                        : "text-[#444] hover:bg-[#f5f5f5]"
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#f0f0f0] flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-[#666]" />
                    </div>
                    {label}
                    {location.pathname === to && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#CBFF00]" />
                    )}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100">
                {!isLoggedIn ? (
                  <Link to="/register" className="btn-lime text-center block px-5 py-3 text-sm font-bold">
                    Get Started →
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/profile" className="text-sm text-[#555] py-2 px-3">Profile</Link>
                    <button onClick={handleLogoutClick} className="text-red-500 text-left text-sm font-medium py-2 px-3 cursor-pointer">Sign Out</button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-[50] md:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

function NavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`text-sm px-4 py-2 rounded-full transition-all duration-200 ${active} hover:bg-white hover:shadow-sm`}
    >
      {label}
    </Link>
  );
}

function MobileLink({ to, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`text-sm px-3 py-2.5 rounded-xl transition-all font-medium ${
        isActive ? "bg-[#f5f5f5] text-[#111] font-bold" : "text-[#444] hover:bg-[#f5f5f5]"
      }`}
    >
      {label}
    </Link>
  );
}
