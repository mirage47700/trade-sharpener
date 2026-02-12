import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSheetData } from '../../hooks/useSheetData';
import DataTable from '../shared/DataTable';
import LoadingSpinner from '../shared/LoadingSpinner';

const GrowthPage: React.FC = () => {
  const { data, loading, error } = useSheetData('Growth');

  const chartData = useMemo(() => {
    if (!data || data.rows.length === 0) return [];
    const xCol = data.headers[0];
    const numericCols = data.headers.filter(h => h !== xCol && !isNaN(Number(data.rows[0]?.[h])));
    return data.rows.map(row => {
      const point: Record<string, string | number> = { name: String(row[xCol] ?? '') };
      numericCols.forEach(col => { point[col] = Number(row[col] ?? 0); });
      return point;
    });
  }, [data]);

  const numericCols = useMemo(() => {
    if (!data || data.rows.length === 0) return [];
    return data.headers.filter(h => h !== data.headers[0] && !isNaN(Number(data.rows[0]?.[h])));
  }, [data]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (loading) return <LoadingSpinner label="Fetching Growth Data..." />;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-4 p-4">
      {chartData.length > 0 && (
        <div className="glass-morphism rounded-xl p-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f8fafc', fontSize: 12 }} />
              {numericCols.slice(0, 5).map((col, i) => (
                <Line key={col} type="monotone" dataKey={col} stroke={COLORS[i]} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      <DataTable headers={data.headers} rows={data.rows} />
    </div>
  );
};

export default GrowthPage;
