import React, { useState, useEffect } from 'react';
import { useLang } from './LangContext';
import './components.css';

const TYPED_TITLES = {
  es: [
    'Frontend Developer',
    'Arquitecta de Software',
    'React Specialist',
    'Builder de Sistemas',
  ],
  en: [
    'Frontend Developer',
    'Software Architect',
    'React Specialist',
    'Systems Builder',
  ],
};

const CONTENT = {
  es: {
    tag: 'Disponible para proyectos',
    greeting: 'Hola, soy',
    bio: 'Construyo aplicaciones web de alto rendimiento con foco en experiencia de usuario, arquitecturas escalables y sistemas inteligentes. Apasionada por el código limpio y las soluciones que hacen la diferencia.',
    btnProjects: 'Ver proyectos',
    btnCV: 'Descargar CV',
    stats: [
      { value: '3+',     label: 'Años creando código' },
      { value: 'React',  label: 'Stack principal' },
      { value: 'JS · TS', label: 'Lenguajes base' },
    ],
  },
  en: {
    tag: 'Available for projects',
    greeting: "Hi, I'm",
    bio: 'I build high-performance web applications focused on user experience, scalable architectures, and intelligent systems. Passionate about clean code and solutions that make a difference.',
    btnProjects: 'View projects',
    btnCV: 'Download CV',
    stats: [
      { value: '3+',     label: 'Years writing code' },
      { value: 'React',  label: 'Main stack' },
      { value: 'JS · TS', label: 'Base languages' },
    ],
  },
};

export default function HeroSection({ onNavigate }) {
  const lang = useLang();
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = TYPED_TITLES[lang];
  const c = CONTENT[lang];

  useEffect(() => {
    setDisplayedTitle('');
    setTitleIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const delay = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentTitle.length) {
        setDisplayedTitle(currentTitle.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      } else if (!isDeleting && charIndex === currentTitle.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && charIndex > 0) {
        setDisplayedTitle(currentTitle.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      } else {
        setIsDeleting(false);
        setTitleIndex(i => (i + 1) % titles.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex, titles]);

  return (
    <div className="hero shell__section" style={{ paddingTop: '40px' }}>
      <div className="hero__tag">
        <span className="hero__tag-dot" />
        {c.tag}
      </div>

      <h1 className="hero__name">
        {c.greeting}{' '}
        <span className="hero__name-accent">Dania Ramos</span>
      </h1>

      <p className="hero__title">
        {displayedTitle}
        <span className="hero__title-cursor" />
      </p>

      <p className="hero__bio">{c.bio}</p>

      <div className="hero__actions">
        <button className="btn-primary" onClick={() => onNavigate('projects')}>
          {c.btnProjects}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <a className="btn-outline" href="/cv.pdf" download>
          {c.btnCV}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
        </a>
      </div>

      <div className="hero__socials">
        <a href="https://github.com/DaniaRamxs" target="_blank" rel="noreferrer" className="hero__social-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          github
        </a>
        <a href="https://www.linkedin.com/in/daniaramxs/" target="_blank" rel="noreferrer" className="hero__social-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          linkedin
        </a>
        <a href="mailto:dania200200@gmail.com" className="hero__social-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          email
        </a>
      </div>

      <div className="hero__stats">
        {c.stats.map(s => (
          <div key={s.label}>
            <div className="hero__stat-value">{s.value}</div>
            <div className="hero__stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
