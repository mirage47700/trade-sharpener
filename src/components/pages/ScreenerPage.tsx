import React, { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import { useSheetData } from '../../hooks/useSheetData';
import DataTable from '../shared/DataTable';
import LoadingSpinner from '../shared/LoadingSpinner';
import { SheetRow } from '../../types';

const ScreenerPage: React.FC = () => {
  const { data, loading, error } = useSheetData('Screener');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);

  const filterableColumns = useMemo(() => {
    if (!data) return [];
    return data.headers.filter(h => {
      const values = new Set(data.rows.map(r => String(r[h] ?? '')));
      return values.size > 1 && values.size <= 20;
    });
  }, [data]);

  const filteredRows = useMemo(() => {
    if (!data) return [];
    return data.rows.filter(row =>
      Object.entries(filters).every(([col, val]) =>
        !val || String(row[col] ?? '').toLowerCase().includes(val.toLowerCase())
      )
    );
  }, [data, filters]);

  if (loading) return <LoadingSpinner label="Fetching Screener Data..." />;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
        >
          <Filter size={14} />
          Filters {Object.values(filters).filter(Boolean).length > 0 && `(${Object.values(filters).filter(Boolean).length})`}
        </button>
        {Object.values(filters).some(Boolean) && (
          <button onClick={() => setFilters({})} className="text-xs text-slate-500 hover:text-white flex items-center gap-1">
            <X size={12} /> Clear
          </button>
        )}
      </div>
      {showFilters && (
        <div className="glass-morphism rounded-xl p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {filterableColumns.map(col => (
            <div key={col} className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-500 uppercase tracking-wider">{col}</label>
              <input
                type="text"
                value={filters[col] || ''}
                onChange={e => setFilters(prev => ({ ...prev, [col]: e.target.value }))}
                placeholder="Filter..."
                className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
              />
            </div>
          ))}
        </div>
      )}
      <DataTable headers={data.headers} rows={filteredRows} />
    </div>
  );
};

export default ScreenerPage;
