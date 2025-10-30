import {
  IAnalyticsCard,
  IChartDataPoint,
  ICategorySpending,
  ICategoryBreakdown,
} from "../../types/analytics";
import { SelectOption } from "@/interfaces/selectOption";

export const ANALYTICS_CARDS: IAnalyticsCard[] = [
  {
    id: "total-income",
    title: "Total Income",
    value: "$66,100",
    change: "8.5%",
    changeType: "positive",
    icon: "📈",
    color: "#10B981",
  },
  {
    id: "total-expenses",
    title: "Total Expenses",
    value: "$42,600",
    change: "5.2%",
    changeType: "negative",
    icon: "📉",
    color: "#EF4444",
  },
  {
    id: "total-savings",
    title: "Total Savings",
    value: "$23,500",
    change: "12.3%",
    changeType: "positive",
    icon: "💰",
    color: "#3B82F6",
  },
  {
    id: "savings-rate",
    title: "Savings Rate",
    value: "35.6%",
    change: "Of total income",
    changeType: "neutral",
    icon: "🎯",
    color: "#8B5CF6",
  },
];

export const INCOME_VS_EXPENSES_DATA: IChartDataPoint[] = [
  { month: "Jan", income: 5500, expenses: 3500 },
  { month: "Feb", income: 5300, expenses: 3600 },
  { month: "Mar", income: 5600, expenses: 3400 },
  { month: "Apr", income: 5400, expenses: 3700 },
  { month: "May", income: 5800, expenses: 3800 },
  { month: "Jun", income: 5700, expenses: 3600 },
  { month: "Jul", income: 5900, expenses: 3900 },
  { month: "Aug", income: 6000, expenses: 4000 },
  { month: "Sep", income: 5800, expenses: 3700 },
  { month: "Oct", income: 6100, expenses: 4100 },
  { month: "Nov", income: 5900, expenses: 3800 },
  { month: "Dec", income: 6200, expenses: 4000 },
];

export const SAVINGS_TREND_DATA: IChartDataPoint[] = [
  { month: "Jan", savings: 2000 },
  { month: "Feb", savings: 1700 },
  { month: "Mar", savings: 2200 },
  { month: "Apr", savings: 1700 },
  { month: "May", savings: 2000 },
  { month: "Jun", savings: 2100 },
  { month: "Jul", savings: 2000 },
  { month: "Aug", savings: 2000 },
  { month: "Sep", savings: 2100 },
  { month: "Oct", savings: 2000 },
  { month: "Nov", savings: 2100 },
  { month: "Dec", savings: 2200 },
];

export const CATEGORY_SPENDING_DATA: ICategorySpending[] = [
  {
    id: "bills-utilities",
    name: "Bills & Utilities",
    amount: 1150,
    percentage: 32.3,
    color: "#FFC107",
  },
  {
    id: "food-dining",
    name: "Food & Dining",
    amount: 850,
    percentage: 23.9,
    color: "#FF6B35",
  },
  {
    id: "transportation",
    name: "Transportation",
    amount: 420,
    percentage: 11.8,
    color: "#4285F4",
  },
  {
    id: "shopping",
    name: "Shopping",
    amount: 380,
    percentage: 10.7,
    color: "#9C27B0",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    amount: 340,
    percentage: 9.6,
    color: "#E91E63",
  },
  {
    id: "other",
    name: "Other",
    amount: 180,
    percentage: 5.1,
    color: "#607D8B",
  },
  {
    id: "education",
    name: "Education",
    amount: 150,
    percentage: 4.2,
    color: "#2196F3",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    amount: 85,
    percentage: 2.4,
    color: "#F44336",
  },
];

export const CATEGORY_BREAKDOWN_DATA: ICategoryBreakdown[] = [
  {
    id: "bills-utilities",
    name: "Bills & Utilities",
    amount: 1150,
    percentage: 32.3,
    color: "#FFC107",
  },
  {
    id: "food-dining",
    name: "Food & Dining",
    amount: 850,
    percentage: 23.9,
    color: "#FF6B35",
  },
  {
    id: "transportation",
    name: "Transportation",
    amount: 420,
    percentage: 11.8,
    color: "#4285F4",
  },
  {
    id: "shopping",
    name: "Shopping",
    amount: 380,
    percentage: 10.7,
    color: "#9C27B0",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    amount: 340,
    percentage: 9.6,
    color: "#E91E63",
  },
  {
    id: "other",
    name: "Other",
    amount: 180,
    percentage: 5.1,
    color: "#607D8B",
  },
  {
    id: "education",
    name: "Education",
    amount: 150,
    percentage: 4.2,
    color: "#2196F3",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    amount: 85,
    percentage: 2.4,
    color: "#F44336",
  },
];

export const CASH_FLOW_DATA: IChartDataPoint[] = [
  { month: "Jan", cashFlow: 2000 },
  { month: "Feb", cashFlow: 1700 },
  { month: "Mar", cashFlow: 2200 },
  { month: "Apr", cashFlow: 1700 },
  { month: "May", cashFlow: 2000 },
  { month: "Jun", cashFlow: 2100 },
  { month: "Jul", cashFlow: 2000 },
  { month: "Aug", cashFlow: 2000 },
  { month: "Sep", cashFlow: 2100 },
  { month: "Oct", cashFlow: 2000 },
  { month: "Nov", cashFlow: 2100 },
  { month: "Dec", cashFlow: 2200 },
];

export const TIME_PERIODS: SelectOption[] = [
  { value: "last-12-months", label: "Last 12 Months" },
  { value: "last-6-months", label: "Last 6 Months" },
  { value: "last-3-months", label: "Last 3 Months" },
  { value: "current-year", label: "Current Year" },
  { value: "last-year", label: "Last Year" },
];

export const ANALYTICS_TABS = [
  { id: "overview", label: "Overview" },
  { id: "categories", label: "Categories" },
  { id: "cashflow", label: "Cash Flow" },
] as const;
