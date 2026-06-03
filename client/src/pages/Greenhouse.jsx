import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Greenhouse.css';

// Import modular components
import GreenhouseAtmosphere from '../components/greenhouse/GreenhouseAtmosphere';
import EntrancePlaque from '../components/greenhouse/EntrancePlaque';
import CollectionOverview from '../components/greenhouse/CollectionOverview';
import ConservatoryFloor from '../components/greenhouse/ConservatoryFloor';
import EmptyConservatory from '../components/greenhouse/EmptyConservatory';

export default function Greenhouse() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchGreenhouse() {
      try {
        const response = await api.get('/garden/greenhouse');
        if (mounted) {
          setData(response.data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.response?.data?.error || err.message || 'Failed to open the greenhouse');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchGreenhouse();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="greenhouse-page gh-loading-scene" data-archive-state="empty">
        <GreenhouseAtmosphere densityScore={0} />
        <div className="gh-loading">Opening the preservation glass...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="greenhouse-page gh-loading-scene" data-archive-state="empty">
        <GreenhouseAtmosphere densityScore={0} />
        <div className="gh-loading">{error}</div>
      </main>
    );
  }

  const { collection, wings } = data;
  const totalBlooms = collection?.total_blooms || 0;
  const archiveStateKey = totalBlooms > 0 ? "populated" : "empty";

  return (
    <main className="greenhouse-page" data-archive-state={archiveStateKey}>
      <GreenhouseAtmosphere densityScore={totalBlooms} />

      {totalBlooms === 0 ? (
        <EmptyConservatory />
      ) : (
        <div className="gh-archive-walk" aria-label="Preserved botanical archive">
          <EntrancePlaque 
            title="The Conservatory" 
            collection={collection} 
            densityScore={totalBlooms} 
          />
          <CollectionOverview collection={collection} />
          <ConservatoryFloor wings={wings} />
        </div>
      )}
    </main>
  );
}
