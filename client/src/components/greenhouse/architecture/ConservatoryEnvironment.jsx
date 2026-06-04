import React from 'react';
import './ConservatoryEnvironment.css';

/**
 * ConservatoryEnvironment
 * 
 * The complete architectural world of the greenhouse.
 * This is a fixed, full-viewport SVG scene that renders ALL architectural layers:
 * 
 *   Layer 5 — Deep Background (distant wings, tiny cloche silhouettes, archive balconies)
 *   Layer 4 — Background Conservatory (iron arches, glass roof supports, distant columns)
 *   Layer 3 — Midground Architecture (railings, walkways, display terraces)
 *   Layer 1 — Foreground (blurred vines, partial columns, leaves crossing the frame)
 * 
 * Layer 2 (the Specimen Platform) is NOT rendered here — it lives in the content flow.
 * 
 * This component renders even when there are zero specimens.
 * If you remove all plants, you should still see: a greenhouse.
 */
export default function ConservatoryEnvironment() {
  return (
    <div className="gh-env" aria-hidden="true">
      {/* ═══════════════════════════════════════════════════════
          LAYER 5 — DEEP BACKGROUND
          Distant archive silhouettes implying enormous scale
          ═══════════════════════════════════════════════════════ */}
      <svg className="gh-env-layer gh-env-deep" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="deep-fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-env-deep)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--gh-env-deep)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="deep-iron" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-env-iron)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--gh-env-iron)" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Distant greenhouse wings — arched silhouettes fading into haze */}
        <path d="M -100,450 Q 300,250 700,450" fill="none" stroke="url(#deep-iron)" strokeWidth="3" />
        <path d="M 900,450 Q 1300,250 1700,450" fill="none" stroke="url(#deep-iron)" strokeWidth="3" />

        {/* Distant vertical columns */}
        {[200, 400, 600, 1000, 1200, 1400].map((x) => (
          <rect key={`dcol-${x}`} x={x} y="300" width="4" height="300" fill="url(#deep-iron)" />
        ))}

        {/* Archive balcony silhouettes — horizontal platforms */}
        <rect x="120" y="420" width="280" height="3" fill="var(--gh-env-iron)" opacity="0.1" />
        <rect x="1200" y="400" width="300" height="3" fill="var(--gh-env-iron)" opacity="0.1" />
        <rect x="500" y="380" width="200" height="2" fill="var(--gh-env-iron)" opacity="0.08" />
        <rect x="900" y="390" width="180" height="2" fill="var(--gh-env-iron)" opacity="0.08" />

        {/* Tiny distant cloche silhouettes — implying hundreds of specimens deeper in the archive */}
        {[160, 240, 310, 1240, 1330, 1420, 550, 620, 950, 1020].map((x, i) => {
          const y = 390 + (i % 3) * 15;
          const s = 8 + (i % 4) * 3;
          return (
            <g key={`dcloche-${i}`} opacity={0.08 + (i % 3) * 0.03}>
              {/* Tiny dome shape */}
              <ellipse cx={x} cy={y - s * 0.6} rx={s * 0.5} ry={s * 0.7} fill="none" stroke="var(--gh-env-iron)" strokeWidth="1" />
              {/* Tiny pedestal */}
              <rect x={x - s * 0.4} y={y} width={s * 0.8} height={2} fill="var(--gh-env-iron)" />
            </g>
          );
        })}

        {/* Distant arched doorways leading to further wings */}
        <path d="M 350,600 L 350,480 A 50,60 0 0 1 450,480 L 450,600" fill="none" stroke="var(--gh-env-iron)" strokeWidth="2" opacity="0.08" />
        <path d="M 1150,600 L 1150,480 A 50,60 0 0 1 1250,480 L 1250,600" fill="none" stroke="var(--gh-env-iron)" strokeWidth="2" opacity="0.08" />
      </svg>

      {/* ═══════════════════════════════════════════════════════
          LAYER 4 — BACKGROUND CONSERVATORY
          The main structural skeleton of the greenhouse
          ═══════════════════════════════════════════════════════ */}
      <svg className="gh-env-layer gh-env-bg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bg-iron" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-env-iron)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--gh-env-iron)" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="bg-glass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-env-glass)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--gh-env-glass)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bg-stone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-env-stone)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--gh-env-stone)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* ── Grand Vaulted Glass Roof ── */}
        {/* Main arch — the defining architectural feature */}
        <path d="M -50,280 Q 800,-80 1650,280" fill="url(#bg-glass)" />
        <path d="M -50,280 Q 800,-80 1650,280" fill="none" stroke="url(#bg-iron)" strokeWidth="8" />
        {/* Secondary arch — creates depth in the ceiling */}
        <path d="M 100,320 Q 800,20 1500,320" fill="none" stroke="url(#bg-iron)" strokeWidth="5" opacity="0.4" />
        {/* Tertiary arch — even deeper */}
        <path d="M 250,360 Q 800,100 1350,360" fill="none" stroke="url(#bg-iron)" strokeWidth="3" opacity="0.25" />

        {/* Roof ribs — vertical iron members radiating from the vault */}
        {[...Array(17)].map((_, i) => {
          const x = 100 + i * 88;
          // Each rib curves from the roof edge down toward the floor
          const topY = 280 - Math.sin((i / 16) * Math.PI) * 280;
          return (
            <line key={`rib-${i}`} x1={x} y1={topY + 30} x2={x} y2="900" stroke="url(#bg-iron)" strokeWidth="2" opacity={0.15 + Math.sin((i / 16) * Math.PI) * 0.15} />
          );
        })}

        {/* Horizontal glass panel divisions in the roof */}
        <path d="M 100,180 Q 800,0 1500,180" fill="none" stroke="var(--gh-env-iron)" strokeWidth="1.5" opacity="0.15" />
        <path d="M 50,230 Q 800,-40 1550,230" fill="none" stroke="var(--gh-env-iron)" strokeWidth="1.5" opacity="0.12" />

        {/* ── Structural Columns ── */}
        {/* Left column pair */}
        <rect x="120" y="280" width="16" height="520" fill="url(#bg-iron)" />
        <rect x="136" y="280" width="5" height="520" fill="var(--gh-env-iron)" opacity="0.08" />
        {/* Column capital */}
        <rect x="110" y="272" width="36" height="12" rx="2" fill="var(--gh-env-iron)" opacity="0.35" />
        {/* Column base */}
        <rect x="108" y="790" width="40" height="14" rx="2" fill="var(--gh-env-iron)" opacity="0.3" />

        {/* Right column pair */}
        <rect x="1464" y="280" width="16" height="520" fill="url(#bg-iron)" />
        <rect x="1459" y="280" width="5" height="520" fill="var(--gh-env-iron)" opacity="0.08" />
        <rect x="1454" y="272" width="36" height="12" rx="2" fill="var(--gh-env-iron)" opacity="0.35" />
        <rect x="1452" y="790" width="40" height="14" rx="2" fill="var(--gh-env-iron)" opacity="0.3" />

        {/* Inner secondary columns (midground depth) */}
        <rect x="360" y="320" width="10" height="480" fill="url(#bg-iron)" opacity="0.5" />
        <rect x="350" y="314" width="28" height="8" rx="2" fill="var(--gh-env-iron)" opacity="0.2" />
        <rect x="1230" y="320" width="10" height="480" fill="url(#bg-iron)" opacity="0.5" />
        <rect x="1222" y="314" width="28" height="8" rx="2" fill="var(--gh-env-iron)" opacity="0.2" />

        {/* ── Floor / Ground Plane ── */}
        {/* Stone floor — perspective line */}
        <path d="M 0,800 Q 800,720 1600,800" fill="url(#bg-stone)" />
        <path d="M 0,800 Q 800,720 1600,800" fill="none" stroke="var(--gh-env-stone)" strokeWidth="2" opacity="0.2" />

        {/* Floor tile grid — perspective vanishing toward center */}
        {[...Array(9)].map((_, i) => {
          const x = 200 + i * 150;
          const topY = 760 - Math.abs(x - 800) * 0.03;
          return (
            <line key={`ftile-${i}`} x1={x} y1={topY} x2={x} y2="900" stroke="var(--gh-env-stone)" strokeWidth="1" opacity="0.08" />
          );
        })}
        <line x1="100" y1="830" x2="1500" y2="830" stroke="var(--gh-env-stone)" strokeWidth="1" opacity="0.06" />
        <line x1="150" y1="860" x2="1450" y2="860" stroke="var(--gh-env-stone)" strokeWidth="1" opacity="0.05" />

        {/* ── Railing / Walkway ── */}
        {/* A horizontal iron railing at mid-height suggesting an elevated walkway */}
        <line x1="80" y1="550" x2="400" y2="550" stroke="var(--gh-env-iron)" strokeWidth="3" opacity="0.2" />
        <line x1="80" y1="555" x2="400" y2="555" stroke="var(--gh-env-iron)" strokeWidth="1" opacity="0.12" />
        {/* Railing posts */}
        {[100, 150, 200, 250, 300, 350].map((x) => (
          <rect key={`rp-l-${x}`} x={x} y="550" width="2" height="25" fill="var(--gh-env-iron)" opacity="0.15" />
        ))}

        {/* Right side railing */}
        <line x1="1200" y1="550" x2="1520" y2="550" stroke="var(--gh-env-iron)" strokeWidth="3" opacity="0.2" />
        <line x1="1200" y1="555" x2="1520" y2="555" stroke="var(--gh-env-iron)" strokeWidth="1" opacity="0.12" />
        {[1220, 1270, 1320, 1370, 1420, 1470].map((x) => (
          <rect key={`rp-r-${x}`} x={x} y="550" width="2" height="25" fill="var(--gh-env-iron)" opacity="0.15" />
        ))}

        {/* ── Archways between sections ── */}
        {/* Left archway leading to deeper wings */}
        <path d="M 80,800 L 80,500 A 80,100 0 0 1 240,500 L 240,800" fill="none" stroke="var(--gh-env-iron)" strokeWidth="4" opacity="0.2" />
        <path d="M 95,800 L 95,510 A 65,90 0 0 1 225,510 L 225,800" fill="none" stroke="var(--gh-env-iron)" strokeWidth="2" opacity="0.12" />

        {/* Right archway */}
        <path d="M 1360,800 L 1360,500 A 80,100 0 0 1 1520,500 L 1520,800" fill="none" stroke="var(--gh-env-iron)" strokeWidth="4" opacity="0.2" />
        <path d="M 1375,800 L 1375,510 A 65,90 0 0 1 1505,510 L 1505,800" fill="none" stroke="var(--gh-env-iron)" strokeWidth="2" opacity="0.12" />
      </svg>

      {/* ═══════════════════════════════════════════════════════
          LAYER 3 — MIDGROUND ARCHITECTURE
          Display terraces, platforms, and garden structures
          ═══════════════════════════════════════════════════════ */}
      <svg className="gh-env-layer gh-env-mid" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="mid-iron" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-env-iron)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--gh-env-iron)" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="mid-stone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-env-stone)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--gh-env-stone)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* ── Display Terrace — Central Platform ── */}
        {/* The main stone platform where the specimen sits */}
        <path d="M 450,680 Q 800,640 1150,680 L 1200,720 Q 800,690 400,720 Z" fill="url(#mid-stone)" />
        <path d="M 450,680 Q 800,640 1150,680" fill="none" stroke="var(--gh-env-stone)" strokeWidth="2" opacity="0.25" />
        {/* Steps leading up to it */}
        <path d="M 500,720 Q 800,700 1100,720 L 1120,740 Q 800,720 480,740 Z" fill="var(--gh-env-stone)" opacity="0.15" />
        <path d="M 530,740 Q 800,725 1070,740 L 1080,755 Q 800,740 520,755 Z" fill="var(--gh-env-stone)" opacity="0.1" />

        {/* ── Side Display Alcoves ── */}
        {/* Left alcove — a recessed architectural niche for future specimens */}
        <path d="M 50,580 L 50,450 A 80,80 0 0 1 210,450 L 210,580" fill="none" stroke="url(#mid-iron)" strokeWidth="3" />
        <rect x="50" y="578" width="160" height="4" fill="var(--gh-env-stone)" opacity="0.2" />

        {/* Right alcove */}
        <path d="M 1390,580 L 1390,450 A 80,80 0 0 1 1550,450 L 1550,580" fill="none" stroke="url(#mid-iron)" strokeWidth="3" />
        <rect x="1390" y="578" width="160" height="4" fill="var(--gh-env-stone)" opacity="0.2" />

        {/* ── Horizontal Beams / Cross-braces ── */}
        {/* Iron cross-beams tying the columns together at height */}
        <line x1="136" y1="420" x2="370" y2="420" stroke="var(--gh-env-iron)" strokeWidth="3" opacity="0.18" />
        <line x1="1240" y1="420" x2="1464" y2="420" stroke="var(--gh-env-iron)" strokeWidth="3" opacity="0.18" />
        {/* Diagonal braces */}
        <line x1="136" y1="300" x2="200" y2="420" stroke="var(--gh-env-iron)" strokeWidth="1.5" opacity="0.1" />
        <line x1="1464" y1="300" x2="1400" y2="420" stroke="var(--gh-env-iron)" strokeWidth="1.5" opacity="0.1" />

        {/* ── Hanging lanterns (small architectural details) ── */}
        {[400, 800, 1200].map((x, i) => {
          const chainY = 280 - Math.sin(((x - 100) / 1400) * Math.PI) * 200;
          return (
            <g key={`lantern-${i}`} opacity="0.12">
              <line x1={x} y1={chainY + 30} x2={x} y2={chainY + 80} stroke="var(--gh-env-iron)" strokeWidth="1" />
              <rect x={x - 6} y={chainY + 80} width="12" height="16" rx="2" fill="none" stroke="var(--gh-env-iron)" strokeWidth="1.5" />
              <circle cx={x} cy={chainY + 88} r="2" fill="var(--gh-env-warm)" opacity="0.4" />
            </g>
          );
        })}
      </svg>

      {/* ═══════════════════════════════════════════════════════
          LAYER 1 — FOREGROUND
          Creates physical immersion — the viewer is INSIDE the conservatory
          ═══════════════════════════════════════════════════════ */}
      <svg className="gh-env-layer gh-env-fg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="fg-vine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-env-vine)" stopOpacity="0.7" />
            <stop offset="60%" stopColor="var(--gh-env-vine)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--gh-env-vine)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fg-iron" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-env-iron)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--gh-env-iron)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* ── Left Foreground Column (partial, cropped by viewport) ── */}
        <rect x="-15" y="0" width="55" height="900" fill="url(#fg-iron)" />
        <rect x="40" y="0" width="8" height="900" fill="var(--gh-env-iron)" opacity="0.1" />
        {/* Column ornamental bracket */}
        <path d="M 40,350 Q 80,360 80,400 L 40,400" fill="none" stroke="var(--gh-env-iron)" strokeWidth="2" opacity="0.3" />
        <path d="M 40,500 Q 80,510 80,550 L 40,550" fill="none" stroke="var(--gh-env-iron)" strokeWidth="2" opacity="0.3" />

        {/* ── Right Foreground Column ── */}
        <rect x="1560" y="0" width="55" height="900" fill="url(#fg-iron)" />
        <rect x="1552" y="0" width="8" height="900" fill="var(--gh-env-iron)" opacity="0.1" />
        <path d="M 1560,350 Q 1520,360 1520,400 L 1560,400" fill="none" stroke="var(--gh-env-iron)" strokeWidth="2" opacity="0.3" />
        <path d="M 1560,500 Q 1520,510 1520,550 L 1560,550" fill="none" stroke="var(--gh-env-iron)" strokeWidth="2" opacity="0.3" />

        {/* ── Hanging Vines (left, foreground) ── */}
        <path d="M 30,0 Q 60,180 25,400 T 50,700" fill="none" stroke="url(#fg-vine)" strokeWidth="5" strokeLinecap="round" />
        <path d="M 80,0 Q 50,250 90,450 T 70,680" fill="none" stroke="url(#fg-vine)" strokeWidth="3" strokeLinecap="round" />
        {/* Leaves */}
        <path d="M 40,120 Q 70,105 75,130 Q 55,140 40,120" fill="var(--gh-env-vine)" opacity="0.5" />
        <path d="M 25,280 Q 0,265 -5,295 Q 15,300 25,280" fill="var(--gh-env-vine)" opacity="0.4" />
        <path d="M 55,180 Q 85,170 88,195 Q 65,200 55,180" fill="var(--gh-env-vine)" opacity="0.45" />
        <path d="M 80,350 Q 50,340 48,365 Q 70,370 80,350" fill="var(--gh-env-vine)" opacity="0.35" />
        <path d="M 35,450 Q 60,435 65,460 Q 45,465 35,450" fill="var(--gh-env-vine)" opacity="0.3" />

        {/* ── Hanging Vines (right, foreground) ── */}
        <path d="M 1560,0 Q 1530,200 1570,430 T 1545,750" fill="none" stroke="url(#fg-vine)" strokeWidth="5" strokeLinecap="round" />
        <path d="M 1520,0 Q 1550,220 1510,480 T 1530,700" fill="none" stroke="url(#fg-vine)" strokeWidth="3" strokeLinecap="round" />
        {/* Leaves */}
        <path d="M 1555,140 Q 1525,125 1522,150 Q 1545,160 1555,140" fill="var(--gh-env-vine)" opacity="0.5" />
        <path d="M 1570,300 Q 1595,285 1600,310 Q 1580,320 1570,300" fill="var(--gh-env-vine)" opacity="0.4" />
        <path d="M 1530,220 Q 1505,205 1500,235 Q 1520,240 1530,220" fill="var(--gh-env-vine)" opacity="0.45" />
        <path d="M 1545,420 Q 1570,405 1575,430 Q 1555,440 1545,420" fill="var(--gh-env-vine)" opacity="0.3" />

        {/* ── Top vine canopy draping across the top ── */}
        <path d="M 200,0 Q 220,50 190,120 T 210,220" fill="none" stroke="url(#fg-vine)" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        <path d="M 1400,0 Q 1380,60 1410,130 T 1390,200" fill="none" stroke="url(#fg-vine)" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        {/* Small scattered leaves at the very top */}
        <path d="M 210,60 Q 235,50 238,72 Q 220,78 210,60" fill="var(--gh-env-vine)" opacity="0.25" />
        <path d="M 1395,70 Q 1370,58 1368,82 Q 1385,86 1395,70" fill="var(--gh-env-vine)" opacity="0.25" />

        {/* ── Bottom moss/ground framing ── */}
        <path d="M 0,870 Q 100,850 200,870 T 400,865 T 600,875 T 800,860" fill="var(--gh-env-vine)" opacity="0.15" />
        <path d="M 800,860 Q 1000,875 1200,865 T 1400,870 T 1600,855" fill="var(--gh-env-vine)" opacity="0.15" />
      </svg>

      {/* ═══════════════════════════════════════════════════════
          ATMOSPHERIC PARTICLES
          Subtle dust motes drifting through the conservatory light
          ═══════════════════════════════════════════════════════ */}
      <div className="gh-env-particles">
        {[...Array(18)].map((_, i) => (
          <span
            key={`mote-${i}`}
            className="gh-env-mote"
            style={{
              '--mote-x': `${8 + (i * 37) % 84}%`,
              '--mote-y': `${10 + (i * 53) % 70}%`,
              '--mote-size': `${1.5 + (i % 3)}px`,
              '--mote-duration': `${18 + (i % 12) * 2}s`,
              '--mote-delay': `${-(i * 3)}s`,
            }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════
          ATMOSPHERIC LIGHT
          A single warm shaft of light from the glass roof
          ═══════════════════════════════════════════════════════ */}
      <div className="gh-env-light" />
    </div>
  );
}
