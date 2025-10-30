"use client";
import { IBudgetSummary } from "../types/budget";
import { formatCurrency } from "../utils/functions/formatCurrency";

interface BudgetStatsSectionProps {
  summary: IBudgetSummary;
}

export default function BudgetStatsSection({
  summary,
}: BudgetStatsSectionProps): React.ReactNode {
  const isUnderBudget = summary.remaining > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Budgeted */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Total Budgeted
        </h3>
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {formatCurrency(summary.totalBudgeted)}
        </div>
        <p className="text-sm text-gray-500">For this month</p>
      </div>

      {/* Total Spent */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Total Spent</h3>
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {formatCurrency(summary.totalSpent)}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
            {summary.percentageSpent.toFixed(1)}%
          </span>
          <span className="text-sm text-gray-500">of budget</span>
        </div>
      </div>

      {/* Remaining */}
      <div
        className={`rounded-xl p-6 border ${
          isUnderBudget
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <h3 className="text-sm font-medium text-gray-600 mb-2">Remaining</h3>
        <div
          className={`text-3xl font-bold mb-1 ${
            isUnderBudget ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatCurrency(Math.abs(summary.remaining))}
        </div>
        <p
          className={`text-sm ${
            isUnderBudget ? "text-green-600" : "text-red-600"
          }`}
        >
          {isUnderBudget ? "Under budget" : "Over budget"}
        </p>
      </div>
    </div>
  );
}
