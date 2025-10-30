import { IMonthlyStats } from "../../hooks/useMonthlyStats";
import { formatCurrency } from "./formatCurrency";

export interface IFormattedStat {
  title: string;
  value: string;
  change: string;
  changeText: string;
  positive: boolean;
}

export const formatStatWithMonthlyData = (
  baseStat: IFormattedStat,
  monthlyData: {
    amount: number;
    change: string | null;
    changePositive: boolean;
  }
): IFormattedStat => {
  return {
    ...baseStat,
    value: formatCurrency(monthlyData.amount),
    change: monthlyData.change || "N/A",
    changeText: monthlyData.change ? "from last month" : "no data from last month",
    positive: monthlyData.changePositive,
  };
};

export const formatTransactionStats = (
  baseStats: IFormattedStat[],
  monthlyStats: IMonthlyStats
): IFormattedStat[] => {
  return [
    formatStatWithMonthlyData(baseStats[0], {
      amount: monthlyStats.totalAmount,
      change: monthlyStats.totalAmountChange,
      changePositive: monthlyStats.totalAmountChangePositive,
    }),
    formatStatWithMonthlyData(baseStats[1], {
      amount: monthlyStats.totalIncome,
      change: monthlyStats.totalIncomeChange,
      changePositive: monthlyStats.totalIncomeChangePositive,
    }),
    formatStatWithMonthlyData(baseStats[2], {
      amount: monthlyStats.totalExpenses,
      change: monthlyStats.totalExpensesChange,
      changePositive: monthlyStats.totalExpensesChangePositive,
    }),
  ];
};

