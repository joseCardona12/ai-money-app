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
