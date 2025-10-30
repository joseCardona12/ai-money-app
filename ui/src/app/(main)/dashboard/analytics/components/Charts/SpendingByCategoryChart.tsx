"use client";
import { ICategorySpending } from "../../types/analytics";
import { formatCurrency, formatPercentage } from "../../utils/chartHelpers";

interface SpendingByCategoryChartProps {
  data: ICategorySpending[];
}

export default function SpendingByCategoryChart({
  data,
}: SpendingByCategoryChartProps): React.ReactNode {
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const radius = 80;
  const centerX = 120;
  const centerY = 120;

  // Calculate angles for each segment
  let currentAngle = -90; // Start from top
  const segments = data.map((item) => {
    const angle = (item.percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    // Calculate path for SVG arc
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ");

    return {
      ...item,
      pathData,
      startAngle,
      endAngle,
    };
  });

  return (
    <div className="bg-white rounded-xl p-4 border border-[var(--color-gray-border)]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-1">
          Spending by Category
        </h3>
        <p className="text-sm text-[var(--color-text-gray)]">
          Distribution of expenses across categories
        </p>
      </div>

      <div className="flex items-center gap-8">
        {/* Donut Chart */}
        <div className="relative">
          <svg width="240" height="240" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="2"
            />

            {/* Category segments */}
            {segments.map((segment) => (
              <path
                key={segment.id}
                d={segment.pathData}
                fill={segment.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}

            {/* Inner circle to create donut effect */}
            <circle cx={centerX} cy={centerY} r={radius * 0.6} fill="white" />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(total)}
            </div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {data.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {item.name}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {formatCurrency(item.amount)}
                </div>
                <div className="text-xs text-gray-500">
                  {formatPercentage(item.percentage)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

