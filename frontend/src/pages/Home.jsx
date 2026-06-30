import React, { useRef, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {
  LuShield,
  LuZap,
  LuSearch,
  LuUsers,
  LuArrowRight,
  LuChevronRight,
} from "react-icons/lu";

import cscLogo from "../assets/CSC_Logo.png";

// ── Binary Particles ──────────────────────────────────────────────
const BinaryParticles = () => {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      angle: Math.random() * 360,
      distance: 120 + Math.random() * 150,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 4,
      value: Math.random() > 0.5 ? '1' : '0',
      size: 12 + Math.random() * 16,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 animate-[pulse_4s_ease-in-out_infinite]">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute top-1/2 left-1/2 font-mono font-bold text-[#CBFF00]/60 drop-shadow-[0_0_8px_rgba(203,255,0,0.8)]"
          style={{
            fontSize: `${p.size}px`,
            animation: `binaryFlyOut ${p.duration}s ease-in-out ${p.delay}s infinite`,
            '--angle': `${p.angle}deg`,
            '--dist': `${p.distance}px`,
          }}
        >
          {p.value}
        </div>
      ))}
    </div>
  );
};

// ── 3D Lime Orb ──────────────────────────────────────────────────
const BlobOrb = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative w-80 h-80 md:w-96 md:h-96">
      <div
        className="absolute inset-0 rounded-full border border-gray-400/30 animate-[spin_18s_linear_infinite]"
        style={{ transform: 'rotateX(70deg) rotateZ(0deg)' }}
      />
      <div
        className="absolute inset-4 rounded-full border border-gray-400/20 animate-[spin_12s_linear_reverse_infinite]"
        style={{ transform: 'rotateX(70deg) rotateZ(45deg)' }}
      />
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#CBFF00] via-[#a8d900] to-[#78a000] shadow-[0_0_80px_rgba(203,255,0,0.4)] animate-[pulse_3s_ease-in-out_infinite]" />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(200,200,200,0.6) 0%, transparent 30%, rgba(180,180,180,0.4) 60%, transparent 80%, rgba(200,200,200,0.6) 100%)',
          animation: 'spin 8s linear infinite',
        }}
      />
      <div className="absolute inset-16 rounded-full bg-[#CBFF00]/80 blur-xl animate-[pulse_2s_ease-in-out_infinite_0.5s]" />
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div
          className="w-full h-8 rounded-full border-2 border-gray-400/40"
          style={{
            transform: 'rotateX(75deg)',
            background: 'linear-gradient(90deg, rgba(200,200,200,0.2), rgba(100,100,100,0.1), rgba(200,200,200,0.2))',
          }}
        />
      </div>
      <BinaryParticles />
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <img 
          src={cscLogo} 
          alt="CSC Logo" 
          className="w-48 h-48 md:w-60 md:h-60 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] z-30"
        />
      </div>
    </div>
  </div>
);

// ── Animated counter ──────────────────────────────────────────────
const CountUp = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 25);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count}{suffix}</span>;
};

// ── Feature card ──────────────────────────────────────────────────
const features = [
  {
    Icon: LuShield,
    title: "CTF Training",
    desc: "Hands-on Capture The Flag sessions with progressive difficulty and expert mentorship.",
  },
  {
    Icon: LuZap,
    title: "Live Workshops",
    desc: "Real-time security workshops on penetration testing, malware analysis, and more.",
  },
  {
    Icon: LuSearch,
    title: "Threat Research",
    desc: "A curated library of threat intelligence reports, CVEs, and security advisories.",
  },
  {
    Icon: LuUsers,
    title: "Community Hub",
    desc: "Connect with fellow ethical hackers, share writeups, and collaborate on projects.",
  },
];

const FeatureCard = ({ Icon, title, desc, delay = 0 }) => (
  <div className="card-dark p-7 flex flex-col gap-6" style={{ animationDelay: `${delay}ms` }}>
    <div className="icon-circle">
      <Icon size={20} />
    </div>
    <div>
      <h3 className="text-white font-bold text-xl leading-tight mb-2 font-display">{title}</h3>
      <div className="flex gap-1 mb-3">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#333]" />
        ))}
      </div>
      <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="bg-white text-[#111] font-sans overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden grid-bg">
        <div className="glow-blob w-[600px] h-[600px] bg-[#CBFF00]/20 top-[-100px] right-[-100px]" />
        <div className="glow-blob w-[400px] h-[400px] bg-[#CBFF00]/10 bottom-[0px] left-[0px]" />

        {/* Big title */}
        <div className="absolute top-24 left-0 right-0 px-6 md:px-10 z-10 pt-8 flex justify-center">
          <h1 className="hero-text text-[18vw] md:text-[16vw] leading-none text-[#111] select-none pointer-events-none text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
            CSC NITJ<span className="text-[#CBFF00]">.</span>
          </h1>
        </div>

        {/* 3D Orb */}
        <div className="absolute inset-0 flex items-center justify-center z-20 mt-40 md:mt-48">
          <div className="w-72 h-72 md:w-[420px] md:h-[420px]">
            <BlobOrb />
          </div>
        </div>

        {/* Bottom left */}
        <div className="absolute bottom-10 left-6 md:left-10 z-30">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex -space-x-2">
              {['#CBFF00', '#a8d900', '#78a000'].map((c, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center"
                  style={{ background: c, zIndex: 3 - i }}
                >
                  <LuUsers size={12} className="text-[#111]" />
                </div>
              ))}
            </div>
            <div>
              <p className="font-black text-xl font-display"><CountUp target={200} suffix="+" /></p>
              <p className="text-xs text-[#888]">Active Members</p>
            </div>
          </div>
          <p className="text-[#333] text-sm md:text-base max-w-[220px] leading-relaxed font-medium">
            Pioneering the future of secure systems and ethical hacking protocols.
          </p>
          <div className="flex gap-1 mt-2">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-[#ccc]" />
            ))}
          </div>
        </div>

        {/* Bottom right */}
        <div className="absolute bottom-10 right-6 md:right-10 z-30 flex flex-col items-end gap-4">
          <div className="text-right space-y-1">
            {[['Web based', '/01'], ['Collaborative', '/02'], ['Real-time', '/03']].map(
              ([label, num]) => (
                <p key={num} className="text-xs text-[#888]">
                  <span className="text-[#aaa]">{label}</span>
                  <span className="text-[#ccc] ml-2 font-mono">{num}</span>
                </p>
              )
            )}
          </div>
          <Link to="/about">
            <div className="w-24 h-24 rounded-full bg-[#CBFF00] flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition-transform shadow-[0_8px_30px_rgba(203,255,0,0.4)]">
              <LuArrowRight size={18} className="text-[#111] mb-1" />
              <span className="text-[10px] font-bold leading-tight text-[#111]">How it<br />works?</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── DARK FEATURES ────────────────────────────── */}
      <section className="bg-[#111] py-24 px-6 md:px-10 dark-grid-bg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-white font-display font-black text-4xl md:text-6xl leading-tight max-w-2xl">
              All the must haves of a premier{' '}
              <span className="lime-highlight">cyber club.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ Icon, title, desc }, i) => (
              <FeatureCard key={title} Icon={Icon} title={title} desc={desc} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────── */}
      <section className="bg-[#f8f8f8] py-24 px-6 md:px-10 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Members', value: 200, suffix: '+' },
              { label: 'Events Hosted', value: 30, suffix: '+' },
              { label: 'CTFs Won', value: 15, suffix: '+' },
              { label: 'Alumni Network', value: 50, suffix: '+' },
            ].map(({ label, value, suffix }) => (
              <div key={label}>
                <p className="stat-number text-5xl md:text-7xl text-[#111]">
                  <CountUp target={value} suffix={suffix} />
                </p>
                <p className="text-[#888] text-sm mt-2 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS CTA ────────────────────────────────── */}
      <section className="bg-[#111] py-24 px-6 md:px-10 dark-grid-bg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <p className="section-label mb-4 text-[#666]">Latest Activity</p>
            <h2 className="text-white font-display font-black text-4xl md:text-5xl leading-tight max-w-lg">
              Stay ahead of the <span className="text-[#CBFF00]">threat landscape.</span>
            </h2>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link to="/events" className="btn-lime px-8 py-4 text-sm font-bold flex items-center gap-2">
              View Events <LuArrowRight size={16} />
            </Link>
            <Link to="/blog" className="btn-outline-dark px-8 py-4 text-sm font-bold">
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ──────────────────────────────── */}
      <section className="bg-white py-24 px-6 md:px-10 grid-bg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4">About the Club</p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#111] leading-tight mb-6">
              Building India's next-gen{' '}
              <span className="lime-highlight">cyber defenders.</span>
            </h2>
            <p className="text-[#555] leading-relaxed text-base max-w-md mb-8">
              The Cyber Security Club of NIT Jalandhar was founded to create a community of passionate
              security researchers. We run CTF teams, host workshops, and mentor the next generation
              of ethical hackers.
            </p>
            <div className="flex gap-4">
              <Link to="/about" className="btn-lime px-8 py-3.5 text-sm font-bold flex items-center gap-2">
                Learn More <LuArrowRight size={16} />
              </Link>
              <Link to="/team" className="btn-outline px-8 py-3.5 text-sm font-bold">
                Meet the Team
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                Icon: LuShield,
                title: 'Ethical Hacking',
                desc: 'Learn offensive security techniques in a legal, structured environment.',
              },
              {
                Icon: LuSearch,
                title: 'Open Source',
                desc: 'All our research and tools are open source and community-driven.',
              },
              {
                Icon: LuUsers,
                title: 'Knowledge Sharing',
                desc: 'Weekly writeups, talks, and reading groups to keep everyone sharp.',
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="card-light p-5 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#CBFF00]/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-[#6b7700]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111] mb-1 font-display">{title}</h4>
                  <p className="text-[#777] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BAND ────────────────────────────── */}
      <section className="bg-[#CBFF00] py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="font-display font-black text-3xl md:text-5xl text-[#111] leading-tight">
            Ready to level up<br />your security skills?
          </h2>
          <div className="flex gap-4">
            <Link
              to="/register"
              className="bg-[#111] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-[#222] transition flex items-center gap-2"
            >
              Join CSC NITJ <LuArrowRight size={16} />
            </Link>
            <Link
              to="/blog"
              className="bg-white/50 text-[#111] px-8 py-4 rounded-full text-sm font-bold hover:bg-white/80 transition border border-[#111]/10"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}