import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import SharpenerPage from './components/pages/SharpenerPage';
import LivePage from './components/pages/LivePage';
import TypePage from './components/pages/TypePage';
import GrowthPage from './components/pages/GrowthPage';
import ContrarianPage from './components/pages/ContrarianPage';
import ScreenerPage from './components/pages/ScreenerPage';
import RatioPage from './components/pages/RatioPage';
import AlertesPage from './components/pages/AlertesPage';
import ChartPage from './components/pages/ChartPage';
import { PAGES } from './config';

const PAGE_COMPONENTS: Record<string, React.FC> = {
  sharpener: SharpenerPage,
  live: LivePage,
  type: TypePage,
  growth: GrowthPage,
  contrarian: ContrarianPage,
  screener: ScreenerPage,
  ratio: RatioPage,
  alertes: AlertesPage,
  chart: ChartPage,
};

const App: React.FC = () => {
  const [activePageId, setActivePageId] = useState(PAGES[0].id);
  const [refreshKey, setRefreshKey] = useState(0);

  const activePage = PAGES.find(p => p.id === activePageId) || PAGES[0];
  const PageComponent = PAGE_COMPONENTS[activePageId] || SharpenerPage;

  const handleRefresh = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  // Telegram Mini App viewport setup
  useEffect(() => {
    try {
      const tg = (window as any).Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
      }
    } catch {}
  }, []);

  return (
    <div className="flex flex-col h-screen text-slate-100 overflow-hidden relative">
      <Header pageName={activePage.name} onRefresh={handleRefresh} />

      <main className="flex-1 overflow-y-auto pb-32 scrollbar-hide">
        <PageComponent key={`${activePageId}-${refreshKey}`} />
      </main>

      <BottomNav activeId={activePageId} onSelect={setActivePageId} />

      <div className="fixed bottom-0 left-0 right-0 h-4 px-4 flex items-center justify-between pointer-events-none z-50">
        <span className="text-[8px] text-slate-600 font-mono">TRADE-SHARPENER</span>
        <span className="text-[8px] text-slate-600 font-mono uppercase tracking-widest">System Nominal</span>
      </div>
    </div>
  );
};

export default App;
