import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Greenhouse.css';

// Architecture
import GlassRoof from '../components/greenhouse/architecture/GlassRoof';

// Spaces
import Entrance from '../components/greenhouse/spaces/Entrance';
import CentralHall from '../components/greenhouse/spaces/CentralHall';
import ArchiveWing from '../components/greenhouse/spaces/ArchiveWing';

// Details
import MuseumPlacard from '../components/greenhouse/MuseumPlacard';

/* ─── Tier Definitions ─── */
const TIERS = [
  { key: 'empty',              name: 'Unseeded Chamber', zoneSize: 1,  particles: 8,  threshold: 0 },
  { key: 'sanctuary',          name: 'Sanctuary',        zoneSize: 3,  particles: 12, threshold: 1 },
  { key: 'first-archive',      name: 'First Archive',    zoneSize: 8,  particles: 16, threshold: 4 },
  { key: 'conservatory-wing',  name: 'Conservatory Wing',zoneSize: 16, particles: 22, threshold: 21 },
  { key: 'botanical-archive',  name: 'Botanical Archive',zoneSize: 28, particles: 28, threshold: 101 },
  { key: 'living-archive',     name: 'Living Archive',   zoneSize: 48, particles: 34, threshold: 501 },
];

function getTier(totalBlooms) {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (totalBlooms >= TIERS[i].threshold) return TIERS[i];
  }
  return TIERS[0];
}

/* ─── Data Normalization ─── */
function normalizeSpecimens(data) {
  const wings = data?.wings || [];
  const specimens = wings
    .flatMap((wing) =>
      (wing.specimens || []).map((specimen) => ({
        ...specimen,
        habit_name: specimen.habit_name || wing.habit_name || 'Archived Ritual',
      }))
    )
    .sort((a, b) => new Date(b.grown_at || 0) - new Date(a.grown_at || 0)); // Sort newest first for Central Hall

  if (specimens.length > 0) {
    specimens[0] = { ...specimens[0], isFirstBloom: true };
  }

  return specimens;
}

/* ═══════════════════════════════════════════════════════════════
   THE GREENHOUSE
   A structured architectural world.
   ═══════════════════════════════════════════════════════════════ */

export default function Greenhouse() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inspected, setInspected] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchGreenhouse() {
      try {
        const response = await api.get('/garden/greenhouse');
        if (mounted) setData(response.data);
      } catch (err) {
        if (mounted) setError(err.response?.data?.error || err.message || 'Failed to open the greenhouse');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchGreenhouse();
    return () => { mounted = false; };
  }, []);

  const specimens = useMemo(() => normalizeSpecimens(data), [data]);
  const totalBlooms = data?.collection?.total_blooms ?? specimens.length;
  const tier = useMemo(() => getTier(totalBlooms), [totalBlooms]);

  const handleInspect = (specimen) => setInspected(specimen);
  const handleClose = () => setInspected(null);

  /* ── Loading State ── */
  if (loading) {
    return (
      <main className="greenhouse-page gh-loading-state" data-archive-state="empty">
        <GlassRoof />
        <span className="gh-loading-text">Opening the conservatory…</span>
      </main>
    );
  }

  /* ── Error State ── */
  if (error) {
    return (
      <main className="greenhouse-page gh-loading-state" data-archive-state="empty">
        <GlassRoof />
        <span className="gh-loading-text">{error}</span>
      </main>
    );
  }

  /* ── Organize Collection into Rooms ── */
  // We place the 3 most recent/important in the Central Hall, the rest in Archive Wings
  const centralSpecimens = specimens.slice(0, 3);
  const archiveSpecimens = specimens.slice(3);
  
  // Group archive specimens into chunks of 4 to create distinct wings if necessary
  const wings = [];
  for (let i = 0; i < archiveSpecimens.length; i += 4) {
    wings.push(archiveSpecimens.slice(i, i + 4));
  }

  return (
    <main className="greenhouse-page" data-archive-state={tier.key}>
      {/* The persistent Glass Vault architecture over the entire page */}
      <GlassRoof />

      {/* ── Space 1: The Foyer ── */}
      <Entrance totalBlooms={totalBlooms} tier={tier} />

      {/* ── Space 2: The Central Hall ── */}
      {totalBlooms > 0 ? (
        <CentralHall specimens={centralSpecimens} onInspect={handleInspect} />
      ) : (
        <div className="gh-empty-sanctuary">
          <div className="gh-empty-text">
            <span>Awaiting first preservation</span>
            <h1>The archive is ready.</h1>
            <p>Complete a growth cycle and the first preserved specimen will take its place here.</p>
            <Link to="/habits" className="gh-empty-link">Return to the registry</Link>
          </div>
        </div>
      )}

      {/* ── Space 3: The Archive Wings ── */}
      {wings.map((wingSpecimens, idx) => (
        <ArchiveWing key={`wing-${idx}`} index={idx} specimens={wingSpecimens} onInspect={handleInspect} />
      ))}

      {/* Museum Placard Overlay */}
      <MuseumPlacard
        specimen={inspected}
        onClose={handleClose}
      />
    </main>
  );
}
