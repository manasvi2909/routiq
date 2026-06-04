import React from 'react';
import './Spaces.css';

export default function Entrance({ totalBlooms, tier }) {
  return (
    <section className="gh-space gh-space-entrance">
      <div className="gh-entrance-plaque">
        <h1 className="gh-entrance-title">The Conservatory</h1>
        <div className="gh-entrance-divider" />
        <p className="gh-entrance-subtitle">{tier.label || tier.name}</p>
        <p className="gh-entrance-stats">{totalBlooms} {totalBlooms === 1 ? 'Specimen' : 'Specimens'} Preserved</p>
      </div>
      
      {/* Decorative entrance arch — part of the room, not the environment */}
      <svg className="gh-entrance-arch" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M 100,400 L 100,200 A 300,200 0 0 1 700,200 L 700,400" fill="none" stroke="var(--gh-env-iron, #4a7a63)" strokeWidth="8" opacity="0.3" />
        <path d="M 150,400 L 150,220 A 250,180 0 0 1 650,220 L 650,400" fill="none" stroke="var(--gh-env-iron, #4a7a63)" strokeWidth="4" opacity="0.2" />
      </svg>
    </section>
  );
}
