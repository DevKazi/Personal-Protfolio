import React, { useState, useEffect } from 'react';
import { portfolioData } from '../lib/data.ts';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080914]/90 backdrop-blur-md border-b border-slate-800 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Logo based on DevKazi SVG */}
        <a
          href="#"
          className="flex items-center gap-3 group transition-opacity hover:opacity-90"
          aria-label="DevKazi - Kazi Mukitul Islam Home"
        >
          <img
            src={portfolioData.owner.logoImage}
            alt="DevKazi Logo"
            width={180}
            height={48}
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </a>

        {/* Navigation links */}
        <nav
          className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm"
          aria-label="Main Navigation"
        >
          <a
            href="#about"
            className="hidden md:inline-block text-slate-300 hover:text-sky-400 transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#skills"
            className="hidden md:inline-block text-slate-300 hover:text-sky-400 transition-colors duration-200"
          >
            Skills
          </a>
          <a
            href="#services"
            className="hidden md:inline-block text-slate-300 hover:text-sky-400 transition-colors duration-200"
          >
            Services
          </a>
          <a
            href="#certificates"
            className="hidden sm:inline-block text-slate-300 hover:text-sky-400 transition-colors duration-200 font-medium"
          >
            Certificate &amp; Achievement
          </a>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium text-xs sm:text-sm tracking-wide shadow-md shadow-sky-500/25 transition-all duration-200 active:scale-[0.97]"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
