import React from 'react';
import { X } from 'lucide-react';
import { getPlantById } from '../../constants/plants';
import './MuseumPlacard.css';

function formatDate(value) {
  if (!value) return 'Unknown date';
  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function MuseumPlacard({ specimen, onClose }) {
  if (!specimen) return null;

  const species = getPlantById(specimen.plant_type || 'fern').name;

  return (
    <aside className="gh-placard" aria-live="polite">
      <button
        className="gh-placard-dismiss"
        type="button"
        onClick={onClose}
        aria-label="Close specimen details"
      >
        <X size={13} strokeWidth={2} aria-hidden="true" />
      </button>

      <span className="gh-placard-kicker">Preserved specimen</span>
      <h2 className="gh-placard-species">{species}</h2>

      <dl className="gh-placard-data">
        <div>
          <dt>Habit</dt>
          <dd>{specimen.habit_name}</dd>
        </div>
        <div>
          <dt>Preserved</dt>
          <dd>{formatDate(specimen.grown_at)}</dd>
        </div>
        <div>
          <dt>Milestone</dt>
          <dd>{specimen.milestone_number || 0}</dd>
        </div>
        <div>
          <dt>Growth cycle</dt>
          <dd>{specimen.growth_cycle_number || 1}</dd>
        </div>
      </dl>

      {specimen.reward_given && (
        <p className="gh-placard-reward">
          <span>Reward memory</span>
          {specimen.reward_given}
        </p>
      )}

      {specimen.isFirstBloom && (
        <p className="gh-placard-first">The first preserved bloom in this archive.</p>
      )}
    </aside>
  );
}
