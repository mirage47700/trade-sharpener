import React, { useMemo } from 'react';
import { useSheetData } from '../../hooks/useSheetData';
import DataTable from '../shared/DataTable';
import StatCard from '../shared/StatCard';
import LoadingSpinner from '../shared/LoadingSpinner';

const GaugeBar: React.FC<{ label: string; value: number; max?: number }> = ({ label, value, max = 100 }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const color = pct > 70 ? 'bg-red-500' : pct > 40 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="text-white font-mono">{value}</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const ContrarianPage: React.FC = () => {
  const { data, loading, error } = useSheetData('Contrarian');

  const gauges = useMemo(() => {
    if (!data || data.rows.length === 0) return [];
    const row = data.rows[0];
    return data.headers
      .filter(h => !isNaN(Number(row[h])))
      .slice(0, 6)
      .map(h => ({ label: h, value: Number(row[h]) }));
  }, [data]);

  if (loading) return <LoadingSpinner label="Fetching Contrarian Data..." />;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-4 p-4">
      {gauges.length > 0 && (
        <div className="glass-morphism rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gauges.map(g => (
            <GaugeBar key={g.label} label={g.label} value={g.value} />
          ))}
        </div>
      )}
      <DataTable headers={data.headers} rows={data.rows} />
    </div>
  );
};

export default ContrarianPage;
