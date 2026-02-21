import React from 'react';
import { useFadeIn } from './useFadeIn';
import './components.css';

const EXPERIENCE = [
  {
    type: 'work',
    role: 'Frontend Developer',
    company: 'Startup Tech · Remoto',
    period: '2023 — Presente',
    description:
      'Desarrollo de interfaces React para plataformas SaaS B2B. Implementé sistema de design tokens, reduciendo el tiempo de maquetación en un 40%. Lideré migración de CRA a Vite.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Zustand'],
  },
  {
    type: 'work',
    role: 'Full Stack Developer Jr.',
    company: 'Agencia Digital · Híbrido',
    period: '2022 — 2023',
    description:
      'Construcción de aplicaciones web end-to-end para clientes de e-commerce y educación. Integración con APIs de pago (Stripe, MercadoPago) y sistemas de autenticación OAuth.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
  },
  {
    type: 'work',
    role: 'Desarrolladora Web Freelance',
    company: 'Independiente',
    period: '2021 — 2022',
    description:
      'Diseño y desarrollo de sitios web para pequeñas y medianas empresas. Entrega de proyectos desde wireframe hasta deploy, con enfoque en SEO y performance (Lighthouse > 90).',
    tech: ['HTML/CSS', 'JavaScript', 'WordPress', 'Figma'],
  },
  {
    type: 'edu',
    role: 'Ingeniería en Sistemas de Información',
    company: 'Universidad · Presencial',
    period: '2018 — 2022',
    description:
      'Formación en algoritmos, estructuras de datos, bases de datos relacionales y desarrollo de software. Proyecto final: plataforma de gestión académica con React + Django.',
    tech: ['Python', 'Java', 'SQL', 'React'],
  },
];

const WorkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
  </svg>
);

const EduIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

function TimelineItem({ item, index }) {
  const ref = useFadeIn({ delay: index * 120 });

  return (
    <div className="timeline-item fade-in" ref={ref}>
      <div className="timeline-item__marker">
        <div className={`timeline-item__dot${item.type === 'edu' ? ' timeline-item__dot--edu' : ''}`}>
          {item.type === 'edu' ? <EduIcon /> : <WorkIcon />}
        </div>
      </div>

      <div className="timeline-item__content">
        <div className="timeline-item__header">
          <div>
            <h3 className="timeline-item__role">{item.role}</h3>
            <p className="timeline-item__company">{item.company}</p>
          </div>
          <span className="timeline-item__period">{item.period}</span>
        </div>
        <p className="timeline-item__desc">{item.description}</p>
        <div className="timeline-item__stack">
          {item.tech.map(t => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceTimeline() {
  const headerRef = useFadeIn();

  return (
    <div className="shell__section">
      <div ref={headerRef} className="fade-in">
        <p className="section-label">// experiencia</p>
        <h2 className="section-title">Trayectoria</h2>
        <div className="section-divider" />
      </div>

      <div className="timeline">
        {EXPERIENCE.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
