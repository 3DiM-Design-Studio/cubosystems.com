'use client';

/**
 * Conceptual right-side visuals for each Digital Solutions panel.
 * Pure presentational markup — no animation logic lives here, DigitalSolutionsPrototype
 * handles the enter transitions via a wrapping motion.div.
 */

export function DashboardVisual() {
  return (
    <div className="ds-viz-dash">
      <div className="ds-viz-dash-topbar">
        <span className="ds-viz-title">CUBO / SYSTEM OVERVIEW</span>
        <span className="ds-chip"><span className="ds-dot" />LIVE</span>
      </div>

      <div className="ds-viz-dash-card">
        <div className="ds-viz-metric-row">
          <span className="ds-viz-metric">92%</span>
          <span className="ds-viz-delta">+18%</span>
        </div>
        <span className="ds-viz-metric-label">Platform Readiness</span>
        <div className="ds-viz-bars">
          <div className="ds-viz-bar" style={{ height: '40%' }} />
          <div className="ds-viz-bar dim" style={{ height: '55%' }} />
          <div className="ds-viz-bar" style={{ height: '70%' }} />
          <div className="ds-viz-bar dim" style={{ height: '48%' }} />
          <div className="ds-viz-bar" style={{ height: '85%' }} />
          <div className="ds-viz-bar dim" style={{ height: '60%' }} />
          <div className="ds-viz-bar" style={{ height: '92%' }} />
        </div>
      </div>

      <div className="ds-viz-dash-card">
        <span className="ds-viz-metric-label">Modernisation Tracks</span>
        <div className="ds-viz-list">
          <div className="ds-viz-list-row">
            <span>Core systems</span>
            <span className="ds-viz-bar-thin"><i style={{ width: '82%' }} /></span>
          </div>
          <div className="ds-viz-list-row">
            <span>Experience layer</span>
            <span className="ds-viz-bar-thin"><i style={{ width: '61%' }} /></span>
          </div>
          <div className="ds-viz-list-row">
            <span>Process design</span>
            <span className="ds-viz-bar-thin"><i style={{ width: '74%' }} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkflowVisual() {
  const steps = ['INPUT', 'PROCESS', 'AUTOMATION', 'SYSTEM', 'RESULT'];
  return (
    <div className="ds-viz-flow">
      {steps.map((step, i) => (
        <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div className={'ds-viz-flow-node' + (i === 2 ? ' emphasis' : '')}>
            <span>{step}</span>
            <span className="ds-dot" style={{ opacity: i === 2 ? 1 : 0.5 }} />
          </div>
          {i < steps.length - 1 && <div className="ds-viz-flow-connector" />}
        </div>
      ))}
    </div>
  );
}

export function DataVisual() {
  const nodes = [
    { label: 'SOURCES', top: '10%', left: '4%' },
    { label: 'MODELS', top: '12%', left: '68%' },
    { label: 'ANALYTICS', top: '74%', left: '2%' },
    { label: 'DECISIONS', top: '78%', left: '64%' },
  ];
  const center = { x: 50, y: 50 };
  const points = [
    { x: 12, y: 16 },
    { x: 84, y: 18 },
    { x: 10, y: 82 },
    { x: 80, y: 84 },
  ];

  return (
    <div className="ds-viz-data">
      <svg className="ds-viz-data-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {points.map((p, i) => (
          <line
            key={i}
            x1={`${center.x}%`}
            y1={`${center.y}%`}
            x2={`${p.x}%`}
            y2={`${p.y}%`}
            className={i % 2 === 0 ? 'active' : ''}
          />
        ))}
      </svg>

      {nodes.map((n) => (
        <div key={n.label} className="ds-viz-data-node" style={{ top: n.top, left: n.left }}>
          <span className="ds-dot" />
          {n.label}
        </div>
      ))}

      <div className="ds-viz-data-core">
        <div className="ds-viz-data-core-dot" />
      </div>
    </div>
  );
}

export function IntegrationVisual() {
  const sources = ['CRM', 'ERP', 'API', 'CLOUD', 'DATABASE'];
  return (
    <div className="ds-viz-arch">
      <div className="ds-viz-arch-row">
        {sources.map((s) => (
          <span key={s} className="ds-viz-arch-chip">{s}</span>
        ))}
      </div>
      <div className="ds-viz-arch-connector" />
      <div className="ds-viz-arch-core">CUBO SYSTEM</div>
      <div className="ds-viz-arch-connector" />
      <span className="ds-viz-arch-final">Business</span>
    </div>
  );
}
