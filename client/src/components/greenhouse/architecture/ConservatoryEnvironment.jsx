import React from 'react';
import './ConservatoryEnvironment.css';

/**
 * ConservatoryEnvironment
 *
 * This is not a background. This is THE BUILDING.
 *
 * The conservatory is rendered as a fixed, full-viewport scene with
 * six distinct depth layers. The architecture is deliberately BOLD —
 * thick columns, visible iron, opaque stone — so the room is
 * recognizable even when completely blurred or emptied of specimens.
 *
 * Design philosophy: If you delete every plant, you should still
 * immediately think "greenhouse" or "conservatory."
 */
export default function ConservatoryEnvironment() {
  return (
    <div className="gh-env" aria-hidden="true">

      {/* ═══════════════════════════════════════════════════════
          LAYER 1 — DEEP BACKGROUND
          Distant archive wings. Tiny silhouettes. Scale.
          ═══════════════════════════════════════════════════════ */}
      <svg className="gh-env-layer gh-env-L1" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="L1-haze" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--env-haze)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--env-haze)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Atmospheric haze wash — defines the deep space */}
        <rect x="200" y="260" width="1200" height="340" fill="url(#L1-haze)" />

        {/* Distant greenhouse wing arches */}
        <path d="M 200,520 L 200,340 A 200,120 0 0 1 600,340 L 600,520" fill="none" stroke="var(--env-iron-faint)" strokeWidth="3" />
        <path d="M 1000,520 L 1000,340 A 200,120 0 0 1 1400,340 L 1400,520" fill="none" stroke="var(--env-iron-faint)" strokeWidth="3" />

        {/* Distant columns within those wings */}
        {[280, 400, 520, 1080, 1200, 1320].map(x => (
          <rect key={`dc-${x}`} x={x} y="340" width="3" height="180" fill="var(--env-iron-faint)" />
        ))}

        {/* Archive balcony shelves */}
        <rect x="230" y="400" width="340" height="2" fill="var(--env-iron-faint)" />
        <rect x="1030" y="400" width="340" height="2" fill="var(--env-iron-faint)" />
        <rect x="260" y="440" width="280" height="2" fill="var(--env-iron-faint)" opacity="0.6" />
        <rect x="1060" y="440" width="280" height="2" fill="var(--env-iron-faint)" opacity="0.6" />

        {/* Tiny distant cloches — implying hundreds of specimens in the deep archive */}
        {[290, 350, 420, 490, 1100, 1160, 1230, 1300].map((x, i) => {
          const row = i < 4 ? 0 : 1;
          const baseY = row === 0 ? 388 : 388;
          const h = 10 + (i % 3) * 2;
          return (
            <g key={`tc-${i}`}>
              <path d={`M ${x - 4},${baseY} A ${h * 0.5},${h * 0.7} 0 0 1 ${x + 4},${baseY}`} fill="none" stroke="var(--env-iron-faint)" strokeWidth="1" opacity="0.7" />
              <rect x={x - 3} y={baseY} width="6" height="1.5" fill="var(--env-iron-faint)" opacity="0.5" />
            </g>
          );
        })}

        {/* Distant arched doorways — exits to further wings */}
        <path d="M 680,520 L 680,440 A 40,50 0 0 1 760,440 L 760,520" fill="none" stroke="var(--env-iron-faint)" strokeWidth="2" />
        <path d="M 840,520 L 840,440 A 40,50 0 0 1 920,440 L 920,520" fill="none" stroke="var(--env-iron-faint)" strokeWidth="2" />

        {/* Very distant upper gallery railing */}
        <line x1="300" y1="310" x2="500" y2="310" stroke="var(--env-iron-faint)" strokeWidth="1.5" opacity="0.5" />
        <line x1="1100" y1="310" x2="1300" y2="310" stroke="var(--env-iron-faint)" strokeWidth="1.5" opacity="0.5" />
      </svg>


      {/* ═══════════════════════════════════════════════════════
          LAYER 2 — BACKGROUND STRUCTURE
          The room. Arches. Columns. Glass roof. Walls.
          This layer DEFINES THE SPACE. It must be BOLD.
          ═══════════════════════════════════════════════════════ */}
      <svg className="gh-env-layer gh-env-L2" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="L2-iron-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--env-iron)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--env-iron)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="L2-glass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--env-glass)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--env-glass)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="L2-col-l" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--env-iron)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--env-iron)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--env-iron)" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* ── Grand Vaulted Glass Ceiling ── */}
        {/* Glass fill — the greenish transparent surface */}
        <path d="M 0,300 Q 800,-100 1600,300 L 1600,0 L 0,0 Z" fill="url(#L2-glass)" />

        {/* Primary arch — THICK, the defining structure */}
        <path d="M 0,300 Q 800,-100 1600,300" fill="none" stroke="var(--env-iron)" strokeWidth="10" opacity="0.7" />
        {/* Secondary arch */}
        <path d="M 80,340 Q 800,-20 1520,340" fill="none" stroke="var(--env-iron)" strokeWidth="6" opacity="0.4" />
        {/* Tertiary arch (deeper roof) */}
        <path d="M 200,380 Q 800,80 1400,380" fill="none" stroke="var(--env-iron)" strokeWidth="3" opacity="0.25" />

        {/* Roof ribs — iron members curving from the vault down to the columns */}
        {[...Array(15)].map((_, i) => {
          const x = 120 + i * 100;
          const roofY = 300 - Math.sin(((x) / 1600) * Math.PI) * 340;
          return (
            <line key={`vr-${i}`} x1={x} y1={Math.max(roofY + 20, 10)} x2={x} y2="900" stroke="var(--env-iron)" strokeWidth={i === 7 ? "4" : "2"} opacity={i === 7 ? 0.5 : 0.15 + Math.sin(((x) / 1600) * Math.PI) * 0.12} />
          );
        })}

        {/* Horizontal roof mullions — glass panel separators */}
        <path d="M 60,200 Q 800,-20 1540,200" fill="none" stroke="var(--env-iron)" strokeWidth="1.5" opacity="0.15" />
        <path d="M 30,250 Q 800,-60 1570,250" fill="none" stroke="var(--env-iron)" strokeWidth="1.5" opacity="0.12" />

        {/* ── Main Structural Columns — THICK, OPAQUE ── */}

        {/* LEFT COLUMN — substantial, 40px wide */}
        <rect x="80" y="290" width="40" height="510" fill="url(#L2-col-l)" />
        {/* Column highlight edge */}
        <rect x="120" y="290" width="6" height="510" fill="var(--env-iron)" opacity="0.15" />
        {/* Capital — ornamental top bracket */}
        <rect x="70" y="278" width="60" height="16" rx="3" fill="var(--env-iron)" opacity="0.7" />
        <rect x="74" y="274" width="52" height="6" rx="2" fill="var(--env-iron)" opacity="0.5" />
        {/* Base — solid footing */}
        <rect x="65" y="790" width="70" height="18" rx="3" fill="var(--env-iron)" opacity="0.6" />
        <rect x="60" y="805" width="80" height="8" rx="2" fill="var(--env-iron)" opacity="0.4" />

        {/* RIGHT COLUMN */}
        <rect x="1480" y="290" width="40" height="510" fill="url(#L2-col-l)" />
        <rect x="1474" y="290" width="6" height="510" fill="var(--env-iron)" opacity="0.15" />
        <rect x="1470" y="278" width="60" height="16" rx="3" fill="var(--env-iron)" opacity="0.7" />
        <rect x="1474" y="274" width="52" height="6" rx="2" fill="var(--env-iron)" opacity="0.5" />
        <rect x="1465" y="790" width="70" height="18" rx="3" fill="var(--env-iron)" opacity="0.6" />
        <rect x="1460" y="805" width="80" height="8" rx="2" fill="var(--env-iron)" opacity="0.4" />

        {/* INNER COLUMNS — secondary structural pair, slightly transparent */}
        <rect x="300" y="330" width="20" height="470" fill="url(#L2-iron-v)" opacity="0.45" />
        <rect x="290" y="322" width="36" height="10" rx="2" fill="var(--env-iron)" opacity="0.35" />
        <rect x="1280" y="330" width="20" height="470" fill="url(#L2-iron-v)" opacity="0.45" />
        <rect x="1272" y="322" width="36" height="10" rx="2" fill="var(--env-iron)" opacity="0.35" />

        {/* ── Floor Plane ── */}
        {/* Stone floor — wide elliptical perspective */}
        <ellipse cx="800" cy="820" rx="700" ry="50" fill="var(--env-stone)" opacity="0.2" />
        <ellipse cx="800" cy="820" rx="700" ry="50" fill="none" stroke="var(--env-stone)" strokeWidth="2" opacity="0.15" />

        {/* Floor tiles — perspective lines converging to center */}
        {[...Array(11)].map((_, i) => {
          const x = 200 + i * 120;
          return <line key={`ft-${i}`} x1={x} y1="780" x2={x + (800 - x) * 0.05} y2="900" stroke="var(--env-stone)" strokeWidth="1" opacity="0.07" />;
        })}

        {/* ── Side Wall Archways — passages to further wings ── */}
        {/* Left passage */}
        <path d="M 85,800 L 85,560 A 55,70 0 0 1 195,560 L 195,800" fill="none" stroke="var(--env-iron)" strokeWidth="5" opacity="0.35" />
        <path d="M 95,800 L 95,570 A 45,60 0 0 1 185,570 L 185,800" fill="none" stroke="var(--env-iron)" strokeWidth="2" opacity="0.2" />

        {/* Right passage */}
        <path d="M 1405,800 L 1405,560 A 55,70 0 0 1 1515,560 L 1515,800" fill="none" stroke="var(--env-iron)" strokeWidth="5" opacity="0.35" />
        <path d="M 1415,800 L 1415,570 A 45,60 0 0 1 1505,570 L 1505,800" fill="none" stroke="var(--env-iron)" strokeWidth="2" opacity="0.2" />

        {/* ── Iron Railings — gallery walkway at mid-height ── */}
        {/* Left railing */}
        <line x1="85" y1="540" x2="310" y2="540" stroke="var(--env-iron)" strokeWidth="4" opacity="0.3" />
        <line x1="85" y1="546" x2="310" y2="546" stroke="var(--env-iron)" strokeWidth="1.5" opacity="0.15" />
        {[100, 140, 180, 220, 260].map(x => (
          <rect key={`rl-${x}`} x={x} y="540" width="2" height="20" fill="var(--env-iron)" opacity="0.2" />
        ))}

        {/* Right railing */}
        <line x1="1290" y1="540" x2="1515" y2="540" stroke="var(--env-iron)" strokeWidth="4" opacity="0.3" />
        <line x1="1290" y1="546" x2="1515" y2="546" stroke="var(--env-iron)" strokeWidth="1.5" opacity="0.15" />
        {[1310, 1350, 1390, 1430, 1470].map(x => (
          <rect key={`rr-${x}`} x={x} y="540" width="2" height="20" fill="var(--env-iron)" opacity="0.2" />
        ))}

        {/* ── Cross-Beams — horizontal iron connecting columns ── */}
        <line x1="120" y1="440" x2="320" y2="440" stroke="var(--env-iron)" strokeWidth="3" opacity="0.25" />
        <line x1="1280" y1="440" x2="1480" y2="440" stroke="var(--env-iron)" strokeWidth="3" opacity="0.25" />
        {/* Diagonal braces */}
        <line x1="120" y1="310" x2="180" y2="440" stroke="var(--env-iron)" strokeWidth="1.5" opacity="0.12" />
        <line x1="1480" y1="310" x2="1420" y2="440" stroke="var(--env-iron)" strokeWidth="1.5" opacity="0.12" />
      </svg>


      {/* ═══════════════════════════════════════════════════════
          LAYER 3 — MIDGROUND ARCHITECTURE
          Display terraces. Paths. Gallery floor. Navigation.
          This layer creates PLACE within the room.
          ═══════════════════════════════════════════════════════ */}
      <svg className="gh-env-layer gh-env-L3" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="L3-stone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--env-stone-light)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--env-stone)" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="L3-terrace" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--env-stone-light)" stopOpacity="0.35" />
            <stop offset="80%" stopColor="var(--env-stone)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--env-stone-dark)" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* ── Central Display Terrace ── */}
        {/* The main stone platform — where the primary specimen stands */}
        {/* Top surface with perspective */}
        <path d="M 480,670 Q 800,630 1120,670 L 1160,700 Q 800,675 440,700 Z" fill="url(#L3-terrace)" />
        <path d="M 480,670 Q 800,630 1120,670" fill="none" stroke="var(--env-stone)" strokeWidth="2" opacity="0.3" />
        {/* Front face */}
        <path d="M 440,700 Q 800,675 1160,700 L 1180,730 Q 800,710 420,730 Z" fill="var(--env-stone)" opacity="0.2" />
        {/* Steps */}
        <path d="M 460,730 Q 800,715 1140,730 L 1150,748 Q 800,735 450,748 Z" fill="var(--env-stone)" opacity="0.15" />
        <path d="M 470,748 Q 800,738 1130,748 L 1135,760 Q 800,752 465,760 Z" fill="var(--env-stone)" opacity="0.1" />

        {/* ── Side Display Alcoves ── */}
        {/* Left alcove — recessed niche in the wall */}
        <path d="M 130,640 L 130,510 A 60,65 0 0 1 250,510 L 250,640" fill="var(--env-haze)" opacity="0.15" />
        <path d="M 130,640 L 130,510 A 60,65 0 0 1 250,510 L 250,640" fill="none" stroke="var(--env-iron)" strokeWidth="3" opacity="0.35" />
        {/* Alcove shelf */}
        <rect x="140" y="600" width="100" height="3" fill="var(--env-stone)" opacity="0.3" />
        {/* Tiny alcove plinth */}
        <rect x="170" y="585" width="40" height="15" rx="2" fill="var(--env-stone)" opacity="0.2" />

        {/* Right alcove */}
        <path d="M 1350,640 L 1350,510 A 60,65 0 0 1 1470,510 L 1470,640" fill="var(--env-haze)" opacity="0.15" />
        <path d="M 1350,640 L 1350,510 A 60,65 0 0 1 1470,510 L 1470,640" fill="none" stroke="var(--env-iron)" strokeWidth="3" opacity="0.35" />
        <rect x="1360" y="600" width="100" height="3" fill="var(--env-stone)" opacity="0.3" />
        <rect x="1390" y="585" width="40" height="15" rx="2" fill="var(--env-stone)" opacity="0.2" />

        {/* ── Stone Pathway ── */}
        {/* A central path leading from the entrance toward the display terrace */}
        <path d="M 700,900 Q 750,800 730,760 L 870,760 Q 850,800 900,900 Z" fill="var(--env-stone)" opacity="0.12" />
        <path d="M 700,900 Q 750,800 730,760" fill="none" stroke="var(--env-stone)" strokeWidth="1" opacity="0.1" />
        <path d="M 900,900 Q 850,800 870,760" fill="none" stroke="var(--env-stone)" strokeWidth="1" opacity="0.1" />

        {/* ── Hanging Lanterns — warm points of light ── */}
        {[500, 800, 1100].map((x, i) => {
          const chainTop = 300 - Math.sin(((x) / 1600) * Math.PI) * 240;
          return (
            <g key={`lan-${i}`}>
              <line x1={x} y1={chainTop + 30} x2={x} y2={chainTop + 85} stroke="var(--env-iron)" strokeWidth="1" opacity="0.15" />
              <rect x={x - 7} y={chainTop + 85} width="14" height="18" rx="3" fill="none" stroke="var(--env-iron)" strokeWidth="1.5" opacity="0.2" />
              {/* Warm glow */}
              <circle cx={x} cy={chainTop + 94} r="3" fill="var(--env-warm)" opacity="0.3" />
              <circle cx={x} cy={chainTop + 94} r="8" fill="var(--env-warm)" opacity="0.06" />
            </g>
          );
        })}
      </svg>


      {/* ═══════════════════════════════════════════════════════
          LAYER 6 — FOREGROUND
          Immersion. The viewer is INSIDE the conservatory.
          These elements are BOLD and OPAQUE.
          ═══════════════════════════════════════════════════════ */}
      <svg className="gh-env-layer gh-env-L6" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="L6-col" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--env-fg)" stopOpacity="0.95" />
            <stop offset="60%" stopColor="var(--env-fg)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--env-fg)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="L6-col-r" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="var(--env-fg)" stopOpacity="0.95" />
            <stop offset="60%" stopColor="var(--env-fg)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--env-fg)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="L6-vine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--env-vine)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="var(--env-vine)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--env-vine)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── LEFT FOREGROUND COLUMN — thick, partially viewport-cropped ── */}
        <rect x="-20" y="0" width="70" height="900" fill="url(#L6-col)" />
        {/* Column inner edge shadow */}
        <rect x="50" y="0" width="12" height="900" fill="var(--env-fg)" opacity="0.15" />
        {/* Ornamental brackets */}
        <path d="M 50,300 Q 95,310 95,360 L 50,360" fill="var(--env-fg)" opacity="0.4" />
        <path d="M 50,480 Q 90,488 90,530 L 50,530" fill="var(--env-fg)" opacity="0.35" />
        <path d="M 50,650 Q 85,658 85,695 L 50,695" fill="var(--env-fg)" opacity="0.3" />

        {/* ── RIGHT FOREGROUND COLUMN ── */}
        <rect x="1550" y="0" width="70" height="900" fill="url(#L6-col-r)" />
        <rect x="1538" y="0" width="12" height="900" fill="var(--env-fg)" opacity="0.15" />
        <path d="M 1550,300 Q 1505,310 1505,360 L 1550,360" fill="var(--env-fg)" opacity="0.4" />
        <path d="M 1550,480 Q 1510,488 1510,530 L 1550,530" fill="var(--env-fg)" opacity="0.35" />
        <path d="M 1550,650 Q 1515,658 1515,695 L 1550,695" fill="var(--env-fg)" opacity="0.3" />

        {/* ── HANGING VINES — left side ── */}
        <path d="M 35,0 Q 65,200 25,440 T 55,750" fill="none" stroke="url(#L6-vine)" strokeWidth="6" strokeLinecap="round" />
        <path d="M 80,0 Q 55,280 95,480 T 70,720" fill="none" stroke="url(#L6-vine)" strokeWidth="4" strokeLinecap="round" />
        <path d="M 110,0 Q 130,150 100,350" fill="none" stroke="url(#L6-vine)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        {/* Leaves — stylized, teardrop shapes */}
        <path d="M 42,110 Q 72,95 78,125 Q 55,135 42,110" fill="var(--env-vine)" opacity="0.6" />
        <path d="M 28,270 Q 0,255 -5,285 Q 18,295 28,270" fill="var(--env-vine)" opacity="0.5" />
        <path d="M 60,190 Q 88,175 92,205 Q 70,212 60,190" fill="var(--env-vine)" opacity="0.55" />
        <path d="M 80,380 Q 55,368 50,395 Q 72,400 80,380" fill="var(--env-vine)" opacity="0.4" />
        <path d="M 35,480 Q 58,465 65,492 Q 45,498 35,480" fill="var(--env-vine)" opacity="0.35" />
        <path d="M 95,300 Q 120,288 125,315 Q 105,320 95,300" fill="var(--env-vine)" opacity="0.3" />

        {/* ── HANGING VINES — right side ── */}
        <path d="M 1565,0 Q 1535,220 1575,460 T 1550,780" fill="none" stroke="url(#L6-vine)" strokeWidth="6" strokeLinecap="round" />
        <path d="M 1525,0 Q 1555,250 1515,490 T 1540,740" fill="none" stroke="url(#L6-vine)" strokeWidth="4" strokeLinecap="round" />
        <path d="M 1490,0 Q 1470,160 1500,360" fill="none" stroke="url(#L6-vine)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        {/* Leaves */}
        <path d="M 1558,130 Q 1530,115 1525,145 Q 1548,155 1558,130" fill="var(--env-vine)" opacity="0.6" />
        <path d="M 1575,290 Q 1600,275 1608,305 Q 1585,312 1575,290" fill="var(--env-vine)" opacity="0.5" />
        <path d="M 1535,210 Q 1510,198 1505,225 Q 1528,232 1535,210" fill="var(--env-vine)" opacity="0.55" />
        <path d="M 1520,400 Q 1545,388 1550,415 Q 1530,420 1520,400" fill="var(--env-vine)" opacity="0.4" />
        <path d="M 1495,310 Q 1470,298 1465,325 Q 1488,330 1495,310" fill="var(--env-vine)" opacity="0.3" />

        {/* ── TOP CANOPY — vines draped across the upper viewport ── */}
        <path d="M 180,0 Q 195,65 175,150 T 195,270" fill="none" stroke="url(#L6-vine)" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
        <path d="M 1420,0 Q 1405,70 1425,155 T 1400,260" fill="none" stroke="url(#L6-vine)" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
        <path d="M 190,70 Q 218,55 222,82 Q 200,90 190,70" fill="var(--env-vine)" opacity="0.3" />
        <path d="M 1415,75 Q 1390,62 1388,88 Q 1408,94 1415,75" fill="var(--env-vine)" opacity="0.3" />

        {/* ── BOTTOM GROUND — moss and stone framing the floor ── */}
        <path d="M 0,875 Q 200,855 400,870 T 800,860 T 1200,868 T 1600,850" fill="var(--env-vine)" opacity="0.12" />
        <path d="M 0,890 Q 150,878 300,888 T 600,882 T 900,890 T 1200,880 T 1600,885" fill="var(--env-vine)" opacity="0.08" />
      </svg>


      {/* ═══════════════════════════════════════════════════════
          ATMOSPHERE — dust, light, life
          ═══════════════════════════════════════════════════════ */}
      <div className="gh-env-particles">
        {[...Array(20)].map((_, i) => (
          <span
            key={`m-${i}`}
            className="gh-env-mote"
            style={{
              '--mx': `${10 + (i * 41) % 80}%`,
              '--my': `${8 + (i * 57) % 72}%`,
              '--ms': `${1.5 + (i % 3)}px`,
              '--md': `${20 + (i % 10) * 3}s`,
              '--mdelay': `${-(i * 2.7)}s`,
            }}
          />
        ))}
      </div>

      {/* Light shaft from the glass roof */}
      <div className="gh-env-shaft" />
      {/* Secondary, softer shaft */}
      <div className="gh-env-shaft gh-env-shaft-2" />
    </div>
  );
}
