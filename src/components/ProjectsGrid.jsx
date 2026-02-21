import React from 'react';
import { useFadeIn } from './useFadeIn';
import './components.css';

const PROJECTS = [
  {
    id: 1,
    type: 'Blog · Portfolio Personal',
    title: 'Space Dan',
    description:
      'Espacio personal con blog, tablón de avisos, galería, música, juegos y más. Usa lazy loading con React Suspense para carga optimizada y Supabase como backend para persistencia de datos.',
    stack: ['React 19', 'React Router', 'Supabase', 'Tailwind CSS', 'Vite'],
    demo: 'https://space-dan.vercel.app/',
    repo: 'https://github.com/DaniaRamxs/space-dan',
  },
  {
    id: 2,
    type: 'Landing Page · Campaña Política',
    title: 'Marlene Luyo — Candidata 2026',
    description:
      'Landing page para campaña electoral de candidata a diputada por Lima Provincias. Incluye mapa interactivo de las 9 provincias, plataforma política, instrucciones de voto, sección de preguntas frecuentes y cuenta regresiva a las elecciones 2026.',
    stack: ['Vite', 'Tailwind CSS', 'JavaScript', 'Vercel'],
    demo: 'https://landingpage-politica.vercel.app/',
    repo: 'https://github.com/DaniaRamxs/landingpage-politica',
  },
];

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

function ProjectCard({ project, index }) {
  const ref = useFadeIn({ delay: index * 80 });

  return (
    <article className="project-card fade-in" ref={ref}>
      <span className="project-card__type">{project.type}</span>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>
      <div className="project-card__stack">
        {project.stack.map(tech => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
      </div>
      <div className="project-card__links">
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noreferrer" className="project-card__link">
            <GithubIcon /> Código
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer" className="project-card__link">
            <ExternalIcon /> Demo
          </a>
        )}
      </div>
    </article>
  );
}

export default function ProjectsGrid() {
  const headerRef = useFadeIn();

  return (
    <div className="shell__section">
      <div ref={headerRef} className="fade-in">
        <p className="section-label">// proyectos</p>
        <h2 className="section-title">Lo que he construido</h2>
        <div className="section-divider" />
      </div>

      <div className="projects-grid">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
