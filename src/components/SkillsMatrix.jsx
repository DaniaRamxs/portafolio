import React, { useEffect, useRef, useState } from 'react';
import { useFadeIn } from './useFadeIn';
import { useLang } from './LangContext';
import './components.css';

const SKILL_GROUPS = {
  es: [
    {
      icon: '⚛',
      title: 'Frontend',
      skills: [
        { name: 'React / Next.js',  level: 90 },
        { name: 'JavaScript',       level: 88 },
        { name: 'TypeScript',       level: 75 },
        { name: 'Tailwind CSS',     level: 88 },
        { name: 'HTML / CSS',       level: 92 },
      ],
    },
    {
      icon: '⚙',
      title: 'Backend & DB',
      skills: [
        { name: 'Python',           level: 75 },
        { name: 'Node.js',          level: 72 },
        { name: 'Supabase',         level: 80 },
        { name: 'MySQL',            level: 70 },
        { name: 'PostgreSQL',       level: 68 },
        { name: 'REST APIs',        level: 82 },
      ],
    },
    {
      icon: '☁',
      title: 'Herramientas & IA',
      skills: [
        { name: 'Git / GitHub',     level: 88 },
        { name: 'Vite',             level: 85 },
        { name: 'Vercel',           level: 86 },
        { name: 'Figma',            level: 74 },
        { name: 'Playwright',       level: 72 },
        { name: 'MCP (Model Context Protocol)', level: 78 },
      ],
    },
    {
      icon: '◎',
      title: 'Habilidades Blandas',
      soft: true,
      skills: [
        { name: 'Comunicación',     level: 90 },
        { name: 'Trabajo en equipo',level: 88 },
        { name: 'Resolución de problemas', level: 85 },
        { name: 'Adaptabilidad',    level: 87 },
        { name: 'Autonomía',        level: 90 },
      ],
    },
  ],
  en: [
    {
      icon: '⚛',
      title: 'Frontend',
      skills: [
        { name: 'React / Next.js',  level: 90 },
        { name: 'JavaScript',       level: 88 },
        { name: 'TypeScript',       level: 75 },
        { name: 'Tailwind CSS',     level: 88 },
        { name: 'HTML / CSS',       level: 92 },
      ],
    },
    {
      icon: '⚙',
      title: 'Backend & DB',
      skills: [
        { name: 'Python',           level: 75 },
        { name: 'Node.js',          level: 72 },
        { name: 'Supabase',         level: 80 },
        { name: 'MySQL',            level: 70 },
        { name: 'PostgreSQL',       level: 68 },
        { name: 'REST APIs',        level: 82 },
      ],
    },
    {
      icon: '☁',
      title: 'Tools & AI',
      skills: [
        { name: 'Git / GitHub',     level: 88 },
        { name: 'Vite',             level: 85 },
        { name: 'Vercel',           level: 86 },
        { name: 'Figma',            level: 74 },
        { name: 'Playwright',       level: 72 },
        { name: 'MCP (Model Context Protocol)', level: 78 },
      ],
    },
    {
      icon: '◎',
      title: 'Soft Skills',
      soft: true,
      skills: [
        { name: 'Communication',    level: 90 },
        { name: 'Teamwork',         level: 88 },
        { name: 'Problem Solving',  level: 85 },
        { name: 'Adaptability',     level: 87 },
        { name: 'Autonomy',         level: 90 },
      ],
    },
  ],
};

const LABELS = {
  es: { label: '// skills', title: 'Habilidades' },
  en: { label: '// skills', title: 'Skills' },
};

function SkillGroup({ group, visible, index }) {
  const ref = useFadeIn({ delay: index * 100 });

  return (
    <div className="skill-group fade-in" ref={ref}>
      <div className="skill-group__header">
        <span className="skill-group__icon">{group.icon}</span>
        <span className="skill-group__title">{group.title}</span>
      </div>
      {group.skills.map(skill => (
        <div key={skill.name} className="skill-item">
          <span className="skill-item__name">{skill.name}</span>
          <div className="skill-item__bar">
            <div
              className="skill-item__fill"
              style={{
                width: visible ? `${skill.level}%` : '0%',
                background: group.soft
                  ? 'linear-gradient(90deg, #aa88ff, #00ccff)'
                  : 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
              }}
            />
          </div>
          <span className="skill-item__level">{skill.level}%</span>
        </div>
      ))}
    </div>
  );
}

export default function SkillsMatrix() {
  const lang = useLang();
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const headerRef = useFadeIn();
  const { label, title } = LABELS[lang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="shell__section" ref={containerRef}>
      <div ref={headerRef} className="fade-in">
        <p className="section-label">{label}</p>
        <h2 className="section-title">{title}</h2>
        <div className="section-divider" />
      </div>

      <div className="skills-grid">
        {SKILL_GROUPS[lang].map((group, i) => (
          <SkillGroup key={group.title} group={group} visible={visible} index={i} />
        ))}
      </div>
    </div>
  );
}
