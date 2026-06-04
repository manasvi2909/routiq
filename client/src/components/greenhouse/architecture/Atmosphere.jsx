import React from 'react';
import './Atmosphere.css';

/**
 * Atmosphere
 * 
 * Provides the "subtle life" of the conservatory:
 * slow-shifting light beams and drifting dust motes.
 * This is a fixed overlay that sits behind the architecture.
 */
export default function Atmosphere() {
  return (
    <div className="gh-atmosphere" aria-hidden="true">
      {/* ── Light Shafts ── */}
      <div className="gh-light-shaft gh-shaft-primary" />
      <div className="gh-light-shaft gh-shaft-secondary" />

      {/* ── Dust Motes ── */}
      <div className="gh-dust-particles">
        {[...Array(24)].map((_, i) => (
          <span
            key={`mote-${i}`}
            className="gh-mote"
            style={{
              '--mx': `${5 + (i * 37) % 90}%`,
              '--my': `${10 + (i * 43) % 80}%`,
              '--ms': `${1.5 + (i % 3)}px`,
              '--md': `${20 + (i % 8) * 4}s`,
              '--mdelay': `${-(i * 3.1)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
