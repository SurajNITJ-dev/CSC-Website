import React, { useEffect, useState } from "react";
import { LuCalendar, LuTag, LuMonitor, LuWifi, LuMapPin, LuChevronRight } from "react-icons/lu";

const modeIcon = { Online: LuWifi, Offline: LuMapPin, Hybrid: LuMonitor };
const modeColors = {
  Online: "bg-green-100 text-green-700",
  Offline: "bg-blue-100 text-blue-700",
  Hybrid: "bg-purple-100 text-purple-700",
  default: "bg-gray-100 text-gray-600",
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        const eventsArray = Array.isArray(data) ? data : data.events || [];
        const formatted = eventsArray.map((e) => ({
          id: e._id,
          title: e.title,
          desc: e.description,
          date: new Date(e.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          mode: e.mode,
          tag: e.tag,
        }));
        setEvents(formatted);
      } catch (err) {
        console.error("Fetch Events Error:", err);
        // Fallback for static demo
        setEvents([
          { id: "1", title: "Introduction to Capture The Flag (CTF)", desc: "A beginner-friendly workshop explaining jeopardy-style CTF formats, basic toolsets, and navigation.", date: "15 Jul 2026", mode: "Hybrid", tag: "Workshop" },
          { id: "2", title: "Campus Vulnerability Assessment", desc: "An offline practical threat intelligence and scanning simulation exercise inside NITJ labs.", date: "22 Aug 2026", mode: "Offline", tag: "Audit" },
          { id: "3", title: "Global Cyber Defense Hackathon", desc: "Represent CSC NITJ in securing standard container architectures against simulated payloads.", date: "10 Oct 2026", mode: "Online", tag: "Competition" }
        ]);
      }
    };
    fetchEvents();
  }, []);

  const tags = ["All", ...new Set(events.map((e) => e.tag).filter(Boolean))];
  const filtered = filter === "All" ? events : events.filter((e) => e.tag === filter);

  return (
    <div className="bg-white text-[#111] min-h-screen font-sans">

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 md:px-10 grid-bg border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Calendar / Activity</p>
          <h1 className="font-display font-black text-6xl md:text-8xl text-[#111] leading-none mb-8">
            Club <span className="lime-highlight">Events.</span>
          </h1>
          <p className="text-[#555] text-lg max-w-xl leading-relaxed">
            Stay updated with workshops, CTFs, talks, and competitions happening at CSC NITJ.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="border-b border-gray-100 px-6 md:px-10 py-5">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                filter === tag
                  ? "bg-[#111] text-white border-[#111]"
                  : "border-gray-200 text-[#888] hover:border-gray-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Events grid */}
      <section className="py-16 px-6 md:px-10 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-16 h-16 rounded-full bg-[#f0f0f0] flex items-center justify-center mx-auto mb-4">
                <LuCalendar size={28} className="text-[#bbb]" />
              </div>
              <h3 className="font-display font-black text-3xl text-[#111] mb-2">No Events Yet</h3>
              <p className="text-[#888]">Stay tuned for upcoming events and workshops.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event, i) => {
                const ModeIcon = modeIcon[event.mode] || LuMonitor;
                return (
                  <div key={event.id || i} className="card-light p-7 group">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 bg-[#111] text-white px-3 py-1.5 rounded-xl text-xs font-mono font-bold">
                        <LuCalendar size={12} />
                        {event.date}
                      </div>
                      {event.mode && (
                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${modeColors[event.mode] || modeColors.default}`}>
                          <ModeIcon size={11} />
                          {event.mode}
                        </span>
                      )}
                    </div>

                    {event.tag && (
                      <div className="pill-badge mb-4">
                        <LuTag size={10} className="text-[#6b7700]" />
                        {event.tag}
                      </div>
                    )}

                    <h3 className="font-display font-black text-xl text-[#111] mb-3 leading-tight">
                      {event.title}
                    </h3>
                    <div className="flex gap-1 mb-4">
                      {[...Array(8)].map((_, j) => <span key={j} className="w-1.5 h-1.5 rounded-full bg-[#e0e0e0]" />)}
                    </div>
                    <p className="text-[#666] text-sm leading-relaxed line-clamp-3">{event.desc}</p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#aaa] group-hover:text-[#CBFF00] group-hover:translate-x-1 transition-all">
                      <div className="w-6 h-[1.5px] bg-current" />
                      View Details
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
