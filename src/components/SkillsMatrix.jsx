import React, { useEffect, useRef, useState } from 'react';
import { useFadeIn } from './useFadeIn';
import './components.css';

const SKILL_GROUPS = [
  {
    icon: '⚛',
    title: 'Frontend',
    skills: [
      { name: 'React / Next.js',  level: 94 },
      { name: 'TypeScript',       level: 88 },
      { name: 'CSS / Tailwind',   level: 90 },
      { name: 'Vite / Webpack',   level: 80 },
    ],
  },
  {
    icon: '⚙',
    title: 'Backend',
    skills: [
      { name: 'Node.js',          level: 86 },
      { name: 'Python / FastAPI', level: 78 },
      { name: 'PostgreSQL',       level: 82 },
      { name: 'Redis / Caché',    level: 70 },
    ],
  },
  {
    icon: '☁',
    title: 'DevOps / Cloud',
    skills: [
      { name: 'Docker',           level: 78 },
      { name: 'GitHub Actions',   level: 82 },
      { name: 'Vercel / Netlify', level: 88 },
      { name: 'Supabase / BaaS',  level: 76 },
    ],
  },
  {
    icon: '◈',
    title: 'Diseño & IA',
    skills: [
      { name: 'Figma / UX',       level: 84 },
      { name: 'LangChain',        level: 72 },
      { name: 'OpenAI API',       level: 78 },
      { name: 'Accesibilidad',    level: 80 },
    ],
  },
];

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
              style={{ width: visible ? `${skill.level}%` : '0%' }}
            />
          </div>
          <span className="skill-item__level">{skill.level}%</span>
        </div>
      ))}
    </div>
  );
}

export default function SkillsMatrix() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const headerRef = useFadeIn();

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
        <p className="section-label">// skills</p>
        <h2 className="section-title">Stack tecnológico</h2>
        <div className="section-divider" />
      </div>

      <div className="skills-grid">
        {SKILL_GROUPS.map((group, i) => (
          <SkillGroup key={group.title} group={group} visible={visible} index={i} />
        ))}
      </div>
    </div>
  );
}
