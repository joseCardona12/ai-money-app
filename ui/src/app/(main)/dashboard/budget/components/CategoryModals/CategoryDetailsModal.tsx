"use client";
import Modal from "@/ui/components/Modal";
import Button from "@/ui/components/Button";
import { IBudgetCategory } from "../../types/budget";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconCalendar,
  IconTarget,
} from "@tabler/icons-react";

interface CategoryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: IBudgetCategory | null;
  onEdit: () => void;
  onDelete?: (budgetId: number) => void;
}

export default function CategoryDetailsModal({
  isOpen,
  onClose,
  category,
  onEdit,
  onDelete,
}: CategoryDetailsModalProps): React.ReactNode {
  if (!isOpen || !category) return null;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const progressPercentage = (category.spent / category.budgeted) * 100;
  const remainingAmount = category.budgeted - category.spent;
  const isOverBudget = category.spent > category.budgeted;
  const overAmount = isOverBudget ? category.spent - category.budgeted : 0;

  // Mock data for additional details
  const monthlyTrend = 5.2; // Percentage change from last month
  const averageDaily = category.spent / 30;
  const daysRemaining = 15; // Days left in month
  const projectedSpending = (category.spent / 15) * 30; // Projected based on current pace

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Category Details" size="lg">
      <div className="p-6">
        {/* Category Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: category.color }}
          >
            {category.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {category.name}
            </h2>
            <p className="text-gray-600">January 2024 Budget</p>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Budgeted Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(category.budgeted)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Amount Spent</p>
              <p
                className={`text-2xl font-bold ${
                  isOverBudget ? "text-red-600" : "text-gray-900"
                }`}
              >
                {formatCurrency(category.spent)}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span
                className={`text-sm font-medium ${
                  isOverBudget ? "text-red-600" : "text-gray-900"
                }`}
              >
                {progressPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(progressPercentage, 100)}%`,
                  backgroundColor: isOverBudget ? "#EF4444" : category.color,
                }}
              ></div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOverBudget ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-sm text-red-600 font-medium">
                    Over budget by {formatCurrency(overAmount)}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-600 font-medium">
                    {formatCurrency(remainingAmount)} remaining
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Monthly Trend */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <IconTrendingUp size={16} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700">
                Monthly Trend
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-gray-900">
                {monthlyTrend > 0 ? "+" : ""}
                {monthlyTrend}%
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          </div>

          {/* Average Daily */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <IconCalendar size={16} className="text-green-500" />
              <span className="text-sm font-medium text-gray-700">
                Daily Average
              </span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(averageDaily)}
            </div>
          </div>

          {/* Days Remaining */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <IconCalendar size={16} className="text-orange-500" />
              <span className="text-sm font-medium text-gray-700">
                Days Remaining
              </span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {daysRemaining} days
            </div>
          </div>

          {/* Projected Spending */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <IconTarget size={16} className="text-purple-500" />
              <span className="text-sm font-medium text-gray-700">
                Projected Total
              </span>
            </div>
            <div
              className={`text-lg font-bold ${
                projectedSpending > category.budgeted
                  ? "text-red-600"
                  : "text-gray-900"
              }`}
            >
              {formatCurrency(projectedSpending)}
            </div>
          </div>
        </div>

        {/* Spending Insights */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            💡 Spending Insights
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            {isOverBudget ? (
              <>
                <p>
                  • You've exceeded your budget for this category by{" "}
                  {formatCurrency(overAmount)}
                </p>
                <p>
                  • Consider reducing spending or adjusting your budget for next
                  month
                </p>
              </>
            ) : projectedSpending > category.budgeted ? (
              <>
                <p>
                  • At your current pace, you may exceed your budget by
                  month-end
                </p>
                <p>• Consider slowing down spending to stay within budget</p>
              </>
            ) : (
              <>
                <p>• You're on track to stay within your budget this month</p>
                <p>
                  • You have {formatCurrency(remainingAmount)} left to spend
                </p>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={() => onDelete?.(category.id)}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Delete
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onEdit}>
              Edit Category
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
