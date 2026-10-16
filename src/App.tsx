import React, { Suspense, lazy } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import AboutSection from './components/AboutSection.tsx';
import ServicesSection from './components/ServicesSection.tsx';
import CertificatesSection from './components/CertificatesSection.tsx';
import ContactSection from './components/ContactSection.tsx';
import Footer from './components/Footer.tsx';

// Dynamic lazy import for 3D Scene to keep initial page load ultra-fast
const Scene3D = lazy(() => import('./components/Scene3D.tsx'));

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050507] text-[#ece6d8] selection:bg-[#c9a24b] selection:text-[#050507] overflow-x-hidden">
      {/* 3D Background Canvas (fixed, z-index 0, pointer-events none) */}
      <Suspense
        fallback={
          <div
            className="fixed inset-0 pointer-events-none z-0 bg-[#050507]"
            aria-hidden="true"
          />
        }
      >
        <Scene3D />
      </Suspense>

      {/* Fixed Glass Navbar */}
      <Navbar />

      {/* Semantic Main Content Container */}
      <main className="relative z-10">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <CertificatesSection />
        <ContactSection />
      </main>

      {/* Semantic Footer */}
      <Footer />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
