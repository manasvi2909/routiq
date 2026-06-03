import React, { useMemo } from 'react';
import PlantPreview from '../PlantPreview';
import { getPlantById } from '../../constants/plants';
import './GlassCloche.css';

function hashSeed(value) {
  const text = String(value);
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function formatDate(value) {
  if (!value) return 'Unknown date';
  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function GlassCloche({ specimen, placement, tier, onInspect }) {
  const species = getPlantById(specimen.plant_type || 'fern').name;

  const breatheStyle = useMemo(() => {
    const seed = hashSeed(specimen.id);
    return {
      ...placement,
      '--cloche-breathe-duration': `${10 + (seed % 6)}s`,
      '--cloche-breathe-delay': `${(seed % 14) * -1}s`,
      '--cloche-aura-duration': `${14 + (seed % 8)}s`,
    };
  }, [specimen.id, placement]);

  const isSanctuary = tier === 'sanctuary';
  const size = isSanctuary ? 'large' : 'medium';

  return (
    <button
      className="gh-cloche"
      type="button"
      style={breatheStyle}
      data-specimen-id={specimen.id}
      onClick={() => onInspect(specimen)}
      onMouseEnter={() => onInspect(specimen)}
      aria-label={`${species} specimen from ${specimen.habit_name}, preserved ${formatDate(specimen.grown_at)}`}
    >
      {/* Warm aura behind the bloom */}
      <span className="gh-cloche-aura" />

      {/* Glass dome */}
      <span className="gh-cloche-dome" />

      {/* The preserved bloom itself */}
      <span className="gh-cloche-bloom">
        <PlantPreview
          plantType={specimen.plant_type}
          growthStage={specimen.growth_stage_reached}
          fullBloom
          size={size}
        />
      </span>

      {/* Brass pedestal base */}
      <span className="gh-cloche-pedestal" />

      {/* Ground shadow */}
      <span className="gh-cloche-shadow" />
    </button>
  );
}
