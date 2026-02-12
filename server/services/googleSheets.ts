import { google } from 'googleapis';

const CACHE_TTL = 60_000; // 60 seconds
const cache = new Map<string, { data: any; timestamp: number }>();

function getSheets() {
  return google.sheets({
    version: 'v4',
    auth: process.env.GOOGLE_API_KEY,
  });
}

export async function getSheetData(sheetName: string, range?: string) {
  const cacheKey = `${sheetName}:${range || 'all'}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const sheets = getSheets();
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const fullRange = range ? `${sheetName}!${range}` : sheetName;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: fullRange,
  });

  const rows = response.data.values;
  if (!rows || rows.length === 0) {
    return { headers: [], rows: [] };
  }

  const headers = rows[0] as string[];
  const dataRows = rows.slice(1).map(row => {
    const obj: Record<string, string | number> = {};
    headers.forEach((header, i) => {
      const val = row[i] ?? '';
      const num = Number(val);
      obj[header] = val !== '' && !isNaN(num) && String(num) === val.trim() ? num : val;
    });
    return obj;
  });

  const result = { headers, rows: dataRows };
  cache.set(cacheKey, { data: result, timestamp: Date.now() });
  return result;
}
