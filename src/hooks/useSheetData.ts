import { useState, useEffect, useCallback } from 'react';
import { SheetData } from '../types';
import { fetchSheetData } from '../services/api';

interface UseSheetDataOptions {
  autoRefresh?: number; // polling interval in ms, 0 = disabled
}

export function useSheetData(sheetName: string, options: UseSheetDataOptions = {}) {
  const [data, setData] = useState<SheetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const result = await fetchSheetData(sheetName);
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [sheetName]);

  useEffect(() => {
    setLoading(true);
    load();
  }, [load]);

  useEffect(() => {
    if (!options.autoRefresh || options.autoRefresh <= 0) return;
    const interval = setInterval(load, options.autoRefresh);
    return () => clearInterval(interval);
  }, [load, options.autoRefresh]);

  return { data, loading, error, refresh: load };
}
