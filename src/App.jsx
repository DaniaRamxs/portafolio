import React, { Suspense, lazy, useState, useEffect } from 'react';
import { LangContext } from './components/LangContext';

const Shell = lazy(() => import('./components/Shell'));
const SystemOverview = lazy(() => import('./components/SystemOverview'));

function App() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    const savedLang  = localStorage.getItem('portfolio-lang')  || 'es';
    setTheme(savedTheme);
    setLang(savedLang);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  };

  const toggleLang = () => {
    const next = lang === 'es' ? 'en' : 'es';
    setLang(next);
    localStorage.setItem('portfolio-lang', next);
  };

  return (
    <LangContext.Provider value={lang}>
      <div className="shell-container technical-grid">
        <Suspense fallback={<div className="loading-state">Initializing Core...</div>}>
          <AppRouter theme={theme} onToggleTheme={toggleTheme} onToggleLang={toggleLang} lang={lang} />
        </Suspense>
      </div>
    </LangContext.Provider>
  );
}

function AppRouter({ theme, onToggleTheme, onToggleLang, lang }) {
  const [activeView, setActiveView] = useState('desktop');

  return (
    <main style={{ width: '100%', height: '100%' }}>
      {activeView === 'desktop' && (
        <Shell
          onViewChange={setActiveView}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onToggleLang={onToggleLang}
          lang={lang}
        />
      )}
      {activeView === 'architecture' && (
        <SystemOverview onBack={() => setActiveView('desktop')} />
      )}
    </main>
  );
}

export default App;
