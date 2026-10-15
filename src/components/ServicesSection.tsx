import React from 'react';
import { portfolioData } from '../lib/data.ts';
import Tilt from './Tilt.tsx';
import {
  Code,
  Palette,
  Layout,
  TrendingUp,
  Cpu,
  Layers,
  Shield,
  Sparkles,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Palette,
  Layout,
  TrendingUp,
  Cpu,
  Layers,
  Shield,
};

export default function ServicesSection() {
  const { heading, tagline, items } = portfolioData.services;

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 px-5 sm:px-8 z-10 scroll-mt-24"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-500/15 to-indigo-500/15 border border-sky-400/30 text-xs font-semibold tracking-widest text-sky-300 uppercase mb-3 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>SOLUTIONS &amp; OFFERINGS</span>
          </div>
          <h2
            id="services-heading"
            className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            {heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 font-light max-w-[65ch] leading-relaxed">
            {tagline}
          </p>
        </div>

        {/* 6 Luxury Glass Cards with 3D Tilt on Mouse Move */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((service) => {
            const IconComponent = iconMap[service.iconName] || Code;
            return (
              <Tilt key={service.id} maxTilt={8} scale={1.02} className="h-full">
                <div className="rounded-2xl p-7 sm:p-8 flex flex-col justify-between h-full bg-[#0c0d18]/80 border border-slate-800/90 hover:border-sky-500/50 hover:shadow-[0_12px_35px_rgba(56,189,248,0.12)] transition-all duration-300 group">
                  <div>
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-sky-400 mb-6 group-hover:border-sky-400 group-hover:bg-sky-500/10 group-hover:text-sky-300 transition-colors duration-300 shadow-inner">
                      <IconComponent className="w-5 h-5" strokeWidth={2} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-sky-300 transition-colors duration-200">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-[11px] text-sky-400/80">Production Ready</span>
                    <ArrowRight className="w-4 h-4 text-sky-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}
