import React from 'react';
import GlassCloche from '../GlassCloche';
import './Spaces.css';

export default function CentralHall({ specimens, onInspect }) {
  if (!specimens || specimens.length === 0) return null;

  return (
    <section className="gh-space gh-space-central-hall">
      
      {/* ── Massive Solid Sanctuary Court Architecture ── */}
      <svg className="gh-arch-solid" viewBox="0 0 1600 1200" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          {/* Base Floor Material */}
          <linearGradient id="court-floor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#08120e" />
            <stop offset="60%" stopColor="#12251a" />
            <stop offset="100%" stopColor="#0a150e" />
          </linearGradient>

          {/* Dome Glass Material (with Shimmer) */}
          <linearGradient id="court-dome-glass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a3528" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#244534" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#0a150e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#12251a" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="court-glass-shimmer" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Destination Glow */}
          <radialGradient id="dest-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--gh-warm, #ffe8b5)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--gh-warm, #ffe8b5)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── BACKGROUND (Distant Destination & Side Galleries) ── */}
        <rect x="0" y="0" width="1600" height="1200" fill="#020504" />

        {/* The Distant Archway / Conservatory Corridor */}
        {/* Distant Floor */}
        <path d="M 600,800 L 1000,800 L 1100,850 L 500,850 Z" fill="#08120e" />
        
        {/* Massive Archway Opening */}
        <path d="M 550,850 L 550,350 A 250,250 0 0 1 1050,350 L 1050,850 Z" fill="#050b08" />
        {/* Distant glowing bridge crossing the archway */}
        <rect x="550" y="450" width="500" height="15" fill="#08140e" />
        <rect x="550" y="465" width="500" height="2" fill="#183627" />
        {/* Glow behind the bridge */}
        <rect x="650" y="470" width="300" height="200" fill="url(#dest-glow)" />

        {/* Deep background architecture details (distant columns) */}
        <rect x="700" y="470" width="10" height="380" fill="#020504" />
        <rect x="890" y="470" width="10" height="380" fill="#020504" />

        {/* ── SIDE GALLERIES (Visible Openings) ── */}
        {/* Left Side Gallery Arch */}
        <path d="M 0,850 L 0,250 A 250,300 0 0 1 300,250 L 300,850 Z" fill="#040806" />
        {/* Right Side Gallery Arch */}
        <path d="M 1300,850 L 1300,250 A 250,300 0 0 1 1600,250 L 1600,850 Z" fill="#040806" />

        {/* ── THE CONSERVATORY ROOF ── */}
        {/* Solid Glass Vault */}
        <path d="M 150,450 Q 800,-50 1450,450 L 1450,-50 L 150,-50 Z" fill="url(#court-dome-glass)" />
        <path d="M 150,450 Q 800,-50 1450,450" fill="none" stroke="#08140e" strokeWidth="50" />
        <path d="M 150,450 Q 800,-50 1450,450" fill="none" stroke="url(#court-glass-shimmer)" strokeWidth="46" />
        
        {/* Primary Iron Arch Rib */}
        <path d="M 190,470 Q 800,-10 1410,470" fill="none" stroke="#183627" strokeWidth="25" />
        {/* Inner Shadow of Arch */}
        <path d="M 190,480 Q 800,0 1410,480" fill="none" stroke="#040b08" strokeWidth="10" />

        {/* Roof Iron Trusses & Panes */}
        {[...Array(13)].map((_, i) => {
          const x = 250 + i * 91.6; // Spacing out the vertical ribs
          const topY = 120 - Math.sin(((x - 150) / 1300) * Math.PI) * 140;
          return (
            <g key={`truss-${i}`}>
              {/* Vertical Rib */}
              <line x1={x} y1={Math.max(topY, -50)} x2={x} y2="450" stroke="#08140e" strokeWidth="8" />
              <line x1={x-2} y1={Math.max(topY, -50)} x2={x-2} y2="450" stroke="#183627" strokeWidth="2" opacity="0.6" />
            </g>
          );
        })}
        {/* Horizontal Purlins (Glass Pane Separators) */}
        <path d="M 150,350 Q 800,50 1450,350" fill="none" stroke="#08140e" strokeWidth="6" />
        <path d="M 150,250 Q 800,0 1450,250" fill="none" stroke="#08140e" strokeWidth="6" />
        <path d="M 150,150 Q 800,-50 1450,150" fill="none" stroke="#08140e" strokeWidth="6" />


        {/* ── THE ARCHITECTURAL FLOOR ── */}
        {/* Main Stone Paving Base */}
        <ellipse cx="800" cy="850" rx="900" ry="220" fill="url(#court-floor)" />
        
        {/* Concentric Sanctuary Rings (Radial Pattern) */}
        <ellipse cx="800" cy="850" rx="880" ry="210" fill="none" stroke="#183627" strokeWidth="3" opacity="0.5" />
        <ellipse cx="800" cy="850" rx="750" ry="170" fill="none" stroke="#0a150e" strokeWidth="8" />
        <ellipse cx="800" cy="850" rx="740" ry="165" fill="none" stroke="#183627" strokeWidth="2" opacity="0.4" />
        <ellipse cx="800" cy="850" rx="600" ry="130" fill="none" stroke="#0a150e" strokeWidth="12" />
        <ellipse cx="800" cy="850" rx="585" ry="125" fill="none" stroke="#183627" strokeWidth="4" opacity="0.6" />
        
        {/* Radial Seams */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          const x1 = 800 + Math.cos(angle) * 585;
          const y1 = 850 + Math.sin(angle) * 125;
          const x2 = 800 + Math.cos(angle) * 900;
          const y2 = 850 + Math.sin(angle) * 220;
          return <line key={`seam-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#040b08" strokeWidth="4" opacity="0.6" />;
        })}

        {/* ── THE TERRACE (Elevation Transitions) ── */}
        <g transform="translate(0, -10)">
          {/* Floor Contact Shadow */}
          <ellipse cx="800" cy="990" rx="550" ry="90" fill="rgba(0,0,0,0.8)" filter="blur(15px)" />
          
          {/* Base Stone Step */}
          {/* Top Plane */}
          <path d="M 250,1000 Q 800,850 1350,1000 L 1400,1050 Q 800,1170 200,1050 Z" fill="#0f2216" />
          {/* Edge Highlight */}
          <path d="M 250,1000 Q 800,850 1350,1000" fill="none" stroke="#183627" strokeWidth="4" />
          {/* Front Plane */}
          <path d="M 200,1050 Q 800,1170 1400,1050 L 1400,1120 Q 800,1240 200,1120 Z" fill="#050a07" />
          
          {/* Middle Stone Step */}
          {/* Top Plane */}
          <path d="M 300,980 Q 800,850 1300,980 L 1330,1020 Q 800,1120 270,1020 Z" fill="#12251a" />
          {/* Edge Highlight */}
          <path d="M 300,980 Q 800,850 1300,980" fill="none" stroke="#1a3528" strokeWidth="4" />
          {/* Front Plane */}
          <path d="M 270,1020 Q 800,1120 1330,1020 L 1330,1060 Q 800,1160 270,1060 Z" fill="#08120e" />

          {/* Top Stone Step (Cloche Surface) */}
          {/* Top Plane */}
          <path d="M 350,960 Q 800,840 1250,960 L 1280,1000 Q 800,1100 320,1000 Z" fill="#142c20" />
          {/* Stone Seams on Top Step */}
          <path d="M 600,915 L 580,1035" fill="none" stroke="#0a150e" strokeWidth="3" />
          <path d="M 1000,915 L 1020,1035" fill="none" stroke="#0a150e" strokeWidth="3" />
          {/* Edge Highlight */}
          <path d="M 350,960 Q 800,840 1250,960" fill="none" stroke="#1c402f" strokeWidth="5" />
          {/* Front Plane */}
          <path d="M 320,1000 Q 800,1100 1280,1000 L 1280,1030 Q 800,1130 320,1030 Z" fill="#050a07" />
        </g>

        {/* ── FOREGROUND PILLARS (Framing the Archways) ── */}
        {/* Left massive pillar framing the left gallery */}
        <rect x="250" y="0" width="140" height="1200" fill="#040b08" />
        {/* Left inner trim (highlight) */}
        <rect x="370" y="0" width="20" height="1200" fill="#08140e" />
        <rect x="390" y="0" width="5" height="1200" fill="#12251a" />
        {/* Left pillar base block */}
        <rect x="230" y="800" width="180" height="400" fill="#030805" />
        <rect x="230" y="800" width="180" height="15" fill="#0a150e" />
        
        {/* Right massive pillar framing the right gallery */}
        <rect x="1210" y="0" width="140" height="1200" fill="#040b08" />
        {/* Right inner trim (highlight) */}
        <rect x="1210" y="0" width="20" height="1200" fill="#08140e" />
        <rect x="1205" y="0" width="5" height="1200" fill="#12251a" />
        {/* Right pillar base block */}
        <rect x="1190" y="800" width="180" height="400" fill="#030805" />
        <rect x="1190" y="800" width="180" height="15" fill="#0a150e" />
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
                <GlassCloche
                  specimen={specimen}
                  placement={placement}
                  plane={isCenter ? 'foreground' : 'midground'}
                  tier={isCenter ? 'sanctuary' : 'botanical-archive'}
                  onInspect={onInspect}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
