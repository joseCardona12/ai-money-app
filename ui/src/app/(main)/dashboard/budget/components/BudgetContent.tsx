"use client";
import BudgetStatsSection from "./BudgetStatsSection";
import BudgetAlertsSection from "./BudgetAlertsSection";
import BudgetCategoriesSection from "./BudgetCategoriesSection";
import AddCategoryModal from "./CategoryModals/AddCategoryModal";
import CategoryDetailsModal from "./CategoryModals/CategoryDetailsModal";
import ConfirmationModal from "@/ui/components/ConfirmationModal";
import Button from "@/ui/components/Button";
import Select from "@/ui/components/Select";
import { IconPlus } from "@tabler/icons-react";
import { IUseBudget } from "../hooks/useBudget";

interface BudgetContentProps {
  budgetData: IUseBudget;
}

export default function BudgetContent({
  budgetData,
}: BudgetContentProps): React.ReactNode {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget</h1>
          <p className="text-gray-600 mt-1">
            Plan and track your monthly spending
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Month Selector */}
          <Select
            value={budgetData.selectedMonth}
            onChange={(value) => budgetData.handleMonthChange(value)}
            options={budgetData.months}
            placeholder="Select month"
          />

          {/* Add Category Button */}
          <Button
            variant="primary"
            onClick={budgetData.handleAddCategory}
            className="flex items-center gap-2"
          >
            <IconPlus size={16} />
            Add Category
          </Button>
        </div>
      </div>

      {/* Budget Stats */}
      <BudgetStatsSection summary={budgetData.summary} />

      {/* Budget Alerts */}
      <BudgetAlertsSection alerts={budgetData.alerts} />

      {/* Budget Categories */}
      <BudgetCategoriesSection
        categories={budgetData.categories}
        onCategoryClick={budgetData.handleCategoryClick}
        getCategoryOptions={budgetData.getCategoryOptions}
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={budgetData.modal.isOpen}
        onClose={budgetData.closeModal}
        mode={budgetData.modal.mode}
        category={budgetData.modal.selectedCategory}
        onSubmit={budgetData.handleModalSubmit}
        availableCategories={budgetData.availableCategories}
        months={budgetData.months}
        selectedMonth={budgetData.selectedMonth}
      />

      {/* Category Details Modal */}
      <CategoryDetailsModal
        isOpen={budgetData.detailsModal.isOpen}
        onClose={budgetData.closeDetailsModal}
        category={budgetData.detailsModal.selectedCategory || null}
        onEdit={budgetData.handleEditFromDetails}
        onDelete={(budgetId) => {
          budgetData.closeDetailsModal();
          budgetData.handleDeleteCategory(budgetId);
        }}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={budgetData.deleteConfirmationModal.isOpen}
        onClose={budgetData.closeDeleteConfirmation}
        title="Delete Budget"
        message="Are you sure you want to delete this budget? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={budgetData.handleConfirmDelete}
        isLoading={budgetData.isDeleting}
        variant="danger"
      />
    </div>
  );
}
