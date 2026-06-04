import React from 'react';
import './Spaces.css';

export default function Entrance({ totalBlooms, tier }) {
  return (
    <section className="gh-space gh-space-entrance">
      
      {/* ── Massive Solid Foyer Architecture ── */}
      <svg className="gh-arch-solid" viewBox="0 0 1600 900" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          {/* Solid iron gradients for 3D mass */}
          <linearGradient id="foyer-col-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#08140e" />  {/* Deep shadow */}
            <stop offset="85%" stopColor="#142c20" /> {/* Mid-tone */}
            <stop offset="100%" stopColor="#050a07" /> {/* Inner edge shadow */}
          </linearGradient>
          
          <linearGradient id="foyer-col-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#050a07" />
            <stop offset="15%" stopColor="#142c20" />
            <stop offset="100%" stopColor="#08140e" />
          </linearGradient>

          <linearGradient id="foyer-lintel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#08140e" />
            <stop offset="70%" stopColor="#12281e" />
            <stop offset="100%" stopColor="#030805" />
          </linearGradient>
          
          <linearGradient id="foyer-light" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-warm, #ffe8b5)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--gh-warm, #ffe8b5)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Central glowing threshold leading to Sanctuary */}
        <path d="M 400,900 L 400,400 Q 800,200 1200,400 L 1200,900 Z" fill="url(#foyer-light)" />

        {/* Solid Heavy Iron Lintel (Top) */}
        <rect x="0" y="0" width="1600" height="200" fill="url(#foyer-lintel)" />
        {/* Lintel bottom trim / shadow ledge */}
        <rect x="0" y="200" width="1600" height="25" fill="#040b08" />
        <rect x="0" y="225" width="1600" height="10" fill="#183627" />

        {/* Solid Heavy Left Column */}
        <rect x="0" y="0" width="280" height="900" fill="url(#foyer-col-left)" />
        {/* Left inner trim */}
        <rect x="280" y="0" width="30" height="900" fill="#183627" />
        <rect x="310" y="0" width="15" height="900" fill="#050a07" />

        {/* Solid Heavy Right Column */}
        <rect x="1320" y="0" width="280" height="900" fill="url(#foyer-col-right)" />
        {/* Right inner trim */}
        <rect x="1290" y="0" width="30" height="900" fill="#183627" />
        <rect x="1275" y="0" width="15" height="900" fill="#050a07" />

        {/* Thick foreground framing brackets (top corners) */}
        <path d="M 325,235 L 500,235 L 325,400 Z" fill="#0a1610" />
        <path d="M 1275,235 L 1100,235 L 1275,400 Z" fill="#0a1610" />
      </svg>

      <div className="gh-entrance-plaque">
        <h1 className="gh-entrance-title">The Conservatory</h1>
        <div className="gh-entrance-divider" />
        <p className="gh-entrance-subtitle">{tier.label || tier.name}</p>
        <p className="gh-entrance-stats">{totalBlooms} {totalBlooms === 1 ? 'Specimen' : 'Specimens'} Preserved</p>
      </div>
    </section>
  );
}
