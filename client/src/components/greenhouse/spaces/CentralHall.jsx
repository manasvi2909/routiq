import React from 'react';
import StonePlinth from '../architecture/StonePlinth';
import GlassCloche from '../GlassCloche';
import './Spaces.css';

export default function CentralHall({ specimens, onInspect }) {
  if (!specimens || specimens.length === 0) return null;

  return (
    <section className="gh-space gh-space-central-hall">
      <div className="gh-hall-platform">
        {/* Stone platform drawn in SVG */}
        <svg className="gh-platform-base" viewBox="0 0 1000 200" preserveAspectRatio="none">
          <ellipse cx="500" cy="100" rx="450" ry="80" fill="var(--gh-stone-base)" opacity="0.4" />
          <path d="M 50,100 Q 500,200 950,100 L 950,200 L 50,200 Z" fill="var(--gh-stone-dark)" opacity="0.3" />
        </svg>

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
