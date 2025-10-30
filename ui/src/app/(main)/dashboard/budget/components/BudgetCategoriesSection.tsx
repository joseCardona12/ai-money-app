"use client";
import { useState } from "react";
import { IBudgetCategory, IBudgetOption } from "../types/budget";
import IconButton from "@/ui/components/IconButton";
import TransactionOptionsMenu from "@/ui/components/TransactionOptionsMenu";
import { IconDots } from "@tabler/icons-react";
import { getProgressPercentage } from "../utils/functions/getProgressPercentage";
import { getRemainingAmount } from "../utils/functions/getRemainingAmount";
import { isOverBudget } from "../utils/functions/isOverBudget";
import { formatCurrency } from "../utils/functions/formatCurrency";

interface BudgetCategoriesSectionProps {
  categories: IBudgetCategory[];
  onCategoryClick: (categoryId: number) => void;
  getCategoryOptions: (category: IBudgetCategory) => IBudgetOption[];
}

export default function BudgetCategoriesSection({
  categories,
  onCategoryClick,
  getCategoryOptions,
}: BudgetCategoriesSectionProps): React.ReactNode {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Budget Categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const progressPercentage = getProgressPercentage(
            category.spent,
            category.budgeted
          );
          const remainingAmount = getRemainingAmount(
            category.spent,
            category.budgeted
          );
          const overBudget = isOverBudget(category.spent, category.budgeted);
          const overAmount = overBudget
            ? category.spent - category.budgeted
            : 0;

          return (
            <div
              key={category.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onCategoryClick(category.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-gray-900">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(category.spent)} /{" "}
                      {formatCurrency(category.budgeted)}
                    </p>
                  </div>
                </div>

                <div className="relative z-50">
                  <IconButton
                    icon={IconDots}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(
                        openMenuId === category.id ? null : category.id
                      );
                    }}
                    variant="ghost"
                    size="sm"
                  />

                  {openMenuId === category.id && (
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setOpenMenuId(null)}
                    />
                  )}

                  <TransactionOptionsMenu
                    isOpen={openMenuId === category.id}
                    onClose={() => setOpenMenuId(null)}
                    options={getCategoryOptions(category)}
                  />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${progressPercentage}%`,
                      backgroundColor: overBudget ? "#EF4444" : category.color,
                    }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {progressPercentage.toFixed(1)}% used
                </span>
                <div className="flex items-center gap-2">
                  {overBudget ? (
                    <>
                      <span className="text-red-600 font-medium">
                        -${overAmount.toFixed(0)}
                      </span>
                      <div className="flex items-center gap-1 text-red-600">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="text-xs">
                          Over budget by ${overAmount.toFixed(0)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="text-green-600 font-medium">
                      +${remainingAmount.toFixed(0)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
