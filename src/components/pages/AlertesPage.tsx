import React from 'react';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useSheetData } from '../../hooks/useSheetData';
import DataTable from '../shared/DataTable';
import LoadingSpinner from '../shared/LoadingSpinner';

const SEVERITY_STYLES: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  high: { bg: 'bg-red-500/10 border-red-500/20', text: 'text-red-400', icon: <AlertTriangle size={14} /> },
  medium: { bg: 'bg-yellow-500/10 border-yellow-500/20', text: 'text-yellow-400', icon: <AlertCircle size={14} /> },
  low: { bg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-400', icon: <Info size={14} /> },
};

const AlertesPage: React.FC = () => {
  const { data, loading, error } = useSheetData('Alertes');

  if (loading) return <LoadingSpinner label="Fetching Alertes Data..." />;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;
  if (!data) return null;

  const severityCol = data.headers.find(h => h.toLowerCase().includes('sever') || h.toLowerCase().includes('level') || h.toLowerCase().includes('priority'));

  const alertCounts = severityCol
    ? data.rows.reduce<Record<string, number>>((acc, row) => {
        const val = String(row[severityCol] ?? 'low').toLowerCase();
        const key = val.includes('high') || val.includes('crit') ? 'high' : val.includes('med') ? 'medium' : 'low';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {})
    : null;

  return (
    <div className="flex flex-col gap-4 p-4">
      {alertCounts && (
        <div className="flex gap-3">
          {Object.entries(SEVERITY_STYLES).map(([key, style]) => (
            <div key={key} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${style.bg} ${style.text}`}>
              {style.icon}
              <span className="text-xs font-bold uppercase">{key}</span>
              <span className="text-sm font-bold">{alertCounts[key] || 0}</span>
            </div>
          ))}
        </div>
      )}
      <DataTable headers={data.headers} rows={data.rows} />
    </div>
  );
};

export default AlertesPage;
