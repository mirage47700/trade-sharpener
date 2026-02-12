import { ReportPage } from './types';

export const PAGES: ReportPage[] = [
  { id: 'sharpener', name: 'Sharpener', icon: 'Zap', sheetName: 'Sharpener' },
  { id: 'live', name: 'Live', icon: 'Activity', sheetName: 'Live' },
  { id: 'type', name: 'Type', icon: 'Layers', sheetName: 'Type' },
  { id: 'growth', name: 'Growth', icon: 'TrendingUp', sheetName: 'Growth' },
  { id: 'contrarian', name: 'Contrariant', icon: 'TrendingDown', sheetName: 'Contrarian' },
  { id: 'screener', name: 'Screener', icon: 'Calendar', sheetName: 'Screener' },
  { id: 'ratio', name: 'Ratio', icon: 'Scale', sheetName: 'Ratio' },
  { id: 'alertes', name: 'Alertes', icon: 'Bell', sheetName: 'Alertes' },
  { id: 'chart', name: 'Chart', icon: 'LineChart', sheetName: 'Chart' },
];

export const API_BASE = import.meta.env.DEV ? '/api' : '/api';
