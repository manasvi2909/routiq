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

          <linearGradient id="wing-arch" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#040a07" />
            <stop offset="50%" stopColor="#142c20" />
            <stop offset="100%" stopColor="#040a07" />
          </linearGradient>
          
          <linearGradient id="wing-balcony" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#030805" />
            <stop offset="100%" stopColor="#0a1a12" />
          </linearGradient>
        </defs>

        {/* ── BACKGROUND / FLOOR ── */}
        <rect x="0" y="0" width="1600" height="1200" fill="#030805" />
        
        {/* Receding solid stone floor (1-point perspective down the gallery) */}
        <path d="M 600,600 L 1000,600 L 1600,1200 L 0,1200 Z" fill="url(#wing-floor)" />
        {/* Floor edges / pathways */}
        <path d="M 600,600 L 0,1200" fill="none" stroke="#183627" strokeWidth="8" />
        <path d="M 1000,600 L 1600,1200" fill="none" stroke="#183627" strokeWidth="8" />

        {/* ── VERTICALITY: SOLID BALCONY / CATWALK ── */}
        <rect x="0" y="100" width="1600" height="40" fill="url(#wing-balcony)" />
        {/* Balcony shadow */}
        <rect x="0" y="140" width="1600" height="30" fill="#030805" opacity="0.8" />
        {/* Heavy railing base */}
        <rect x="0" y="60" width="1600" height="15" fill="#0a1a12" />
        {/* Vertical railing posts */}
        {[...Array(33)].map((_, i) => (
          <rect key={`post-${i}`} x={i * 50} y="15" width="8" height="45" fill="#08140e" />
        ))}
        {/* Top rail */}
        <rect x="0" y="0" width="1600" height="15" fill="#142c20" />

        {/* ── MASSIVE STRUCTURAL BAY ARCH ── */}
        {/* The single dominant arch spanning the screen */}
        <path d="M 100,1200 L 100,600 A 700,400 0 0 1 1500,600 L 1500,1200" fill="none" stroke="url(#wing-arch)" strokeWidth="120" />
        {/* Arch inner highlight edge */}
        <path d="M 160,1200 L 160,600 A 640,340 0 0 1 1440,600 L 1440,1200" fill="none" stroke="#183627" strokeWidth="10" />
        {/* Arch outer shadow edge */}
        <path d="M 40,1200 L 40,600 A 760,460 0 0 1 1560,600 L 1560,1200" fill="none" stroke="#040b08" strokeWidth="20" />
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
