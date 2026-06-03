import React from 'react';
import StonePlinth from '../architecture/StonePlinth';
import GlassCloche from '../GlassCloche';
import ConservatoryColumns from '../architecture/ConservatoryColumns';
import './Spaces.css';

export default function ArchiveWing({ specimens, onInspect, index }) {
  if (!specimens || specimens.length === 0) return null;

  return (
    <section className="gh-space gh-space-archive-wing">
      {/* Repeating architectural framing to give the corridor illusion */}
      <ConservatoryColumns />
      
      {/* A winding stone path drawn with SVG */}
      <svg className="gh-wing-path-svg" viewBox="0 0 1000 800" preserveAspectRatio="none">
        <path d="M 400,0 Q 300,400 500,800 L 600,800 Q 400,400 500,0 Z" fill="var(--gh-stone-base)" opacity="0.15" />
      </svg>

      <div className="gh-wing-specimens">
        {specimens.map((specimen, idx) => {
          // Alternate left and right side of the path
          const isLeft = idx % 2 === 0;
          
          return (
            <div key={specimen.id} className={`gh-wing-item ${isLeft ? 'gh-wing-left' : 'gh-wing-right'}`}>
              <StonePlinth>
                <GlassCloche
                  specimen={specimen}
                  placement={{
                    '--cloche-x': '50%',
                    '--cloche-y': '50%',
                    '--cloche-scale': '0.8',
                  }}
                  plane="midground"
                  tier="greenhouse"
                  onInspect={onInspect}
                />
              </StonePlinth>
            </div>
          );
        })}
      </div>
    </section>
  );
}
