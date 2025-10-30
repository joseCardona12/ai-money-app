"use client";
import { useState, useEffect } from "react";
import { transactionService } from "@/services/transaction";
import { ITransaction } from "../types/transaction";
import useAuthListener from "../../hooks/useAuthListener";
import { mapBackendTransactionToUI } from "../utils/functions/transactionMapper";
import { ITransactionFilters } from "../utils/constants/filter";
import { CURRENT_ITEMS_PER_PAGE } from "../utils/constants/constants";

export default function useTransactionList(filters: ITransactionFilters) {
  const { user } = useAuthListener();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    loadTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, currentPage, filters, isFetching]);

  const loadTransactions = async () => {
    if (!user?.id) {
      return;
    }

    setIsLoading(true);
    try {
      const endDate = new Date();
      const startDate = new Date();

      switch (filters.selectedTimePeriod) {
        case "7days":
          startDate.setDate(startDate.getDate() - 7);
          break;
        case "30days":
          startDate.setDate(startDate.getDate() - 30);
          break;
        case "90days":
          startDate.setDate(startDate.getDate() - 90);
          break;
        case "1year":
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        default:
          startDate.setDate(startDate.getDate() - 30);
      }

      const response = await transactionService.getTransactionsByUserId(
        user.id,
        currentPage,
        CURRENT_ITEMS_PER_PAGE,
        {
          search: filters.searchTerm,
          category: filters.selectedCategory,
          type: filters.selectedType,
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
        }
      );

      if (response.status < 400 && response.data) {
        const data = response.data;

        const transactionsData = Array.isArray(data)
          ? data
          : data.transactions || [];

        const mappedTransactions = transactionsData.map(
          mapBackendTransactionToUI
        );

        setTransactions(mappedTransactions);

        if (data.total) {
          setTotalItems(data.total);
        } else if (data.pagination?.total) {
          setTotalItems(data.pagination.total);
        } else {
          setTotalItems(transactionsData.length);
        }
      }
    } catch (_error) {
      setTransactions([]);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    transactions,
    currentPage,
    totalItems,
    isLoading,
    handlePageChange,
    isFetching,
    setIsFetching,
  };
}
