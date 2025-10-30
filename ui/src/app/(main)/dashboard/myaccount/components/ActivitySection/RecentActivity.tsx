"use client";
import { IRecentActivity } from "../../types/myaccount";
import {
  IconTransfer,
  IconTarget,
  IconTrophy,
  IconLink,
} from "@tabler/icons-react";

interface RecentActivityProps {
  recentActivity: IRecentActivity[];
}

const getActivityIcon = (title: string) => {
  if (title.includes("transaction")) return IconTransfer;
  if (title.includes("budget")) return IconTransfer;
  if (title.includes("goal")) return IconTarget;
  if (title.includes("achieved")) return IconTrophy;
  if (title.includes("connected")) return IconLink;
  return IconTransfer;
};

export default function RecentActivity({
  recentActivity,
}: RecentActivityProps): React.ReactNode {
  return (
    <div className="bg-white rounded-xl border border-[var(--color-gray-border)] p-6">
      <h3 className="text-lg font-semibold mb-6 text-[var(--color-text-primary)]">
        Recent Activity
      </h3>
      <p className="text-sm text-[var(--color-text-gray)] mb-6">
        Your latest actions on the platform
      </p>

      <div className="space-y-4">
        {recentActivity.map((activity) => {
          const IconComponent = getActivityIcon(activity.title);
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-blue-600" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {activity.title}
                </p>
                <p className="text-sm text-[var(--color-text-gray)]">
                  {activity.description}
                </p>
              </div>

              {/* Timestamp */}
              <div className="flex-shrink-0 text-xs text-[var(--color-text-gray)]">
                {activity.timestamp}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

