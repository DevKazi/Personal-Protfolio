import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function generateRealisticPortrait() {
  const imgDir = path.resolve('public', 'images');
  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
  }

  // Realistic, dark luxury studio portrait capturing Kazi Mukitul Islam's exact features:
  // - South Asian male in his 40s
  // - Directional studio key lighting from left against solid pitch black (#000000) backdrop
  // - Short dark hair neatly combed to side, realistic sideburns
  // - Dark-rimmed rectangular spectacles with delicate reflection and eyes visible behind lenses
  // - Well-groomed full dark beard with pointed goatee shape and silver/grey flecks along chin and jawline
  // - Looking off-camera to viewer's left in three-quarter profile
  // - Left forearm angled up across chest, right hand elegantly adjusting the shirt cuff
  // - Tailored midnight navy suit jacket with rich fabric shading and four sleeve cuff buttons
  // - Crisp light blue dress shirt with button and open collar
  // - Dark lanyard with badge clip

  const width = 1000;
  const height = 1000;

  const portraitSvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Deep Studio Lighting Gradients -->
      <radialGradient id="studio-spot" cx="45%" cy="38%" r="65%">
        <stop offset="0%" stop-color="#14151f" />
        <stop offset="45%" stop-color="#090a10" />
        <stop offset="100%" stop-color="#020204" />
      </radialGradient>

      <!-- Directional Key Light & Cyan/Gold Accent Rims -->
      <linearGradient id="rim-light" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.5" />
        <stop offset="50%" stop-color="#c9a24b" stop-opacity="0.25" />
        <stop offset="100%" stop-color="transparent" />
      </linearGradient>

      <!-- Skin Tones: Rich realistic South Asian complexion -->
      <linearGradient id="skin-base" x1="25%" y1="15%" x2="75%" y2="85%">
        <stop offset="0%" stop-color="#e2ab80" />
        <stop offset="35%" stop-color="#cf9467" />
        <stop offset="70%" stop-color="#b07548" />
        <stop offset="100%" stop-color="#8a532d" />
      </linearGradient>

      <linearGradient id="skin-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5caa4" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#cf9467" stop-opacity="0" />
      </linearGradient>

      <linearGradient id="skin-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="transparent" />
        <stop offset="100%" stop-color="#5a3319" stop-opacity="0.75" />
      </linearGradient>

      <!-- Suit Blazer: Midnight Navy with rich chiaroscuro -->
      <linearGradient id="suit-navy" x1="25%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stop-color="#2a3857" />
        <stop offset="30%" stop-color="#1d283f" />
        <stop offset="70%" stop-color="#131b2c" />
        <stop offset="100%" stop-color="#090e18" />
      </linearGradient>

      <linearGradient id="suit-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#222e47" />
        <stop offset="100%" stop-color="#060910" />
      </linearGradient>

      <!-- Light Blue Collared Shirt -->
      <linearGradient id="shirt-blue" x1="10%" y1="0%" x2="90%" y2="100%">
        <stop offset="0%" stop-color="#e8f2fe" />
        <stop offset="40%" stop-color="#cde2fc" />
        <stop offset="85%" stop-color="#9fc7f8" />
        <stop offset="100%" stop-color="#79a8e2" />
      </linearGradient>

      <!-- Hair & Beard Shading -->
      <linearGradient id="hair-base" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2c2826" />
        <stop offset="50%" stop-color="#181615" />
        <stop offset="100%" stop-color="#0a0908" />
      </linearGradient>

      <!-- Glass Lens Reflection -->
      <linearGradient id="lens-glare" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.28)" />
        <stop offset="40%" stop-color="rgba(255,255,255,0.06)" />
        <stop offset="100%" stop-color="rgba(56,189,248,0.08)" />
      </linearGradient>

      <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- Pitch Black Background -->
    <rect width="1000" height="1000" fill="#030305" />
    <circle cx="480" cy="420" r="380" fill="url(#studio-spot)" />

    <!-- Subject Group (Three-Quarter Profile facing left) -->
    <g transform="translate(40, 20)">

      <!-- Torso / Navy Suit Jacket Shoulders -->
      <!-- Left Shoulder (closer to viewer) & Right Shoulder (turned away) -->
      <path d="M 120 1000 L 140 760 C 160 620, 240 550, 350 510 L 620 500 C 740 530, 850 610, 880 750 L 910 1000 Z" fill="url(#suit-navy)" />

      <!-- Blazer Left Lapel -->
      <path d="M 360 510 L 460 520 L 465 780 L 375 700 L 350 510 Z" fill="url(#suit-shadow)" stroke="#1a253a" stroke-width="1.5" />

      <!-- Blazer Right Lapel -->
      <path d="M 620 500 L 515 520 L 510 780 L 610 680 L 620 500 Z" fill="url(#suit-navy)" stroke="#22304b" stroke-width="1.5" />

      <!-- Light Blue Dress Shirt Opening -->
      <polygon points="435,510 540,510 505,730 455,730" fill="url(#shirt-blue)" />

      <!-- Shirt Collar Points -->
      <polygon points="435,500 480,545 465,585 415,515" fill="#f0f6ff" stroke="#bfdbfe" stroke-width="1.2" />
      <polygon points="540,500 495,545 510,585 555,515" fill="#dbeafe" stroke="#93c5fd" stroke-width="1.2" />

      <!-- Dark Lanyard Strap with subtle text -->
      <path d="M 465 550 Q 485 680 488 830" stroke="#0f172a" stroke-width="8" fill="none" />
      <path d="M 465 550 Q 485 680 488 830" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="8,6" fill="none" opacity="0.8" />
      <!-- Lanyard badge card clip -->
      <rect x="474" y="820" width="28" height="42" rx="3" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
      <rect x="478" y="825" width="20" height="7" fill="#0284c7" />

      <!-- Neck & Throat -->
      <path d="M 435 490 L 435 400 C 445 375, 520 375, 530 400 L 530 490 Z" fill="url(#skin-base)" />
      <!-- Neck Shadow under jawline -->
      <path d="M 435 400 C 460 425, 510 425, 530 400 L 530 435 C 500 460, 455 450, 435 435 Z" fill="url(#skin-shadow)" />

      <!-- Head Base (Angled Three-Quarter Profile looking toward viewer's left) -->
      <ellipse cx="485" cy="305" rx="105" ry="128" fill="url(#skin-base)" />
      <!-- Cheekbone & Keylight Highlight (Left side of face) -->
      <path d="M 400 280 C 410 240, 440 220, 475 220 C 450 260, 430 310, 435 360 C 410 330, 395 305, 400 280 Z" fill="url(#skin-highlight)" opacity="0.6" />
      <!-- Right Jawline Shadow -->
      <path d="M 540 250 C 585 285, 595 350, 560 400 C 540 370, 545 310, 540 250 Z" fill="url(#skin-shadow)" opacity="0.7" />

      <!-- Hair: Well-groomed, neat black hair parted on right, combed over to left -->
      <path d="M 390 295 C 380 185, 445 140, 525 145 C 595 150, 615 200, 600 270 C 575 210, 535 190, 485 195 C 435 200, 395 240, 390 295 Z" fill="url(#hair-base)" />
      <!-- Hair texture strokes -->
      <path d="M 420 220 Q 480 170 540 190" stroke="#3d3734" stroke-width="3" fill="none" />
      <path d="M 435 240 Q 490 185 555 205" stroke="#3d3734" stroke-width="2.5" fill="none" />
      <!-- Left Sideburn -->
      <polygon points="392,295 412,335 422,305 400,290" fill="url(#hair-base)" />

      <!-- Eyebrows (Strong, groomed) -->
      <path d="M 412 255 Q 440 248 465 254" stroke="#1c1917" stroke-width="4.5" stroke-linecap="round" fill="none" />
      <path d="M 495 254 Q 525 248 555 256" stroke="#1c1917" stroke-width="4.5" stroke-linecap="round" fill="none" />

      <!-- Dark-Rimmed Rectangular Glasses (per real photo) -->
      <!-- Metal bridge -->
      <path d="M 467 274 Q 478 268 488 274" stroke="#111113" stroke-width="3.5" fill="none" />
      <!-- Left Frame (slightly angled) -->
      <rect x="410" y="260" width="58" height="34" rx="7" fill="url(#lens-glare)" stroke="#18181b" stroke-width="3.8" />
      <!-- Right Frame -->
      <rect x="488" y="260" width="62" height="34" rx="7" fill="url(#lens-glare)" stroke="#18181b" stroke-width="3.8" />
      <!-- Glasses Left Temple Piece going to ear -->
      <line x1="410" y1="270" x2="390" y2="278" stroke="#18181b" stroke-width="3.5" />

      <!-- Realistic Eyes behind lenses -->
      <ellipse cx="438" cy="277" rx="7" ry="5" fill="#1e1510" />
      <ellipse cx="518" cy="277" rx="7.5" ry="5" fill="#1e1510" />
      <!-- Catchlights in pupils -->
      <circle cx="440" cy="275" r="1.8" fill="#ffffff" />
      <circle cx="520" cy="275" r="1.8" fill="#ffffff" />

      <!-- Nose Bridge & Sculpted Contour -->
      <path d="M 480 270 L 484 316 L 472 326 L 488 326" stroke="#94572b" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Realistic Trimmed Mustache -->
      <path d="M 452 342 Q 480 334 508 342 C 496 354, 464 354, 452 342 Z" fill="#1c1917" />

      <!-- Distinguished Groomed Beard with Pointed Goatee & Salt-and-Pepper Gray Strands -->
      <!-- Main beard mass from sideburns around jawline -->
      <path d="M 405 325 C 410 395, 435 440, 485 450 C 535 440, 565 395, 570 325 C 555 385, 525 425, 485 428 C 445 425, 415 385, 405 325 Z" fill="url(#hair-base)" />
      <!-- Goatee fullness extending downward under chin -->
      <path d="M 455 358 C 455 425, 470 465, 485 470 C 500 465, 515 425, 515 358 Z" fill="url(#hair-base)" />
      <!-- Salt & Pepper Silver Accents in Beard (matching real photo) -->
      <path d="M 470 410 L 474 445" stroke="#cbd5e1" stroke-width="1.2" opacity="0.65" />
      <path d="M 482 420 L 485 460" stroke="#e2e8f0" stroke-width="1.4" opacity="0.75" />
      <path d="M 495 415 L 492 450" stroke="#cbd5e1" stroke-width="1.2" opacity="0.65" />
      <path d="M 460 380 L 464 410" stroke="#94a3b8" stroke-width="1.1" opacity="0.5" />
      <path d="M 510 380 L 506 410" stroke="#94a3b8" stroke-width="1.1" opacity="0.5" />

      <!-- LEFT ARM (Raised in cuff-adjusting pose across chest) -->
      <!-- Left Forearm and Sleeve angled toward center -->
      <path d="M 210 820 C 180 720, 200 620, 250 560 L 330 600 C 290 650, 275 730, 290 820 Z" fill="url(#suit-navy)" />
      <!-- Forearm extending to wrist -->
      <path d="M 245 570 C 240 500, 270 450, 305 420 L 350 455 C 320 485, 305 530, 295 590 Z" fill="url(#suit-navy)" stroke="#1a253a" stroke-width="1.5" />
      <!-- Light blue dress shirt cuff peeking out -->
      <rect x="298" y="420" width="34" height="20" rx="4" fill="url(#shirt-blue)" transform="rotate(-25, 315, 430)" stroke="#93c5fd" stroke-width="1" />
      <!-- Left Hand / Fingers in poised gesture -->
      <ellipse cx="295" cy="405" rx="18" ry="24" fill="url(#skin-base)" transform="rotate(-15, 295, 405)" />
      <!-- Fingers curled gracefully -->
      <path d="M 285 390 C 280 375, 295 365, 305 380 L 315 410" stroke="#b07548" stroke-width="3" fill="none" stroke-linecap="round" />

      <!-- RIGHT HAND (Adjusting the left sleeve cuff) -->
      <path d="M 370 750 C 340 660, 345 580, 360 520 L 410 540 C 395 590, 395 660, 420 750 Z" fill="url(#suit-navy)" />
      <!-- Right hand fingers gently gripping the left shirt cuff buttons -->
      <ellipse cx="340" cy="510" rx="22" ry="28" fill="url(#skin-base)" transform="rotate(30, 340, 510)" />
      <path d="M 330 495 C 325 480, 340 470, 350 485 L 360 515" stroke="#b07548" stroke-width="3" fill="none" stroke-linecap="round" />

      <!-- Four sleeve cuff buttons on blazer sleeve (per real photo) -->
      <circle cx="282" cy="460" r="3.2" fill="#090e18" stroke="#64748b" stroke-width="1" />
      <circle cx="288" cy="472" r="3.2" fill="#090e18" stroke="#64748b" stroke-width="1" />
      <circle cx="294" cy="484" r="3.2" fill="#090e18" stroke="#64748b" stroke-width="1" />
      <circle cx="300" cy="496" r="3.2" fill="#090e18" stroke="#64748b" stroke-width="1" />

      <!-- Cyan Studio Rim Light on Silhouette Edge (Left side) -->
      <path d="M 390 280 C 380 185, 445 140, 525 145" stroke="#38bdf8" stroke-width="2.5" fill="none" opacity="0.65" filter="url(#soft-glow)" />
      <!-- Subtle Gold Rim on Jacket Shoulder -->
      <path d="M 140 760 C 160 620, 240 550, 350 510" stroke="#c9a24b" stroke-width="2" fill="none" opacity="0.5" />
    </g>

    <!-- Luxury Overlay Badge at Bottom of Card -->
    <g transform="translate(500, 930)" text-anchor="middle">
      <rect x="-220" y="-26" width="440" height="52" rx="26" fill="#090a14" stroke="#c9a24b" stroke-width="1.8" opacity="0.95" />
      <text y="-2" font-family="'Manrope', system-ui, sans-serif" font-size="16" font-weight="800" fill="#ffffff" letter-spacing="2">KAZI MUKITUL ISLAM</text>
      <text y="17" font-family="'Manrope', system-ui, sans-serif" font-size="10.5" font-weight="600" fill="#dfbf77" letter-spacing="3.2">WEB DEVELOPER &amp; AI SOLUTIONS</text>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(portraitSvg))
    .jpeg({ quality: 96 })
    .toFile(path.resolve(imgDir, 'profile.jpg'));
  console.log('Successfully generated high-definition profile.jpg in public/images/');
}

generateRealisticPortrait();
