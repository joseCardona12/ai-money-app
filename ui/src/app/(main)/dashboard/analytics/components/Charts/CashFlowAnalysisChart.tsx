"use client";
import { IChartDataPoint } from "../../types/analytics";
import { formatCurrency } from "../../utils/chartHelpers";

interface CashFlowAnalysisChartProps {
  data: IChartDataPoint[];
}

export default function CashFlowAnalysisChart({
  data,
}: CashFlowAnalysisChartProps): React.ReactNode {
  const maxValue = Math.max(...data.map((item) => item.cashFlow || 0));
  const chartHeight = 300;

  return (
    <div className="bg-white rounded-xl p-4 border border-[var(--color-gray-border)]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-1">
          Cash Flow Analysis
        </h3>
        <p className="text-sm text-[var(--color-text-gray)]">
          Net cash flow (Income - Expenses) over time
        </p>
      </div>

      <div className="relative">
        {/* Chart Container */}
        <div className="relative" style={{ height: chartHeight }}>
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
            <span>{(maxValue * 1.2).toFixed(0)}</span>
            <span>{(maxValue * 0.9).toFixed(0)}</span>
            <span>{(maxValue * 0.6).toFixed(0)}</span>
            <span>{(maxValue * 0.3).toFixed(0)}</span>
            <span>0</span>
          </div>

          {/* Chart Area */}
          <div className="ml-12 h-full flex items-end justify-between gap-1">
            {data.map((item, index) => {
              const barHeight =
                ((item.cashFlow || 0) / maxValue) * (chartHeight - 40);

              return (
                <div
                  key={item.month}
                  className="flex flex-col items-center group cursor-pointer"
                  style={{ width: `${100 / data.length - 1}%` }}
                >
                  {/* Bar */}
                  <div
                    className="w-full bg-gray-900 rounded-t-sm transition-all duration-300 group-hover:bg-gray-700 relative"
                    style={{
                      height: Math.max(barHeight, 4),
                    }}
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {formatCurrency(item.cashFlow || 0)}
                    </div>
                  </div>

                  {/* Month label */}
                  <div className="mt-2 text-xs text-gray-600 text-center">
                    {item.month}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-900"></div>
            <span className="text-sm text-gray-600">Cash Flow</span>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(
                Math.max(...data.map((item) => item.cashFlow || 0))
              )}
            </div>
            <div className="text-sm text-gray-600">Highest Month</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(
                data.reduce((sum, item) => sum + (item.cashFlow || 0), 0) /
                  data.length
              )}
            </div>
            <div className="text-sm text-gray-600">Average</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(
                data.reduce((sum, item) => sum + (item.cashFlow || 0), 0)
              )}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
}

