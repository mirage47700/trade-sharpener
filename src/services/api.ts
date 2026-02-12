import { SheetData, SheetRow } from '../types';
import { API_BASE } from '../config';

export async function fetchSheetData(sheetName: string, range?: string): Promise<SheetData> {
  const params = range ? `?range=${encodeURIComponent(range)}` : '';
  const res = await fetch(`${API_BASE}/data/${encodeURIComponent(sheetName)}${params}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${sheetName}: ${res.statusText}`);
  }
  return res.json();
}
