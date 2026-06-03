import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import GlassCloche from '../components/greenhouse/GlassCloche';
import MuseumPlacard from '../components/greenhouse/MuseumPlacard';
import './Greenhouse.css';

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

/* ─── Deterministic hash for specimen variation ─── */

function hashSeed(value) {
  const text = String(value);
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
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
    .sort((a, b) => new Date(a.grown_at || 0) - new Date(b.grown_at || 0));

  if (specimens.length > 0) {
    specimens[0] = { ...specimens[0], isFirstBloom: true };
  }

  return specimens;
}

/* ─── Zone Creation ─── */

function createZones(specimens, tier) {
  if (specimens.length === 0) return [];

  const zones = [];
  const zoneSize = tier.zoneSize;

  for (let start = 0; start < specimens.length; start += zoneSize) {
    const zoneSpecimens = specimens.slice(start, start + zoneSize);
    const habits = [...new Set(zoneSpecimens.map((s) => s.habit_name))];
    zones.push({
      id: `zone-${start}`,
      index: zones.length,
      specimens: zoneSpecimens,
      habitName: habits.length === 1 ? habits[0] : null,
    });
  }

  return zones;
}

/* ─── Specimen Placement Algorithm ─── */

function computePlacement(specimen, localIndex, totalInZone, tierKey) {
  if (tierKey === 'sanctuary') {
    const sanctuaryPositions = [
      { x: 50, y: 50, scale: 1.28, depth: 5 },
      { x: 35, y: 60, scale: 0.92, depth: 4 },
      { x: 65, y: 58, scale: 0.94, depth: 4 },
    ];
    const pos = sanctuaryPositions[localIndex] || sanctuaryPositions[0];
    return {
      '--cloche-x': `${pos.x}%`,
      '--cloche-y': `${pos.y}%`,
      '--cloche-scale': pos.scale,
      '--cloche-depth': pos.depth,
    };
  }

  const seed = hashSeed(`${specimen.id}-${localIndex}`);
  const progress = totalInZone <= 1 ? 0.5 : localIndex / (totalInZone - 1);
  const curve = Math.sin(progress * Math.PI);
  const side = localIndex % 2 === 0 ? -1 : 1;
  const drift = ((seed % 15) - 7) * 0.8;

  const x = 50 + side * (13 + curve * 18) + drift;
  const y = 14 + progress * 72 + ((seed % 9) - 4) * 0.5;
  const depth = 1 + Math.round(curve * 4);
  const scale = 0.78 + curve * 0.3 + (seed % 7) * 0.012;

  return {
    '--cloche-x': `${Math.min(86, Math.max(14, x))}%`,
    '--cloche-y': `${Math.min(88, Math.max(12, y))}%`,
    '--cloche-scale': scale.toFixed(2),
    '--cloche-depth': depth,
  };
}

/* ─── Dust Mote Generation ─── */

function generateDustMotes(count, tierKey) {
  return Array.from({ length: count }, (_, i) => {
    const seed = hashSeed(`${tierKey}-mote-${i}`);
    return {
      id: `mote-${i}`,
      style: {
        '--mote-x': `${seed % 96}%`,
        '--mote-y': `${10 + (seed % 78)}%`,
        '--mote-size': `${1.5 + (seed % 3)}px`,
        '--mote-drift': `${15 + (seed % 35)}px`,
        '--mote-duration': `${16 + (seed % 20)}s`,
        '--mote-delay': `${(seed % 26) * -1}s`,
        '--mote-opacity': `${0.15 + (seed % 20) / 100}`,
      },
    };
  });
}

/* ─── Zone Active Tracking ─── */

function useActiveZones(zoneCount) {
  const [active, setActive] = useState(() => new Set([0]));

  useEffect(() => {
    if (zoneCount === 0 || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        setActive((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const idx = Number(entry.target.dataset.zoneIdx);
            if (entry.isIntersecting) {
              next.add(idx);
              next.add(idx - 1);
              next.add(idx + 1);
            }
          });
          return next;
        });
      },
      { rootMargin: '360px 0px' }
    );

    document.querySelectorAll('[data-zone-observe]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [zoneCount]);

  return active;
}


/* ═══════════════════════════════════════════════════════════════
   THE GREENHOUSE
   A place the user enters. Not a page they read.
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
  const zones = useMemo(() => createZones(specimens, tier), [specimens, tier]);
  const dustMotes = useMemo(() => generateDustMotes(tier.particles, tier.key), [tier]);
  const activeZones = useActiveZones(zones.length);

  const showArchways = tier.key === 'conservatory-wing' || tier.key === 'botanical-archive' || tier.key === 'living-archive';

  const handleInspect = (specimen) => setInspected(specimen);
  const handleClose = () => setInspected(null);

  /* ── Environmental Layers (always rendered) ── */

  function renderEnvironment() {
    return (
      <>
        {/* LAYER 7 — Glass Ceiling */}
        <div className="gh-ceiling" aria-hidden="true" />

        {/* LAYER 6 — Hanging Canopy */}
        <div className="gh-canopy" aria-hidden="true">
          <div className="gh-vine gh-vine-1" />
          <div className="gh-vine gh-vine-2" />
          <div className="gh-vine gh-vine-3" />
          <div className="gh-vine gh-vine-4" />
          <div className="gh-vine gh-vine-5" />
          <div className="gh-vine gh-vine-6" />
        </div>

        {/* LAYER 5 — Atmosphere */}
        <div className="gh-atmosphere" aria-hidden="true">
          <div className="gh-shaft gh-shaft-primary" />
          <div className="gh-shaft gh-shaft-secondary" />
          <div className="gh-glass-reflection gh-reflection-a" />
          <div className="gh-glass-reflection gh-reflection-b" />
          <div className="gh-shadow-drift" />
          <div className="gh-mist gh-mist-floor" />
          <div className="gh-mist gh-mist-mid" />
          {dustMotes.map((mote) => (
            <span key={mote.id} className="gh-dust-mote" style={mote.style} />
          ))}
        </div>

        {/* LAYER 4 — Architectural Frame */}
        <div className="gh-frame" aria-hidden="true">
          <div className="gh-column gh-column-left" />
          <div className="gh-column gh-column-right" />
          <div className="gh-arch gh-arch-main" />
          <div className="gh-arch gh-arch-secondary" />
        </div>

        {/* LAYER 2 — Foreground Vegetation */}
        <div className="gh-foreground" aria-hidden="true">
          <div className="gh-fern gh-fern-left" />
          <div className="gh-fern gh-fern-right" />
          <div className="gh-moss-edge" />
        </div>

        {/* LAYER 1 — Glass Condensation */}
        <div className="gh-condensation" aria-hidden="true" />
      </>
    );
  }

  /* ── Loading State ── */

  if (loading) {
    return (
      <main className="greenhouse-page gh-loading-state" data-archive-state="empty">
        {renderEnvironment()}
        <span className="gh-loading-text">Opening the preservation glass…</span>
      </main>
    );
  }

  /* ── Error State ── */

  if (error) {
    return (
      <main className="greenhouse-page gh-loading-state" data-archive-state="empty">
        {renderEnvironment()}
        <span className="gh-loading-text">{error}</span>
      </main>
    );
  }

  /* ── Empty Sanctuary (0 blooms) ── */

  if (totalBlooms === 0) {
    return (
      <main className="greenhouse-page" data-archive-state="empty">
        {renderEnvironment()}

        <div className="gh-empty-sanctuary">
          <div className="gh-empty-pedestal">
            <span className="gh-empty-cloche" />
            <span className="gh-empty-light" aria-hidden="true" />
            <span className="gh-empty-shadow" aria-hidden="true" />
          </div>
          <div className="gh-empty-text">
            <span>Awaiting first preservation</span>
            <h1>The archive is ready.</h1>
            <p>Complete a growth cycle and the first preserved specimen will take its place here.</p>
            <Link to="/habits" className="gh-empty-link">Return to the registry</Link>
          </div>
        </div>

        <div className="gh-whisper" aria-hidden="true">
          <span>{tier.name}</span>
        </div>
      </main>
    );
  }

  /* ── Populated Walk ── */

  return (
    <main className="greenhouse-page" data-archive-state={tier.key}>
      {renderEnvironment()}

      {/* LAYER 3 — The Specimen Walk */}
      <div className="gh-walk" aria-label="Preserved botanical archive">
        <div className="gh-path" aria-hidden="true" />

        {zones.map((zone, zoneIdx) => {
          const isActive = activeZones.has(zone.index);

          return (
            <section
              key={zone.id}
              className="gh-zone"
              data-zone-observe
              data-zone-idx={zone.index}
              aria-label={zone.habitName ? `${zone.habitName} specimens` : `Archive zone ${zone.index + 1}`}
            >
              {zone.habitName && (
                <div className="gh-stone-inscription">
                  <span>{zone.habitName}</span>
                </div>
              )}

              {showArchways && zoneIdx > 0 && <div className="gh-iron-archway" aria-hidden="true" />}

              {zone.specimens.map((specimen, localIdx) => {
                const placement = computePlacement(
                  specimen,
                  localIdx,
                  zone.specimens.length,
                  tier.key
                );

                return (
                  <GlassCloche
                    key={specimen.id}
                    specimen={specimen}
                    placement={placement}
                    tier={tier.key}
                    onInspect={handleInspect}
                  />
                );
              })}
            </section>
          );
        })}
      </div>

      {/* Museum Placard */}
      <MuseumPlacard
        specimen={inspected}
        onClose={handleClose}
      />

      {/* Archive Whisper */}
      <div className="gh-whisper" aria-hidden="true">
        <span>{tier.name} · {totalBlooms} preserved</span>
      </div>
    </main>
  );
}
