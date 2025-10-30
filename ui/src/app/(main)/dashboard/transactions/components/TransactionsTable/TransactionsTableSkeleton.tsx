"use client";

export default function TransactionsTableSkeleton(): React.ReactNode {
  return (
    <div className="rounded-xl border border-[var(--color-gray-border)] bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[var(--color-gray-border)] bg-[var(--color-gray-light)]">
        <div className="grid grid-cols-5 gap-4 items-center">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse ml-auto"></div>
        </div>
      </div>

      {/* Body Skeleton Rows */}
      <div className="divide-y divide-[var(--color-gray-border)]">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="px-6 py-4 hover:bg-[var(--color-gray-light)] transition-colors duration-200"
          >
            <div className="grid grid-cols-5 gap-4 items-center">
              {/* Transaction Info Skeleton */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-32 animate-pulse"></div>
                </div>
              </div>

              {/* Category Skeleton */}
              <div>
                <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
              </div>

              {/* Date Skeleton */}
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-16 animate-pulse"></div>
              </div>

              {/* Status Skeleton */}
              <div>
                <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
              </div>

              {/* Amount Skeleton */}
              <div className="text-right flex items-center justify-end space-x-2 gap-2">
                <div className="flex flex-col gap-1">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-3 bg-gray-100 rounded w-16 animate-pulse"></div>
                </div>
                <div className="w-8 h-8 rounded bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="px-6 py-4 border-t border-[var(--color-gray-border)] bg-[var(--color-gray-light)] flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-8 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

