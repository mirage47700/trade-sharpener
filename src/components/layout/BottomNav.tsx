import React from 'react';
import {
  Zap, Activity, Layers, TrendingUp, TrendingDown,
  Calendar, Bell, LineChart, Scale,
} from 'lucide-react';
import { PAGES } from '../../config';

const ICON_MAP: Record<string, React.ReactNode> = {
  Zap: <Zap size={20} />,
  Activity: <Activity size={20} />,
  Layers: <Layers size={20} />,
  TrendingUp: <TrendingUp size={20} />,
  TrendingDown: <TrendingDown size={20} />,
  Calendar: <Calendar size={20} />,
  Bell: <Bell size={20} />,
  LineChart: <LineChart size={20} />,
  Scale: <Scale size={20} />,
};

interface BottomNavProps {
  activeId: string;
  onSelect: (id: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeId, onSelect }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl px-4 pointer-events-none">
    <nav className="glass-morphism rounded-2xl p-2 flex items-center justify-around gap-1 pointer-events-auto shadow-2xl shadow-black/50 border border-white/10 overflow-x-auto scrollbar-hide">
      {PAGES.map(page => (
        <button
          key={page.id}
          onClick={() => onSelect(page.id)}
          className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-300 min-w-[72px] relative group ${
            activeId === page.id
              ? 'bg-blue-600/20 text-blue-400'
              : 'text-slate-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <div className={`transition-transform duration-300 ${activeId === page.id ? 'scale-110' : 'group-hover:scale-110'}`}>
            {ICON_MAP[page.icon]}
          </div>
          <span className="text-[10px] font-bold tracking-tight uppercase truncate max-w-[64px]">
            {page.name}
          </span>
          {activeId === page.id && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          )}
        </button>
      ))}
    </nav>
  </div>
);

export default BottomNav;
