import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { portfolioData } from '../src/lib/data.ts';

const certDir = path.resolve('public', 'certs');
const imgDir = path.resolve('public', 'images');

if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
}
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function generateCerts() {
  const items = portfolioData.certificates.items;

  for (let i = 0; i < items.length; i++) {
    const cert = items[i];
    const index = i + 1;
    const certNumber = `CRED-${String(index).padStart(4, '0')}`;
    const safeTitle = escapeXml(cert.title);
    const safeIssuer = escapeXml(cert.issuer);
    const safeIssuerUpper = escapeXml(cert.issuer.toUpperCase());
    const safeYear = escapeXml(cert.year);
    const safeCategory = escapeXml(cert.category.toUpperCase());
    const safeFileRef = escapeXml(cert.fileReference);
    const safeStudentId = cert.studentId ? escapeXml(cert.studentId) : null;

    // Palette per category: Freedom IT (Gold/Amber), AI Academy (Cyan/Electric Blue), Digital Marketing & SEO (Emerald/Teal), Security (Violet/Indigo)
    let primaryGrad = '<stop offset="0%" stop-color="#dfbf77" /><stop offset="50%" stop-color="#fff1d0" /><stop offset="100%" stop-color="#c9a24b" />';
    let accentBorder = '#c9a24b';
    let sealColor = '#c9a24b';

    if (cert.category === 'AI Academy') {
      primaryGrad = '<stop offset="0%" stop-color="#38bdf8" /><stop offset="50%" stop-color="#bae6fd" /><stop offset="100%" stop-color="#0284c7" />';
      accentBorder = '#38bdf8';
      sealColor = '#38bdf8';
    } else if (cert.category === 'Digital Marketing & SEO') {
      primaryGrad = '<stop offset="0%" stop-color="#34d399" /><stop offset="50%" stop-color="#a7f3d0" /><stop offset="100%" stop-color="#059669" />';
      accentBorder = '#34d399';
      sealColor = '#34d399';
    } else if (cert.category === 'Security & Digital Media') {
      primaryGrad = '<stop offset="0%" stop-color="#a78bfa" /><stop offset="50%" stop-color="#ddd6fe" /><stop offset="100%" stop-color="#7c3aed" />';
      accentBorder = '#a78bfa';
      sealColor = '#a78bfa';
    }

    const svg = `
    <svg width="1000" height="700" viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stop-color="#14141e" />
          <stop offset="60%" stop-color="#0b0b12" />
          <stop offset="100%" stop-color="#050508" />
        </radialGradient>
        <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          ${primaryGrad}
        </linearGradient>
        <pattern id="guilloche" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="18" fill="none" stroke="${accentBorder}" stroke-width="0.3" opacity="0.12" />
          <circle cx="20" cy="20" r="10" fill="none" stroke="${accentBorder}" stroke-width="0.2" opacity="0.08" />
        </pattern>
      </defs>

      <!-- Background Canvas -->
      <rect width="1000" height="700" fill="url(#bg)" />
      <rect width="1000" height="700" fill="url(#guilloche)" />

      <!-- Ornate Borders -->
      <rect x="25" y="25" width="950" height="650" fill="none" stroke="url(#primaryGrad)" stroke-width="2.5" rx="10" opacity="0.85" />
      <rect x="35" y="35" width="930" height="630" fill="none" stroke="${accentBorder}" stroke-width="1" stroke-dasharray="8,6" rx="6" opacity="0.4" />
      <rect x="42" y="42" width="916" height="616" fill="none" stroke="url(#primaryGrad)" stroke-width="0.5" opacity="0.3" />

      <!-- Corner Ornaments -->
      <g stroke="url(#primaryGrad)" stroke-width="1.5" fill="none" opacity="0.8">
        <path d="M 45 65 L 65 65 L 65 45" />
        <circle cx="65" cy="65" r="3" fill="${accentBorder}" />
        <path d="M 955 65 L 935 65 L 935 45" />
        <circle cx="935" cy="65" r="3" fill="${accentBorder}" />
        <path d="M 45 635 L 65 635 L 65 655" />
        <circle cx="65" cy="635" r="3" fill="${accentBorder}" />
        <path d="M 955 635 L 935 635 L 935 655" />
        <circle cx="935" cy="635" r="3" fill="${accentBorder}" />
      </g>

      <!-- Issuer Header Bar -->
      <g transform="translate(500, 95)" text-anchor="middle">
        <text font-family="Georgia, serif" font-size="13" font-weight="600" fill="url(#primaryGrad)" letter-spacing="4">
          ${safeIssuerUpper}
        </text>
        <line x1="-180" y1="14" x2="180" y2="14" stroke="url(#primaryGrad)" stroke-width="1" opacity="0.6" />
      </g>

      <!-- Certificate Type Banner -->
      <g transform="translate(500, 150)" text-anchor="middle">
        <text font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#ffffff" letter-spacing="6">
          CERTIFICATE OF ACHIEVEMENT
        </text>
      </g>

      <!-- Category Ribbon -->
      <g transform="translate(500, 185)" text-anchor="middle">
        <rect x="-160" y="-14" width="320" height="28" rx="14" fill="#14141e" stroke="url(#primaryGrad)" stroke-width="1" opacity="0.85" />
        <text y="5" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="bold" fill="url(#primaryGrad)" letter-spacing="2.5">
          ${safeCategory}
        </text>
      </g>

      <!-- Recipient Presentation -->
      <g transform="translate(500, 240)" text-anchor="middle">
        <text font-family="Georgia, serif" font-style="italic" font-size="15" fill="#c5bea9">
          This is proudly and formally conferred to
        </text>
        <text y="48" font-family="Georgia, serif" font-size="34" font-weight="bold" fill="url(#primaryGrad)" letter-spacing="2">
          KAZI MUKITUL ISLAM
        </text>
        <line x1="-160" y1="62" x2="160" y2="62" stroke="url(#primaryGrad)" stroke-width="1.2" opacity="0.6" />
      </g>

      <!-- Course / Program Title -->
      <g transform="translate(500, 345)" text-anchor="middle">
        <text font-family="Georgia, serif" font-style="italic" font-size="14" fill="#a09a8a">
          for successful and verified completion of
        </text>
        <text y="36" font-family="Georgia, serif" font-size="22" font-weight="600" fill="#ffffff" letter-spacing="0.5">
          ${safeTitle}
        </text>
        ${safeStudentId ? `<text y="64" font-family="monospace" font-size="13" font-weight="bold" fill="url(#primaryGrad)">Student ID: ${safeStudentId}</text>` : ''}
      </g>

      <!-- Verification Seal -->
      <g transform="translate(500, 485)">
        <circle cx="0" cy="0" r="48" fill="#111119" stroke="url(#primaryGrad)" stroke-width="2.5" />
        <circle cx="0" cy="0" r="42" fill="none" stroke="${accentBorder}" stroke-width="1" stroke-dasharray="4,3" opacity="0.6" />
        <text y="-8" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="bold" fill="url(#primaryGrad)" letter-spacing="2">VERIFIED</text>
        <text y="8" text-anchor="middle" font-family="Georgia, serif" font-size="16" font-weight="bold" fill="#ffffff">★ ★ ★</text>
        <text y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" font-weight="600" fill="#9e988a" letter-spacing="1.5">CREDENTIAL</text>
      </g>

      <!-- Footer Info: Signatures, Dates, Document ID -->
      <g transform="translate(180, 580)" text-anchor="center">
        <line x1="0" y1="0" x2="200" y2="0" stroke="url(#primaryGrad)" stroke-width="1" opacity="0.5" />
        <text x="100" y="20" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="bold" fill="#ffffff">AUTHORIZED ISSUER</text>
        <text x="100" y="38" text-anchor="middle" font-family="Georgia, serif" font-size="11" font-style="italic" fill="#a09a8a">${safeIssuer.slice(0, 32)}</text>
      </g>

      <g transform="translate(620, 580)" text-anchor="center">
        <line x1="0" y1="0" x2="200" y2="0" stroke="url(#primaryGrad)" stroke-width="1" opacity="0.5" />
        <text x="100" y="20" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="bold" fill="#ffffff">TENURE &amp; DATE</text>
        <text x="100" y="38" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#c5bea9">${safeYear}</text>
      </g>

      <!-- Bottom Metadata Reference Tag -->
      <g transform="translate(500, 638)" text-anchor="middle">
        <text y="0" font-family="monospace" font-size="11" font-weight="bold" fill="url(#primaryGrad)">${certNumber}</text>
        <text y="18" font-family="system-ui, -apple-system, sans-serif" font-size="10" fill="#7a756b">Ref: ${safeFileRef}</text>
      </g>
    </svg>
    `;

    const outputPath = path.resolve(certDir, `cert-${index}.jpg`);
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 92 })
      .toFile(outputPath);
    console.log(`Generated cert-${index}.jpg (${cert.title})`);
  }

  // 1. Generate DevKazi Official Brand Logo (matching exact user brief):
  // "The Dev Kazi logo features a modern, tech-focused typographic design set against a dark background.
  // The brand name is visually separated by color, with 'Dev' in bright white and 'Kazi' in a gradient light blue.
  // A white, multi-pointed starburst accentuates the center of the letter 'K'.
  // Additionally, the dot above the letter 'i' is replaced by a blue circular emblem containing the code bracket symbol < />,
  // emphasizing programming and development expertise.
  // Below the main text, a clean, widely spaced tagline reads 'WEB DEVELOPER & DIGITAL CREATOR,' framed by horizontal lines on either side."
  const devKaziLogoSvg = `
  <svg width="340" height="90" viewBox="0 0 340 90" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="kazi-blue" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="100%" stop-color="#0ea5e9" />
      </linearGradient>
      <linearGradient id="circle-blue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0284c7" />
        <stop offset="100%" stop-color="#38bdf8" />
      </linearGradient>
      <filter id="star-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- Main Typography Group -->
    <g transform="translate(16, 44)">
      <!-- "Dev" in bright white -->
      <text x="0" y="0" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="36" font-weight="800" fill="#ffffff" letter-spacing="-0.5">Dev</text>
      
      <!-- "Kazi" in gradient light blue -->
      <g transform="translate(68, 0)">
        <!-- Letter K -->
        <text x="0" y="0" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="36" font-weight="800" fill="url(#kazi-blue)" letter-spacing="-0.5">K</text>
        
        <!-- Multi-pointed starburst on letter K junction (approx x=12, y=-16) -->
        <g transform="translate(12, -16)" filter="url(#star-glow)">
          <path d="M 0 -8 L 1.8 -2.2 L 8 0 L 1.8 2.2 L 0 8 L -1.8 2.2 L -8 0 L -1.8 -2.2 Z" fill="#ffffff" />
          <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
        </g>

        <!-- "az" letters -->
        <text x="26" y="0" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="36" font-weight="800" fill="url(#kazi-blue)" letter-spacing="-0.5">az</text>

        <!-- Letter "i" body without default dot -->
        <path d="M 68 -22 L 76 -22 L 76 0 L 68 0 Z" fill="url(#kazi-blue)" />

        <!-- Circular emblem replacing the dot of 'i' with code bracket < /> symbol -->
        <g transform="translate(72, -31)">
          <circle cx="0" cy="0" r="7.5" fill="url(#circle-blue)" />
          <!-- Code bracket symbol < / > in white -->
          <path d="M -3.5 -2.5 L -5.5 0 L -3.5 2.5" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 3.5 -2.5 L 5.5 0 L 3.5 2.5" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
          <line x1="-1" y1="3" x2="1" y2="-3" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" />
        </g>
      </g>
    </g>

    <!-- Tagline Group framed by horizontal lines: "WEB DEVELOPER & DIGITAL CREATOR" -->
    <g transform="translate(16, 68)">
      <line x1="0" y1="-4" x2="32" y2="-4" stroke="#38bdf8" stroke-width="1" opacity="0.75" />
      <text x="40" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="8.5" font-weight="600" fill="#94a3b8" letter-spacing="3.2">WEB DEVELOPER &amp; DIGITAL CREATOR</text>
      <line x1="272" y1="-4" x2="304" y2="-4" stroke="#38bdf8" stroke-width="1" opacity="0.75" />
    </g>
  </svg>
  `;

  fs.writeFileSync(path.resolve(imgDir, 'logo.svg'), devKaziLogoSvg.trim());
  console.log('Generated DevKazi brand logo.svg');

  // 2. Generate Professional Portrait Graphic for Kazi Mukitul Islam matching the uploaded photo:
  // - Man with glasses, groomed beard and mustache
  // - Tailored navy suit jacket, light blue dress shirt
  // - Cuff-adjusting pose in three-quarter view
  // - Black studio background with directional studio lighting
  const portraitSvg = `
  <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Deep Obsidian Studio Background -->
      <radialGradient id="studio-bg" cx="45%" cy="35%" r="70%">
        <stop offset="0%" stop-color="#12131c" />
        <stop offset="55%" stop-color="#08080d" />
        <stop offset="100%" stop-color="#020204" />
      </radialGradient>

      <!-- Key & Rim Lighting Gradients -->
      <linearGradient id="rim-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.4" />
        <stop offset="50%" stop-color="#818cf8" stop-opacity="0.2" />
        <stop offset="100%" stop-color="transparent" />
      </linearGradient>

      <linearGradient id="suit-navy" x1="20%" y1="10%" x2="80%" y2="90%">
        <stop offset="0%" stop-color="#24304f" />
        <stop offset="40%" stop-color="#182238" />
        <stop offset="100%" stop-color="#0d1422" />
      </linearGradient>

      <linearGradient id="suit-lapel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2a375a" />
        <stop offset="100%" stop-color="#141a2c" />
      </linearGradient>

      <linearGradient id="shirt-blue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#dbeafe" />
        <stop offset="60%" stop-color="#bfdbfe" />
        <stop offset="100%" stop-color="#93c5fd" />
      </linearGradient>

      <linearGradient id="skin-tone" x1="30%" y1="0%" x2="70%" y2="100%">
        <stop offset="0%" stop-color="#dca578" />
        <stop offset="50%" stop-color="#c58c60" />
        <stop offset="100%" stop-color="#9d673f" />
      </linearGradient>

      <linearGradient id="hair-tone" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2c2826" />
        <stop offset="50%" stop-color="#1a1817" />
        <stop offset="100%" stop-color="#0d0c0b" />
      </linearGradient>

      <!-- Glowing border gradient -->
      <linearGradient id="glow-border" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="50%" stop-color="#818cf8" />
        <stop offset="100%" stop-color="#c084fc" />
      </linearGradient>
    </defs>

    <!-- Black Studio Background -->
    <rect width="800" height="800" fill="url(#studio-bg)" />

    <!-- Ambient Studio Spotlight Aura behind subject -->
    <circle cx="390" cy="340" r="260" fill="url(#rim-cyan)" />

    <!-- Main Portrait Articulation -->
    <g transform="translate(0, 0)">
      <!-- Torso / Navy Blazer Shoulders (Three-quarter angle) -->
      <!-- Left shoulder (back) & Right broad chest -->
      <path d="M 170 800 L 170 600 C 180 500, 240 450, 310 430 L 490 430 C 580 460, 680 520, 710 650 L 710 800 Z" fill="url(#suit-navy)" />

      <!-- Left Arm adjusting sleeve/cuff (raised arm pose) -->
      <path d="M 170 620 C 140 600, 150 510, 190 460 C 230 480, 240 550, 230 630 Z" fill="#1b253d" />
      <!-- Left Forearm angled upward toward cuff -->
      <path d="M 180 540 C 180 470, 200 440, 220 420 L 255 450 C 235 480, 220 530, 210 570 Z" fill="#161f33" />
      <!-- Left Hand / Fingers grasping cuff -->
      <ellipse cx="232" cy="425" rx="18" ry="24" fill="url(#skin-tone)" transform="rotate(-20, 232, 425)" />
      <!-- Shirt cuff visible in light blue -->
      <rect x="235" y="440" width="28" height="14" rx="3" fill="url(#shirt-blue)" transform="rotate(-15, 245, 445)" stroke="#93c5fd" stroke-width="0.8" />
      <!-- Blazer sleeve cuff button details -->
      <circle cx="230" cy="460" r="2.5" fill="#0d1422" stroke="#475569" stroke-width="0.8" />
      <circle cx="234" cy="470" r="2.5" fill="#0d1422" stroke="#475569" stroke-width="0.8" />
      <circle cx="238" cy="480" r="2.5" fill="#0d1422" stroke="#475569" stroke-width="0.8" />

      <!-- Right Arm and Hand adjusting the cuff -->
      <path d="M 280 750 C 250 670, 260 580, 280 520 C 310 520, 330 580, 330 680 Z" fill="#151d2e" />
      <ellipse cx="265" cy="510" rx="20" ry="26" fill="url(#skin-tone)" transform="rotate(35, 265, 510)" />

      <!-- Crisp Light Blue Collared Dress Shirt (V-neck opening) -->
      <polygon points="350,430 450,430 430,570 370,570" fill="url(#shirt-blue)" />
      <!-- Shirt Collar Left -->
      <polygon points="350,420 395,455 375,490 340,435" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1" />
      <!-- Shirt Collar Right -->
      <polygon points="450,420 405,455 425,490 460,435" fill="#e0f2fe" stroke="#bfdbfe" stroke-width="1" />
      <!-- Lanyard around neck with badge -->
      <path d="M 380 460 Q 400 580 405 680" stroke="#0f172a" stroke-width="7" fill="none" />
      <path d="M 380 460 Q 400 580 405 680" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="8,4" fill="none" opacity="0.7" />
      <!-- ID Badge card partial view -->
      <rect x="390" y="670" width="30" height="42" rx="3" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
      <rect x="395" y="675" width="20" height="6" fill="#0284c7" />

      <!-- Suit Blazer Lapels (Left and Right) -->
      <polygon points="310,430 380,440 375,610 320,530" fill="url(#suit-lapel)" stroke="#334155" stroke-width="1.2" />
      <polygon points="490,430 420,440 425,610 480,530" fill="url(#suit-lapel)" stroke="#334155" stroke-width="1.2" />

      <!-- Neck & Throat -->
      <path d="M 360 410 L 360 350 C 370 330, 430 330, 440 350 L 440 410 Z" fill="url(#skin-tone)" />

      <!-- Head Contour (Three-quarter profile looking right/off-camera) -->
      <ellipse cx="405" cy="270" rx="88" ry="105" fill="url(#skin-tone)" />

      <!-- Hairline and Professional Short Dark Hair -->
      <path d="M 315 260 C 310 180, 360 145, 435 150 C 490 155, 505 190, 500 240 C 480 200, 450 185, 410 190 C 370 195, 335 220, 315 260 Z" fill="url(#hair-tone)" />
      <!-- Sideburns and Temples -->
      <path d="M 320 260 L 335 285 L 340 260 Z" fill="url(#hair-tone)" />

      <!-- Dark-Rimmed Rectangular Glasses -->
      <g stroke="#18181b" stroke-width="3.5" fill="none">
        <!-- Left Frame -->
        <rect x="345" y="235" width="46" height="28" rx="6" fill="rgba(255,255,255,0.06)" />
        <!-- Right Frame (three-quarter perspective) -->
        <rect x="405" y="235" width="50" height="28" rx="6" fill="rgba(255,255,255,0.06)" />
        <!-- Bridge -->
        <path d="M 391 247 Q 398 243 405 247" />
        <!-- Left Arm/Temple piece -->
        <line x1="345" y1="244" x2="325" y2="242" stroke-width="3" />
      </g>
      <!-- Eyes behind lenses -->
      <ellipse cx="368" cy="249" rx="6" ry="4" fill="#261c14" />
      <ellipse cx="430" cy="249" rx="7" ry="4.5" fill="#261c14" />
      <circle cx="370" cy="248" r="1.5" fill="#ffffff" />
      <circle cx="432" cy="248" r="1.5" fill="#ffffff" />

      <!-- Eyebrows -->
      <path d="M 345 230 Q 370 223 388 227" stroke="#1c1917" stroke-width="3.5" stroke-linecap="round" fill="none" />
      <path d="M 408 227 Q 430 223 455 230" stroke="#1c1917" stroke-width="3.5" stroke-linecap="round" fill="none" />

      <!-- Nose Contour (Three-quarter projection) -->
      <path d="M 402 245 L 406 280 L 395 287" stroke="#9d673f" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Trimmed Dark Mustache and Beard (Full, well-groomed beard per photo) -->
      <path d="M 380 298 Q 404 293 428 298 C 420 310, 390 310, 380 298 Z" fill="url(#hair-tone)" />
      <!-- Beard from ears along jawline down to chin and neck -->
      <path d="M 330 275 C 335 340, 360 380, 405 385 C 445 380, 475 340, 480 275 C 475 320, 450 365, 405 368 C 360 365, 335 320, 330 275 Z" fill="url(#hair-tone)" />
      <polygon points="380,312 430,312 418,375 392,375" fill="url(#hair-tone)" />

      <!-- Studio Rim Light Accent on Profile Edge -->
      <path d="M 315 250 C 310 180, 360 145, 435 150" stroke="#38bdf8" stroke-width="2.5" fill="none" opacity="0.6" />
      <path d="M 490 200 C 500 240, 480 320, 475 350" stroke="#818cf8" stroke-width="2" fill="none" opacity="0.4" />
    </g>

    <!-- Luxury Overlay Badge at Bottom of Card -->
    <g transform="translate(400, 740)" text-anchor="middle">
      <rect x="-180" y="-22" width="360" height="44" rx="22" fill="#0a0b12" stroke="url(#glow-border)" stroke-width="1.8" opacity="0.95" />
      <text y="-2" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#ffffff" letter-spacing="1.5">KAZI MUKITUL ISLAM</text>
      <text y="14" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="600" fill="#38bdf8" letter-spacing="2.8">WEB DEVELOPER &amp; DIGITAL CREATOR</text>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(portraitSvg))
    .jpeg({ quality: 95 })
    .toFile(path.resolve(imgDir, 'profile.jpg'));
  console.log('Generated realistic executive profile.jpg');
}

generateCerts().then(() => console.log('All 11 certificates, logo, and portrait generated.'));
