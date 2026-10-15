'use client';

import React, { useState } from 'react';
import { portfolioData } from '../lib/data.js';
import Tilt from './Tilt.jsx';
import {
  Send,
  Mail,
  MessageSquare,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  Server,
  Phone,
} from 'lucide-react';

export default function SectionContact() {
  const { heading, tagline, email, phone, phoneDisplay, whatsappUrl, whatsappDisplay, socials, hostinger } =
    portfolioData.contact;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      `Project Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailto;
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-5 sm:px-8 z-10 scroll-mt-24"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a24b]/15 border border-[#c9a24b]/30 text-xs font-semibold tracking-widest text-[#dfbf77] uppercase mb-3 shadow-[0_0_15px_rgba(201,162,75,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a24b]" />
            <span>Direct Collaboration</span>
          </div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight"
          >
            {heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 font-light max-w-[65ch] leading-relaxed">
            {tagline}
          </p>
        </div>

        {/* Primary Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* WhatsApp Direct Card */}
          <Tilt maxTilt={6} scale={1.02} className="h-full">
            <div className="h-full rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#101428] to-[#090b16] border border-[#c9a24b]/30 hover:border-[#c9a24b]/60 transition-all duration-300 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-6 shadow-inner">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Instant WhatsApp Message
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                  Fastest way to get in touch for rapid website project consultations, custom WordPress customizations, and immediate quotes.
                </p>
              </div>

              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-semibold text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>Chat on WhatsApp ({whatsappDisplay})</span>
                  <ArrowUpRight className="w-4 h-4 opacity-75" />
                </a>
              </div>
            </div>
          </Tilt>

          {/* Direct Email Card */}
          <Tilt maxTilt={6} scale={1.02} className="h-full">
            <div className="h-full rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#101428] to-[#090b16] border border-[#c9a24b]/30 hover:border-[#c9a24b]/60 transition-all duration-300 shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#c9a24b]/15 border border-[#c9a24b]/30 flex items-center justify-center text-[#dfbf77] mb-6 shadow-inner">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Official Email Inbox
                </h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                  For detailed project requirements, technical specifications, and official collaborations. Verified reply within 24 business hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center gap-2 flex-1 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#c9a24b] to-[#a88236] hover:from-[#d8b056] hover:to-[#b89141] text-[#050507] font-semibold text-sm tracking-wide shadow-lg shadow-[#c9a24b]/20 transition-all duration-200 active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                  <ArrowUpRight className="w-4 h-4 opacity-75" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#141628] hover:bg-[#1c1f38] text-slate-300 hover:text-white border border-slate-700/80 hover:border-[#c9a24b] text-sm font-medium transition-all"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </Tilt>
        </div>

        {/* Dynamic Reach-out Form & Hostinger Referral Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Quick Message Form (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-[#0b0c16]/90 border border-slate-800">
            <h4 className="text-lg font-bold text-white mb-2">
              Send a Direct Project Brief
            </h4>
            <p className="text-xs text-slate-400 mb-6 font-light">
              Submit your project details directly to Kazi Mukitul Islam’s priority queue.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="client-name" className="block text-xs font-medium text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121324] border border-slate-700 focus:border-[#c9a24b] text-sm text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="client-email" className="block text-xs font-medium text-slate-300 mb-1">
                    Your Email
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121324] border border-slate-700 focus:border-[#c9a24b] text-sm text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="client-message" className="block text-xs font-medium text-slate-300 mb-1">
                  Project Scope or Requirements
                </label>
                <textarea
                  id="client-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your project timeline, tech requirements, or consultation goals..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121324] border border-slate-700 focus:border-[#c9a24b] text-sm text-white placeholder-slate-500 outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#c9a24b] to-[#a88236] hover:from-[#d8b056] hover:to-[#b89141] text-[#050507] font-semibold text-sm tracking-wide shadow-md shadow-[#c9a24b]/20 transition-all duration-200 active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Project Brief</span>
              </button>

              {formSubmitted && (
                <p className="text-xs text-emerald-400 mt-2 font-medium">
                  Brief prepared! Launching your email client to dispatch to Kazi.
                </p>
              )}
            </form>
          </div>

          {/* Hostinger Affiliate Referral Block (5 cols) */}
          {hostinger && (
            <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#151226] to-[#0c0a18] border border-[#673de6]/40 flex flex-col justify-between shadow-xl">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#673de6]/20 border border-[#673de6]/40 text-[#a285ff] text-[11px] font-semibold uppercase tracking-wider mb-4">
                  <Server className="w-3.5 h-3.5" />
                  <span>{hostinger.title}</span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2">
                  Cloud Infrastructure for Web Developers
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                  {hostinger.description}
                </p>

                <div className="p-3 rounded-xl bg-[#090812]/80 border border-[#673de6]/30 mb-6">
                  <span className="text-xs text-[#a285ff] font-medium block">
                    {hostinger.discountText}
                  </span>
                </div>
              </div>

              <div>
                <a
                  href={hostinger.referralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-[#673de6] to-[#5025d1] hover:from-[#784ef7] hover:to-[#5e32df] text-white font-semibold text-xs tracking-wide shadow-lg shadow-[#673de6]/25 transition-all"
                >
                  <span>Explore Hostinger Cloud Plans</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Social Presence Hub */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#0b0c16]/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-semibold text-white mb-1">
              Connect Across Digital Networks
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Follow open-source projects, professional milestones, and engineering insights.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141628]/90 hover:bg-[#1e213c] border border-slate-700 hover:border-[#c9a24b] text-xs sm:text-sm text-slate-200 hover:text-[#dfbf77] font-medium transition-all group"
              >
                <span>{social.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#c9a24b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
