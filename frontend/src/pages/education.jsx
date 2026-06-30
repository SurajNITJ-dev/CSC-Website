import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuShieldCheck,
  LuGlobe,
  LuScanSearch,
  LuBug,
  LuCloud,
  LuFlag,
  LuArrowRight,
  LuLayers,
} from "react-icons/lu";

const tracks = [
  { id: "EDU_001", Icon: LuShieldCheck, title: "Ethical Hacking Fundamentals", level: "Beginner",    modules: 8,  desc: "Master penetration testing methodology, reconnaissance, enumeration, and exploitation with hands-on labs.", tags: ["Kali Linux", "Metasploit", "Nmap"] },
  { id: "EDU_002", Icon: LuGlobe,       title: "Web Application Security",    level: "Intermediate", modules: 10, desc: "Deep-dive into OWASP Top 10, SQL injection, XSS, CSRF, and secure coding practices for developers.",      tags: ["Burp Suite", "OWASP", "JWT"] },
  { id: "EDU_003", Icon: LuScanSearch,  title: "Digital Forensics & OSINT",   level: "Intermediate", modules: 7,  desc: "Investigate cyber incidents, recover evidence, and use open-source intelligence to profile threats.",       tags: ["Autopsy", "Wireshark", "Maltego"] },
  { id: "EDU_004", Icon: LuBug,         title: "Malware Analysis",            level: "Advanced",     modules: 6,  desc: "Static and dynamic analysis of real malware samples, reverse engineering, and sandbox environments.",    tags: ["IDA Pro", "Ghidra", "YARA"] },
  { id: "EDU_005", Icon: LuCloud,       title: "Cloud & Container Security",  level: "Advanced",     modules: 9,  desc: "Secure AWS, Azure, Docker, and Kubernetes environments against misconfigurations and privilege escalation.", tags: ["AWS", "Docker", "Terraform"] },
  { id: "EDU_006", Icon: LuFlag,        title: "CTF Challenge Labs",          level: "All Levels",   modules: 20, desc: "Progressive CTF challenges covering cryptography, binary exploitation, steganography, and web flags.",   tags: ["PwnTools", "CyberChef", "GDB"] },
];

const levelColors = {
  Beginner:    "bg-green-100 text-green-700",
  Intermediate:"bg-blue-100 text-blue-700",
  Advanced:    "bg-red-100 text-red-700",
  "All Levels":"bg-[#CBFF00]/20 text-[#6b7700]",
};

export default function EducationPage() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white text-[#111] min-h-screen font-sans">

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 md:px-10 grid-bg border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Knowledge / Curriculum</p>
          <h1 className="font-display font-black text-6xl md:text-8xl text-[#111] leading-none mb-8">
            Education <span className="lime-highlight">Hub.</span>
          </h1>
          <p className="text-[#555] text-lg max-w-xl leading-relaxed">
            Structured learning tracks from beginner to advanced, designed to create complete security professionals.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#111] px-6 md:px-10 py-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-8">
          {[
            { num: '6', label: 'Learning Tracks', Icon: LuLayers },
            { num: '60+', label: 'Total Modules', Icon: LuFlag },
            { num: '200+', label: 'Practice Labs', Icon: LuBug },
            { num: 'FREE', label: 'Access', Icon: LuShieldCheck },
          ].map(({ num, label, Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={18} className="text-[#CBFF00]" />
              <span className="font-display font-black text-2xl text-[#CBFF00]">{num}</span>
              <span className="text-[#666] text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning tracks */}
      <section className="py-20 px-6 md:px-10 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-label mb-4">Curriculum</p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#111] leading-tight">
              Learning <span className="lime-highlight">Tracks</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track, i) => {
              const { Icon } = track;
              return (
                <div
                  key={track.id}
                  className={`card-light p-7 cursor-pointer group transition-all ${selectedIdx === i ? "border-[#CBFF00] shadow-lg" : ""}`}
                  onClick={() => setSelectedIdx(selectedIdx === i ? null : i)}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#CBFF00]/15 flex items-center justify-center">
                      <Icon size={22} className="text-[#6b7700]" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${levelColors[track.level]}`}>
                      {track.level}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-[#aaa] mb-2">{track.id}</p>
                  <h3 className="font-display font-black text-xl text-[#111] mb-3 leading-tight">{track.title}</h3>
                  <div className="flex gap-1 mb-3">
                    {[...Array(8)].map((_, j) => <span key={j} className="w-1.5 h-1.5 rounded-full bg-[#e0e0e0]" />)}
                  </div>
                  <p className="text-[#666] text-sm leading-relaxed mb-5">{track.desc}</p>

                  <div className="flex gap-2 flex-wrap mb-5">
                    {track.tags.map((tag) => <span key={tag} className="pill-badge">{tag}</span>)}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#aaa] font-mono">{track.modules} modules</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate("/login"); }}
                      className="btn-lime px-4 py-1.5 text-xs font-bold flex items-center gap-1.5"
                    >
                      Start <LuArrowRight size={12} />
                    </button>
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
            Ready to start<br />your security journey?
          </h2>
          <button
            onClick={() => navigate("/register")}
            className="bg-[#111] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-[#222] transition flex items-center gap-2"
          >
            Join CSC NITJ <LuArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
