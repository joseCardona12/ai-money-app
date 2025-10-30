"use client";
import Modal from "@/ui/components/Modal";
import Button from "@/ui/components/Button";
import FormFieldSelect from "@/ui/components/FormFieldSelect";
import FormFieldNumber from "@/ui/components/FormFieldNumber";
import useBudgetForm from "../../hooks/useBudgetForm";
import { IBudgetCategory } from "../../types/budget";
import { IBudgetRequest } from "@/interfaces/budgetRequest";
import { SelectOption } from "@/interfaces/selectOption";
import {
  getCurrentMonthISO,
  getMonthName,
} from "../../utils/functions/budgetMapper";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  category?: IBudgetCategory;
  onSubmit: (data: IBudgetRequest) => void;
  availableCategories: SelectOption[];
  months: SelectOption[];
  selectedMonth?: string;
}

export default function AddCategoryModal({
  isOpen,
  onClose,
  mode,
  category,
  onSubmit,
  availableCategories,
  months,
  selectedMonth,
}: AddCategoryModalProps): React.ReactNode {
  // Set default values based on mode and category
  const defaultValues =
    mode === "edit" && category
      ? {
          categoryId: category.id,
          budgetedAmount: category.budgeted,
          month: selectedMonth || getCurrentMonthISO(),
        }
      : {
          categoryId: 0,
          budgetedAmount: 0,
          month: selectedMonth || getCurrentMonthISO(),
        };

  const { control, handleSubmit, errors, handleCancel } = useBudgetForm({
    onSubmit,
    onCancel: onClose,
    defaultValues,
  });

  if (!isOpen) return null;

  const title = mode === "add" ? "Add Budget Category" : "Edit Budget Category";
  const submitText = mode === "add" ? "Add Budget" : "Update Budget";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="p-6">
        <p className="text-sm text-gray-600 mb-6">
          Set a monthly budget limit for a spending category.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Month */}
          <FormFieldSelect<IBudgetRequest>
            label="Month"
            name="month"
            control={control}
            error={errors.month}
            placeholder="Select month"
            options={months}
          />

          {/* Category */}
          <FormFieldSelect<IBudgetRequest>
            label="Category"
            name="categoryId"
            control={control}
            error={errors.categoryId}
            placeholder="Select category"
            options={availableCategories}
          />

          {/* Budgeted Amount */}
          <FormFieldNumber<IBudgetRequest>
            label="Budgeted Amount"
            name="budgetedAmount"
            control={control}
            error={errors.budgetedAmount}
            placeholder="0.00"
          />

          <div className="text-sm text-gray-500 mt-2">
            Set how much you want to budget for this category in the selected
            month
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {submitText}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
