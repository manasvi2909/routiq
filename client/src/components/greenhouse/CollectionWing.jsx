import React from 'react';
import PreservedBloom from './PreservedBloom';
import './GreenhouseComponents.css';

export default function CollectionWing({ wing, onSpecimenEnter, onSpecimenLeave }) {
  return (
    <section className="gh-planter-bed" aria-label={`${wing.habit_name} planter bed, ${wing.bloom_count} specimens`}>
      <header className="gh-planter-header">
        <h3 className="gh-planter-title">{wing.habit_name}</h3>
      </header>

      <div className="gh-planter-soil glass-panel">
        <div className="gh-planter-grid">
          {wing.specimens.map(specimen => (
            <PreservedBloom 
              key={specimen.id}
              specimen={specimen}
              onMouseEnter={onSpecimenEnter}
              onMouseLeave={onSpecimenLeave}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
