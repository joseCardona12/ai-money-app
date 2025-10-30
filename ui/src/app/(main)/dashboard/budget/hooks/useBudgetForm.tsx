"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  budgetFormSchema,
  BudgetFormData,
  CURRENT_FORM_BUDGET,
} from "../utils/constants/budgetFormSchema";
import { IBudgetRequest } from "@/interfaces/budgetRequest";

interface UseBudgetFormProps {
  onSubmit: (data: IBudgetRequest) => void;
  onCancel: () => void;
  defaultValues?: Partial<BudgetFormData>;
}

export default function useBudgetForm({
  onSubmit,
  onCancel,
  defaultValues,
}: UseBudgetFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: defaultValues || CURRENT_FORM_BUDGET,
  });

  const handleFormSubmit = (data: BudgetFormData) => {
    const budgetRequest: IBudgetRequest = {
      categoryId: data.categoryId,
      budgetedAmount: data.budgetedAmount,
      month: data.month,
    };
    onSubmit(budgetRequest);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return {
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
    errors,
    handleCancel,
  };
}
