import React from 'react';
import StonePlinth from '../architecture/StonePlinth';
import GlassCloche from '../GlassCloche';
import './Spaces.css';

export default function CentralHall({ specimens, onInspect }) {
  if (!specimens || specimens.length === 0) return null;

  return (
    <section className="gh-space gh-space-central-hall">
      
      {/* ── Massive Solid Sanctuary Court Architecture ── */}
      <svg className="gh-arch-solid" viewBox="0 0 1600 1200" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="court-floor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#08120e" />
            <stop offset="40%" stopColor="#12251a" />
            <stop offset="100%" stopColor="#0a150e" />
          </linearGradient>

          <linearGradient id="court-dome-glass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a3528" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0a150e" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="court-arch-glow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffd080" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ffd080" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── BACKGROUND ── */}
        {/* Deep background wall */}
        <rect x="0" y="0" width="1600" height="1200" fill="#030805" />

        {/* Distant Illuminated Archway (Destination: Memory Gallery) */}
        <path d="M 650,750 L 650,450 A 150,150 0 0 1 950,450 L 950,750 Z" fill="#08140e" />
        <path d="M 650,750 L 650,450 A 150,150 0 0 1 950,450 L 950,750 Z" fill="url(#court-arch-glow)" />
        {/* Archway trim */}
        <path d="M 630,750 L 630,450 A 170,170 0 0 1 970,450 L 970,750" fill="none" stroke="#12281e" strokeWidth="15" />

        {/* Massive Vaulted Glass Dome (Solid panes, not just lines) */}
        <path d="M 100,400 Q 800,0 1500,400 L 1500,0 L 100,0 Z" fill="url(#court-dome-glass)" />
        <path d="M 100,400 Q 800,0 1500,400" fill="none" stroke="#08140e" strokeWidth="40" />
        <path d="M 140,420 Q 800,40 1460,420" fill="none" stroke="#183627" strokeWidth="20" />
        
        {/* Dome Glass Ribs */}
        {[...Array(9)].map((_, i) => {
          const x = 300 + i * 125;
          const topY = 150 - Math.sin(((x - 100) / 1400) * Math.PI) * 100;
          return <line key={`rib-${i}`} x1={x} y1={topY} x2={x} y2="400" stroke="#08140e" strokeWidth="12" />;
        })}

        {/* ── MIDGROUND FLOOR ── */}
        {/* Circular stone floor platform filling the lower half */}
        <ellipse cx="800" cy="850" rx="900" ry="250" fill="url(#court-floor)" />
        {/* Floor edge highlight */}
        <ellipse cx="800" cy="850" rx="900" ry="250" fill="none" stroke="#183627" strokeWidth="6" />

        {/* Raised stone terrace for the cloches */}
        {/* Shadow */}
        <ellipse cx="800" cy="980" rx="450" ry="80" fill="rgba(0,0,0,0.6)" filter="blur(15px)" />
        {/* Base Tier */}
        <path d="M 250,1000 Q 800,880 1350,1000 L 1400,1050 Q 800,1170 200,1050 Z" fill="#0f2216" />
        <path d="M 200,1050 Q 800,1170 1400,1050 L 1400,1100 Q 800,1220 200,1100 Z" fill="#050a07" />
        {/* Top Tier (where cloches sit) */}
        <path d="M 350,960 Q 800,860 1250,960 L 1300,1000 Q 800,1100 300,1000 Z" fill="#142c20" />
        <path d="M 300,1000 Q 800,1100 1300,1000 L 1300,1020 Q 800,1120 300,1020 Z" fill="#08140e" />
        
        {/* ── FOREGROUND ── */}
        {/* Massive opaque framing pillars cutting off the sides (creates the room) */}
        <rect x="0" y="0" width="150" height="1200" fill="#040b08" />
        <rect x="150" y="0" width="20" height="1200" fill="#08140e" />
        
        <rect x="1450" y="0" width="150" height="1200" fill="#040b08" />
        <rect x="1430" y="0" width="20" height="1200" fill="#08140e" />
      </svg>

      <div className="gh-hall-platform">
        <div className="gh-hall-specimens">
          {specimens.map((specimen, idx) => {
            const isCenter = idx === 0;
            const placement = {
              '--cloche-x': '50%',
              '--cloche-y': '50%',
              '--cloche-scale': isCenter ? '1.2' : '0.9',
            };
            
            return (
              <div key={specimen.id} className={`gh-hall-item ${isCenter ? 'gh-hall-center' : `gh-hall-side gh-hall-side-${idx}`}`}>
                <StonePlinth>
                  <GlassCloche
                    specimen={specimen}
                    placement={placement}
                    plane={isCenter ? 'foreground' : 'midground'}
                    tier={isCenter ? 'sanctuary' : 'botanical-archive'}
                    onInspect={onInspect}
                  />
                </StonePlinth>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
