export interface StatItem {
  id: string;
  value: string;
  label: string;
  sublabel?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface CertificateItem {
  id: string;
  image: string;
  title: string;
  issuer: string;
  year: string;
  category: 'Freedom IT' | 'AI Academy' | 'Digital Marketing & SEO' | 'Security & Digital Media';
  fileReference: string;
  studentId?: string;
  alt: string;
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  ariaLabel: string;
}

export interface PortfolioData {
  owner: {
    name: string;
    brandName: string;
    monogram: string;
    logoImage: string;
    avatarImage: string;
    roleLine: string;
    shortBio: string;
  };
  navigation: {
    links: { name: string; href: string }[];
  };
  hero: {
    badge: string;
    titleFirst: string;
    titleHighlight: string;
    titleLast: string;
    description: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
  about: {
    badge: string;
    heading: string;
    subheading: string;
    paragraphs: string[];
    bioParagraph: string;
    profileImage: string;
    stats: StatItem[];
    socialPills: SocialLink[];
    skillCategories: SkillCategory[];
  };
  services: {
    heading: string;
    tagline: string;
    items: ServiceItem[];
  };
  certificates: {
    heading: string;
    tagline: string;
    categories: string[];
    items: CertificateItem[];
  };
  contact: {
    heading: string;
    tagline: string;
    email: string;
    phone: string;
    phoneDisplay: string;
    whatsappUrl: string;
    whatsappDisplay: string;
    socials: SocialLink[];
    hostinger?: {
      title: string;
      description: string;
      referralUrl: string;
      discountText: string;
    };
  };
  disclaimer: {
    title: string;
    text: string;
  };
  footer: {
    copyrightName: string;
    rights: string;
  };
}

export const portfolioData: PortfolioData = {
  owner: {
    name: 'Kazi Mukitul Islam',
    brandName: 'DevKazi',
    monogram: 'DevKazi',
    logoImage: '/images/logo.svg',
    avatarImage: '/images/profile.jpg',
    roleLine: 'Web Developer & Designer | WordPress Expert | Web Applications | SEO & Digital Marketing Strategist | AI-Driven Innovator | 4+ Years Expertise',
    shortBio: 'Specialist in custom WordPress theme engineering, high-performance web applications, technical SEO, and AI autonomous workflows.',
  },
  navigation: {
    links: [
      { name: 'About', href: '#about' },
      { name: 'Skills', href: '#skills' },
      { name: 'Services', href: '#services' },
      { name: 'Certificates', href: '#certificates' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  hero: {
    badge: 'SENIOR CREATIVE WEB DEVELOPER & AI SOLUTIONS ENGINEER',
    titleFirst: 'Crafting High-Performance',
    titleHighlight: 'Web Experiences',
    titleLast: '& Intelligent AI Systems',
    description:
      'Bridging creative visual design and complex technical execution with semantic HTML, modern CSS, JavaScript, WordPress theme customization, SEO, and AI workflow integration.',
    ctaPrimary: { label: 'Get in Touch', href: '#contact' },
    ctaSecondary: { label: 'Verified Certificates', href: '#certificates' },
  },
  about: {
    badge: 'ABOUT ME',
    heading: 'I’m Kazi Mukitul Islam',
    subheading: 'Web Developer & AI Solutions Engineer',
    paragraphs: [
      'I design and build websites that are clear, quick and easy to use. Over four years of intensive WordPress development, bespoke web applications, SEO and digital marketing campaigns sit behind every project I deliver.',
      'My workflow integrates the cutting edge of modern technology. I write clean code, develop custom themes, tune speed and security, and build smart workflows. Beyond design, I actively bridge the gap with AI, designing automated solutions, prompt scripts, and agent pipelines that boost visibility and trust.',
      'Every site I build is engineered to load rapidly, scale seamlessly, and achieve real results on search engines. When you work with me, you get a developer and strategic partner who handles the details—from deployment to audience growth—to set you up for success.',
    ],
    bioParagraph:
      'I design and build websites that are clear, quick and easy to use. Over four years of intensive WordPress development, bespoke web applications, SEO and digital marketing campaigns sit behind every project I deliver. My workflow integrates the cutting edge of modern technology: writing clean code, developing custom themes, tuning speed and security, and building smart automated workflows. Beyond design, I actively bridge the gap with AI, designing automated solutions, prompt scripts, and agent pipelines that boost visibility and trust. Every site I build is engineered to load rapidly, scale seamlessly, and achieve real results on search engines.',
    profileImage: '/images/profile.jpg',
    stats: [
      { id: 'web-exp', value: '4+ Years', label: 'Active Web Dev Experience' },
      { id: 'web-apps', value: '50+', label: 'Websites & Applications Built' },
      { id: 'ai-workflows', value: '20+', label: 'AI Workflows & Automations Crafting' },
      { id: 'certifications', value: '10+', label: 'Specialized Certifications Completed' },
    ],
    socialPills: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/devkazi',
        handle: 'linkedin.com/in/devkazi',
        ariaLabel: 'Connect with Kazi Mukitul Islam on LinkedIn',
      },
      {
        name: 'Facebook',
        url: 'https://facebook.com/DevKazi2k80',
        handle: 'facebook.com/DevKazi2k80',
        ariaLabel: 'Follow Kazi Mukitul Islam on Facebook',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/DevKazi',
        handle: 'github.com/DevKazi',
        ariaLabel: 'View Kazi Mukitul Islam projects on GitHub',
      },
    ],
    skillCategories: [
      {
        category: 'Website Design & Coding',
        items: ['HTML5 Semantic Markup', 'CSS3 Modern Styling', 'JavaScript (ES6+)', 'jQuery Interactivity', 'Bootstrap 5', 'Tailwind CSS', 'Responsive Grid & Flexbox'],
      },
      {
        category: 'CMS & Theme Customization',
        items: ['WordPress Theme Customization', 'Child Theme Architecture', 'Elementor Pro Builder', 'WooCommerce Setup', 'Custom Post Types & Hooks', 'Page Speed Optimization'],
      },
      {
        category: 'AI & Prompt Engineering',
        items: ['AI Workflows & Agents', 'GenAI Prompt Engineering', 'AI-Pro Aptitude Strategies', 'AI-Interview Simulator', 'Personal Branding in AI Era', 'Autonomous Automation'],
      },
      {
        category: 'Digital Marketing, SEO & Security',
        items: ['SEO with Google AdSense', 'Technical On-Page & Schema SEO', 'Core Web Vitals Optimization', 'Cyber Hygiene Training (Google.org)', 'CPA & Affiliate Marketing'],
      },
    ],
  },
  services: {
    heading: 'Bespoke Services & Capabilities',
    tagline: 'Quietly confident engineering tailored for demanding standards.',
    items: [
      {
        id: 'wordpress-dev',
        title: 'WordPress Development',
        description: 'Bespoke theme tailoring, child theme development, Elementor Pro architecture, WooCommerce integrations, and sub-second page speed optimizations.',
        iconName: 'Layout',
      },
      {
        id: 'web-design-branding',
        title: 'Web Design & Branding',
        description: 'Pixel-perfect digital brand identity, responsive layouts, luxury dark interfaces, and intuitive UX design systems tailored for your business.',
        iconName: 'Sparkles',
      },
      {
        id: 'web-applications',
        title: 'Web Applications',
        description: 'Clean semantic frontend architecture using HTML5, CSS3, modern JavaScript, React, and Bootstrap for robust, high-performance web applications.',
        iconName: 'Code',
      },
      {
        id: 'seo-marketing',
        title: 'SEO & Digital Marketing',
        description: 'Comprehensive search engine optimization, Google AdSense monetization strategy, schema structured data, and high-converting marketing funnels.',
        iconName: 'TrendingUp',
      },
      {
        id: 'ai-automation',
        title: 'AI Automation',
        description: 'Autonomous AI workflows, custom prompt engineering, agentic pipelines, and intelligent integrations to dramatically streamline business operations.',
        iconName: 'Cpu',
      },
      {
        id: 'cpa-affiliate',
        title: 'CPA & Affiliate Marketing',
        description: 'High-converting affiliate landing pages, tracking setups, conversion rate optimization, and strategic performance marketing architecture.',
        iconName: 'Shield',
      },
    ],
  },
  certificates: {
    heading: 'Certificate & Achievement',
    tagline: '10 verified industry credentials across Freedom IT, AI Academy, Digital Marketing & SEO, and Security.',
    categories: ['All', 'Freedom IT', 'AI Academy', 'Digital Marketing & SEO', 'Security & Digital Media'],
    items: [
      // 1. Freedom IT Institutions - Web Development Masterclass
      {
        id: 'cert-1',
        image: '/certs/cert-1.jpg',
        title: 'Web Development Masterclass - Complete Course',
        issuer: 'Freedom IT Institutions',
        year: '14/09/2025 to 22/01/2026',
        category: 'Freedom IT',
        fileReference: 'FIT_WDD Web Development Certificate.jpg',
        alt: 'Certificate for Web Development Masterclass from Freedom IT Institutions awarded to Kazi Mukitul Islam',
      },
      // 2. Freedom IT Institutions - WordPress Theme Customization
      {
        id: 'cert-2',
        image: '/certs/cert-2.jpg',
        title: 'WordPress Theme Customization',
        issuer: 'Freedom IT Institutions',
        year: '17/08/2025 to 18/09/2025',
        category: 'Freedom IT',
        fileReference: 'FIT_WDD Scholership Certificate.jpg',
        alt: 'Certificate for WordPress Theme Customization from Freedom IT Institutions awarded to Kazi Mukitul Islam',
      },
      // 3. UY LAB - SEO with Google AdSense (Online)
      {
        id: 'cert-3',
        image: '/certs/cert-9.jpg',
        title: 'SEO with Google AdSense (Online)',
        issuer: 'UY LAB',
        year: '22/01/2025 to 20/04/2025 (Issued: 01 May, 2025)',
        category: 'Digital Marketing & SEO',
        studentId: 'SEO-0501010001',
        fileReference: 'SEO UY Labjpg.jpg',
        alt: 'Certificate for SEO with Google AdSense from UY LAB awarded to Kazi Mukitul Islam',
      },
      // 4. Grameenphone Academy - AI Workflows & Agents
      {
        id: 'cert-4',
        image: '/certs/cert-3.jpg',
        title: 'AI Workflows & Agents',
        issuer: 'Grameenphone Academy',
        year: '2026-07-28',
        category: 'AI Academy',
        fileReference: 'certificate-ai-workflows-and-agents_page-0001.jpg',
        alt: 'Certificate for AI Workflows & Agents from Grameenphone Academy awarded to Kazi Mukitul Islam',
      },
      // 5. Grameenphone Academy - GenAI and Prompt Engineering
      {
        id: 'cert-5',
        image: '/certs/cert-4.jpg',
        title: 'GenAI and Prompt Engineering',
        issuer: 'Grameenphone Academy',
        year: '2026-07-25',
        category: 'AI Academy',
        fileReference: 'certificate-genai-and-prompt-engineering_page-0001.jpg',
        alt: 'Certificate for GenAI and Prompt Engineering from Grameenphone Academy awarded to Kazi Mukitul Islam',
      },
      // 6. Grameenphone Academy - AI-Pro Aptitude Hacks
      {
        id: 'cert-6',
        image: '/certs/cert-5.jpg',
        title: 'AI-Pro Aptitude Hacks',
        issuer: 'Grameenphone Academy',
        year: '2026-07-23',
        category: 'AI Academy',
        fileReference: 'certificate-ai-pro-aptitude-hacks_page-0001.jpg',
        alt: 'Certificate for AI-Pro Aptitude Hacks from Grameenphone Academy awarded to Kazi Mukitul Islam',
      },
      // 7. Grameenphone Academy - Personal Branding in AI Era
      {
        id: 'cert-7',
        image: '/certs/cert-6.jpg',
        title: 'Personal Branding in AI Era',
        issuer: 'Grameenphone Academy',
        year: '2026-07-22',
        category: 'AI Academy',
        fileReference: 'certificate-personal-branding-in-the-ai-era_page-0001.jpg',
        alt: 'Certificate for Personal Branding in AI Era from Grameenphone Academy awarded to Kazi Mukitul Islam',
      },
      // 8. Grameenphone Academy - AI-Interview Simulator
      {
        id: 'cert-8',
        image: '/certs/cert-7.jpg',
        title: 'AI-Interview Simulator',
        issuer: 'Grameenphone Academy',
        year: '2026-07-29',
        category: 'AI Academy',
        fileReference: 'certificate-ai-interview-simulator_page-0001.jpg',
        alt: 'Certificate for AI-Interview Simulator from Grameenphone Academy awarded to Kazi Mukitul Islam',
      },
      // 9. AI Summit Bangladesh - AI Academy Bangladesh
      {
        id: 'cert-9',
        image: '/certs/cert-8.jpg',
        title: 'AI Summit Bangladesh',
        issuer: 'AI Academy Bangladesh',
        year: '28th to 31st March 2026',
        category: 'AI Academy',
        fileReference: 'Certificate of AI Academy_page-0001_2.jpg',
        alt: 'Certificate of Attendance for AI Summit Bangladesh organized by AI Academy Bangladesh awarded to Kazi Mukitul Islam',
      },
      // 10. Cyber Hygiene Training - The Asia Foundation & SAJIDA Foundation (Supported by Google.org)
      {
        id: 'cert-10',
        image: '/certs/cert-10.jpg',
        title: 'Cyber Hygiene Training',
        issuer: 'The Asia Foundation & SAJIDA Foundation',
        year: '16 July, 2025',
        category: 'Security & Digital Media',
        fileReference: 'Cyber Security.jpg',
        alt: 'Certificate for Cyber Hygiene Training jointly organized by The Asia Foundation & SAJIDA Foundation supported by Google.org',
      },
    ],
  },
  contact: {
    heading: "Let's work together",
    tagline: 'Available for WordPress theme development, bespoke web coding, SEO, and AI workflow consultancies.',
    email: 'kazimukitulislam@gmail.com',
    phone: '+8801715298385',
    phoneDisplay: '+880 1715 298385',
    whatsappUrl: 'https://wa.me/8801715298385',
    whatsappDisplay: '+880 1715-298385',
    socials: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/devkazi',
        handle: 'linkedin.com/in/devkazi',
        ariaLabel: 'Visit Kazi Mukitul Islam on LinkedIn',
      },
      {
        name: 'Facebook',
        url: 'https://facebook.com/DevKazi2k80',
        handle: 'facebook.com/DevKazi2k80',
        ariaLabel: 'Visit Kazi Mukitul Islam on Facebook',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/DevKazi',
        handle: 'github.com/DevKazi',
        ariaLabel: 'View Kazi Mukitul Islam repositories on GitHub',
      },
    ],
    hostinger: {
      title: 'Recommended Web Hosting Partner',
      description: 'Deploy lightning-fast WordPress and custom web apps with Hostinger cloud hosting, optimized for speed and 99.9% uptime.',
      referralUrl: 'https://www.hostg.xyz/SHfnW',
      discountText: 'Special 20% discount applied via DevKazi verified partner link.',
    },
  },
  disclaimer: {
    title: 'Professional Verification & Ethics Disclaimer',
    text: 'All course titles, credential IDs, and organizational affiliations displayed represent verified training and academic achievements of Kazi Mukitul Islam. Institutional marks and partner logos remain the intellectual property of their respective issuers.',
  },
  footer: {
    copyrightName: 'DevKazi (Kazi Mukitul Islam)',
    rights: 'All rights reserved. Built with precision and dark luxury aesthetic.',
  },
};
