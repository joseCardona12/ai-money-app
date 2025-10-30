"use client";
import { ICategorySpending } from "../../types/analytics";
import { formatCurrency } from "../../utils/chartHelpers";

interface TopSpendingCategoriesChartProps {
  data: ICategorySpending[];
}

export default function TopSpendingCategoriesChart({
  data,
}: TopSpendingCategoriesChartProps): React.ReactNode {
  const maxAmount = Math.max(...data.map((item) => item.amount));
  const chartHeight = 300;

  return (
    <div className="bg-white rounded-xl p-4 border border-[var(--color-gray-border)]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-1">
          Top Spending Categories
        </h3>
        <p className="text-sm text-[var(--color-text-gray)]">
          Highest expense categories this period
        </p>
      </div>

      <div className="relative">
        {/* Chart Container */}
        <div className="relative" style={{ height: chartHeight }}>
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
            <span>{maxAmount.toFixed(0)}</span>
            <span>{(maxAmount * 0.75).toFixed(0)}</span>
            <span>{(maxAmount * 0.5).toFixed(0)}</span>
            <span>{(maxAmount * 0.25).toFixed(0)}</span>
            <span>0</span>
          </div>

          {/* Chart Area */}
          <div className="ml-12 h-full flex items-end justify-between gap-2">
            {data.map((item, index) => {
              const barHeight = (item.amount / maxAmount) * (chartHeight - 40);

              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center group cursor-pointer"
                  style={{ width: `${100 / data.length - 2}%` }}
                >
                  {/* Bar */}
                  <div
                    className="w-full rounded-t-md transition-all duration-300 group-hover:opacity-80 relative"
                    style={{
                      height: barHeight,
                      backgroundColor: item.color,
                      minHeight: "4px",
                    }}
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {formatCurrency(item.amount)}
                    </div>
                  </div>

                  {/* Category label */}
                  <div className="mt-2 text-xs text-gray-600 text-center transform -rotate-45 origin-center w-16">
                    {item.name.split(" ")[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom spacing for rotated labels */}
        <div className="h-8"></div>
      </div>

      {/* Summary stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {data.length}
            </div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(data.reduce((sum, item) => sum + item.amount, 0))}
            </div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(data[0]?.amount || 0)}
            </div>
            <div className="text-sm text-gray-600">Highest Category</div>
          </div>
        </div>
      </div>
    </div>
  );
}

