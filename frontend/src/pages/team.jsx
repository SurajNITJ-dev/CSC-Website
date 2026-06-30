import React, { useEffect } from "react";
import { LuUser, LuCode, LuTag, LuArrowRight } from "react-icons/lu";

// Image imports
import vikashImg from "../assets/vikash.png";
import kritikaImg from "../assets/kritika.png";
import jassImg from "../assets/jass.png";
import samarthImg from "../assets/samarth.jsx.png";
import komleenImg from "../assets/komleen.png";
import simranImg from "../assets/simran.png";
import dhruvSagarImg from "../assets/dhruv_sagar.png";
import dhruvTyagiImg from "../assets/dhruv_tyagi.png";
import mohitImg from "../assets/mohit.png";
import sukhanImg from "../assets/sukhanpreet.png";

const coreTeam = [
  { name: "Vikash Yadav",        role: "President",      img: vikashImg,    tags: ["Leadership", "CTF"] },
  { name: "Kritika Aggarwal",    role: "Vice President", img: kritikaImg,   tags: ["Research", "Web Security"] },
  { name: "Jashanpreet Singh",   role: "Technical Lead", img: jassImg,      tags: ["Pentesting", "Forensics"] },
  { name: "Samarth Suri",        role: "Developer",      img: samarthImg,   tags: ["React", "Node.js"] },
];

const executiveTeam = [
  { name: "Komleen",       role: "Event Manager",    img: komleenImg,    tags: ["Events"] },
  { name: "Simran",        role: "Content Lead",     img: simranImg,     tags: ["Writing"] },
  { name: "Dhruv Sagar",   role: "Security Analyst", img: dhruvSagarImg, tags: ["Malware"] },
  { name: "Dhruv Tyagi",   role: "CTF Team Lead",    img: dhruvTyagiImg, tags: ["Crypto"] },
  { name: "Mohit",         role: "Design Lead",      img: mohitImg,      tags: ["UI/UX"] },
  { name: "Sukhanpreet",   role: "Treasurer",        img: sukhanImg,     tags: ["Finance"] },
];

const TeamCard = ({ member }) => (
  <div className="card-light group overflow-hidden">
    {/* Avatar */}
    <div className="relative overflow-hidden h-52 bg-gradient-to-br from-[#f0f0f0] to-[#e8e8e8]">
      <img
        src={member.img}
        alt={member.name}
        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#CBFF00] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <LuUser size={14} className="text-[#111]" />
      </div>
    </div>
    {/* Info */}
    <div className="p-6">
      <h3 className="font-display font-black text-lg text-[#111] leading-tight">{member.name}</h3>
      <div className="flex items-center gap-1.5 mt-1 mb-3">
        <LuCode size={11} className="text-[#CBFF00]" />
        <span className="bg-[#111] text-[#CBFF00] text-[9px] font-bold px-2 py-0.5 rounded font-mono">
          {member.role}
        </span>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {member.tags.map((tag) => (
          <span key={tag} className="pill-badge">{tag}</span>
        ))}
      </div>
    </div>
  </div>
);

export default function TeamPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white text-[#111] min-h-screen font-sans">

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 md:px-10 grid-bg border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">People / Team</p>
          <h1 className="font-display font-black text-6xl md:text-8xl text-[#111] leading-none mb-8">
            Meet the <span className="lime-highlight">Team.</span>
          </h1>
          <p className="text-[#555] text-lg max-w-xl leading-relaxed">
            The passionate individuals behind CSC NITJ — researchers, hackers, and builders.
          </p>
        </div>
      </section>

      {/* Core team */}
      <section className="py-20 px-6 md:px-10 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-label mb-4">Leadership</p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#111] leading-tight">
              Core <span className="lime-highlight">Team</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {coreTeam.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Executive team */}
      <section className="bg-[#111] py-20 px-6 md:px-10 dark-grid-bg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-label mb-4 text-[#555]">Contributors</p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight">
              Executive <span className="text-[#CBFF00]">Members</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {executiveTeam.map((member) => (
              <div key={member.name} className="card-dark p-5 text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4 bg-[#222]">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-white font-bold font-display text-sm leading-tight">{member.name}</h4>
                <p className="text-[#CBFF00] text-[9px] font-mono mt-1">{member.role}</p>
                <div className="flex gap-1 justify-center mt-3">
                  {member.tags.slice(0, 1).map((tag) => (
                    <span key={tag} className="pill-badge-dark text-[8px]">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#CBFF00] py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="font-display font-black text-3xl md:text-5xl text-[#111] leading-tight">
            Want to join<br />this team?
          </h2>
          <a
            href="/register"
            className="bg-[#111] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-[#222] transition flex items-center gap-2"
          >
            Apply Now <LuArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
