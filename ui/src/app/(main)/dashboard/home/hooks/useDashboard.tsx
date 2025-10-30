"use client";
import { useState, useEffect } from "react";
import {
  STATS_CARDS,
  CHART_DATA,
  TRANSACTIONS_DATA,
  ALERTS_DATA,
  QUICK_ACTIONS_DATA,
} from "../utils/constants/dashboardData";
import { ITransaction } from "../../transactions/types/transaction";
import {
  adaptDashboardTransactionToTransaction,
  findDashboardTransactionById,
} from "../utils/transactionAdapter";
import { analyticsService } from "@/services/analytics";
import useAuthListener from "../../hooks/useAuthListener";

export interface IDashboardData {
  statsCards: typeof STATS_CARDS;
  chartData: typeof CHART_DATA;
  transactions: typeof TRANSACTIONS_DATA;
  alerts: typeof ALERTS_DATA;
  quickActions: typeof QUICK_ACTIONS_DATA;
}

export interface IDetailsModalState {
  isOpen: boolean;
  selectedTransaction?: ITransaction;
}

export interface IDashboardActions {
  handleQuickAction: (actionId: number) => void;
  handleTransactionClick: (transactionId: number) => void;
  handleEditTransaction: (transactionId: number) => void;
  handleDeleteTransaction: (transactionId: number) => void;
  handleViewDetails: (transactionId: number) => void;
  handleDownloadReceipt: (transactionId: number) => void;
  closeDetailsModal: () => void;
}

export interface IUseDashboard extends IDashboardData, IDashboardActions {
  selectedTimeframe: string;
  setSelectedTimeframe: (timeframe: string) => void;
  detailsModal: IDetailsModalState;
}

export default function useDashboard(): IUseDashboard {
  const { user } = useAuthListener();
  const [selectedTimeframe, setSelectedTimeframe] = useState("This year");
  const [detailsModal, setDetailsModal] = useState<IDetailsModalState>({
    isOpen: false,
    selectedTransaction: undefined,
  });
  const [statsCards, setStatsCards] = useState(STATS_CARDS);

  // Load analytics data on mount
  useEffect(() => {
    const loadAnalytics = async () => {
      if (!user?.id) return;

      try {
        const response = await analyticsService.getAnalyticsByUserId(user.id);

        if (response.status < 400 && response.data) {
          const analyticsData = response.data;

          // Safely get values with defaults
          const totalIncome = analyticsData.total_income ?? 0;
          const totalExpenses = analyticsData.total_expenses ?? 0;

          // Update stats cards with analytics data
          setStatsCards([
            {
              title: "Total balance",
              amount: `$${(totalIncome - totalExpenses).toFixed(2)}`,
              currency: "USD",
              change: "0%",
              changeText: "Net balance",
              positive: totalIncome >= totalExpenses,
            },
            {
              title: "Income",
              amount: `$${totalIncome.toFixed(2)}`,
              currency: "USD",
              change: "0%",
              changeText: "Total income",
              positive: true,
            },
            {
              title: "Expenses",
              amount: `$${totalExpenses.toFixed(2)}`,
              currency: "USD",
              change: "0%",
              changeText: "Total expenses",
              positive: false,
            },
          ]);

          console.log("Loaded analytics:", analyticsData);
        }
      } catch (error) {
        console.error("Error loading analytics:", error);
      }
    };

    loadAnalytics();
  }, [user?.id]);

  const handleQuickAction = (actionId: number) => {
    console.log(`Quick action clicked: ${actionId}`);
  };

  const handleTransactionClick = (transactionId: number) => {
    console.log(`Transaction clicked: ${transactionId}`);
  };

  const handleViewDetails = (transactionId: number) => {
    const dashboardTransaction = findDashboardTransactionById(
      TRANSACTIONS_DATA,
      transactionId
    );
    if (dashboardTransaction) {
      const adaptedTransaction =
        adaptDashboardTransactionToTransaction(dashboardTransaction);
      setDetailsModal({
        isOpen: true,
        selectedTransaction: adaptedTransaction,
      });
    }
  };

  const handleEditTransaction = (transactionId: number) => {
    console.log("Edit transaction:", transactionId);
  };

  const handleDeleteTransaction = (transactionId: number) => {
    console.log("Delete transaction:", transactionId);
  };

  const handleDownloadReceipt = (transactionId: number) => {
    console.log("Download receipt:", transactionId);
  };

  const closeDetailsModal = () => {
    setDetailsModal({
      isOpen: false,
      selectedTransaction: undefined,
    });
  };

  return {
    // Data
    statsCards,
    chartData: CHART_DATA,
    transactions: TRANSACTIONS_DATA,
    alerts: ALERTS_DATA,
    quickActions: QUICK_ACTIONS_DATA,

    // State
    selectedTimeframe,
    setSelectedTimeframe,
    detailsModal,

    // Actions
    handleQuickAction,
    handleTransactionClick,
    handleEditTransaction,
    handleDeleteTransaction,
    handleViewDetails,
    handleDownloadReceipt,
    closeDetailsModal,
  };
}
