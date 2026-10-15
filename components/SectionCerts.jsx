'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { portfolioData } from '../lib/data.js';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  Calendar,
  ExternalLink,
} from 'lucide-react';

export default function SectionCerts() {
  const { heading, tagline, items, categories } = portfolioData.certificates;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const closeButtonRef = useRef(null);

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory);

  const selectedCert = selectedIndex !== null ? items[selectedIndex] : null;

  const handleOpen = (index) => {
    setSelectedIndex(index);
  };

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % items.length : null));
  }, [items.length]);

  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null));
  }, [items.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    setTimeout(() => closeButtonRef.current?.focus(), 50);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedIndex, handleClose, handleNext, handlePrev]);

  return (
    <section
      id="certificates"
      className="relative py-24 sm:py-32 px-5 sm:px-8 z-10 scroll-mt-24"
      aria-labelledby="certs-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a24b]/15 border border-[#c9a24b]/30 text-xs font-semibold tracking-widest text-[#dfbf77] uppercase mb-3 shadow-[0_0_15px_rgba(201,162,75,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a24b]" />
            <span>Verified Credentials ({items.length} Total)</span>
          </div>
          <h2
            id="certs-heading"
            className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight"
          >
            {heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 font-light max-w-[70ch] leading-relaxed">
            {tagline}
          </p>

          {/* Category Filter Tabs */}
          <div
            className="mt-8 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none"
            role="tablist"
            aria-label="Certificate categories"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap border ${
                    isActive
                      ? 'bg-gradient-to-r from-[#c9a24b] to-[#a88236] text-[#050507] border-[#dfbf77] shadow-md shadow-[#c9a24b]/30 font-semibold'
                      : 'bg-[#101222]/80 text-slate-400 border-slate-800 hover:border-[#c9a24b]/50 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((cert) => {
            const globalIndex = items.findIndex((i) => i.id === cert.id);
            return (
              <div
                key={cert.id}
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#121326] to-[#0a0b16] border border-slate-800 hover:border-[#c9a24b]/60 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#06070e]">
                  <img
                    src={cert.image}
                    alt={cert.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b16] via-transparent to-transparent opacity-80" />

                  {/* Category Pill Tag */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide uppercase bg-[#050507]/80 text-[#dfbf77] border border-[#c9a24b]/30 backdrop-blur-md">
                    {cert.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-base font-bold text-white line-clamp-2 mb-1 group-hover:text-[#dfbf77] transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-sky-400 font-medium mb-3">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-light flex items-center gap-1.5 truncate max-w-[180px]">
                      <Calendar className="w-3 h-3 text-[#c9a24b]" />
                      <span>{cert.year.split('(')[0]}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleOpen(globalIndex)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#191b33] hover:bg-[#c9a24b] text-slate-200 hover:text-[#050507] text-xs font-semibold transition-colors"
                      aria-label={`View full certificate for ${cert.title}`}
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible Fullscreen Image Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={handleClose}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-[#0c0d18] border border-[#c9a24b]/40 rounded-2xl p-4 sm:p-6 overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title & Close button */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-[#dfbf77] uppercase tracking-wider">
                  {selectedCert.category}
                </span>
                <h3 id="modal-title" className="text-lg sm:text-xl font-bold text-white">
                  {selectedCert.title}
                </h3>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
                aria-label="Close certificate lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Preview Image */}
            <div className="relative my-4 flex-1 min-h-[300px] flex items-center justify-center overflow-auto rounded-xl bg-[#050507] p-2">
              <img
                src={selectedCert.image}
                alt={selectedCert.alt}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Navigation & Details Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-400 font-mono ml-2">
                  {selectedIndex + 1} of {items.length}
                </span>
              </div>

              <div className="text-right">
                <p className="font-semibold text-white">{selectedCert.issuer}</p>
                <p className="text-xs text-slate-400">{selectedCert.year}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
