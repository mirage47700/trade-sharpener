import React from 'react';
import { useSheetData } from '../../hooks/useSheetData';
import DataTable from '../shared/DataTable';
import LoadingSpinner from '../shared/LoadingSpinner';

const LivePage: React.FC = () => {
  const { data, loading, error } = useSheetData('Live', { autoRefresh: 30_000 });

  if (loading) return <LoadingSpinner label="Fetching Live Data..." />;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Auto-refresh every 30s
      </div>
      <DataTable headers={data.headers} rows={data.rows} />
    </div>
  );
};

export default LivePage;
