import React from 'react';
import StonePlinth from '../architecture/StonePlinth';
import GlassCloche from '../GlassCloche';
import './Spaces.css';

export default function ArchiveWing({ specimens, onInspect, index }) {
  if (!specimens || specimens.length === 0) return null;

  return (
    <section className="gh-space gh-space-archive-wing">
      
      {/* ── Massive Solid Memory Gallery Architecture ── */}
      <svg className="gh-arch-solid" viewBox="0 0 1600 1200" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="wing-floor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#030805" />
            <stop offset="60%" stopColor="#08140e" />
            <stop offset="100%" stopColor="#122c1e" />
          </linearGradient>

          <linearGradient id="wing-arch-face" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#040a07" />
            <stop offset="10%" stopColor="#142c20" />
            <stop offset="90%" stopColor="#142c20" />
            <stop offset="100%" stopColor="#040a07" />
          </linearGradient>
          
          <linearGradient id="wing-balcony" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#050b08" />
            <stop offset="100%" stopColor="#0a1a12" />
          </linearGradient>
          
          <radialGradient id="wing-dest-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--gh-warm, #ffe8b5)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--gh-warm, #ffe8b5)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── DEEP BACKGROUND / DESTINATION ── */}
        <rect x="0" y="0" width="1600" height="1200" fill="#020504" />
        
        {/* Distant Illuminated Doorway / Corridor end */}
        <path d="M 700,600 L 700,450 A 100,100 0 0 1 900,450 L 900,600 Z" fill="#050b08" />
        <rect x="600" y="350" width="400" height="300" fill="url(#wing-dest-glow)" />

        {/* ── BACKGROUND GLASS VAULT ── */}
        {/* Glass panes spanning between the structural arches */}
        <path d="M 300,1200 L 300,500 A 500,250 0 0 1 1300,500 L 1300,1200 Z" fill="#08120e" opacity="0.6" />
        {/* Vault Ribs */}
        {[...Array(7)].map((_, i) => {
          const r = 500 - (i * 50);
          if (r <= 0) return null;
          return <path key={`vault-rib-${i}`} d={`M ${800-r},500 A ${r},${r/2} 0 0 1 ${800+r},500`} fill="none" stroke="#040a07" strokeWidth="6" />;
        })}

        {/* ── FLOOR ── */}
        {/* Receding solid stone floor (1-point perspective down the gallery) */}
        <path d="M 600,600 L 1000,600 L 1600,1200 L 0,1200 Z" fill="url(#wing-floor)" />
        
        {/* Stone Paving Grid in perspective */}
        {/* Horizontal Seams */}
        {[...Array(8)].map((_, i) => {
          const y = 600 + Math.pow(i/7, 2) * 600; // Exponential perspective
          const widthAtY = 400 + Math.pow(i/7, 2) * 1200;
          const x1 = 800 - widthAtY/2;
          const x2 = 800 + widthAtY/2;
          return <line key={`h-seam-${i}`} x1={x1} y1={y} x2={x2} y2={y} stroke="#050b08" strokeWidth="3" opacity="0.8" />;
        })}
        {/* Perspective Lines */}
        <line x1="750" y1="600" x2="300" y2="1200" stroke="#050b08" strokeWidth="4" opacity="0.8" />
        <line x1="850" y1="600" x2="1300" y2="1200" stroke="#050b08" strokeWidth="4" opacity="0.8" />
        
        {/* Gallery Edge Curbs */}
        <path d="M 600,600 L 0,1200 L 0,1150 L 600,550 Z" fill="#050a07" />
        <path d="M 1000,600 L 1600,1200 L 1600,1150 L 1000,550 Z" fill="#050a07" />
        {/* Curb Edge Highlights */}
        <line x1="600" y1="600" x2="0" y2="1200" stroke="#183627" strokeWidth="6" />
        <line x1="1000" y1="600" x2="1600" y2="1200" stroke="#183627" strokeWidth="6" />

        {/* ── MASSIVE STRUCTURAL BAY ARCH ── */}
        {/* Outer arch base shadow */}
        <path d="M 10,1200 L 10,600 A 790,490 0 0 1 1590,600 L 1590,1200" fill="none" stroke="#020504" strokeWidth="40" />
        {/* The solid facing of the arch */}
        <path d="M 100,1200 L 100,600 A 700,400 0 0 1 1500,600 L 1500,1200" fill="none" stroke="url(#wing-arch-face)" strokeWidth="160" />
        {/* Arch inner highlight edge (stone/iron bevel) */}
        <path d="M 175,1200 L 175,600 A 625,325 0 0 1 1425,600 L 1425,1200" fill="none" stroke="#1a3a2a" strokeWidth="8" />
        {/* Arch inner shadow depth (gives thickness to the arch) */}
        <path d="M 180,1200 L 180,600 A 620,320 0 0 1 1420,600 L 1420,1200" fill="none" stroke="#050a07" strokeWidth="25" />

        {/* ── VERTICALITY: SOLID BALCONY / CATWALK (Foreground) ── */}
        {/* Balcony structure running horizontally across the upper view */}
        <rect x="0" y="80" width="1600" height="60" fill="url(#wing-balcony)" />
        {/* Balcony bevels */}
        <rect x="0" y="140" width="1600" height="20" fill="#030805" opacity="0.95" />
        <rect x="0" y="80" width="1600" height="4" fill="#183627" />
        {/* Heavy railing base */}
        <rect x="0" y="30" width="1600" height="20" fill="#0a1a12" />
        {/* Vertical railing posts */}
        {[...Array(65)].map((_, i) => (
          <rect key={`post-${i}`} x={i * 25} y="-20" width="5" height="50" fill="#050a07" />
        ))}
        {/* Top rail */}
        <rect x="0" y="-30" width="1600" height="15" fill="#142c20" />
      </svg>

      <div className="gh-wing-specimens">
        {specimens.map((specimen, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={specimen.id} className={`gh-wing-item ${isLeft ? 'gh-wing-left' : 'gh-wing-right'}`}>
              <StonePlinth>
                <GlassCloche
                  specimen={specimen}
                  placement={{
                    '--cloche-x': '50%',
                    '--cloche-y': '50%',
                    '--cloche-scale': '0.9',
                  }}
                  plane="midground"
                  tier="first-archive"
                  onInspect={onInspect}
                />
              </StonePlinth>
            </div>
          );
        })}
      </div>
    </section>
  );
}
