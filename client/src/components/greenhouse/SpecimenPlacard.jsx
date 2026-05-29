import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import PlantPreview from '../PlantPreview';
import './SpecimenPlacard.css';

export default function SpecimenPlacard({ specimen, anchorRect, onClose }) {
  const placardRef = useRef(null);
  const [position, setPosition] = useState({});

  useEffect(() => {
    if (!anchorRect || !placardRef.current) return;
    
    // Simple positioning logic to stay within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const placardRect = placardRef.current.getBoundingClientRect();
    
    let top = anchorRect.bottom + 12;
    let left = anchorRect.left + (anchorRect.width / 2) - (placardRect.width / 2);
    
    // Adjust if overflowing right
    if (left + placardRect.width > viewportWidth - 20) {
      left = viewportWidth - placardRect.width - 20;
    }
    // Adjust if overflowing left
    if (left < 20) {
      left = 20;
    }
    // Adjust if overflowing bottom (show above instead)
    if (top + placardRect.height > viewportHeight - 20) {
      top = anchorRect.top - placardRect.height - 12;
    }

    setPosition({ top, left });
  }, [anchorRect]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleClickOutside = (e) => {
      if (placardRef.current && !placardRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    // Slight delay to prevent immediate close on the same click that opened it
    setTimeout(() => document.addEventListener('click', handleClickOutside), 10);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  const date = new Date(specimen.grown_at);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Capitalize first letter of plant type
  const speciesName = specimen.plant_type.charAt(0).toUpperCase() + specimen.plant_type.slice(1);

  const content = (
    <div className="gh-placard-overlay">
      <div 
        className="gh-placard glass-panel" 
        ref={placardRef}
        style={window.innerWidth > 720 ? position : {}} // Desktop uses positioning, mobile uses bottom sheet CSS
        role="dialog"
        aria-modal="true"
        aria-label={`${speciesName} specimen placard`}
      >
        <button className="gh-placard-close" onClick={onClose} aria-label="Close placard">
          <X size={20} />
        </button>

        <div className="gh-placard-visual">
          <PlantPreview
            plantType={specimen.plant_type}
            growthStage={specimen.growth_stage_reached || 12}
            fullBloom={true}
            size="xlarge"
          />
        </div>

        <div className="gh-placard-header">
          <h2 className="gh-placard-species">{speciesName}</h2>
          <p className="gh-placard-provenance">
            from the cultivation of <span className="gh-provenance-habit">{specimen.habit_name}</span>
          </p>
        </div>

        <hr className="gh-placard-divider" />

        <div className="gh-placard-details">
          <p>Preserved on {formattedDate}</p>
          <p>Milestone {specimen.milestone_number} of this ritual</p>
          <p>Growth cycle {specimen.growth_cycle_number || 1}, fully bloomed</p>
        </div>

        {specimen.reward_given && (
          <>
            <hr className="gh-placard-divider" />
            <div className="gh-placard-reward">
              <h3>Reward earned</h3>
              <p>"{specimen.reward_given}"</p>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
