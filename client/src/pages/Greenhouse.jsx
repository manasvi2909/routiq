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

/* ─── Terrace Creation (Spatial Clusters) ─── */

function createTerraces(specimens, tier) {
  if (specimens.length === 0) return [];

  const terraces = [];
  // Use larger clumps for terraces so they feel like physical islands
  const terraceSize = Math.max(8, tier.zoneSize);

  for (let start = 0; start < specimens.length; start += terraceSize) {
    const terraceSpecimens = specimens.slice(start, start + terraceSize);
    const habits = [...new Set(terraceSpecimens.map((s) => s.habit_name))];
    terraces.push({
      id: `terrace-${start}`,
      index: terraces.length,
      alignment: terraces.length % 2 === 0 ? 'left' : 'right', // Staggered layout
      specimens: terraceSpecimens,
      habitName: habits.length === 1 ? habits[0] : null,
    });
  }

  return terraces;
}

/* ─── Depth Plane Placement Algorithm ─── */

function computeDepthPlacement(specimen, localIndex, totalInTerrace, terraceAlignment) {
  const seed = hashSeed(`${specimen.id}-${localIndex}`);
  
  // 1. Determine Depth Plane (Foreground, Midground, Background)
  // Background (30%), Midground (50%), Foreground (20%)
  const depthMod = seed % 100;
  let plane = 'midground';
  let zIndex = 2;
  let scaleBase = 0.8;
  
  if (depthMod < 20) {
    plane = 'foreground';
    zIndex = 3;
    scaleBase = 1.15;
  } else if (depthMod > 70) {
    plane = 'background';
    zIndex = 1;
    scaleBase = 0.55;
  }

  // 2. Spatial Spread
  // X is spread out across the terrace width
  const baseProgress = totalInTerrace <= 1 ? 0.5 : localIndex / (totalInTerrace - 1);
  // Add noise so it's not a straight line
  const xNoise = ((seed % 20) - 10) * 1.5; 
  let x = 10 + (baseProgress * 80) + xNoise;

  // Y is determined primarily by the depth plane (background is higher, foreground is lower)
  let y = 50;
  const yNoise = ((seed % 15) - 7);
  
  if (plane === 'background') {
    y = 20 + yNoise; // High up
  } else if (plane === 'midground') {
    y = 50 + yNoise; // Middle
  } else {
    y = 80 + yNoise; // Low down
  }

  // 3. Scale Variation
  const scale = scaleBase + ((seed % 15) * 0.02);

  // Offset left/right based on terrace alignment to keep center mostly clear
  if (terraceAlignment === 'left') {
    x = x * 0.7; // Compress to left 70%
  } else {
    x = 30 + (x * 0.7); // Compress to right 70%
  }

  return {
    '--cloche-x': `${Math.min(92, Math.max(8, x))}%`,
    '--cloche-y': `${Math.min(90, Math.max(10, y))}%`,
    '--cloche-scale': scale.toFixed(2),
    '--cloche-depth': zIndex,
    '--cloche-plane': `"${plane}"`
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

/* ─── Active Terrace Tracking ─── */

function useActiveTerraces(terraceCount) {
  const [active, setActive] = useState(() => new Set([0]));

  useEffect(() => {
    if (terraceCount === 0 || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        setActive((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const idx = Number(entry.target.dataset.terraceIdx);
            if (entry.isIntersecting) {
              next.add(idx);
              next.add(idx - 1);
              next.add(idx + 1);
            }
          });
          return next;
        });
      },
      { rootMargin: '600px 0px' }
    );

    document.querySelectorAll('[data-terrace-observe]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [terraceCount]);

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
  const terraces = useMemo(() => createTerraces(specimens, tier), [specimens, tier]);
  const dustMotes = useMemo(() => generateDustMotes(tier.particles, tier.key), [tier]);
  const activeTerraces = useActiveTerraces(terraces.length);

  const showArchways = tier.key === 'conservatory-wing' || tier.key === 'botanical-archive' || tier.key === 'living-archive';

  const handleInspect = (specimen) => setInspected(specimen);
  const handleClose = () => setInspected(null);

  /* ── Environmental Layers (always rendered) ── */

  function renderEnvironment() {
    return (
      <>
        {/* LAYER 8 — Deep Background (Distant Architecture) */}
        <div className="gh-deep-background" aria-hidden="true">
          <div className="gh-distant-arch gh-distant-arch-1" />
          <div className="gh-distant-arch gh-distant-arch-2" />
          <div className="gh-distant-path" />
          <div className="gh-distant-pedestal gh-distant-pedestal-left" />
          <div className="gh-distant-pedestal gh-distant-pedestal-right" />
        </div>

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

        {/* LAYER 2 — Foreground Vegetation & Framing */}
        <div className="gh-foreground" aria-hidden="true">
          <div className="gh-fern gh-fern-left" />
          <div className="gh-fern gh-fern-right" />
          <div className="gh-moss-edge" />
          <div className="gh-framing-vine gh-framing-vine-left" />
          <div className="gh-framing-vine gh-framing-vine-right" />
          <div className="gh-iron-edge gh-iron-edge-left" />
          <div className="gh-iron-edge gh-iron-edge-right" />
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

      {/* LAYER 3 — The Landscape Architecture */}
      <div className="gh-landscape" aria-label="Preserved botanical archive">
        <div className="gh-path" aria-hidden="true" />

        {terraces.map((terrace, terraceIdx) => {
          const isActive = activeTerraces.has(terrace.index);

          return (
            <section
              key={terrace.id}
              className={`gh-terrace gh-terrace-align-${terrace.alignment}`}
              data-terrace-observe
              data-terrace-idx={terrace.index}
              aria-label={terrace.habitName ? `${terrace.habitName} wing` : `Archive terrace ${terrace.index + 1}`}
            >
              {terrace.habitName && (
                <div className="gh-stone-inscription">
                  <span>{terrace.habitName}</span>
                </div>
              )}

              {showArchways && terraceIdx > 0 && <div className="gh-iron-archway" aria-hidden="true" />}
              
              {/* Foreground obfuscating foliage for exploration feel */}
              {terraceIdx % 3 === 0 && <div className="gh-terrace-foliage" aria-hidden="true" />}

              {terrace.specimens.map((specimen, localIdx) => {
                const placement = computeDepthPlacement(
                  specimen,
                  localIdx,
                  terrace.specimens.length,
                  terrace.alignment
                );

                return (
                  <GlassCloche
                    key={specimen.id}
                    specimen={specimen}
                    placement={placement}
                    plane={placement['--cloche-plane']?.replace(/"/g, '') || 'midground'}
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
