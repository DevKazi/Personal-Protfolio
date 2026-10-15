import React from 'react';
import { portfolioData } from '../lib/data.ts';
import { ShieldCheck, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { copyrightName, rights } = portfolioData.footer;
  const { disclaimer } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-12 px-5 sm:px-8 border-t border-slate-800/80 z-10 text-xs sm:text-sm text-slate-400 bg-[#06070e]">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Professional Disclaimer Card */}
        <div className="rounded-2xl p-6 sm:p-7 border border-slate-800 bg-[#0c0d18]/70 backdrop-blur-md">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm sm:text-base font-semibold text-white">
                {disclaimer.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {disclaimer.text}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Logo/Copyright, Nav Links, Back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-800/60">
          <div className="flex items-center gap-3">
            <img
              src={portfolioData.owner.logoImage}
              alt="DevKazi Logo"
              width={140}
              height={38}
              className="h-7 w-auto object-contain opacity-90"
            />
            <span className="text-slate-400">
              © {currentYear} {copyrightName}. {rights}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <a href="#about" className="hover:text-sky-400 transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-sky-400 transition-colors">
              Skills
            </a>
            <a href="#services" className="hover:text-sky-400 transition-colors">
              Services
            </a>
            <a
              href="#certificates"
              className="hover:text-sky-400 transition-colors font-medium"
            >
              Certificate &amp; Achievement
            </a>
            <a href="#contact" className="hover:text-sky-400 transition-colors">
              Contact
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-xl border border-slate-700 hover:border-sky-400 text-slate-400 hover:text-sky-400 transition-all ml-1"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
