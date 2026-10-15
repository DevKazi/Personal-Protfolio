'use client';

import React from 'react';
import { portfolioData } from '../lib/data.js';
import Tilt from './Tilt.jsx';
import {
  Layout,
  Sparkles,
  Code,
  TrendingUp,
  Cpu,
  Shield,
  ArrowUpRight,
} from 'lucide-react';

export default function SectionServices() {
  const { heading, tagline, items } = portfolioData.services;

  const iconMap = {
    Layout: <Layout className="w-6 h-6 text-[#c9a24b]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-sky-400" />,
    Code: <Code className="w-6 h-6 text-[#dfbf77]" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-emerald-400" />,
    Cpu: <Cpu className="w-6 h-6 text-cyan-400" />,
    Shield: <Shield className="w-6 h-6 text-indigo-400" />,
  };

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 px-5 sm:px-8 z-10 scroll-mt-24"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a24b]/15 border border-[#c9a24b]/30 text-xs font-semibold tracking-widest text-[#dfbf77] uppercase mb-3 shadow-[0_0_15px_rgba(201,162,75,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a24b]" />
            <span>Core Capabilities &amp; Services</span>
          </div>
          <h2
            id="services-heading"
            className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight"
          >
            {heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 font-light max-w-[65ch] leading-relaxed">
            {tagline}
          </p>
        </div>

        {/* 3D Hover Tilt Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((service, index) => (
            <Tilt key={service.id} maxTilt={8} scale={1.03} className="h-full">
              <div className="relative h-full rounded-2xl p-6 sm:p-7 bg-gradient-to-b from-[#111222] to-[#080914] border border-slate-800 hover:border-[#c9a24b]/60 transition-all duration-300 shadow-lg flex flex-col justify-between group">
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a24b]/5 rounded-bl-full pointer-events-none group-hover:bg-[#c9a24b]/15 transition-all duration-500" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-[#080914] border border-slate-700/80 shadow-inner group-hover:border-[#c9a24b]/40 transition-colors">
                      {iconMap[service.iconName] || <Code className="w-6 h-6 text-[#c9a24b]" />}
                    </div>
                    <span className="font-mono text-xs text-slate-500 group-hover:text-[#dfbf77] transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#dfbf77] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                  <span>Consult Solution</span>
                  <ArrowUpRight className="w-4 h-4 text-[#c9a24b] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
