import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#111] text-white font-sans dark-grid-bg">
      
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div className="md:col-span-1">
            <Link to="/" className="text-white font-black text-2xl font-display tracking-tight select-none" onClick={scrollToTop}>
              CSCNITJ<span className="text-[#CBFF00]">.</span>
            </Link>
            <p className="text-[#666] text-sm leading-relaxed mt-4 max-w-xs">
              The Cyber Security Club of NIT Jalandhar — fostering ethical hacking and digital resilience.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {[
                { href: "https://www.instagram.com/csc_nitj/", Icon: FaInstagram },
                { href: "https://linkedin.com/company/cyber-security-club-nitj/", Icon: FaLinkedinIn },
                { href: "https://github.com/cybersecurityclub-nitj", Icon: FaGithub },
                { href: "#", Icon: FaXTwitter },
              ].map(({ href, Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-[#1e1e1e] border border-[#2a2a2a] flex items-center justify-center text-[#666] hover:text-[#CBFF00] hover:border-[#CBFF00]/30 transition-all duration-200"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#555] mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about' },
                { label: 'Team', to: '/team' },
                { label: 'Blog', to: '/blog' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-[#666] hover:text-white transition-colors duration-200 text-sm"
                    onClick={scrollToTop}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#555] mb-5">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'Events', to: '/events' },
                { label: 'Education', to: '/education' },
                { label: 'Awareness', to: '/awareness' },
                { label: 'Competitions', to: '/competitions' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-[#666] hover:text-white transition-colors duration-200 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Join CTA */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#555] mb-5">Join Us</h4>
            <p className="text-[#666] text-sm mb-5 leading-relaxed">
              Ready to dive into cybersecurity? Create your account and join the club.
            </p>
            <Link
              to="/register"
              className="btn-lime inline-block px-6 py-3 text-sm font-bold"
            >
              Get Started →
            </Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#1e1e1e] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#444] text-xs font-mono">
            © {currentYear} CSC NITJ. All rights reserved.
          </p>
          <p className="text-[#333] text-xs font-mono">
            // SECURING_THE_FUTURE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;