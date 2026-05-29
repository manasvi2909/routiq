import React, { useEffect, useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import api from '../services/api';
import './Greenhouse.css';
import CollectionOverview from '../components/greenhouse/CollectionOverview';
import EmptyConservatory from '../components/greenhouse/EmptyConservatory';
import CollectionWing from '../components/greenhouse/CollectionWing';
import SpecimenPlacard from '../components/greenhouse/SpecimenPlacard';
import PlantPreview from '../components/PlantPreview';

const SporesAtmosphere = () => {
  // Generate a stable array of random fireflies
  const spores = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      duration: `${Math.random() * 8 + 6}s`,
      delay: `-${Math.random() * 10}s`,
      maxOpacity: Math.random() * 0.5 + 0.3
    }));
  }, []);

  return (
    <div className="gh-spores-container" aria-hidden="true">
      {spores.map(s => (
        <div
          key={s.id}
          className="gh-spore"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDuration: s.duration,
            animationDelay: s.delay,
            '--duration': s.duration,
            '--max-opacity': s.maxOpacity
          }}
        />
      ))}
    </div>
  );
};

const ConservatoryIllustration = () => (
  <div className="gh-illustration">
    <div className="gh-ill-row gh-ill-row-1">
      <div className="gh-ill-plant"><PlantPreview plantType="moonvine" fullBloom size="small" /></div>
    </div>
    <div className="gh-ill-row gh-ill-row-2">
      <div className="gh-ill-plant"><PlantPreview plantType="orchid" fullBloom size="small" /></div>
      <div className="gh-ill-plant"><PlantPreview plantType="fern" fullBloom size="small" /></div>
      <div className="gh-ill-plant"><PlantPreview plantType="bonsai" fullBloom size="small" /></div>
    </div>
    <div className="gh-ill-row gh-ill-row-3">
      <div className="gh-ill-plant"><PlantPreview plantType="fern" fullBloom size="small" /></div>
      <div className="gh-ill-plant"><PlantPreview plantType="bonsai" fullBloom size="small" /></div>
      <div className="gh-ill-plant"><PlantPreview plantType="lotus" fullBloom size="small" /></div>
      <div className="gh-ill-plant"><PlantPreview plantType="orchid" fullBloom size="small" /></div>
      <div className="gh-ill-plant"><PlantPreview plantType="moonvine" fullBloom size="small" /></div>
    </div>
  </div>
);

export default function Greenhouse() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecimen, setSelectedSpecimen] = useState(null);
  const [placardAnchorRect, setPlacardAnchorRect] = useState(null);

  useEffect(() => {
    fetchGreenhouse();
  }, []);

  const fetchGreenhouse = async () => {
    try {
      const response = await api.get('/garden/greenhouse');
      const responseData = response.data;

      // Tag the earliest bloom in the collection
      let oldestSpecimen = null;
      responseData.wings.forEach(wing => {
        wing.specimens.forEach(spec => {
          if (!oldestSpecimen || new Date(spec.grown_at) < new Date(oldestSpecimen.grown_at)) {
            oldestSpecimen = spec;
          }
        });
      });
      if (oldestSpecimen) {
        oldestSpecimen.isFirstBloom = true;
      }

      setData(responseData);
    } catch (error) {
      console.error('Error fetching greenhouse:', error);
    } finally {
      setLoading(false);
    }
  };



  const filteredWings = useMemo(() => {
    if (!data) return [];
    let wings = data.wings;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      wings = wings.filter(w => w.habit_name.toLowerCase().includes(q));
    }

    return wings;
  }, [data, searchQuery]);



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
        <SporesAtmosphere />
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
            <ConservatoryIllustration />
            <CollectionOverview collection={data.collection} />

            {data.collection.total_blooms >= 10 && (
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
            )}

            <div className="gh-wings">
              {filteredWings.map(wing => (
                <CollectionWing
                  key={wing.habit_name}
                  wing={wing}
                  onSpecimenEnter={openPlacard}
                  onSpecimenLeave={closePlacard}
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
