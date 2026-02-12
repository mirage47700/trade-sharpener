import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useSheetData } from '../../hooks/useSheetData';
import DataTable from '../shared/DataTable';
import LoadingSpinner from '../shared/LoadingSpinner';

const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'];

const TypePage: React.FC = () => {
  const { data, loading, error } = useSheetData('Type');

  const chartData = useMemo(() => {
    if (!data || data.rows.length === 0) return [];
    const nameCol = data.headers[0];
    const valueCol = data.headers.find(h => h !== nameCol && !isNaN(Number(data.rows[0]?.[h]))) || data.headers[1];
    return data.rows.slice(0, 10).map(row => ({
      name: String(row[nameCol] ?? ''),
      value: Number(row[valueCol] ?? 0),
    }));
  }, [data]);

  if (loading) return <LoadingSpinner label="Fetching Type Data..." />;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-4 p-4">
      {chartData.length > 0 && (
        <div className="glass-morphism rounded-xl p-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f8fafc', fontSize: 12 }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      <DataTable headers={data.headers} rows={data.rows} />
    </div>
  );
};

export default TypePage;
