import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../lib/data.ts';
import Tilt from './Tilt.tsx';
import {
  Code2,
  Cpu,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Award,
  Globe,
  Camera,
} from 'lucide-react';

export default function AboutSection() {
  const {
    badge,
    heading,
    subheading,
    bioParagraph,
    stats,
    socialPills,
    skillCategories,
    profileImage,
  } = portfolioData.about;

  const [avatarSrc, setAvatarSrc] = useState<string>(profileImage);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const cached = localStorage.getItem('devkazi_custom_avatar');
    if (cached) {
      setAvatarSrc(cached);
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setAvatarSrc(result);
        try {
          localStorage.setItem('devkazi_custom_avatar', result);
          fetch('/api/upload-avatar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: result }),
          }).catch(() => {});
        } catch (err) {}
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-5 sm:px-8 z-10 scroll-mt-24 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Main 2-Column Split: Left Column (60%) & Right Column (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          {/* Left Column (approx 60% width -> 7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Blue & Purple Glowing Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-500/15 to-indigo-500/15 border border-sky-400/30 text-xs font-semibold tracking-widest text-sky-300 uppercase w-fit mb-4 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{badge}</span>
            </div>

            {/* Large Elegant Heading & Bright Blue Gradient Subheading */}
            <h2
              id="about-heading"
              className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-2"
            >
              {heading}
            </h2>
            <div className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent mb-6">
              {subheading}
            </div>

            {/* Fully Justified Editorial Paragraph Blocks */}
            <div className="space-y-4 mb-8 text-slate-300 text-base sm:text-[17px] leading-relaxed text-justify font-light sm:leading-loose">
              {portfolioData.about.paragraphs ? (
                portfolioData.about.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))
              ) : (
                <p>{bioParagraph}</p>
              )}
            </div>

            {/* Standard CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium text-sm sm:text-base tracking-wide shadow-[0_0_20px_rgba(14,165,233,0.35)] transition-all duration-200 active:scale-[0.98]"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#certificates"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0c0d16]/80 hover:bg-[#141524] text-slate-200 border border-slate-700/80 hover:border-sky-500/60 font-medium text-sm sm:text-base tracking-wide transition-all duration-200 shadow-sm"
              >
                <Award className="w-4 h-4 text-sky-400" />
                <span>My Certificates</span>
              </a>
            </div>

            {/* CONNECT WITH ME Dedicated Social Section */}
            <div className="pt-4 border-t border-slate-800/80">
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-sky-400/90 mb-3">
                CONNECT WITH ME
              </span>

              {/* Horizontal Row of 3 Glowing Pill-Shaped Social Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {socialPills.map((social) => {
                  let icon = <Globe className="w-3.5 h-3.5 text-sky-400" />;
                  if (social.name === 'LinkedIn') {
                    icon = (
                      <svg className="w-3.5 h-3.5 text-[#0a66c2]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 1 0-.01-3 1.5 1.5 0 0 0 .01 3m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                      </svg>
                    );
                  } else if (social.name === 'Facebook') {
                    icon = (
                      <svg className="w-3.5 h-3.5 text-[#1877f2]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    );
                  } else if (social.name === 'GitHub') {
                    icon = (
                      <svg className="w-3.5 h-3.5 text-slate-100" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    );
                  }

                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121324]/80 hover:bg-[#1b1c36] border border-sky-500/25 hover:border-sky-400 text-xs text-slate-300 hover:text-white transition-all duration-200 backdrop-blur-md shadow-[0_0_12px_rgba(56,189,248,0.12)] group active:scale-95"
                    >
                      <span>{icon}</span>
                      <span className="font-mono text-[11px] font-normal tracking-tight group-hover:underline">
                        {social.handle}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (approx 40% width -> 5 cols on lg) - Profile Picture */}
          <div className="lg:col-span-5 flex justify-center">
            {/* Hidden file input for photo replacement */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />

            <Tilt maxTilt={7} scale={1.02} className="w-full max-w-sm sm:max-w-md">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleFile(e.dataTransfer.files[0]);
                  }
                }}
                className={`relative rounded-2xl p-2.5 sm:p-3 bg-gradient-to-b from-[#181a30] via-[#0d0e1b] to-[#07070e] border transition-all duration-300 shadow-[0_20px_50px_rgba(201,162,75,0.15)] overflow-hidden group cursor-pointer ${
                  isDragging ? 'border-[#c9a24b] ring-4 ring-[#c9a24b]/30' : 'border-[#c9a24b]/40 hover:border-[#c9a24b]'
                }`}
                onClick={() => fileInputRef.current?.click()}
                title="Click or drag & drop to update profile picture"
              >
                {/* Glowing edge accents */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a24b]/20 via-transparent to-indigo-500/20 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="aspect-square w-full rounded-xl overflow-hidden relative bg-[#05060b]">
                  <img
                    src={avatarSrc}
                    alt={`${portfolioData.owner.name} executive portrait`}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06060c] via-transparent to-transparent opacity-75" />

                  {/* Change Photo Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4 text-center">
                    <div className="p-3 rounded-full bg-[#c9a24b]/20 border border-[#c9a24b] text-[#dfbf77] shadow-lg">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-white tracking-wide">
                      Click to Update Photo
                    </span>
                    <span className="text-[10px] text-slate-300 font-light">
                      Supports JPG, PNG or WebP
                    </span>
                  </div>

                  {/* Quick Change Badge on Top Right */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#050507]/80 hover:bg-[#c9a24b] text-[#dfbf77] hover:text-[#050507] border border-[#c9a24b]/40 text-[10px] font-semibold tracking-wider flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md"
                    title="Upload profile picture"
                  >
                    <Camera className="w-3 h-3" />
                    <span>Upload Photo</span>
                  </button>

                  {/* Glassmorphic verified pill tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-[#0d0f1c]/80 border border-[#c9a24b]/30 backdrop-blur-md">
                    <div>
                      <p className="font-semibold text-white text-sm tracking-wide">
                        {portfolioData.owner.name}
                      </p>
                      <p className="text-[#dfbf77] text-[11px] font-mono">
                        {portfolioData.owner.roleLine.split('|')[0]}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#c9a24b]/20 border border-[#c9a24b]/40 text-[#dfbf77] text-[10px] font-semibold tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a24b] animate-pulse" />
                      VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>
        </div>

        {/* 4 Injected Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-20">
          {stats.map((stat) => (
            <Tilt key={stat.id} maxTilt={5} scale={1.02} className="h-full">
              <div className="rounded-xl p-4 sm:p-5 flex flex-col justify-between h-full bg-[#0d0e1b]/70 border border-slate-800 hover:border-[#c9a24b]/50 transition-all duration-300 shadow-md">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-400 via-[#dfbf77] to-[#c9a24b] bg-clip-text text-transparent mb-1 font-serif">
                  {stat.value}
                </div>
                <div>
                  <div className="text-xs text-slate-300 font-medium leading-snug">
                    {stat.label}
                  </div>
                  {stat.sublabel && (
                    <div className="text-[10px] text-[#dfbf77] font-light mt-0.5">
                      {stat.sublabel}
                    </div>
                  )}
                </div>
              </div>
            </Tilt>
          ))}
        </div>

        {/* Dedicated Skill Section: HTML, CSS, JS, jQuery, Bootstrap, WordPress, AI & SEO */}
        <div id="skills" className="pt-12 border-t border-slate-800/80 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-1">
                Technical Stack &amp; Skills
              </p>
              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Design, Coding &amp; AI Integration
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md font-light leading-relaxed">
              Specialized across frontend development (HTML, CSS, JS, jQuery, Bootstrap), custom WordPress theme architecture, SEO with Google AdSense, and AI autonomous agent workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((group, idx) => {
              const iconMap = [
                <Code2 key="code" className="w-5 h-5 text-sky-400" />,
                <LayoutIcon key="layout" className="w-5 h-5 text-indigo-400" />,
                <Cpu key="cpu" className="w-5 h-5 text-cyan-400" />,
                <ShieldCheck key="shield" className="w-5 h-5 text-purple-400" />,
              ];

              return (
                <div
                  key={group.category}
                  className="rounded-2xl p-6 bg-[#0c0d18]/80 border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 shadow-inner">
                      {iconMap[idx % iconMap.length]}
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      {group.category}
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141628]/80 border border-slate-700/60 text-xs text-slate-200 hover:border-sky-400 hover:text-sky-300 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function LayoutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}
