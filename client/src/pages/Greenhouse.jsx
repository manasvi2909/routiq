import React, { useEffect, useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import api from '../services/api';
import './Greenhouse.css';
import CollectionOverview from '../components/greenhouse/CollectionOverview';
import EmptyConservatory from '../components/greenhouse/EmptyConservatory';
import CollectionWing from '../components/greenhouse/CollectionWing';
import SpecimenPlacard from '../components/greenhouse/SpecimenPlacard';

export default function Greenhouse() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedWings, setExpandedWings] = useState(new Set());
  const [selectedSpecimen, setSelectedSpecimen] = useState(null);
  const [placardAnchorRect, setPlacardAnchorRect] = useState(null);

  useEffect(() => {
    fetchGreenhouse();
  }, []);

  const fetchGreenhouse = async () => {
    try {
      const response = await api.get('/garden/greenhouse');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching greenhouse:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data && expandedWings.size === 0 && data.wings.length > 0) {
      const initial = new Set(
        data.wings
          .slice(0, 3)
          .map(w => w.habit_name)
      );
      setExpandedWings(initial);
    }
  }, [data, expandedWings.size]);

  const filteredWings = useMemo(() => {
    if (!data) return [];
    let wings = data.wings;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      wings = wings.filter(w => w.habit_name.toLowerCase().includes(q));
    }

    return wings;
  }, [data, searchQuery]);

  const toggleWing = (habitName) => {
    setExpandedWings(prev => {
      const next = new Set(prev);
      if (next.has(habitName)) {
        next.delete(habitName);
      } else {
        next.add(habitName);
      }
      return next;
    });
  };

  const openPlacard = (specimen, elementRect) => {
    setSelectedSpecimen(specimen);
    setPlacardAnchorRect(elementRect);
  };

  const closePlacard = () => {
    setSelectedSpecimen(null);
    setPlacardAnchorRect(null);
  };

  if (loading) {
    return <div className="gh-loading">Opening the conservatory...</div>;
  }

  if (!data) {
    return null;
  }

  const isEmpty = data.collection.total_blooms === 0;

  return (
    <div className="greenhouse-page">
      <div className="greenhouse-atmosphere" aria-hidden="true">
        <div className="gh-orb gh-orb-one" />
        <div className="gh-orb gh-orb-two" />
        <div className="gh-orb gh-orb-three" />
      </div>

      <div className="greenhouse-width">
        <header className="gh-header">
          <span className="gh-kicker">Preserved collection</span>
          <h1>The Greenhouse</h1>
          <p className="gh-subtitle">
            A conservatory of every bloom you have cultivated.<br/>
            Each specimen preserved here is evidence of sustained growth.
          </p>
        </header>

        {isEmpty ? (
          <EmptyConservatory />
        ) : (
          <>
            <CollectionOverview collection={data.collection} />

            <div className="gh-search-container">
              <div className="gh-search-pill glass-panel">
                <Search size={18} className="gh-search-icon" />
                <input
                  type="text"
                  placeholder="Search your collection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="gh-search-input"
                />
              </div>
            </div>

            <div className="gh-wings">
              {filteredWings.map(wing => (
                <CollectionWing
                  key={wing.habit_name}
                  wing={wing}
                  isExpanded={expandedWings.has(wing.habit_name)}
                  onToggle={() => toggleWing(wing.habit_name)}
                  onSpecimenClick={openPlacard}
                />
              ))}
              {filteredWings.length === 0 && searchQuery && (
                <div className="gh-no-results">
                  No wings found matching "{searchQuery}".
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {selectedSpecimen && (
        <SpecimenPlacard
          specimen={selectedSpecimen}
          anchorRect={placardAnchorRect}
          onClose={closePlacard}
        />
      )}
    </div>
  );
}
