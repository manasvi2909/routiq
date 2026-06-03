import React from 'react';
import './HangingVines.css';

export default function HangingVines({ align = 'left', depth = 'foreground' }) {
  // align: 'left' | 'right'
  // depth: 'foreground' | 'midground' | 'background'
  
  return (
    <div className={`gh-hanging-vines gh-vines-${align} gh-vines-${depth}`}>
      <svg
        className="gh-vines-svg"
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`vine-grad-${align}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--gh-vine-dark)" />
            <stop offset="100%" stopColor="var(--gh-vine-light)" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Main vine stalks */}
        <path d="M 50,0 Q 80,200 40,400 T 60,700" fill="none" stroke="url(#vine-grad-left)" strokeWidth="6" strokeLinecap="round" />
        <path d="M 150,0 Q 120,300 180,500 T 140,800" fill="none" stroke="url(#vine-grad-left)" strokeWidth="4" strokeLinecap="round" />
        <path d="M 250,0 Q 280,150 240,350 T 260,600" fill="none" stroke="url(#vine-grad-left)" strokeWidth="8" strokeLinecap="round" />

        {/* Stylized leaves */}
        <g fill="url(#vine-grad-left)" opacity="0.9">
          {/* Vine 1 */}
          <path d="M 55,100 Q 80,90 90,110 Q 70,120 55,100" />
          <path d="M 45,250 Q 20,240 10,260 Q 30,270 45,250" />
          <path d="M 45,450 Q 60,430 75,445 Q 60,460 45,450" />
          
          {/* Vine 2 */}
          <path d="M 140,150 Q 110,130 100,160 Q 130,170 140,150" />
          <path d="M 160,350 Q 190,340 200,360 Q 180,380 160,350" />
          <path d="M 170,600 Q 190,580 200,610 Q 180,630 170,600" />
          
          {/* Vine 3 */}
          <path d="M 260,100 Q 290,80 300,110 Q 280,130 260,100" />
          <path d="M 245,250 Q 215,230 205,260 Q 230,270 245,250" />
          <path d="M 250,450 Q 280,430 290,460 Q 270,480 250,450" />
        </g>
      </svg>
    </div>
  );
}
