// Conceptual technical visuals for each Digital Solutions panel — pure CSS/SVG,
// no external assets or animation libraries. Static markup; SolutionPanel handles
// the enter transition (opacity/scale) around whichever of these it renders.

function DashboardVisual() {
  return (
    <div className="ds-viz ds-viz-dash">
      <div className="ds-viz-dash-topbar">
        <span className="ds-viz-dash-title">CUBO / SYSTEM OVERVIEW</span>
        <span className="ds-chip"><span className="ds-dot" />LIVE</span>
      </div>
      <div className="ds-viz-dash-card">
        <div className="ds-viz-metric-row">
          <span className="ds-viz-metric">92%</span>
          <span className="ds-viz-delta">+18%</span>
        </div>
        <span className="ds-viz-metric-label">Platform Readiness</span>
        <div className="ds-viz-bars">
          <span style={{ height: '40%' }} />
          <span className="dim" style={{ height: '55%' }} />
          <span style={{ height: '70%' }} />
          <span className="dim" style={{ height: '48%' }} />
          <span style={{ height: '85%' }} />
          <span className="dim" style={{ height: '60%' }} />
          <span style={{ height: '92%' }} />
        </div>
      </div>
      <div className="ds-viz-dash-card">
        <span className="ds-viz-metric-label">Modernisation Tracks</span>
        <div className="ds-viz-list">
          <div className="ds-viz-list-row"><span>Core systems</span><span className="ds-viz-list-row-track"><i style={{ width: '82%' }} /></span></div>
          <div className="ds-viz-list-row"><span>Experience layer</span><span className="ds-viz-list-row-track"><i style={{ width: '61%' }} /></span></div>
          <div className="ds-viz-list-row"><span>Process design</span><span className="ds-viz-list-row-track"><i style={{ width: '74%' }} /></span></div>
        </div>
        <div className="ds-viz-dash-divider" />
        <div className="ds-viz-mini-stats">
          <div className="ds-viz-mini-stat"><span className="ds-viz-mini-stat-value">12</span><span>Systems</span></div>
          <div className="ds-viz-mini-stat"><span className="ds-viz-mini-stat-value">4wk</span><span>Avg. rollout</span></div>
        </div>
      </div>
      <div className="ds-viz-dash-card ds-viz-dash-card--wide">
        <span className="ds-viz-metric-label">Rollout Timeline</span>
        <div className="ds-viz-timeline">
          {['Discover', 'Design', 'Build', 'Launch'].map((step, i) => (
            <div className={'ds-viz-timeline-step' + (i < 3 ? ' done' : '')} key={step}>
              <span className="ds-viz-timeline-dot" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkflowVisual() {
  const steps = ['INPUT', 'PROCESS', 'AUTOMATION', 'SYSTEM', 'RESULT'];
  return (
    <div className="ds-viz ds-viz-flow">
      {steps.map((step, i) => (
        <div className="ds-viz-flow-item" key={step}>
          <div className={'ds-viz-flow-node' + (i === 2 ? ' emphasis' : '')}>
            <span>{step}</span>
            <span className="ds-dot" style={{ opacity: i === 2 ? 1 : 0.45 }} />
          </div>
          {i < steps.length - 1 && <div className="ds-viz-flow-connector" />}
        </div>
      ))}
    </div>
  );
}

function DataVisual() {
  // x/y are the node's own center point (in %) — the connector line and the
  // node box both key off this same point, so they can never drift apart
  // regardless of the visual's aspect ratio.
  const nodes = [
    { label: 'SOURCES', x: 14, y: 16 },
    { label: 'MODELS', x: 84, y: 18 },
    { label: 'ANALYTICS', x: 12, y: 84 },
    { label: 'DECISIONS', x: 86, y: 86 },
  ];
  return (
    <div className="ds-viz ds-viz-data">
      <svg className="ds-viz-data-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {nodes.map((n, i) => (
          <line key={n.label} x1="50" y1="50" x2={n.x} y2={n.y} className={i % 2 === 0 ? 'active' : ''} />
        ))}
      </svg>
      {nodes.map((n) => (
        <div key={n.label} className="ds-viz-data-node" style={{ top: `${n.y}%`, left: `${n.x}%` }}>
          <span className="ds-dot" />{n.label}
        </div>
      ))}
      <div className="ds-viz-data-core"><div className="ds-viz-data-core-dot" /></div>
    </div>
  );
}

function IntegrationVisual() {
  const sources = ['CRM', 'ERP', 'API', 'CLOUD', 'DATABASE'];
  return (
    <div className="ds-viz ds-viz-arch">
      <div className="ds-viz-arch-row">
        {sources.map((s) => <span key={s} className="ds-viz-arch-chip">{s}</span>)}
      </div>
      <div className="ds-viz-arch-connector" />
      <div className="ds-viz-arch-core">CUBO SYSTEM</div>
      <div className="ds-viz-arch-connector" />
      <span className="ds-viz-arch-final">Business</span>
    </div>
  );
}

const visualsByIndex = [DashboardVisual, WorkflowVisual, DataVisual, IntegrationVisual];

export default function SolutionVisual({ index }: { index: number }) {
  const Visual = visualsByIndex[index] ?? DashboardVisual;
  return <Visual />;
}
