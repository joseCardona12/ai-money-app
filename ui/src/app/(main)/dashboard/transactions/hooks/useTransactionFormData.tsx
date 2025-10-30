"use client";
import { useState, useEffect } from "react";
import { categoryService, ICategory } from "@/services/category";
import {
  transactionTypeService,
  ITransactionType,
} from "@/services/transactionType";
import {
  transactionStateService,
  ITransactionState,
} from "@/services/transactionState";
import { accountService, IAccount } from "@/services/account";
import useAuthListener from "../../hooks/useAuthListener";
import { convertStatesToSelectOptions } from "../utils/functions/convertStatesToSelect";
import { statesService } from "@/services/states";

export default function useTransactionFormData() {
  const { user } = useAuthListener();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [types, setTypes] = useState<ITransactionType[]>([]);
  const [states, setStates] = useState<ITransactionState[]>([]);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const loadFormData = async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    try {
      const [categoriesRes, typesRes, statesRes, accountsRes] =
        await Promise.all([
          categoryService.getAllCategories(),
          transactionTypeService.getAllTransactionTypes(),
          statesService.getStates(),
          accountService.getAccountsByUserId(user.id),
        ]);

      setCategories(categoriesRes.data || []);
      setTypes(typesRes.data || []);
      setStates(statesRes.data || []);
      setAccounts(accountsRes.data || []);
    } catch (error) {
      console.error("Error loading form data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    categories: convertStatesToSelectOptions(categories),
    types: convertStatesToSelectOptions(types),
    states: convertStatesToSelectOptions(states),
    accounts: convertStatesToSelectOptions(accounts),
    isLoading,
  };
}
