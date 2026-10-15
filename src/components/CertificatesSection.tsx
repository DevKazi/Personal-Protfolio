import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { portfolioData, CertificateItem } from '../lib/data.ts';
import { getNextIndex, getPrevIndex } from '../lib/portfolio-utils.ts';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Award,
  ExternalLink,
  Sparkles,
  FileText,
  Calendar,
  CheckCircle2,
  IdCard,
} from 'lucide-react';

export default function CertificatesSection() {
  const { heading, tagline, items, categories } = portfolioData.certificates;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory);

  const selectedCert: CertificateItem | null =
    selectedIndex !== null ? items[selectedIndex] : null;

  const handleOpen = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    activeTriggerRef.current = e.currentTarget;
    setSelectedIndex(index);
  };

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
    if (activeTriggerRef.current) {
      activeTriggerRef.current.focus();
    }
  }, []);

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedIndex((prev) =>
        prev !== null ? getNextIndex(prev, items.length) : null
      );
    },
    [items.length]
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedIndex((prev) =>
        prev !== null ? getPrevIndex(prev, items.length) : null
      );
    },
    [items.length]
  );

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev !== null ? getNextIndex(prev, items.length) : null
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev !== null ? getPrevIndex(prev, items.length) : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    setTimeout(() => closeButtonRef.current?.focus(), 50);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex, handleClose, items.length]);

  return (
    <section
      id="certificates"
      className="relative py-24 sm:py-32 px-5 sm:px-8 z-10 scroll-mt-24"
      aria-labelledby="certs-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-500/15 to-indigo-500/15 border border-sky-400/30 text-xs font-semibold tracking-widest text-sky-300 uppercase mb-3 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Verified Credentials ({items.length} Total)</span>
          </div>
          <h2
            id="certs-heading"
            className="text-3xl sm:text-5xl font-bold text-white tracking-tight"
          >
            {heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400 font-light max-w-[70ch] leading-relaxed">
            {tagline}
          </p>

          {/* Category Filter Tabs: Freedom IT, AI Academy, Digital Marketing & SEO, Security & Digital Media */}
          <div
            className="mt-8 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none"
            role="tablist"
            aria-label="Certificate categories"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === 'All'
                  ? items.length
                  : items.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap border ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-400 shadow-md shadow-sky-500/30 font-semibold'
                      : 'bg-[#101222]/80 text-slate-400 border-slate-800 hover:border-sky-500/50 hover:text-slate-200'
                  }`}
                >
                  {cat} <span className="opacity-75 text-[11px] ml-1">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Grid of All Certificates (No cramped box, open layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((cert) => {
            const originalIndex = items.findIndex((i) => i.id === cert.id);
            return (
              <button
                key={cert.id}
                type="button"
                onClick={(e) => handleOpen(originalIndex, e)}
                className="text-left group relative rounded-2xl overflow-hidden p-3.5 bg-[#0d0e1b]/80 transition-all duration-300 hover:-translate-y-1.5 border border-slate-800/90 hover:border-sky-500/50 hover:shadow-[0_12px_32px_rgba(56,189,248,0.15)] focus-visible:ring-2 focus-visible:ring-sky-400 focus:outline-none flex flex-col justify-between"
                aria-label={`View full certificate: ${cert.title}`}
              >
                <div>
                  {/* Certificate Image Canvas */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#06070e] border border-slate-800">
                    <img
                      src={cert.image}
                      alt={cert.alt}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Category Pill Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#080914]/90 backdrop-blur-md border border-sky-500/40 text-[10px] sm:text-xs text-sky-300 font-semibold tracking-wide">
                      {cert.category}
                    </div>

                    {/* Expand icon on hover */}
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-[#080914]/80 backdrop-blur-md border border-sky-500/40 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#06070e]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Card Meta Content */}
                  <div className="pt-4 pb-2 px-1">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-light">
                      <span className="truncate max-w-[210px] font-medium text-slate-300">
                        {cert.issuer}
                      </span>
                      <span className="text-sky-400 text-[11px] font-mono flex-shrink-0 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {cert.year.length > 12 ? cert.year.split(' to ')[0] : cert.year}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-white leading-snug line-clamp-2 group-hover:text-sky-300 transition-colors mb-2">
                      {cert.title}
                    </h3>

                    {cert.studentId && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 mb-2">
                        <IdCard className="w-3 h-3" />
                        <span>ID: {cert.studentId}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: File Reference & Verification */}
                <div className="pt-2 px-1 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span
                    className="inline-flex items-center gap-1 truncate max-w-[200px] font-mono opacity-80"
                    title={cert.fileReference}
                  >
                    <FileText className="w-3 h-3 text-sky-400" />
                    <span className="truncate">{cert.fileReference}</span>
                  </span>
                  <span className="text-sky-400 font-medium">Click to inspect</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal via Portal */}
      {selectedCert &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate details: ${selectedCert.title}`}
            onClick={handleClose}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#040408]/95 backdrop-blur-xl animate-[fadeRise_0.2s_ease-out_forwards]"
          >
            {/* Top Bar Controls */}
            <div className="absolute top-5 right-5 sm:top-8 sm:right-8 z-30 flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 hidden sm:inline-block px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
                Press ESC or click anywhere to close
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                className="p-2.5 rounded-full bg-[#121324] hover:bg-[#1a1c34] text-slate-300 hover:text-white border border-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Close certificate lightbox modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#101222]/90 hover:bg-[#1a1c34] text-slate-300 hover:text-sky-400 border border-slate-700/80 backdrop-blur-md transition-all active:scale-95 shadow-xl"
              aria-label="Previous certificate"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#101222]/90 hover:bg-[#1a1c34] text-slate-300 hover:text-sky-400 border border-slate-700/80 backdrop-blur-md transition-all active:scale-95 shadow-xl"
              aria-label="Next certificate"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Dialog Content */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0c0d18] border border-sky-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-4 sm:p-7 flex flex-col items-center"
            >
              {/* High-Resolution Certificate Image */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#05050a] border border-slate-800 mb-6 shadow-2xl relative">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.alt}
                  width={1000}
                  height={700}
                  className="w-full h-full object-contain bg-[#08080f]"
                />
              </div>

              {/* Modal Metadata Header */}
              <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-semibold tracking-wider">
                      {selectedCert.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      {selectedCert.year}
                    </span>
                    {selectedCert.studentId && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                        <IdCard className="w-3.5 h-3.5" />
                        Student ID: {selectedCert.studentId}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {selectedCert.title}
                  </h3>
                  <p className="text-sm text-sky-400 font-medium mt-1">
                    Issued by: {selectedCert.issuer}
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end flex-shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono">
                    <FileText className="w-3.5 h-3.5 text-sky-400" />
                    <span>{selectedCert.fileReference}</span>
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1 font-mono">
                    Index {(selectedIndex ?? 0) + 1} of {items.length}
                  </span>
                </div>
              </div>

              {/* Verified Certificate Accreditation Box */}
              <div className="w-full mt-4 p-4 rounded-xl bg-[#121324]/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200 mb-0.5">
                    Verified Credential for Kazi Mukitul Islam
                  </p>
                  <p className="font-light leading-relaxed">
                    This credential confirms verified completion under curriculum standards authorized by {selectedCert.issuer}.
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
