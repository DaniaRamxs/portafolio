import React from 'react';
import { useFadeIn } from './useFadeIn';
import { useLang } from './LangContext';
import './components.css';

const EXPERIENCE = {
  es: [
    {
      type: 'work',
      role: 'Frontend Developer',
      company: 'Proyectos Propios · Remoto',
      period: '2023 — Presente',
      description:
        'Desarrollo de interfaces React + TypeScript en proyectos personales y colaborativos. Implementé sistema de design tokens reduciendo el tiempo de maquetación en 40%. Migré proyectos de CRA → Vite reduciendo el build time un 60%.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Vite'],
    },
    {
      type: 'work',
      role: 'Desarrolladora Web Freelance',
      company: 'Independiente',
      period: '2021 — 2022',
      description:
        'Entrega de proyectos web completos para pequeñas empresas desde wireframe hasta deployment en producción, con enfoque en SEO y performance (Lighthouse > 90). Gestión del ciclo completo de forma autónoma.',
      tech: ['HTML/CSS', 'JavaScript', 'WordPress', 'Figma'],
    },
    {
      type: 'edu',
      role: 'Ingeniería de Sistemas',
      company: 'En formación',
      period: '2020 — Presente',
      description:
        'Carrera en curso. Áreas: Estructuras de Datos, Bases de Datos, Arquitectura de Software, Algoritmos, Python, Java, SQL.',
      tech: ['Python', 'Java', 'SQL', 'Algoritmos'],
    },
  ],
  en: [
    {
      type: 'work',
      role: 'Frontend Developer',
      company: 'Personal & Collaborative Projects · Remote',
      period: '2023 — Present',
      description:
        'Built React + TypeScript interfaces across personal and collaborative projects. Implemented a design token system that reduced layout time by 40%. Migrated projects from CRA → Vite, cutting build time by 60%.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Vite'],
    },
    {
      type: 'work',
      role: 'Freelance Web Developer',
      company: 'Independent',
      period: '2021 — 2022',
      description:
        'Delivered end-to-end web projects for small businesses, from wireframe to production deployment. Focused on SEO and performance optimization (Lighthouse > 90). Managed the full project lifecycle autonomously.',
      tech: ['HTML/CSS', 'JavaScript', 'WordPress', 'Figma'],
    },
    {
      type: 'edu',
      role: 'Systems Engineering',
      company: 'In progress',
      period: '2020 — Present',
      description:
        'Degree in progress. Focus areas: Data Structures, Databases, Software Architecture, Algorithms, Python, Java, SQL.',
      tech: ['Python', 'Java', 'SQL', 'Algorithms'],
    },
  ],
};

const LABELS = {
  es: { label: '// experiencia', title: 'Trayectoria' },
  en: { label: '// experience',  title: 'Timeline' },
};

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
  const lang = useLang();
  const headerRef = useFadeIn();
  const items = EXPERIENCE[lang];
  const { label, title } = LABELS[lang];

  return (
    <div className="shell__section">
      <div ref={headerRef} className="fade-in">
        <p className="section-label">{label}</p>
        <h2 className="section-title">{title}</h2>
        <div className="section-divider" />
      </div>

      <div className="timeline">
        {items.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
