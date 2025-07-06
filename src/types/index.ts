export interface ExcelData {
  company: string;
  year: number;
  month: string;
  revenue: number;
  revPAR: number;
  occupancy: number;
  adr: number;
}

export interface MetricData {
  current: number;
  previous: number;
  growth: number;
  label: string;
  icon: string;
}

export interface ChartData {
  month: string;
  current: number;
  previous: number;
}

export interface FilterState {
  company: string;
  year: number;
  month: string;
}