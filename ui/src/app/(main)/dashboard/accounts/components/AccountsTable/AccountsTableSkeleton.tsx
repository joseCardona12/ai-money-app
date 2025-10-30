"use client";

export default function AccountsTableSkeleton(): React.ReactNode {
  return (
    <div className="rounded-xl border border-[var(--color-gray-border)] bg-white overflow-hidden">
      {/* Header */}
      <div className="px-8 py-4 border-b border-[var(--color-gray-border)] bg-[var(--color-gray-light)]">
        <div className="grid grid-cols-7 gap-8 items-center">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 ml-auto animate-pulse"></div>
        </div>
      </div>

      {/* Body - 5 skeleton rows */}
      <div className="divide-y divide-[var(--color-gray-border)]">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="px-8 py-4">
            <div className="grid grid-cols-7 gap-8 items-center">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 ml-auto animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-8 py-4 border-t border-[var(--color-gray-border)] bg-[var(--color-gray-light)]">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
          <div className="flex items-center space-x-2">
            <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

