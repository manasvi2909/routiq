import React, { useEffect, useState, useMemo } from 'react';
import api from '../services/api';
import './Greenhouse.css';
import EmptyConservatory from '../components/greenhouse/EmptyConservatory';
import EntrancePlaque from '../components/greenhouse/EntrancePlaque';
import GreenhouseAtmosphere from '../components/greenhouse/GreenhouseAtmosphere';
import ConservatoryFloor from '../components/greenhouse/ConservatoryFloor';

export default function Greenhouse() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="gh-loading">Opening the conservatory...</div>;
  }

  if (!data) {
    return null;
  }

  const isEmpty = data.collection.total_blooms === 0;

  // Calculate Environmental Density Score
  const densityScore = (data.collection.total_blooms * 1) + 
                       (data.wings.length * 5) + 
                       (data.collection.unique_species * 2);

  let conservatoryTitle = "First Specimen";
  if (densityScore >= 500) {
    conservatoryTitle = "The Living Archive";
  } else if (densityScore >= 200) {
    conservatoryTitle = "The Conservatory";
  } else if (densityScore >= 50) {
    conservatoryTitle = "The Greenhouse";
  } else if (densityScore >= 10) {
    conservatoryTitle = "Cultivation Table";
  }

  return (
    <div className="greenhouse-page">
      <GreenhouseAtmosphere densityScore={densityScore} />

      <div className="greenhouse-width">
        {isEmpty ? (
          <EmptyConservatory />
        ) : (
          <>
            <EntrancePlaque collection={data.collection} densityScore={densityScore} title={conservatoryTitle} />
            <ConservatoryFloor wings={data.wings} />
          </>
        )}
      </div>
    </div>
  );
}
