import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useSheetData } from '../../hooks/useSheetData';
import LoadingSpinner from '../shared/LoadingSpinner';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const ChartPage: React.FC = () => {
  const { data, loading, error } = useSheetData('Chart');
  const [selectedCols, setSelectedCols] = useState<string[]>([]);

  const { xCol, numericCols, chartData } = useMemo(() => {
    if (!data || data.rows.length === 0) return { xCol: '', numericCols: [] as string[], chartData: [] };
    const xCol = data.headers[0];
    const numericCols = data.headers.filter(h => h !== xCol && data.rows.some(r => !isNaN(Number(r[h])) && r[h] !== ''));
    const chartData = data.rows.map(row => {
      const point: Record<string, string | number> = { name: String(row[xCol] ?? '') };
      numericCols.forEach(col => { point[col] = Number(row[col] ?? 0); });
      return point;
    });
    return { xCol, numericCols, chartData };
  }, [data]);

  const activeCols = selectedCols.length > 0 ? selectedCols : numericCols.slice(0, 2);

  const toggleCol = (col: string) => {
    setSelectedCols(prev =>
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    );
  };

  if (loading) return <LoadingSpinner label="Fetching Chart Data..." />;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-4 p-4">
      {numericCols.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {numericCols.map(col => (
            <button
              key={col}
              onClick={() => toggleCol(col)}
              className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                activeCols.includes(col) ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {col}
            </button>
          ))}
        </div>
      )}
      {chartData.length > 0 && (
        <div className="glass-morphism rounded-xl p-4 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f8fafc', fontSize: 12 }} />
              {activeCols.map((col, i) => (
                <Line key={col} type="monotone" dataKey={col} stroke={COLORS[i % COLORS.length]} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ChartPage;
