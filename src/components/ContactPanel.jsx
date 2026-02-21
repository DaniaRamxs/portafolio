import React, { useState } from 'react';
import { useFadeIn } from './useFadeIn';
import './components.css';

const CONTACT_LINKS = [
  {
    href: 'mailto:dania200200@gmail.com',
    icon: '✉',
    label: 'Email',
    value: 'dania200200@gmail.com',
    external: false,
  },
  {
    href: 'https://github.com/DaniaRamxs',
    icon: '⌥',
    label: 'GitHub',
    value: 'github.com/DaniaRamxs',
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/daniaramxs/',
    icon: '◈',
    label: 'LinkedIn',
    value: 'linkedin.com/in/daniaramxs',
    external: true,
  },
];

// 👉 Reemplaza esto con tu Form ID de formspree.io/new
const FORMSPREE_ID = 'mkovqbar';

export default function ContactPanel() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const leftRef = useFadeIn({ delay: 0 });
  const rightRef = useFadeIn({ delay: 150 });

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="shell__section">
      <p className="section-label">// contacto</p>
      <h2 className="section-title">Hablemos</h2>
      <div className="section-divider" />

      <div className="contact-layout">
        <div className="contact-info fade-in" ref={leftRef}>
          <p className="contact-info__tagline">
            Estoy abierta a oportunidades freelance, proyectos colaborativos y posiciones
            full-time. Si tienes una idea o propuesta, me encantaría escucharte.
          </p>

          <div className="contact-links">
            {CONTACT_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                className="contact-link"
              >
                <span className="contact-link__icon">{link.icon}</span>
                <span className="contact-link__info">
                  <span className="contact-link__label">{link.label}</span>
                  <span className="contact-link__value">{link.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <form className="contact-form fade-in" ref={rightRef} onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Tu nombre"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Cuéntame sobre tu proyecto..."
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-submit">
            {status === 'sent' ? (
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.82rem',
                color: 'var(--accent-primary)',
              }}>
                ✓ Mensaje enviado correctamente
              </span>
            ) : status === 'error' ? (
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.82rem',
                color: '#ff5566',
              }}>
                ✗ Error al enviar. Intenta de nuevo.
              </span>
            ) : (
              <button type="submit" className="btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 80,
        paddingTop: 32,
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} Dania Ramos — Hecho con React + Vite
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--text-technical)', opacity: 0.6 }}>
          system.status: online ●
        </span>
      </div>
    </div>
  );
}
