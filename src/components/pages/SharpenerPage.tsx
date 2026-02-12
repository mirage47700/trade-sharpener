import React from 'react';
import { useSheetData } from '../../hooks/useSheetData';
import DataTable from '../shared/DataTable';
import StatCard from '../shared/StatCard';
import LoadingSpinner from '../shared/LoadingSpinner';

const SharpenerPage: React.FC = () => {
  const { data, loading, error } = useSheetData('Sharpener');

  if (loading) return <LoadingSpinner label="Fetching Sharpener Data..." />;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;
  if (!data) return null;

  const topRow = data.rows[0];
  const kpis = data.headers.slice(0, 4).map(h => ({
    label: h,
    value: topRow?.[h] ?? '—',
    change: typeof topRow?.[h] === 'number' ? undefined : undefined,
  }));

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {kpis.map(kpi => (
          <StatCard key={kpi.label} label={kpi.label} value={kpi.value} />
        ))}
      </div>
      <DataTable headers={data.headers} rows={data.rows} />
    </div>
  );
};

export default SharpenerPage;
