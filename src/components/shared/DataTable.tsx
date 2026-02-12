import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { SheetRow } from '../../types';

interface DataTableProps {
  headers: string[];
  rows: SheetRow[];
  pageSize?: number;
  searchable?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ headers, rows, pageSize = 25, searchable = true }) => {
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (!search) return rows;
    const q = search.toLowerCase();
    return rows.filter(row =>
      headers.some(h => String(row[h] ?? '').toLowerCase().includes(q))
    );
  }, [rows, headers, search]);

  const sorted = useMemo(() => {
    if (!sortCol) return filtered;
    return [...filtered].sort((a, b) => {
      const va = a[sortCol] ?? '';
      const vb = b[sortCol] ?? '';
      const na = Number(va);
      const nb = Number(vb);
      if (!isNaN(na) && !isNaN(nb)) return sortAsc ? na - nb : nb - na;
      return sortAsc
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
  }, [filtered, sortCol, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
    setPage(0);
  };

  const isNumeric = (val: unknown) => !isNaN(Number(val)) && val !== '' && val !== null;
  const formatCell = (val: unknown) => {
    if (val === null || val === undefined || val === '') return '—';
    const n = Number(val);
    if (!isNaN(n) && typeof val !== 'boolean') {
      if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
      if (Math.abs(n) >= 1_000) return (n / 1_000).toFixed(1) + 'K';
      if (!Number.isInteger(n)) return n.toFixed(2);
    }
    return String(val);
  };

  const getCellColor = (val: unknown) => {
    const n = Number(val);
    if (isNaN(n)) return '';
    if (n > 0) return 'text-green-400';
    if (n < 0) return 'text-red-400';
    return '';
  };

  return (
    <div className="flex flex-col gap-3">
      {searchable && (
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
          />
        </div>
      )}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-white/5">
              {headers.map(h => (
                <th
                  key={h}
                  onClick={() => handleSort(h)}
                  className="px-3 py-2.5 text-left font-bold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors whitespace-nowrap select-none"
                >
                  <span className="flex items-center gap-1">
                    {h}
                    {sortCol === h && (sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="px-3 py-8 text-center text-slate-500">
                  No data found
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                  {headers.map(h => (
                    <td key={h} className={`px-3 py-2 whitespace-nowrap ${isNumeric(row[h]) ? `text-right font-mono ${getCellColor(row[h])}` : 'text-slate-200'}`}>
                      {formatCell(row[h])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{sorted.length} rows</span>
          <div className="flex gap-1">
            <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors">Prev</button>
            <span className="px-2 py-1">{page + 1} / {totalPages}</span>
            <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
