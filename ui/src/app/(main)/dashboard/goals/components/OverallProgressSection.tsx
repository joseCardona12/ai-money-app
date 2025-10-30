"use client";
import { IOverallProgress } from "../types/goals";

interface OverallProgressSectionProps {
  progress: IOverallProgress;
}

export default function OverallProgressSection({
  progress,
}: OverallProgressSectionProps): React.ReactNode {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Convert percentage string to number, handle NaN
  const percentageValue = parseFloat(progress.percentage);
  const safePercentage = isNaN(percentageValue) ? 0 : percentageValue;

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-600">Overall Progress</h3>
        <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
          {progress.percentage}%
        </span>
      </div>

      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {formatCurrency(progress.totalCurrent)} /{" "}
          {formatCurrency(progress.totalTarget)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${safePercentage}%` }}
          ></div>
        </div>
      </div>

      <p className="text-sm text-gray-600">{progress.description}</p>
    </div>
  );
}
