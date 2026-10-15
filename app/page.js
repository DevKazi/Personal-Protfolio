import dynamic from 'next/dynamic';
import NavBar from '../components/NavBar.jsx';
import SectionAbout from '../components/SectionAbout.jsx';
import SectionServices from '../components/SectionServices.jsx';
import SectionCerts from '../components/SectionCerts.jsx';
import SectionContact from '../components/SectionContact.jsx';
import { portfolioData } from '../lib/data.js';

// Dynamically import 3D Canvas without SSR for maximum client performance
const Canvas3D = dynamic(() => import('../components/Canvas3D.jsx'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 pointer-events-none z-0 bg-[#050507]" />,
});

export default function Page() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative min-h-screen bg-[#050507] text-[#ece6d8] selection:bg-[#c9a24b] selection:text-[#050507] overflow-x-hidden">
      {/* Three.js / React Three Fiber / Drei Wireframe Canvas Backdrop */}
      <Canvas3D />

      {/* Fixed Glass Luxury Navigation Bar */}
      <NavBar />

      <main className="relative z-10">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-5 sm:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Glowing Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a24b]/15 border border-[#c9a24b]/30 text-xs font-semibold tracking-widest text-[#dfbf77] uppercase mb-6 shadow-[0_0_20px_rgba(201,162,75,0.25)]">
              <span>{portfolioData.hero.badge}</span>
            </div>

            {/* Main Editorial Hero Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6">
              {portfolioData.hero.titleFirst}{' '}
              <span className="bg-gradient-to-r from-sky-400 via-[#dfbf77] to-[#c9a24b] bg-clip-text text-transparent">
                {portfolioData.hero.titleHighlight}
              </span>{' '}
              {portfolioData.hero.titleLast}
            </h1>

            {/* Bio Description */}
            <p className="text-base sm:text-xl text-[#9a9486] font-light max-w-2xl mx-auto leading-relaxed mb-10">
              {portfolioData.hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={portfolioData.hero.ctaPrimary.href}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c9a24b] to-[#a88236] hover:from-[#d8b056] hover:to-[#b89141] text-[#050507] font-semibold text-sm sm:text-base tracking-wide shadow-lg shadow-[#c9a24b]/25 transition-all duration-200 active:scale-95"
              >
                {portfolioData.hero.ctaPrimary.label}
              </a>
              <a
                href={portfolioData.hero.ctaSecondary.href}
                className="px-8 py-3.5 rounded-xl bg-[#111222]/80 hover:bg-[#1a1b33] text-slate-200 border border-slate-700 hover:border-[#c9a24b] font-medium text-sm sm:text-base tracking-wide transition-all duration-200"
              >
                {portfolioData.hero.ctaSecondary.label}
              </a>
            </div>
          </div>
        </section>

        {/* About Section with Editorial Justified Layout & 4 Injected Stats */}
        <SectionAbout />

        {/* 6 Bespoke Services with 3D Tilt */}
        <SectionServices />

        {/* 10 Verified Credentials & Lightbox Grid */}
        <SectionCerts />

        {/* Contact Flow & Hostinger Referral Block */}
        <SectionContact />
      </main>

      {/* Semantic Footer */}
      <footer className="relative pt-16 pb-12 px-5 sm:px-8 border-t border-slate-800/80 z-10 text-xs sm:text-sm text-slate-400 bg-[#06070e]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={portfolioData.owner.logoImage}
              alt="DevKazi Logo"
              width={140}
              height={38}
              className="h-7 w-auto object-contain opacity-90"
            />
            <span className="text-slate-400">
              © {currentYear} {portfolioData.footer.copyrightName}. {portfolioData.footer.rights}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-[#c9a24b] transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-[#c9a24b] transition-colors">
              Services
            </a>
            <a href="#certificates" className="hover:text-[#c9a24b] transition-colors">
              Certificates
            </a>
            <a href="#contact" className="hover:text-[#c9a24b] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
