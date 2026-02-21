import React from 'react';
import { SYSTEM_NODES, WORKFLOW_MAP } from '../SystemArchitecture';
import './components.css';

const NODE_META = {
  CLIENT:   { label: 'CLIENT / UI', color: 'var(--accent-primary)' },
  IA_LAYER: { label: 'IA LAYER',    color: 'var(--accent-secondary)' },
  BACKEND:  { label: 'BACKEND',     color: '#aa88ff' },
};

export default function SystemOverview({ onBack }) {
  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
      <div className="sysoverview">
        <button className="sysoverview__back" onClick={onBack}>
          ← volver al portfolio
        </button>

        <p className="section-label">// arquitectura</p>
        <h2 className="section-title">Blueprint del Sistema</h2>
        <div className="section-divider" />

        <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', marginBottom: 32, lineHeight: 1.7 }}>
          Diagrama técnico de la infraestructura que soporta este portfolio y los proyectos que desarrollo.
          Cada nodo representa una capa funcional del sistema.
        </p>

        <div className="arch-grid">
          {Object.entries(SYSTEM_NODES).map(([key, node]) => {
            const meta = NODE_META[key] || { label: key, color: 'var(--text-dim)' };
            return (
              <div key={key} className="arch-node">
                <div
                  className="arch-node__label"
                  style={{ color: meta.color }}
                >
                  {meta.label}
                </div>
                {Object.entries(node).map(([field, value]) => (
                  <div key={field} className="arch-node__field">
                    <span className="arch-node__key">{field}:</span>
                    <span className="arch-node__val">{value}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="workflow-list" style={{ marginTop: 56 }}>
          <p className="section-label" style={{ marginBottom: 20 }}>// workflow</p>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: 24 }}>
            Request Lifecycle
          </h3>

          {WORKFLOW_MAP.map((step, idx) => (
            <div key={step.step} className="workflow-step">
              <div className="workflow-step__num">{String(idx + 1).padStart(2, '0')}</div>
              <div className="workflow-step__action">{step.action}</div>
              <span className="workflow-step__arrow">→</span>
              <div className="workflow-step__target">{step.target}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 60,
          padding: '20px 24px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 10,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          color: 'var(--text-technical)',
          lineHeight: 1.8,
        }}>
          <div style={{ color: 'var(--text-dim)', marginBottom: 8 }}># system.info</div>
          <div>engine    → React 18 + Vite 6</div>
          <div>deploy    → Netlify / Vercel (static)</div>
          <div>ci/cd     → GitHub Actions</div>
          <div>uptime    → 99.9%</div>
          <div style={{ marginTop: 8, color: 'var(--accent-primary)' }}>status    → ONLINE ●</div>
        </div>
      </div>
    </div>
  );
}
