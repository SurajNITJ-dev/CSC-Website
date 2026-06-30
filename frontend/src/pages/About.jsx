import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LuBookOpen,
  LuShield,
  LuTrophy,
  LuArrowRight,
  LuChevronRight,
  LuUser,
} from 'react-icons/lu';

const GoalCard = ({ id, Icon, title, desc, path }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path)}
      className="card-light p-8 cursor-pointer group"
    >
      <div className="w-12 h-12 rounded-2xl bg-[#CBFF00]/15 flex items-center justify-center mb-6">
        <Icon size={22} className="text-[#6b7700]" />
      </div>
      <p className="text-xs font-mono text-[#aaa] mb-3">{id}</p>
      <h3 className="font-display font-black text-2xl text-[#111] mb-3">{title}</h3>
      <div className="flex gap-1 mb-4">
        {[...Array(10)].map((_, i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#e0e0e0]" />)}
      </div>
      <p className="text-[#666] text-sm leading-relaxed">{desc}</p>
      <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#aaa] group-hover:text-[#111] transition-colors">
        <div className="w-6 h-[1.5px] bg-current transition-all group-hover:w-10" />
        Explore Module
      </div>
    </div>
  );
};

export default function AboutPage() {
  const [tab, setTab] = useState(0);

  const tabs = [
    {
      label: 'About',
      title: 'About CSC NITJ',
      desc: 'The Cyber Security Club of NIT Jalandhar is a technical hub dedicated to elite skill-building. We bridge the gap between theoretical computing and real-world defense.',
    },
    {
      label: 'Mission',
      title: 'Our Mission',
      desc: 'To forge frontline ethical hackers through offensive-defensive simulations, intensive workshops, and research-driven initiatives that tackle emerging global threats head-on.',
    },
    {
      label: 'Vision',
      title: 'Our Vision',
      desc: 'To establish a premier cybersecurity ecosystem at NITJ where innovation meets ethics, fostering the next generation of digital guardians for a secure, resilient infrastructure.',
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => setTab((prev) => (prev + 1) % 3), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-[#111] font-sans min-h-screen">

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 md:px-10 grid-bg border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Cyber Security Club · NITJ</p>
          <h1 className="font-display font-black text-6xl md:text-8xl text-[#111] leading-none mb-12">
            {tabs[tab].title.split(' ')[0]}{' '}
            <span className="lime-highlight">{tabs[tab].title.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-[#555] text-lg leading-relaxed max-w-2xl">{tabs[tab].desc}</p>
          <div className="flex gap-2 mt-8">
            {tabs.map((t, i) => (
              <button
                key={i}
                onClick={() => setTab(i)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  tab === i
                    ? 'bg-[#111] text-white border-[#111]'
                    : 'border-gray-200 text-[#888] hover:border-gray-400'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-24 px-6 md:px-10 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="section-label mb-4">What We Do</p>
            <h2 className="font-display font-black text-4xl md:text-6xl text-[#111] leading-tight">
              Operational <span className="lime-highlight">Goals</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GoalCard id="SEC_001" Icon={LuBookOpen} title="Education" desc="Hands-on workshops, CTF training, and technical sessions focusing on real-world security challenges." path="/education" />
            <GoalCard id="SEC_002" Icon={LuShield} title="Awareness" desc="Building a strong cybersecurity culture and digital resilience through shared knowledge and training." path="/awareness" />
            <GoalCard id="SEC_003" Icon={LuTrophy} title="Innovation" desc="Research-driven solutions and ethical hacking practices to defend global digital infrastructures." path="/competitions" />
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="bg-[#111] py-24 px-6 md:px-10 dark-grid-bg">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="section-label mb-4 text-[#555]">Guidance</p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight">
              Faculty <span className="text-[#CBFF00]">Mentors</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Prof. Harsh Kumar Verma', role: 'Faculty Mentor', msg: 'Guiding students to think critically about cybersecurity and encouraging research-driven exploration.' },
              { name: 'Dr. Samayveer Singh', role: 'Faculty Mentor', msg: 'Focused on building strong technical foundations and promoting responsible use of security tools.' },
              { name: 'Dr. K P Sharma', role: 'Faculty Mentor', msg: 'Motivating students to innovate in secure system design with discipline and academic rigor.' },
              { name: 'Dr. Urvashi Bansal', role: 'Faculty Mentor', msg: 'Encouraging collaborative learning and a research-oriented mindset in cybersecurity domains.' },
            ].map(({ name, role, msg }) => (
              <div key={name} className="card-dark p-6 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-[#CBFF00] flex items-center justify-center text-[#111] flex-shrink-0">
                  <LuUser size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold font-display">{name}</h4>
                  <p className="text-[#CBFF00] text-xs font-mono mb-2">{role}</p>
                  <p className="text-[#666] text-sm leading-relaxed">"{msg}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}