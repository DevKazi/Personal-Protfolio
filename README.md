# Kazi Mukitul Islam — Dark Luxury Developer Portfolio

A dark luxury, 3D-styled personal developer portfolio website crafted for **Kazi Mukitul Islam** (Web Developer & Designer | WordPress Expert | Web Applications | SEO & Digital Marketing Strategist | AI-Driven Innovator).

Built with React 19, Vite, React Three Fiber (`@react-three/fiber`), `@react-three/drei`, Three.js, and Tailwind CSS.

---

## Design System & Palette

- **Background:** `#050507` (Deep Obsidian Void)
- **Text Primary:** `#ece6d8` (Champagne Cream)
- **Text Muted:** `#9a9486` (Warm Mineral)
- **Gold Accent:** `#c9a24b` (Classic Polished Gold)
- **Gold Borders:** `rgba(201, 162, 75, 0.22)`
- **Glass Cards:** `rgba(18, 18, 24, 0.62)` with 12px backdrop blur
- **Headings Font:** *Cormorant Garamond* (400, 600)
- **Body Font:** *Manrope* (300, 400, 500, 600, 700)
- **3D Canvas:** Full-screen interactive Three.js canvas featuring a distorted metallic gold icosahedron, floating wireframe shell, warm/cool dual point lights, and dynamic starfield.

---

## File Tree

```text
kazi-portfolio/
├── .env.example
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── lib/
│   └── data.js                     # Centralized content file (ES module)
├── public/
│   └── certs/
│       ├── cert-1.jpg              # Advanced WordPress Theme & Plugin Architecture
│       ├── cert-2.jpg              # Modern Front-End & React Architecture
│       ├── cert-3.jpg              # Technical SEO & Search Engine Optimization
│       ├── cert-4.jpg              # Elementor Pro Site Architecture & Speed
│       ├── cert-5.jpg              # AI Automation & Applied Prompt Engineering
│       ├── cert-6.jpg              # Digital Marketing & Conversion Funnels
│       ├── cert-7.jpg              # Banking IT Infrastructure & Branch Network Rollout
│       ├── cert-8.jpg              # AML & KYC Regulatory Compliance Certification
│       ├── cert-9.jpg              # Web Application Security & Server Hardening
│       └── cert-10.jpg             # Performance CPA & Affiliate Systems
├── scripts/
│   └── generate-certs.ts           # Sharp-based generator for high-res certificates
└── src/
    ├── App.tsx                     # Main page shell connecting all components
    ├── index.css                   # Global Tailwind CSS and design tokens
    ├── main.tsx                    # React DOM entry point
    ├── components/
    │   ├── Scene3D.tsx             # R3F distorted metallic icosahedron & stars
    │   ├── Tilt.tsx                # Reusable 3D perspective mouse-tilt wrapper
    │   ├── Navbar.tsx              # Fixed glass navbar with gold KMI monogram
    │   ├── Hero.tsx                # Serif H1, role line, tagline & dual CTA
    │   ├── AboutSection.tsx        # 3 paragraphs, 4 tilt stat cards, skill chips
    │   ├── ServicesSection.tsx     # 6 interactive 3D tilt glass service cards
    │   ├── CertificatesSection.tsx # 10 4:3 credential cards & full-screen lightbox
    │   ├── ContactSection.tsx      # Email, WhatsApp, social links, Hostinger card
    │   └── Footer.tsx              # Copyright notice & anchor links
    └── lib/
        ├── data.ts                 # Typed portfolio content data source
        ├── portfolio-utils.ts      # Pure tilt math, navigation, and validation logic
        └── portfolio-utils.test.ts # Native node:test unit tests
```

---

## Local Development Setup

1. **Clone & Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

3. **Run Unit Tests:**
   ```bash
   node --test src/lib/portfolio-utils.test.ts
   ```

4. **Regenerate Certificates (Optional):**
   ```bash
   npx tsx scripts/generate-certs.ts
   ```

---

## Editing Portfolio Content

All text, phone numbers, email addresses, social profile links, Hostinger affiliate URLs, statistics, services, and certificate metadata are configured in **one single file**:

- `lib/data.js` (and mirrored in `src/lib/data.ts`)

You can edit any copy or link without modifying React components.

---

## Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit of Kazi Mukitul Islam portfolio"
   git push origin main
   ```

2. Go to [Vercel Dashboard](https://vercel.com/) and click **"Add New..." > "Project"**.
3. Import your GitHub repository.
4. Keep the default settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **"Deploy"**. Your dark luxury portfolio will be live worldwide on Vercel's Edge Network with global CDN and SSL.
