import React from 'react';
import { portfolioData } from '../lib/data.ts';
import { Sparkles, ArrowRight, Award } from 'lucide-react';

export default function Hero() {
  const { name, roleLine } = portfolioData.owner;
  const {
    badge,
    titleFirst,
    titleHighlight,
    titleLast,
    description,
    ctaPrimary,
    ctaSecondary,
  } = portfolioData.hero;

  return (
    <section
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 px-5 sm:px-8 z-10 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative">
        <div className="space-y-6 sm:space-y-7 animate-[fadeRise_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-500/15 to-indigo-500/15 border border-sky-400/30 text-xs font-semibold tracking-widest text-sky-300 uppercase shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>{badge}</span>
          </div>

          {/* Primary Name & Title Headline */}
          <div className="space-y-2">
            <p className="text-sm sm:text-base font-mono text-slate-400 tracking-wide">
              {roleLine}
            </p>
            <h1
              id="hero-title"
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight"
            >
              {titleFirst}{' '}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                {titleHighlight}
              </span>{' '}
              {titleLast}
            </h1>
          </div>

          {/* Value proposition description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-[65ch] leading-relaxed font-light">
            {description}
          </p>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-5">
            <a
              href={ctaPrimary.href}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium text-sm sm:text-base tracking-wide shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 active:scale-[0.98]"
            >
              <span>{ctaPrimary.label}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={ctaSecondary.href}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0e101f]/80 hover:bg-[#161830] text-slate-200 border border-slate-700/80 hover:border-sky-500/60 font-medium text-sm sm:text-base tracking-wide transition-all duration-200 active:scale-[0.98]"
            >
              <Award className="w-4 h-4 text-sky-400" />
              <span>{ctaSecondary.label}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
