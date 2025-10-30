"use client";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import TransactionsStatsCardsSkeleton from "./TransactionsStatsCardsSkeleton";

interface ITransactionStat {
  title: string;
  value: string;
  change: string;
  changeText: string;
  positive: boolean;
}

interface ITransactionsStatsCardsProps {
  stats: ITransactionStat[];
  isLoading?: boolean;
}

export default function TransactionsStatsCards({
  stats,
  isLoading = false,
}: ITransactionsStatsCardsProps): React.ReactNode {
  // Show skeleton while loading
  if (isLoading) {
    return <TransactionsStatsCardsSkeleton />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[var(--color-text-gray)]">
              {stat.title}
            </h3>
            <div
              className={`p-2 rounded-lg ${
                stat.positive
                  ? "bg-[var(--color-green-light)]"
                  : "bg-[var(--color-red-light)]"
              }`}
            >
              {stat.positive ? (
                <IconTrendingUp
                  size={16}
                  style={{ color: "var(--color-green)" }}
                />
              ) : (
                <IconTrendingDown
                  size={16}
                  style={{ color: "var(--color-red)" }}
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-2xl font-semibold text-[var(--color-text-black)]">
              {stat.value}
            </p>
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm font-medium ${
                  stat.positive
                    ? "text-[var(--color-green)]"
                    : "text-[var(--color-red)]"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-[var(--color-text-gray)]">
                {stat.changeText}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
