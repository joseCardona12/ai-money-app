"use client";
import { ICategoryBreakdown } from "../types/analytics";
import { formatCurrency, formatPercentage } from "../utils/chartHelpers";

interface CategoryBreakdownListProps {
  data: ICategoryBreakdown[];
}

export default function CategoryBreakdownList({
  data,
}: CategoryBreakdownListProps): React.ReactNode {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-xl p-4 border border-[var(--color-gray-border)]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-1">
          Category Breakdown
        </h3>
        <p className="text-sm text-[var(--color-text-gray)]">
          Detailed spending by category
        </p>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <div>
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-600">
                  {formatPercentage(item.percentage)} of total spending
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold text-gray-900">
                {formatCurrency(item.amount)}
              </div>
              <div className="text-sm text-gray-600">
                {formatPercentage(item.percentage)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-gray-900">Total Spending</div>
          <div className="font-bold text-xl text-gray-900">
            {formatCurrency(total)}
          </div>
        </div>
      </div>
    </div>
  );
}
