import { IContentTab } from "@/interfaces/contentTab";

export interface IAnalyticsCard {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
  color: string;
}

export interface IChartDataPoint {
  month: string;
  income?: number;
  expenses?: number;
  savings?: number;
  cashFlow?: number;
}

export interface ICategorySpending {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface ICategoryBreakdown {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface IAnalyticsData {
  cards: IAnalyticsCard[];
  incomeVsExpenses: IChartDataPoint[];
  savingsTrend: IChartDataPoint[];
  categorySpending: ICategorySpending[];
  categoryBreakdown: ICategoryBreakdown[];
  cashFlowAnalysis: IChartDataPoint[];
  selectedPeriod: string;
}

export interface IAnalyticsActions {
  handlePeriodChange: (period: string) => void;
  handleTabChange: (tab: string) => void;
  setContentTabs: (tabs: IContentTab[]) => void;
}

export interface IUseAnalytics extends IAnalyticsData, IAnalyticsActions {
  activeTab: string;
  contentTabs: IContentTab[];
}

export type AnalyticsTab = "overview" | "categories" | "cashflow";
