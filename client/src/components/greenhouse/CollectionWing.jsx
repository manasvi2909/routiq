import React from 'react';
import PreservedBloom from './PreservedBloom';
import BotanicalMarker from './BotanicalMarker';
import './GreenhouseComponents.css';

export default function CollectionWing({ wing }) {
  return (
    <section className="gh-planter-bed" aria-label={`${wing.habit_name} planter bed, ${wing.bloom_count} specimens`}>
      <BotanicalMarker habitName={wing.habit_name} bloomCount={wing.bloom_count} />

      <div className="gh-planter-soil glass-panel">
        <div className="gh-planter-grid">
          {wing.specimens.map(specimen => (
            <PreservedBloom 
              key={specimen.id}
              specimen={specimen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
