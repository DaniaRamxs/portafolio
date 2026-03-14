import { useState, useRef, useEffect, useCallback } from 'react';
import TopBar from './TopBar';
import HeroSection from './HeroSection';
import ExperienceTimeline from './ExperienceTimeline';
import ProjectsGrid from './ProjectsGrid';
import SkillsMatrix from './SkillsMatrix';
import ContactPanel from './ContactPanel';
import './components.css';

const SECTIONS = ['hero', 'experience', 'projects', 'skills', 'contact'];

export default function Shell({ onViewChange, theme, onToggleTheme, onToggleLang, lang }) {
  const [activeSection, setActiveSection] = useState('hero');
  const contentRef = useRef(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollY = container.scrollTop;
      const viewportMid = scrollY + container.clientHeight / 2;

      let current = SECTIONS[0];
      for (const id of SECTIONS) {
        const el = sectionRefs.current[id];
        if (!el) continue;
        if (el.offsetTop <= viewportMid) current = id;
      }
      setActiveSection(current);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((sectionId) => {
    const el = sectionRefs.current[sectionId];
    if (el) {
      contentRef.current?.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  }, []);

  const setRef = useCallback((id) => (el) => {
    sectionRefs.current[id] = el;
  }, []);

  return (
    <div className="shell">
      <TopBar
        activeSection={activeSection}
        onNavigate={scrollTo}
        onArchitectureView={() => onViewChange?.('architecture')}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onToggleLang={onToggleLang}
        lang={lang}
      />

      <div className="shell__content" ref={contentRef}>
        <div ref={setRef('hero')}>
          <HeroSection onNavigate={scrollTo} />
        </div>
        <div ref={setRef('experience')}>
          <ExperienceTimeline />
        </div>
        <div ref={setRef('projects')}>
          <ProjectsGrid />
        </div>
        <div ref={setRef('skills')}>
          <SkillsMatrix />
        </div>
        <div ref={setRef('contact')}>
          <ContactPanel />
        </div>
      </div>
    </div>
  );
}
