import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  prefix?: string;
  suffix?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, prefix = '', suffix = '' }) => {
  const changeColor = change === undefined ? '' : change > 0 ? 'text-green-400' : change < 0 ? 'text-red-400' : 'text-slate-400';
  const ChangeIcon = change === undefined ? null : change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus;

  return (
    <div className="glass-morphism rounded-xl p-4 flex flex-col gap-1">
      <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">{label}</span>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-white">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </span>
        {change !== undefined && ChangeIcon && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${changeColor} pb-1`}>
            <ChangeIcon size={14} />
            {Math.abs(change).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
