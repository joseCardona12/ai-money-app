"use client";
import { IRecentActivity } from "../types/wallet";

interface RecentActivitySectionProps {
  activities: IRecentActivity[];
  onActivityClick: (activityId: number) => void;
}

export default function RecentActivitySection({
  activities,
  onActivityClick,
}: RecentActivitySectionProps): React.ReactNode {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2
          className="text-xl font-semibold mb-1"
          style={{ color: "var(--color-text-black)" }}
        >
          Recent Activity
        </h2>
        <p className="text-sm" style={{ color: "var(--color-text-gray)" }}>
          Latest transactions across all accounts
        </p>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-[var(--color-gray-border)] hover:shadow-sm transition-shadow cursor-pointer"
            onClick={() => onActivityClick(activity.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: activity.color }}
              >
                {activity.icon}
              </div>

              <div>
                <h3
                  className="font-medium text-sm"
                  style={{ color: "var(--color-text-black)" }}
                >
                  {activity.name}
                </h3>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-gray)" }}
                >
                  {activity.account}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div
                className={`font-semibold text-sm ${
                  activity.type === "income"
                    ? "text-[var(--color-green)]"
                    : "text-[var(--color-red)]"
                }`}
              >
                {activity.type === "income" ? "+" : ""}
                {formatCurrency(activity.amount)}
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--color-text-gray)" }}
              >
                {activity.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
