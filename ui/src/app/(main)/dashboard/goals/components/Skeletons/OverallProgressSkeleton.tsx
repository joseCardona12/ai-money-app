"use client";

export default function OverallProgressSkeleton(): React.ReactNode {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 animate-pulse">
      {/* Header with title and percentage */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-600">Overall Progress</h3>
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      </div>

      {/* Amount display */}
      <div className="mb-4">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-1"></div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full h-3 bg-gray-200 rounded-full"></div>
      </div>

      {/* Description */}
      <div className="h-4 bg-gray-100 rounded w-2/3"></div>
    </div>
  );
}

