"use client";

export default function GoalCardSkeleton(): React.ReactNode {
  return (
    <div className="bg-white rounded-xl border border-[var(--color-gray-border)] overflow-hidden animate-pulse">
      {/* Color bar at top */}
      <div className="h-1 bg-gray-200"></div>

      <div className="p-6">
        {/* Header with icon and title */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            {/* Icon circle */}
            <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>

            {/* Title and description */}
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
          </div>

          {/* Menu button placeholder */}
          <div className="w-8 h-8 rounded bg-gray-100 flex-shrink-0"></div>
        </div>

        {/* Amount and Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-100 rounded w-12"></div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-gray-100"></div>
        </div>

        {/* Remaining and Deadline */}
        <div className="flex items-center justify-between">
          <div className="h-3 bg-gray-100 rounded w-1/4"></div>
          <div className="h-3 bg-gray-100 rounded w-1/4"></div>
        </div>

        {/* Add Contribution Button */}
        <div className="mt-4 h-9 bg-gray-100 rounded"></div>
      </div>
    </div>
  );
}

