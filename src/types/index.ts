export interface ReportPage {
  id: string;
  name: string;
  icon: string;
  sheetName: string;
}

export interface SheetRow {
  [key: string]: string | number;
}

export interface SheetData {
  headers: string[];
  rows: SheetRow[];
}

export interface Alert {
  id: string;
  ticker: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
}

export interface StatCardData {
  label: string;
  value: string | number;
  change?: number;
  icon?: string;
}
