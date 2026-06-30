import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuGraduationCap,
  LuServer,
  LuHouse,
  LuClock,
  LuSword,
  LuHash,
  LuArrowUpRight,
  LuArrowRight,
  LuTrophy,
  LuCircleCheck,
  LuSignal,
} from "react-icons/lu";

const globalCtfs = [
  { id: "CTF_001", Icon: LuGraduationCap, name: "picoCTF",       org: "Carnegie Mellon University",  level: "Beginner",     tags: ["Web", "Crypto", "Forensics"],            link: "https://picoctf.org" },
  { id: "CTF_002", Icon: LuServer,        name: "Hack The Box",  org: "HTB Platform",                level: "Intermediate", tags: ["Linux", "Pentesting", "Active Directory"], link: "https://hackthebox.com" },
  { id: "CTF_003", Icon: LuHouse,         name: "TryHackMe",     org: "THM Platform",                level: "Beginner",     tags: ["Rooms", "Learning Paths", "CTF"],         link: "https://tryhackme.com" },
  { id: "CTF_004", Icon: LuClock,         name: "CTFtime.org",   org: "Global CTF Calendar",         level: "All Levels",   tags: ["Competitions", "Rankings", "Teams"],      link: "https://ctftime.org" },
  { id: "CTF_005", Icon: LuSword,         name: "OverTheWire",   org: "Community Project",           level: "Beginner",     tags: ["Wargames", "Linux", "SSH"],               link: "https://overthewire.org" },
  { id: "CTF_006", Icon: LuHash,          name: "CryptoHack",    org: "CryptoHack Team",             level: "Intermediate", tags: ["Cryptography", "Python", "Math"],         link: "https://cryptohack.org" },
];

const internalEvents = [
  { id: "INT_001", name: "CSC NITJ CTF 2025",  status: "Upcoming",   date: "Q3 2025",  tags: ["Web", "Forensics", "Misc"],      desc: "Annual internal CTF competition for all NITJ students. Prizes and certificates for top performers." },
  { id: "INT_002", name: "Capture The Campus", status: "Completed",  date: "Jan 2025", tags: ["Physical Security", "OSINT"],    desc: "A unique offline CTF blending physical and digital security challenges across campus." },
  { id: "INT_003", name: "Binary Battle",       status: "Completed",  date: "Oct 2024", tags: ["Binary Exploitation", "Reversing"], desc: "Advanced challenge set focused on reverse engineering and binary exploitation techniques." },
];

const levelColors = {
  Beginner:    "bg-green-100 text-green-700",
  Intermediate:"bg-blue-100 text-blue-700",
  Advanced:    "bg-red-100 text-red-700",
  "All Levels":"bg-[#CBFF00]/20 text-[#6b7700]",
};
const statusConfig = {
  Upcoming:  { color: "bg-[#CBFF00]/20 text-[#6b7700]", Icon: LuSignal },
  Completed: { color: "bg-gray-100 text-gray-600",       Icon: LuCircleCheck },
  Ongoing:   { color: "bg-blue-100 text-blue-700",       Icon: LuSignal },
};

export default function CompetitionsPage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white text-[#111] min-h-screen font-sans">

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 md:px-10 grid-bg border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Competitions / CTF</p>
          <h1 className="font-display font-black text-6xl md:text-8xl text-[#111] leading-none mb-8">
            Compete &amp; <span className="lime-highlight">Win.</span>
          </h1>
          <p className="text-[#555] text-lg max-w-xl leading-relaxed">
            Sharpen your skills on global platforms and represent CSC NITJ at competitions worldwide.
          </p>
        </div>
      </section>

      {/* Global platforms */}
      <section className="py-20 px-6 md:px-10 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-label mb-4">Platforms</p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#111] leading-tight">
              Global <span className="lime-highlight">Platforms</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {globalCtfs.map((ctf) => {
              const { Icon } = ctf;
              return (
                <a key={ctf.id} href={ctf.link} target="_blank" rel="noreferrer" className="card-light p-7 group block">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#CBFF00]/15 flex items-center justify-center">
                      <Icon size={22} className="text-[#6b7700]" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${levelColors[ctf.level]}`}>
                      {ctf.level}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-[#aaa] mb-2">{ctf.id}</p>
                  <h3 className="font-display font-black text-xl text-[#111] mb-1 leading-tight">{ctf.name}</h3>
                  <p className="text-[#aaa] text-xs mb-4">{ctf.org}</p>

                  <div className="flex gap-1 mb-4">
                    {[...Array(8)].map((_, j) => <span key={j} className="w-1.5 h-1.5 rounded-full bg-[#e0e0e0]" />)}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {ctf.tags.map((tag) => <span key={tag} className="pill-badge">{tag}</span>)}
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#aaa] group-hover:text-[#CBFF00] transition-colors">
                    <div className="w-5 h-[1.5px] bg-current" />
                    <LuArrowUpRight size={12} />
                    Visit Platform
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Internal events */}
      <section className="bg-[#111] py-20 px-6 md:px-10 dark-grid-bg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-label mb-4 text-[#555]">Internal Events</p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight">
              CSC NITJ <span className="text-[#CBFF00]">CTFs</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {internalEvents.map((ev) => {
              const status = statusConfig[ev.status] || statusConfig.Completed;
              const StatusIcon = status.Icon;
              return (
                <div key={ev.id} className="card-dark p-7">
                  <div className="flex items-center justify-between mb-5">
                    <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${status.color}`}>
                      <StatusIcon size={10} />
                      {ev.status}
                    </span>
                    <span className="text-xs font-mono text-[#444]">{ev.date}</span>
                  </div>

                  <p className="text-xs font-mono text-[#444] mb-2">{ev.id}</p>
                  <h3 className="font-display font-black text-xl text-white mb-3 leading-tight">{ev.name}</h3>
                  <div className="flex gap-1 mb-4">
                    {[...Array(8)].map((_, j) => <span key={j} className="w-1.5 h-1.5 rounded-full bg-[#222]" />)}
                  </div>
                  <p className="text-[#666] text-sm leading-relaxed mb-5">{ev.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    {ev.tags.map((tag) => <span key={tag} className="pill-badge-dark">{tag}</span>)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#CBFF00] py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="font-display font-black text-3xl md:text-5xl text-[#111] leading-tight">
            Ready to compete<br />at the highest level?
          </h2>
          <button
            onClick={() => navigate("/register")}
            className="bg-[#111] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-[#222] transition flex items-center gap-2"
          >
            Join Our CTF Team <LuArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}