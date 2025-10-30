"use client";

export default function TransactionsStatsCardsSkeleton(): React.ReactNode {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white"
        >
          {/* Header with title and icon */}
          <div className="flex items-center justify-between mb-4">
            {/* Title skeleton */}
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            {/* Icon skeleton */}
            <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse"></div>
          </div>

          {/* Content area */}
          <div className="space-y-2">
            {/* Value skeleton */}
            <div className="h-8 bg-gray-200 rounded w-40 animate-pulse"></div>

            {/* Change info skeleton */}
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

