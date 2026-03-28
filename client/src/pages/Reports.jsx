import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Reports.css';

const BOTANICAL_COLORS = {
  moss: '#1f7960',
  sage: '#8ea66f',
  rosy: '#d6876c',
  blush: '#f2d3c8',
  forest: '#0a3323',
  teal: '#105666',
  sun: '#ffe5b8'
};

const MOOD_PALETTE = ['#1f7960', '#6f8b63', '#d6876c', '#105666', '#c9a869', '#8d5d4b'];

const polarPoint = (cx, cy, radius, angle) => ({
  x: cx + radius * Math.cos(angle),
  y: cy + radius * Math.sin(angle)
});

const formatWeekLabel = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

function Reports() {
  const [currentWeekReport, setCurrentWeekReport] = useState(null);
  const [weeklyComparison, setWeeklyComparison] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(0);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [currentRes, compareRes] = await Promise.all([
        api.get('/reports/weekly'),
        api.get('/reports/weekly/compare?weeks=4')
      ]);

      setCurrentWeekReport(currentRes.data);
      setWeeklyComparison(compareRes.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="reports-loading">Consulting the Apothecary Archives...</div>;
  }

  if (!currentWeekReport) {
    return (
      <div className="reports-page">
        <div className="reports-width">
          <h1>Weekly Archives</h1>
          <div className="no-data">Your journal remains blank. Begin your sequences to see them bloom here.</div>
        </div>
      </div>
    );
  }

  const selectedReport = weeklyComparison[selectedWeek] || currentWeekReport;
  const totalHabits = Math.max(selectedReport.total_habits || 0, 1);
  const weeklyIntensity = Math.round(((selectedReport.total_completions || 0) / (totalHabits * 7)) * 100) || 0;

  const BloomChart = ({ data }) => {
    if (!data || data.length === 0) {
      return <div className="chart-empty">No sequences recorded for this archive.</div>;
    }

    const centerX = 210;
    const centerY = 205;
    const baseRadius = 56;

    return (
      <svg width="100%" height="100%" viewBox="0 0 420 420" className="premium-chart-svg">
        <defs>
          <radialGradient id="bloomAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.42)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <linearGradient id="petalFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={BOTANICAL_COLORS.rosy} />
            <stop offset="55%" stopColor={BOTANICAL_COLORS.sun} />
            <stop offset="100%" stopColor={BOTANICAL_COLORS.sage} />
          </linearGradient>
        </defs>

        <circle cx={centerX} cy={centerY} r="150" fill="url(#bloomAura)" />

        {data.map((item, index) => {
          const angle = -Math.PI / 2 + (index / data.length) * Math.PI * 2;
          const consistency = item.consistency || 0;
          const outerRadius = 118 + consistency * 0.8;
          const leftBase = polarPoint(centerX, centerY, baseRadius, angle - 0.18);
          const rightBase = polarPoint(centerX, centerY, baseRadius, angle + 0.18);
          const tip = polarPoint(centerX, centerY, outerRadius, angle);
          const leftControl = polarPoint(centerX, centerY, outerRadius * 0.72, angle - 0.2);
          const rightControl = polarPoint(centerX, centerY, outerRadius * 0.72, angle + 0.2);
          const labelPoint = polarPoint(centerX, centerY, outerRadius + 28, angle);
          const petalPath = `
            M ${leftBase.x} ${leftBase.y}
            Q ${leftControl.x} ${leftControl.y} ${tip.x} ${tip.y}
            Q ${rightControl.x} ${rightControl.y} ${rightBase.x} ${rightBase.y}
            Q ${centerX} ${centerY} ${leftBase.x} ${leftBase.y}
          `;

          return (
            <g key={item.name}>
              <path
                d={petalPath}
                fill="url(#petalFill)"
                opacity={0.24 + consistency / 160}
                stroke="rgba(18,77,57,0.12)"
                strokeWidth="1.2"
              />
              <circle cx={tip.x} cy={tip.y} r={5 + consistency / 32} fill={BOTANICAL_COLORS.moss} opacity="0.85" />
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                className="chart-label"
              >
                {item.name}
              </text>
              <text
                x={labelPoint.x}
                y={labelPoint.y + 16}
                textAnchor="middle"
                className="chart-value"
              >
                {consistency}%
              </text>
            </g>
          );
        })}

        <circle cx={centerX} cy={centerY} r="46" className="bloom-core" />
        <text x={centerX} y={centerY - 4} textAnchor="middle" className="chart-center-label">Mastery</text>
        <text x={centerX} y={centerY + 24} textAnchor="middle" className="chart-center-value">{weeklyIntensity}%</text>
      </svg>
    );
  };

  const MoodRibbonChart = ({ distribution }) => {
    if (!distribution || distribution.length === 0) {
      return <div className="chart-empty">No emotional notes were logged this week.</div>;
    }

    const maxValue = Math.max(...distribution.map((item) => item.value), 1);
    const barWidth = 52;
    const gap = 18;
    const viewWidth = Math.max(420, 32 + distribution.length * (barWidth + gap));

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${viewWidth} 320`} className="premium-chart-svg">
        {distribution.map((item, index) => {
          const x = 32 + index * (barWidth + gap);
          const height = 88 + (item.value / maxValue) * 112;
          const y = 228 - height;
          const color = MOOD_PALETTE[index % MOOD_PALETTE.length];

          return (
            <g key={item.name}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={height}
                rx="26"
                fill={color}
                opacity={0.18 + item.value / (maxValue * 1.4)}
              />
              <circle cx={x + barWidth / 2} cy={y + 18} r="8" fill={color} opacity="0.8" />
              <text x={x + barWidth / 2} y="270" textAnchor="middle" className="chart-label">
                {item.name}
              </text>
              <text x={x + barWidth / 2} y="288" textAnchor="middle" className="chart-value">
                {item.value}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const WeeklyPulseChart = ({ weeks }) => {
    if (!weeks || weeks.length === 0) {
      return null;
    }

    const width = 420;
    const height = 220;
    const paddingX = 34;
    const baseline = 160;
    const maxValue = Math.max(...weeks.map((week) => week.total_completions || 0), 1);
    const step = weeks.length > 1 ? (width - paddingX * 2) / (weeks.length - 1) : 0;

    const points = weeks.map((week, index) => {
      const x = paddingX + step * index;
      const value = week.total_completions || 0;
      const y = baseline - (value / maxValue) * 88;
      return { x, y, label: formatWeekLabel(week.week_start), value };
    });

    const linePath = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ');

    const areaPath = `${linePath} L ${points[points.length - 1].x} ${baseline} L ${points[0].x} ${baseline} Z`;

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="premium-chart-svg">
        <defs>
          <linearGradient id="pulseFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(31,121,96,0.26)" />
            <stop offset="100%" stopColor="rgba(31,121,96,0)" />
          </linearGradient>
        </defs>

        <path d={areaPath} fill="url(#pulseFill)" />
        <path d={linePath} fill="none" stroke={BOTANICAL_COLORS.moss} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="7" fill={BOTANICAL_COLORS.rosy} />
            <text x={point.x} y={186} textAnchor="middle" className="chart-label">{point.label}</text>
            <text x={point.x} y={202} textAnchor="middle" className="chart-value">{point.value}</text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="reports-page">
      <div className="reports-width">
        <div className="reports-header">
          <div className="header-left">
            <span className="reports-kicker">Weekly archive</span>
            <h1>Registry Review</h1>
            <p className="reports-subtitle">A botanical distillation of your weekly evolution</p>
          </div>
          <div className="week-selector">
            {weeklyComparison.map((week, index) => (
              <button
                key={week.week_start || index}
                onClick={() => setSelectedWeek(index)}
                className={`week-btn ${selectedWeek === index ? 'active' : ''}`}
              >
                {formatWeekLabel(week.week_start)}
              </button>
            ))}
          </div>
        </div>

        <div className="reports-summary">
          <div className="summary-card">
            <h3>Sequences</h3>
            <p className="summary-value">{selectedReport.total_habits}</p>
          </div>
          <div className="summary-card">
            <h3>Consistency</h3>
            <p className="summary-value">{selectedReport.consistent_habits}</p>
          </div>
          <div className="summary-card">
            <h3>Total Bloom</h3>
            <p className="summary-value">{selectedReport.total_completions}</p>
          </div>
          <div className="summary-card">
            <h3>Dominant Mood</h3>
            <p className="summary-value mood-value">{selectedReport.average_mood || 'Serene'}</p>
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-card chart-card-bloom">
            <div className="chart-heading">
              <span className="chart-kicker">Signature bloom</span>
              <h2>Mastery Bloom</h2>
            </div>
            <div className="svg-chart-container">
              <BloomChart data={selectedReport.habit_completion_data} />
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-heading">
              <span className="chart-kicker">Emotional texture</span>
              <h2>Mood Ribbons</h2>
            </div>
            <div className="svg-chart-container compact">
              <MoodRibbonChart distribution={selectedReport.mood_distribution} />
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-heading">
              <span className="chart-kicker">Momentum over time</span>
              <h2>Weekly Pulse</h2>
            </div>
            <div className="svg-chart-container compact">
              <WeeklyPulseChart weeks={[...weeklyComparison].reverse()} />
            </div>
          </div>
        </div>

        <div className="habits-breakdown">
          <div className="breakdown-heading">
            <span className="reports-kicker">Close reading</span>
            <h2>Sequence Breakdown</h2>
          </div>
          <div className="habits-list">
            {Object.entries(selectedReport.habit_stats || {}).map(([id, stats]) => {
              const mastery = stats.totalDays > 0 ? Math.round((stats.completions / stats.totalDays) * 100) : 0;
              return (
                <div key={id} className="habit-breakdown-card">
                  <h3>{stats.name}</h3>
                  <div className="breakdown-stats">
                    <span>{stats.completions} successful archivals</span>
                    <span>{stats.totalDays} day registry window</span>
                    <span>{mastery}% mastery</span>
                  </div>
                  <div className="mini-meter">
                    <i style={{ width: `${mastery}%` }} />
                  </div>
                  {stats.moods.length > 0 && (
                    <div className="mood-summary">
                      Dominant resonance: <strong>{stats.moods[0]}</strong>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
