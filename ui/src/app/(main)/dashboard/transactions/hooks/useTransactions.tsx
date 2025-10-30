"use client";
import { useState } from "react";
import {
  TRANSACTIONS_STATS,
  TIME_PERIODS,
  TRANSACTION_ACTIONS,
} from "../utils/constants/transactionsData";
import { ITransaction } from "../types/transaction";
import { ITransactionRequest } from "@/interfaces/transactionRequest";
import { SelectOption } from "@/interfaces/selectOption";
import useTransactionModal, { IModalState } from "./useTransactionModal";
import useTransactionDetails, {
  IDetailsModalState,
} from "./useTransactionDetails";
import useTransactionFormData from "./useTransactionFormData";
import useTransactionList from "./useTransactionList";
import { ITransactionFilters } from "../utils/constants/filter";
import useTransactionFilters from "./useTransactionFilters";
import useMonthlyStats from "./useMonthlyStats";
import { CURRENT_ITEMS_PER_PAGE } from "../utils/constants/constants";
import { formatTransactionStats } from "../utils/functions/formatStats";
import { exportTransactionsToPDF } from "../utils/functions/pdfExport";
import { toast } from "sonner";

export type { IModalState } from "./useTransactionModal";
export type { IDetailsModalState } from "./useTransactionDetails";

export interface ITransactionData {
  stats: typeof TRANSACTIONS_STATS;
  transactions: ITransaction[];
  categories: SelectOption[];
  types: SelectOption[];
  states: SelectOption[];
  accounts: SelectOption[];
  timePeriods: typeof TIME_PERIODS;
  actions: typeof TRANSACTION_ACTIONS;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

export interface ITransactionActions {
  handleSearch: (term: string) => void;
  handleCategoryFilter: (category: string) => void;
  handleTypeFilter: (type: string) => void;
  handleTimePeriodFilter: (period: string) => void;
  handleTransactionClick: (transactionId: number) => void;
  handleActionClick: (actionId: number) => void;
  clearFilters: () => void;
  openAddModal: () => void;
  openEditModal: (transaction: ITransaction) => void;
  closeModal: () => void;
  handleModalSubmit: (data: ITransactionRequest) => void;
  handlePageChange: (page: number) => void;
  handleEditTransaction: (transaction: ITransaction) => void;
  handleDeleteTransaction: (transactionId: number) => void;
  handleViewDetails: (transaction: ITransaction) => void;
  handleDownloadReceipt: (transaction: ITransaction) => void;
}

export interface IUseTransactions
  extends ITransactionData,
    ITransactionActions {
  filters: ITransactionFilters;
  modal: IModalState;
  detailsModal: IDetailsModalState;
  closeDetailsModal: () => void;
  deleteConfirmationModal: { isOpen: boolean; transactionId?: number };
  closeDeleteConfirmation: () => void;
  handleConfirmDelete: () => void;
  isLoading: boolean;
  searchInputValue: string;
  isFetchingTransactions: boolean;
  setIsFetchTransactions: (isFetching: boolean) => void;
  monthlyStats: ReturnType<typeof useMonthlyStats>;
  isDeletingTransaction: boolean;
  isExporting: boolean;
}

export default function useTransactions(): IUseTransactions {
  // State for export loading
  const [isExporting, setIsExporting] = useState(false);

  // Orchestrate all sub-hooks
  const filterHook = useTransactionFilters();
  const modalHook = useTransactionModal();
  const formDataHook = useTransactionFormData();
  const listHook = useTransactionList(filterHook.filters);
  // Pass isFetching as refreshTrigger to update stats when transactions are fetched
  const monthlyStats = useMonthlyStats({ refreshTrigger: listHook.isFetching });

  // Callback to refresh transactions after deletion
  const handleTransactionDeleted = () => {
    listHook.setIsFetching(!listHook.isFetching);
  };

  const detailsHook = useTransactionDetails(handleTransactionDeleted);

  // Format stats with monthly data
  const formattedStats = formatTransactionStats(
    TRANSACTIONS_STATS,
    monthlyStats
  );

  return {
    // Data
    stats: formattedStats,
    transactions: listHook.transactions,
    categories: filterHook.categories,
    types: filterHook.types,
    states: formDataHook.states,
    accounts: formDataHook.accounts,
    timePeriods: TIME_PERIODS,
    actions: TRANSACTION_ACTIONS,
    pagination: {
      currentPage: listHook.currentPage,
      itemsPerPage: CURRENT_ITEMS_PER_PAGE,
      totalItems: listHook.totalItems,
    },
    isFetchingTransactions: listHook.isFetching,

    // State
    filters: filterHook.filters,
    modal: modalHook.modal,
    detailsModal: detailsHook.detailsModal,
    isLoading: listHook.isLoading || monthlyStats.isLoading,
    searchInputValue: filterHook.searchInputValue,
    monthlyStats,

    // Actions
    handleSearch: filterHook.handleSearch,
    handleCategoryFilter: filterHook.handleCategoryFilter,
    handleTypeFilter: filterHook.handleTypeFilter,
    handleTimePeriodFilter: filterHook.handleTimePeriodFilter,
    handleTransactionClick: () => {
      // TODO: Implement transaction click handler
    },
    handleActionClick: async (actionId: number) => {
      // Action ID 2 is Export
      if (actionId === 2) {
        try {
          setIsExporting(true);
          await exportTransactionsToPDF(listHook.transactions, {
            title: "Transaction Report",
            filename: `transactions-${
              new Date().toISOString().split("T")[0]
            }.pdf`,
          });
          toast.success("Success", {
            description: "Transactions exported successfully",
            duration: 2000,
          });
        } catch (error) {
          console.error("Error exporting transactions:", error);
          toast.error("Error", {
            description: "Failed to export transactions",
            duration: 2000,
          });
        } finally {
          setIsExporting(false);
        }
      }
    },
    clearFilters: filterHook.clearFilters,
    openAddModal: modalHook.openAddModal,
    openEditModal: modalHook.openEditModal,
    closeModal: modalHook.closeModal,
    handleModalSubmit: (data: ITransactionRequest) => {
      console.log("data", data);
    },
    handlePageChange: listHook.handlePageChange,
    handleEditTransaction: modalHook.handleEditTransaction,
    handleDeleteTransaction: detailsHook.handleDeleteTransaction,
    handleViewDetails: detailsHook.handleViewDetails,
    handleDownloadReceipt: detailsHook.handleDownloadReceipt,
    closeDetailsModal: detailsHook.closeDetailsModal,
    deleteConfirmationModal: detailsHook.deleteConfirmationModal,
    closeDeleteConfirmation: detailsHook.closeDeleteConfirmation,
    handleConfirmDelete: detailsHook.handleConfirmDelete,
    setIsFetchTransactions: listHook.setIsFetching,
    isDeletingTransaction: detailsHook.isDeleting,
    isExporting,
  };
}
