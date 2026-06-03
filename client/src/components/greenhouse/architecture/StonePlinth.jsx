import React from 'react';
import './StonePlinth.css';

export default function StonePlinth({ children }) {
  return (
    <div className="gh-stone-plinth">
      <svg
        className="gh-plinth-svg"
        viewBox="0 0 300 120"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="plinth-top" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-stone-light)" />
            <stop offset="100%" stopColor="var(--gh-stone-base)" />
          </linearGradient>
          <linearGradient id="plinth-side" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-stone-dark)" />
            <stop offset="100%" stopColor="var(--gh-stone-darker)" />
          </linearGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="150" cy="100" rx="130" ry="15" fill="rgba(0,0,0,0.15)" filter="blur(4px)" />

        {/* Base Cylinder */}
        <path d="M 30,50 L 30,90 Q 150,120 270,90 L 270,50 Z" fill="url(#plinth-side)" />

        {/* Top Surface */}
        <ellipse cx="150" cy="50" rx="120" ry="30" fill="url(#plinth-top)" />
        
        {/* Top Edge Highlight */}
        <ellipse cx="150" cy="48" rx="118" ry="28" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      </svg>
      
      {/* The Cloche sits perfectly inside here */}
      <div className="gh-plinth-content">
        {children}
      </div>
    </div>
  );
}
