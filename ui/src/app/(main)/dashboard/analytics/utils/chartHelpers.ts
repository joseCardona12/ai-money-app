import { IChartDataPoint, ICategorySpending } from "../types/analytics";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (value: number | undefined | null): string => {
  if (value === undefined || value === null || isNaN(value)) {
    return "0.0%";
  }
  return `${value.toFixed(1)}%`;
};

export const calculateTotal = (data: ICategorySpending[]): number => {
  return data.reduce((total, item) => total + item.amount, 0);
};

export const getChangeColor = (
  changeType: "positive" | "negative" | "neutral"
): string => {
  switch (changeType) {
    case "positive":
      return "text-green-600";
    case "negative":
      return "text-red-600";
    case "neutral":
      return "text-gray-600";
    default:
      return "text-gray-600";
  }
};

export const getChangeIcon = (
  changeType: "positive" | "negative" | "neutral"
): string => {
  switch (changeType) {
    case "positive":
      return "↗";
    case "negative":
      return "↘";
    case "neutral":
      return "→";
    default:
      return "→";
  }
};

export const prepareChartData = (
  data: IChartDataPoint[]
): IChartDataPoint[] => {
  return data.map((item) => ({
    ...item,
    income: item.income || 0,
    expenses: item.expenses || 0,
    savings: item.savings || 0,
    cashFlow: item.cashFlow || 0,
  }));
};

export const calculateSavingsRate = (
  income: number,
  expenses: number
): number => {
  if (income === 0) return 0;
  return ((income - expenses) / income) * 100;
};

export const getTopCategories = (
  categories: ICategorySpending[],
  limit: number = 5
): ICategorySpending[] => {
  return categories.sort((a, b) => b.amount - a.amount).slice(0, limit);
};

export const generateChartColors = (count: number): string[] => {
  const baseColors = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#6B7280",
    "#14B8A6",
    "#F97316",
    "#84CC16",
  ];

  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length]);
  }

  return colors;
};
