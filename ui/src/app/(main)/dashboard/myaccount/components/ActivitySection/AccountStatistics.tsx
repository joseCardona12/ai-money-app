"use client";
import { IAccountStatistics } from "../../types/myaccount";
import { IconTrendingUp } from "@tabler/icons-react";

interface AccountStatisticsProps {
  accountStatistics: IAccountStatistics;
}

export default function AccountStatistics({
  accountStatistics,
}: AccountStatisticsProps): React.ReactNode {
  return (
    <div className="bg-white rounded-xl border border-[var(--color-gray-border)] p-6">
      <h3 className="text-lg font-semibold mb-6 text-[var(--color-text-primary)]">
        Account Statistics
      </h3>
      <p className="text-sm text-[var(--color-text-gray)] mb-6">
        Your financial activity overview
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Transactions */}
        <div className="p-4 rounded-lg border border-[var(--color-gray-border)]">
          <p className="text-xs font-semibold text-[var(--color-text-gray)] uppercase mb-2">
            Total Transactions
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {accountStatistics.totalTransactions.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <IconTrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold">
                +{accountStatistics.totalTransactionsChange}%
              </span>
            </div>
          </div>
        </div>

        {/* Active Goals */}
        <div className="p-4 rounded-lg border border-[var(--color-gray-border)]">
          <p className="text-xs font-semibold text-[var(--color-text-gray)] uppercase mb-2">
            Active Goals
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {accountStatistics.activeGoals}
              </p>
              <p className="text-xs text-[var(--color-text-gray)]">
                {accountStatistics.activeGoalsCompleted} completed
              </p>
            </div>
          </div>
        </div>

        {/* Savings Rate */}
        <div className="p-4 rounded-lg border border-[var(--color-gray-border)]">
          <p className="text-xs font-semibold text-[var(--color-text-gray)] uppercase mb-2">
            Savings Rate
          </p>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {accountStatistics.savingsRate}%
              </p>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <IconTrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold">
                +{accountStatistics.savingsRateChange}%
              </span>
            </div>
          </div>
        </div>

        {/* Member Since */}
        <div className="p-4 rounded-lg border border-[var(--color-gray-border)]">
          <p className="text-xs font-semibold text-[var(--color-text-gray)] uppercase mb-2">
            Member Since
          </p>
          <div>
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">
              {accountStatistics.memberSince}
            </p>
            <p className="text-xs text-[var(--color-text-gray)]">2 years</p>
          </div>
        </div>
      </div>
    </div>
  );
}

