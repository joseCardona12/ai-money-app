"use client";
import { IChartDataPoint } from "../../types/analytics";

interface IncomeVsExpensesChartProps {
  data: IChartDataPoint[];
}

export default function IncomeVsExpensesChart({
  data,
}: IncomeVsExpensesChartProps): React.ReactNode {
  const maxValue = Math.max(
    ...data.map((item) => Math.max(item.income || 0, item.expenses || 0))
  );
  const chartHeight = 300;

  return (
    <div className="bg-white rounded-xl p-4 border border-[var(--color-gray-border)]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-1">
          Income vs Expenses
        </h3>
        <p className="text-sm text-[var(--color-text-gray)]">
          Monthly comparison of income and expenses over time
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
          <div className="ml-12 h-full relative">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 300"
              className="overflow-visible"
            >
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <line
                  key={ratio}
                  x1="0"
                  y1={300 - ratio * 300}
                  x2="800"
                  y2={300 - ratio * 300}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
              ))}

              {/* Income Area */}
              <path
                d={`M 0 ${
                  300 - ((data[0]?.income || 0) / maxValue) * 240
                } ${data
                  .map(
                    (item, index) =>
                      `L ${(index * 800) / (data.length - 1)} ${
                        300 - ((item.income || 0) / maxValue) * 240
                      }`
                  )
                  .join(" ")} L 800 300 L 0 300 Z`}
                fill="rgba(59, 130, 246, 0.1)"
                stroke="rgba(59, 130, 246, 0.8)"
                strokeWidth="2"
              />

              {/* Expenses Area */}
              <path
                d={`M 0 ${
                  300 - ((data[0]?.expenses || 0) / maxValue) * 240
                } ${data
                  .map(
                    (item, index) =>
                      `L ${(index * 800) / (data.length - 1)} ${
                        300 - ((item.expenses || 0) / maxValue) * 240
                      }`
                  )
                  .join(" ")} L 800 300 L 0 300 Z`}
                fill="rgba(75, 85, 99, 0.8)"
                stroke="rgba(75, 85, 99, 1)"
                strokeWidth="2"
              />

              {/* Income Line */}
              <path
                d={`M 0 ${
                  300 - ((data[0]?.income || 0) / maxValue) * 240
                } ${data
                  .map(
                    (item, index) =>
                      `L ${(index * 800) / (data.length - 1)} ${
                        300 - ((item.income || 0) / maxValue) * 240
                      }`
                  )
                  .join(" ")}`}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
              />

              {/* Expenses Line */}
              <path
                d={`M 0 ${
                  300 - ((data[0]?.expenses || 0) / maxValue) * 240
                } ${data
                  .map(
                    (item, index) =>
                      `L ${(index * 800) / (data.length - 1)} ${
                        300 - ((item.expenses || 0) / maxValue) * 240
                      }`
                  )
                  .join(" ")}`}
                fill="none"
                stroke="#4B5563"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="ml-12 mt-4 flex justify-between text-xs text-gray-500">
          {data.map((item) => (
            <span key={item.month}>{item.month}</span>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            <span className="text-sm text-gray-600">Expenses</span>
          </div>
        </div>
      </div>
    </div>
  );
}

