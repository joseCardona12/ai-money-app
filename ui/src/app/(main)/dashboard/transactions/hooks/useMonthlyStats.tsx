"use client";
import { useState, useEffect } from "react";
import {
  transactionService,
  IMonthlyStatsComparison,
} from "@/services/transaction";
import useAuthListener from "../../hooks/useAuthListener";

export interface IMonthlyStats {
  totalAmount: number;
  totalIncome: number;
  totalExpenses: number;
  totalAmountChange: string | null;
  totalIncomeChange: string | null;
  totalExpensesChange: string | null;
  totalAmountChangePositive: boolean;
  totalIncomeChangePositive: boolean;
  totalExpensesChangePositive: boolean;
  isLoading: boolean;
}

interface IUseMonthlyStatsProps {
  refreshTrigger?: boolean;
}

export default function useMonthlyStats(
  props?: IUseMonthlyStatsProps
): IMonthlyStats {
  const { user } = useAuthListener();
  const [stats, setStats] = useState<IMonthlyStats>({
    totalAmount: 0,
    totalIncome: 0,
    totalExpenses: 0,
    totalAmountChange: null,
    totalIncomeChange: null,
    totalExpensesChange: null,
    totalAmountChangePositive: true,
    totalIncomeChangePositive: true,
    totalExpensesChangePositive: true,
    isLoading: true,
  });

  useEffect(() => {
    const loadStats = async () => {
      if (!user?.id) {
        return;
      }

      setStats((prev) => ({ ...prev, isLoading: true }));

      try {
        const response = await transactionService.getMonthlyStatsComparison(
          user.id
        );

        if (response.status < 400 && response.data) {
          const data = response.data as IMonthlyStatsComparison;

          setStats({
            totalAmount: data.currentMonth.totalAmount,
            totalIncome: data.currentMonth.totalIncome,
            totalExpenses: data.currentMonth.totalExpenses,
            totalAmountChange: data.changes.totalAmountChange,
            totalIncomeChange: data.changes.totalIncomeChange,
            totalExpensesChange: data.changes.totalExpensesChange,
            totalAmountChangePositive: data.changes.totalAmountChangePositive,
            totalIncomeChangePositive: data.changes.totalIncomeChangePositive,
            totalExpensesChangePositive:
              data.changes.totalExpensesChangePositive,
            isLoading: false,
          });
        }
      } catch (error) {
        setStats((prev) => ({ ...prev, isLoading: false }));
      }
    };

    loadStats();
  }, [user?.id, props?.refreshTrigger]);

  return stats;
}
