import { ITransactionState } from "@/services/transactionState";

/**
 * Default transaction states used as fallback when API fails
 */
export const DEFAULT_TRANSACTION_STATES: ITransactionState[] = [
  { id: 1, name: "Pending" },
  { id: 2, name: "Completed" },
  { id: 3, name: "Cancelled" },
];

/**
 * Items per page for transaction pagination
 */
export const CURRENT_ITEMS_PER_PAGE: number = 20;

/**
 * Default transaction filter values
 */
export interface ITransactionFilters {
  searchTerm: string;
  selectedCategory: string;
  selectedType: string;
  selectedTimePeriod: string;
}

export const CURRENT_FILTERS: ITransactionFilters = {
  searchTerm: "",
  selectedCategory: "all",
  selectedType: "all",
  selectedTimePeriod: "30days",
};
