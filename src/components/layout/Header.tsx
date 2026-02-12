import React from 'react';
import { LayoutDashboard, RefreshCw, Wifi } from 'lucide-react';

interface HeaderProps {
  pageName: string;
  onRefresh: () => void;
  loading?: boolean;
}

const Header: React.FC<HeaderProps> = ({ pageName, onRefresh, loading }) => (
  <header className="h-14 glass-morphism flex items-center justify-between px-4 sm:px-6 border-b border-white/5 shrink-0 z-20">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30">
        <LayoutDashboard className="text-white" size={18} />
      </div>
      <h1 className="text-sm sm:text-lg font-bold text-white flex items-center gap-2">
        Trade Sharpener
      </h1>
    </div>
    <div className="flex items-center gap-2 sm:gap-4">
      <div className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-md text-[10px] font-mono text-slate-400">
        <Wifi size={12} className="text-green-500" />
        {pageName}
      </div>
      <button
        onClick={onRefresh}
        className="p-2 rounded-lg hover:bg-white/10 text-slate-400 transition-all hover:text-white"
        title="Refresh"
      >
        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
      </button>
    </div>
  </header>
);

export default Header;
