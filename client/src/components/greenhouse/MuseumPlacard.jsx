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

const Ordinals = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
function getOrdinal(num) {
  if (!num) return 'First';
  return Ordinals[num - 1] || `${num}th`;
}

const NumberWords = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
function getNumberWord(num) {
  if (!num) return 'One';
  return NumberWords[num - 1] || String(num);
}

export default function MuseumPlacard({ specimen, onClose }) {
  if (!specimen) return null;

  const species = getPlantById(specimen.plant_type || 'fern').name;
  const ordinalBloom = getOrdinal(specimen.milestone_number || 1);
  const cycleWord = getNumberWord(specimen.growth_cycle_number || 1);

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

      <div className="gh-placard-content">
        <h2 className="gh-placard-species">{species}</h2>

        <p className="gh-placard-narrative">
          Preserved from <em>{specimen.habit_name}</em>
        </p>

        <p className="gh-placard-narrative">
          {formatDate(specimen.grown_at)}
        </p>

        <p className="gh-placard-narrative gh-placard-cycle">
          {ordinalBloom} Bloom • Growth Cycle {cycleWord}
        </p>

        {specimen.isFirstBloom && (
          <p className="gh-placard-narrative gh-placard-first">
            The first preserved bloom in this archive.
          </p>
        )}

        {specimen.reward_given && (
          <div className="gh-placard-reward">
            <span className="gh-placard-reward-label">Reward memory</span>
            <p className="gh-placard-narrative">{specimen.reward_given}</p>
          </div>
        )}
      </div>
    </aside>
  );
}
