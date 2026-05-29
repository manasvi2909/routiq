import React from 'react';
import './GreenhouseComponents.css';

export default function CollectionOverview({ collection }) {
  const { total_blooms, species_cultivated, earliest_bloom, latest_bloom, most_cultivated } = collection;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatLatestDate = (dateString) => {
    const diffDays = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    return formatDate(dateString);
  };

  return (
    <div className="gh-overview-panel glass-panel">
      <div className="gh-overview-content">
        <h2>THE COLLECTION</h2>
        <p>
          This conservatory holds <span className="gh-overview-data">{total_blooms}</span> preserved bloom{total_blooms !== 1 ? 's' : ''} across <span className="gh-overview-data">{species_cultivated}</span> cultivated species, spanning from <span className="gh-overview-data">{formatDate(earliest_bloom)}</span> to <span className="gh-overview-data">{formatDate(latest_bloom)}</span>.
        </p>
        
        {most_cultivated && (
          <p>
            The most cultivated ritual is <span className="gh-overview-data">{most_cultivated.habit_name}</span>, which has produced <span className="gh-overview-data">{most_cultivated.bloom_count}</span> specimen{most_cultivated.bloom_count !== 1 ? 's' : ''}.
          </p>
        )}

        {latest_bloom && (
          <p className="gh-overview-latest">
            Newest bloom preserved <span className="gh-overview-data">{formatLatestDate(latest_bloom)}</span>.
          </p>
        )}
      </div>
    </div>
  );
}
