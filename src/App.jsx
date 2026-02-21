import React, { Suspense, lazy, useState, useEffect } from 'react';

const Shell = lazy(() => import('./components/Shell'));
const SystemOverview = lazy(() => import('./components/SystemOverview'));

function App() {
  const [theme, setTheme] = useState('dark');

  // Persist theme preference
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  };

  return (
    <div className="shell-container technical-grid">
      <Suspense fallback={<div className="loading-state">Initializing Core...</div>}>
        <AppRouter theme={theme} onToggleTheme={toggleTheme} />
      </Suspense>
    </div>
  );
}

function AppRouter({ theme, onToggleTheme }) {
  const [activeView, setActiveView] = useState('desktop');

  return (
    <main style={{ width: '100%', height: '100%' }}>
      {activeView === 'desktop' && (
        <Shell
          onViewChange={setActiveView}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
      )}
      {activeView === 'architecture' && (
        <SystemOverview onBack={() => setActiveView('desktop')} />
      )}
    </main>
  );
}

export default App;
