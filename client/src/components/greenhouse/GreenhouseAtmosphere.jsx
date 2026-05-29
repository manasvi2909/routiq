import React, { useMemo } from 'react';
import './GreenhouseComponents.css'; // Will hold atmosphere styles

export default function GreenhouseAtmosphere({ densityScore }) {
  // Determine Growth State
  let stateClass = 'gh-env-genesis';
  let sporeCount = 0;
  
  if (densityScore >= 500) {
    stateClass = 'gh-env-archive';
    sporeCount = 60;
  } else if (densityScore >= 200) {
    stateClass = 'gh-env-established';
    sporeCount = 40;
  } else if (densityScore >= 50) {
    stateClass = 'gh-env-flourishing';
    sporeCount = 20;
  } else {
    // Genesis: < 50 density
    sporeCount = 5;
  }

  const spores = useMemo(() => {
    return Array.from({ length: sporeCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      duration: `${Math.random() * 8 + 6}s`,
      delay: `-${Math.random() * 10}s`,
      maxOpacity: Math.random() * 0.5 + 0.2
    }));
  }, [sporeCount]);

  return (
    <div className={`greenhouse-atmosphere ${stateClass}`} aria-hidden="true">
      {/* Dynamic ambient lighting depending on state */}
      <div className="gh-light-shaft gh-light-main" />
      {densityScore > 10 && <div className="gh-light-shaft gh-light-secondary" />}

      {/* Spores / Dust Motes */}
      <div className="gh-spores-container">
        {spores.map(s => (
          <div
            key={s.id}
            className="gh-spore"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDuration: s.duration,
              animationDelay: s.delay,
              '--duration': s.duration,
              '--max-opacity': s.maxOpacity
            }}
          />
        ))}
      </div>
    </div>
  );
}
