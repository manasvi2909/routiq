import React from 'react';
import './GlassRoof.css';

export default function GlassRoof() {
  return (
    <div className="gh-glass-roof-container">
      <svg
        className="gh-glass-roof-svg"
        viewBox="0 0 1600 400"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="roof-glass-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-glass-light)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--gh-glass-light)" stopOpacity="0.0" />
          </linearGradient>

          <linearGradient id="roof-rib-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-iron-dark)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--gh-iron-dark)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Vast Arched Vault - Glass Background */}
        <path d="M 0,200 Q 800,-150 1600,200 L 1600,0 L 0,0 Z" fill="url(#roof-glass-grad)" />

        {/* Structural Iron Arches */}
        <path d="M 0,200 Q 800,-150 1600,200" fill="none" stroke="url(#roof-rib-grad)" strokeWidth="12" />
        <path d="M -200,250 Q 800,-50 1800,250" fill="none" stroke="url(#roof-rib-grad)" strokeWidth="8" opacity="0.6" />
        <path d="M -400,300 Q 800,50 2000,300" fill="none" stroke="url(#roof-rib-grad)" strokeWidth="4" opacity="0.4" />

        {/* Vertical Iron Ribs intersecting the arch */}
        {[...Array(21)].map((_, i) => {
          const x = i * 80;
          return (
            <line
              key={`rib-${i}`}
              x1={x}
              y1="0"
              x2={x}
              y2={400}
              stroke="url(#roof-rib-grad)"
              strokeWidth="2"
              opacity="0.5"
            />
          );
        })}

        {/* Horizontal mullions */}
        <line x1="0" y1="50" x2="1600" y2="50" stroke="url(#roof-rib-grad)" strokeWidth="2" opacity="0.3" />
        <line x1="0" y1="100" x2="1600" y2="100" stroke="url(#roof-rib-grad)" strokeWidth="2" opacity="0.3" />
        <line x1="0" y1="150" x2="1600" y2="150" stroke="url(#roof-rib-grad)" strokeWidth="2" opacity="0.3" />

        {/* Grand Center Cupola Line */}
        <line x1="800" y1="0" x2="800" y2="400" stroke="url(#roof-rib-grad)" strokeWidth="6" opacity="0.9" />
      </svg>
    </div>
  );
}
