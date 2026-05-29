import React from 'react';
import PlantPreview from '../PlantPreview';
import './GreenhouseComponents.css';

export default function PreservedBloom({ specimen, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className="gh-preserved-bloom"
      onMouseEnter={(e) => onMouseEnter && onMouseEnter(specimen, e.currentTarget.getBoundingClientRect())}
      onMouseLeave={onMouseLeave}
      aria-label={`${specimen.plant_type} bloom from ${specimen.habit_name}`}
    >
      <div className="gh-bloom-svg-wrapper">
        <PlantPreview
          plantType={specimen.plant_type}
          growthStage={specimen.growth_stage_reached || 12}
          fullBloom={true}
          size="medium"
        />
        <div className="gh-bloom-pedestal" />
        <div className="gh-bloom-shadow" />
      </div>
    </div>
  );
}
