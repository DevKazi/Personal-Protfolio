import './globals.css';
import { portfolioData } from '../lib/data.js';

export const metadata = {
  title: `${portfolioData.owner.brandName} | ${portfolioData.owner.name} – Web Developer & UI/UX Engineer`,
  description: portfolioData.owner.roleLine,
  keywords: [
    'Kazi Mukitul Islam',
    'DevKazi',
    'Senior Creative Web Developer',
    'UI/UX Engineer',
    'WordPress Expert',
    'Web Applications',
    'SEO & Digital Marketing',
    'AI Automation',
    'Freedom IT Institutions',
    'UY LAB',
    'Grameenphone Academy',
  ],
  authors: [{ name: portfolioData.owner.name }],
  creator: portfolioData.owner.name,
  openGraph: {
    title: `${portfolioData.owner.brandName} | ${portfolioData.owner.name}`,
    description: portfolioData.owner.roleLine,
    images: [{ url: portfolioData.owner.avatarImage, width: 800, height: 800, alt: portfolioData.owner.name }],
    type: 'profile',
    siteName: 'DevKazi Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${portfolioData.owner.brandName} | ${portfolioData.owner.name}`,
    description: portfolioData.owner.roleLine,
    images: [portfolioData.owner.avatarImage],
    creator: '@DevKazi',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://devkazi.com/#person',
        name: portfolioData.owner.name,
        alternateName: portfolioData.owner.brandName,
        jobTitle: 'Senior Creative Web Developer & UI/UX Engineer',
        description: portfolioData.owner.roleLine,
        image: portfolioData.owner.avatarImage,
        email: `mailto:${portfolioData.contact.email}`,
        telephone: portfolioData.contact.phone,
        sameAs: portfolioData.contact.socials.map((s) => s.url),
      },
      {
        '@type': 'WebSite',
        '@id': 'https://devkazi.com/#website',
        name: 'DevKazi Portfolio',
        publisher: { '@id': 'https://devkazi.com/#person' },
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth bg-[#050507] text-[#ece6d8]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#050507] text-[#ece6d8] antialiased selection:bg-[#c9a24b] selection:text-[#050507]">
        {children}
      </body>
    </html>
  );
}
