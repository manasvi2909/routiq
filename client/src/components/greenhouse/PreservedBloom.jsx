import React from 'react';
import PlantPreview from '../PlantPreview';
import './GreenhouseComponents.css';

export default function PreservedBloom({ specimen, onClick }) {
  const date = new Date(specimen.grown_at);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  const handleClick = (e) => {
    onClick(specimen, e.currentTarget.getBoundingClientRect());
  };

  return (
    <button
      className="gh-preserved-bloom"
      onClick={handleClick}
      aria-label={`${specimen.plant_type} bloom, milestone ${specimen.milestone_number}, preserved ${formattedDate}`}
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
      <div className="gh-bloom-label-plate">
        {specimen.isFirstBloom && (
          <span className="gh-plate-title">Beginning of Collection</span>
        )}
        <span className="gh-plate-date">{formattedDate}</span>
      </div>
    </button>
  );
}
