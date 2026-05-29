import React, { useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PlantPreview from '../PlantPreview';
import SpecimenShelf from './SpecimenShelf';
import './GreenhouseComponents.css';

export default function CollectionWing({ wing, isExpanded, onToggle, onSpecimenClick }) {
  const contentRef = useRef(null);

  return (
    <section className="gh-wing" aria-label={`${wing.habit_name} wing, ${wing.bloom_count} specimens`}>
      <header 
        className="gh-wing-header glass-panel" 
        onClick={onToggle}
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(); }}
      >
        <div className="gh-wing-header-left">
          <div className="gh-wing-species-indicator">
            <PlantPreview 
              plantType={wing.primary_species}
              growthStage={12}
              fullBloom={true}
              size="small"
            />
          </div>
          <div>
            <h3 className="gh-wing-title">{wing.habit_name}</h3>
            <span className="gh-wing-count">
              {wing.bloom_count} preserved specimen{wing.bloom_count !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        
        <div className="gh-wing-explore">
          <span className="gh-explore-text">
            {isExpanded ? 'Close wing' : 'Explore wing'}
          </span>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </header>

      <div 
        className="gh-wing-body-wrapper"
        style={{
          display: 'grid',
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 320ms ease-in-out'
        }}
      >
        <div className="gh-wing-body-content" ref={contentRef} style={{ overflow: 'hidden' }}>
          <div className="gh-wing-body-inner">
            {isExpanded && (
              <SpecimenShelf 
                specimens={wing.specimens} 
                onSpecimenClick={onSpecimenClick} 
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
