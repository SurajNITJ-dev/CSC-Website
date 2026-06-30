import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuAtSign,
  LuLock,
  LuWifi,
  LuSmartphone,
  LuShieldAlert,
  LuEye,
  LuTriangleAlert,
  LuArrowRight,
  LuLightbulb,
} from "react-icons/lu";

const modules = [
  { id: "AWR_001", Icon: LuAtSign,    level: "HIGH",     title: "Phishing & Social Engineering", desc: "Recognize deceptive emails, fake websites, and identity theft tactics used by real attackers worldwide.",         tags: ["Email Security", "OSINT", "Human Factor"],      tip: "Always verify sender email domains carefully — attackers use typosquatted domains like 'googIe.com'." },
  { id: "AWR_002", Icon: LuLock,        level: "MEDIUM",   title: "Password Security & MFA",       desc: "Build uncrackable password strategies, implement multi-factor authentication, and avoid credential stuffing.",    tags: ["Password Managers", "2FA", "Biometrics"],        tip: "A passphrase of 4 random words is stronger than a complex 8-character password." },
  { id: "AWR_003", Icon: LuWifi,        level: "HIGH",     title: "Safe Browsing & Public WiFi",   desc: "Protect yourself on open networks using VPNs, HTTPS verification, and traffic inspection awareness.",            tags: ["VPN", "DNS Security", "TLS/SSL"],                tip: "Never log into banking or sensitive accounts on public WiFi without a trusted VPN." },
  { id: "AWR_004", Icon: LuSmartphone,  level: "MEDIUM",   title: "Mobile Device Security",        desc: "Secure your smartphone against malicious apps, rogue permissions, and Bluetooth-based attacks.",                 tags: ["Android", "iOS", "App Permissions"],             tip: "Revoke unnecessary app permissions — most apps request far more access than they need." },
  { id: "AWR_005", Icon: LuShieldAlert, level: "CRITICAL", title: "Ransomware & Malware Defense",  desc: "Understand how ransomware spreads, backup strategies, and incident response procedures.",                        tags: ["Backup Strategy", "EDR", "Zero Trust"],          tip: "Follow the 3-2-1 backup rule: 3 copies, 2 media types, 1 offsite location." },
  { id: "AWR_006", Icon: LuEye,         level: "MEDIUM",   title: "Data Privacy & GDPR",           desc: "Know your digital rights, how companies collect your data, and how to minimize your attack surface.",             tags: ["Privacy Laws", "Data Minimization", "GDPR"],    tip: "Use unique email aliases for different services to track and stop data leaks at their source." },
];

const levelColors = {
  CRITICAL: "bg-red-100 text-red-700 border border-red-200",
  HIGH:     "bg-orange-100 text-orange-700 border border-orange-200",
  MEDIUM:   "bg-yellow-100 text-yellow-700 border border-yellow-200",
};

export default function AwarenessPage() {
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white text-[#111] min-h-screen font-sans">

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 md:px-10 grid-bg border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Security / Awareness</p>
          <h1 className="font-display font-black text-6xl md:text-8xl text-[#111] leading-none mb-8">
            Stay <span className="lime-highlight">Secure.</span>
          </h1>
          <p className="text-[#555] text-lg max-w-xl leading-relaxed">
            Practical digital self-defense guides and cybersecurity awareness modules for everyday users.
          </p>
        </div>
      </section>

      {/* Threat alert banner */}
      <div className="bg-[#111] px-6 md:px-10 py-4 flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
        <p className="text-sm text-[#666] font-mono">
          <span className="text-red-400 font-bold">THREAT_LEVEL: ELEVATED</span> — Phishing campaigns up 45% this quarter
        </p>
      </div>

      {/* Module grid */}
      <section className="py-20 px-6 md:px-10 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="section-label mb-4">Awareness Modules</p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#111] leading-tight">
              Digital <span className="lime-highlight">Self-Defense</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, i) => {
              const { Icon } = mod;
              return (
                <div
                  key={mod.id}
                  className={`card-light p-7 cursor-pointer group transition-all ${expanded === i ? "border-[#CBFF00]" : ""}`}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#CBFF00]/15 flex items-center justify-center">
                      <Icon size={22} className="text-[#6b7700]" />
                    </div>
                    <span className={`flex items-center gap-1.5 text-[9px] font-black px-2.5 py-1 rounded-full tracking-wider ${levelColors[mod.level]}`}>
                      <LuTriangleAlert size={9} />
                      {mod.level}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-[#aaa] mb-2">{mod.id}</p>
                  <h3 className="font-display font-black text-xl text-[#111] mb-3 leading-tight">{mod.title}</h3>
                  <div className="flex gap-1 mb-3">
                    {[...Array(8)].map((_, j) => <span key={j} className="w-1.5 h-1.5 rounded-full bg-[#e0e0e0]" />)}
                  </div>
                  <p className="text-[#666] text-sm leading-relaxed mb-5">{mod.desc}</p>

                  <div className="flex gap-2 flex-wrap mb-5">
                    {mod.tags.map((tag) => <span key={tag} className="pill-badge">{tag}</span>)}
                  </div>

                  {/* Tip expand */}
                  {expanded === i && (
                    <div className="bg-[#CBFF00]/10 border border-[#CBFF00]/30 rounded-xl p-4 mt-2">
                      <div className="flex items-center gap-2 mb-2">
                        <LuLightbulb size={14} className="text-[#6b7700]" />
                        <p className="text-xs font-bold text-[#6b7700]">PRO TIP</p>
                      </div>
                      <p className="text-sm text-[#444] leading-relaxed">{mod.tip}</p>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#aaa] group-hover:text-[#111] transition-colors">
                    <div className="w-5 h-[1.5px] bg-current transition-all group-hover:w-8" />
                    {expanded === i ? "Hide Tip" : "Show Tip"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111] py-16 px-6 md:px-10 dark-grid-bg">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display font-black text-4xl text-white mb-4">Think you're secure?</h2>
          <p className="text-[#666] mb-8">Take our comprehensive security assessment and find out.</p>
          <button
            onClick={() => navigate("/competitions")}
            className="btn-lime px-8 py-4 text-sm font-bold flex items-center gap-2 mx-auto"
          >
            Take the Quiz <LuArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
