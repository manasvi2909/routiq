import React from 'react';
import './ConservatoryColumns.css';

export default function ConservatoryColumns() {
  return (
    <div className="gh-columns-container">
      <svg
        className="gh-columns-svg"
        viewBox="0 0 1600 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="column-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--gh-iron-base)" stopOpacity="0.4" />
            <stop offset="20%" stopColor="var(--gh-iron-base)" stopOpacity="0.8" />
            <stop offset="80%" stopColor="var(--gh-iron-base)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--gh-iron-base)" stopOpacity="0.4" />
          </linearGradient>
          
          <linearGradient id="column-shadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Left Column */}
        <g className="gh-column-left">
          <rect x="100" y="0" width="40" height="800" fill="url(#column-grad)" />
          <rect x="140" y="0" width="10" height="800" fill="url(#column-shadow)" />
          {/* Column Capital/Base details */}
          <rect x="90" y="50" width="60" height="15" fill="var(--gh-iron-base)" opacity="0.9" />
          <rect x="90" y="750" width="60" height="20" fill="var(--gh-iron-base)" opacity="0.9" />
        </g>

        {/* Right Column */}
        <g className="gh-column-right">
          <rect x="1460" y="0" width="40" height="800" fill="url(#column-grad)" />
          <rect x="1450" y="0" width="10" height="800" fill="url(#column-shadow)" />
          {/* Column Capital/Base details */}
          <rect x="1450" y="50" width="60" height="15" fill="var(--gh-iron-base)" opacity="0.9" />
          <rect x="1450" y="750" width="60" height="20" fill="var(--gh-iron-base)" opacity="0.9" />
        </g>

        {/* Center Distant Column (gives depth) */}
        <g className="gh-column-center" opacity="0.3">
          <rect x="790" y="0" width="20" height="800" fill="url(#column-grad)" />
          <rect x="785" y="100" width="30" height="10" fill="var(--gh-iron-base)" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}
