"use client";
import { useEffect, useState } from "react";
import {
  CURRENT_FILTERS,
  ITransactionFilters,
} from "../utils/constants/filter";
import { categoryService } from "@/services/category";
import { SelectOption } from "@/interfaces/selectOption";
import { convertStatesToSelectOptions } from "../utils/functions/convertStatesToSelect";
import { transactionTypeService } from "@/services/transactionType";

export default function useTransactionFilters() {
  const [filters, setFilters] = useState<ITransactionFilters>(CURRENT_FILTERS);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [types, setTypes] = useState<SelectOption[]>([]);

  const handleSearch = (term: string) => {
    setSearchInputValue(term);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      setFilters({ ...filters, searchTerm: term });
    }, 500);

    setSearchTimeout(timeout);
  };

  const handleCategoryFilter = (category: string) => {
    setFilters({ ...filters, selectedCategory: category });
  };

  const handleTypeFilter = (type: string) => {
    setFilters({ ...filters, selectedType: type });
  };

  const handleTimePeriodFilter = (period: string) => {
    setFilters({ ...filters, selectedTimePeriod: period });
  };
  const clearFilters = () => {
    setFilters(CURRENT_FILTERS);
    setSearchInputValue("");
  };

  const getCategories = async (): Promise<void> => {
    try {
      const categories = await categoryService.getAllCategories();
      setCategories(convertStatesToSelectOptions(categories.data));
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const getTypes = async (): Promise<void> => {
    try {
      const types = await transactionTypeService.getAllTransactionTypes();
      setTypes(convertStatesToSelectOptions(types.data));
    } catch (error) {
      console.error("Error loading types:", error);
    }
  };

  const loadData = async () => {
    try {
      await Promise.all([getCategories(), getTypes()]);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    filters,
    searchInputValue,
    handleSearch,
    handleCategoryFilter,
    handleTypeFilter,
    handleTimePeriodFilter,
    clearFilters,
    categories,
    types,
  };
}
