import React, { useState, useEffect } from 'react';
import './components.css';

const NAV_ITEMS = [
  { id: 'hero',       label: 'Inicio' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'projects',   label: 'Proyectos' },
  { id: 'skills',     label: 'Skills' },
  { id: 'contact',    label: 'Contacto' },
];

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

export default function TopBar({ activeSection, onNavigate, onArchitectureView, theme, onToggleTheme }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="topbar">
      <button
        className="topbar__brand"
        onClick={() => onNavigate('hero')}
      >
        <span className="topbar__brand-dot" />
        DaniaRamxs
      </button>

      <div className="topbar__nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`topbar__nav-btn${activeSection === item.id ? ' topbar__nav-btn--active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="topbar__actions">
        <button className="topbar__arch-btn" onClick={onArchitectureView} title="Ver arquitectura">
          &lt;/arch&gt;
        </button>

        <button
          className="topbar__theme-btn"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <span className="topbar__status">
          <span style={{ color: 'var(--text-technical)', marginRight: 4 }}>▶</span>
          {time}
        </span>
      </div>
    </nav>
  );
}
