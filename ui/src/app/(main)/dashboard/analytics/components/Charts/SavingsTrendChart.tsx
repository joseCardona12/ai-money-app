"use client";
import { IChartDataPoint } from "../../types/analytics";

interface SavingsTrendChartProps {
  data: IChartDataPoint[];
}

export default function SavingsTrendChart({
  data,
}: SavingsTrendChartProps): React.ReactNode {
  const maxValue = Math.max(...data.map((item) => item.savings || 0));
  const chartHeight = 300;

  return (
    <div className="bg-white rounded-xl p-4 border border-[var(--color-gray-border)]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-1">
          Savings Trend
        </h3>
        <p className="text-sm text-[var(--color-text-gray)]">
          Monthly savings accumulation
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

              {/* Savings Area */}
              <path
                d={`M 0 ${
                  300 - ((data[0]?.savings || 0) / maxValue) * 240
                } ${data
                  .map(
                    (item, index) =>
                      `L ${(index * 800) / (data.length - 1)} ${
                        300 - ((item.savings || 0) / maxValue) * 240
                      }`
                  )
                  .join(" ")} L 800 300 L 0 300 Z`}
                fill="rgba(59, 130, 246, 0.1)"
                stroke="rgba(59, 130, 246, 0.8)"
                strokeWidth="2"
              />

              {/* Savings Line */}
              <path
                d={`M 0 ${
                  300 - ((data[0]?.savings || 0) / maxValue) * 240
                } ${data
                  .map(
                    (item, index) =>
                      `L ${(index * 800) / (data.length - 1)} ${
                        300 - ((item.savings || 0) / maxValue) * 240
                      }`
                  )
                  .join(" ")}`}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
              />

              {/* Data points */}
              {data.map((item, index) => (
                <circle
                  key={index}
                  cx={(index * 800) / (data.length - 1)}
                  cy={300 - ((item.savings || 0) / maxValue) * 240}
                  r="4"
                  fill="#3B82F6"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
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
            <span className="text-sm text-gray-600">Savings</span>
          </div>
        </div>
      </div>
    </div>
  );
}

