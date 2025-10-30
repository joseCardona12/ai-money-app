"use client";
import { useSummary } from "./hooks/useSummary";
import {
  IconUsers,
  IconWallet,
  IconBrandGoogle,
  IconMail,
  IconBrandGithub,
  IconTrendingUp,
} from "@tabler/icons-react";

export default function SummaryView(): React.ReactNode {
  const summaryData = useSummary();

  const SummaryCard = ({
    title,
    value,
    icon: Icon,
    color,
    subtitle,
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    subtitle?: string;
  }) => (
    <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--color-text-gray)] mb-1">{title}</p>
          <p className="text-3xl font-bold text-[var(--color-text-black)]">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-[var(--color-text-gray)] mt-2">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  if (summaryData.isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-black)]">
            Summary
          </h1>
          <p className="text-sm text-[var(--color-text-gray)] mt-1">
            Overview of your system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-text-black)]">
          Summary
        </h1>
        <p className="text-sm text-[var(--color-text-gray)] mt-1">
          Overview of your system
        </p>
      </div>

      {/* Main Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Users"
          value={summaryData.totalUsers}
          icon={IconUsers}
          color="bg-blue-500"
          subtitle={`${summaryData.totalUsers} user${
            summaryData.totalUsers !== 1 ? "s" : ""
          } in system`}
        />
        <SummaryCard
          title="Total Accounts"
          value={summaryData.totalAccounts}
          icon={IconWallet}
          color="bg-green-500"
          subtitle={`${summaryData.totalAccounts} account${
            summaryData.totalAccounts !== 1 ? "s" : ""
          } created`}
        />
        <SummaryCard
          title="Auth Providers"
          value={summaryData.totalProviders}
          icon={IconTrendingUp}
          color="bg-purple-500"
          subtitle="Available authentication methods"
        />
      </div>

      {/* Provider Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-text-gray)] mb-1">
                Email Provider
              </p>
              <p className="text-3xl font-bold text-[var(--color-text-black)]">
                {summaryData.emailProviders}
              </p>
              <p className="text-xs text-[var(--color-text-gray)] mt-2">
                Users with email auth
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-500">
              <IconMail className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-text-gray)] mb-1">
                Google Provider
              </p>
              <p className="text-3xl font-bold text-[var(--color-text-black)]">
                {summaryData.googleProviders}
              </p>
              <p className="text-xs text-[var(--color-text-gray)] mt-2">
                Users with Google auth
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <IconBrandGoogle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--color-text-gray)] mb-1">
                GitHub Provider
              </p>
              <p className="text-3xl font-bold text-[var(--color-text-black)]">
                {summaryData.githubProviders}
              </p>
              <p className="text-xs text-[var(--color-text-gray)] mt-2">
                Users with GitHub auth
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gray-800">
              <IconBrandGithub className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Users Statistics */}
        <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white">
          <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-4">
            Users Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">
                Total Users
              </span>
              <span className="text-lg font-bold text-[var(--color-text-black)]">
                {summaryData.totalUsers}
              </span>
            </div>
            <div className="h-px bg-[var(--color-gray-border)]"></div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">
                Email Auth
              </span>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {summaryData.emailProviders}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">
                Google Auth
              </span>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {summaryData.googleProviders}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">
                GitHub Auth
              </span>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {summaryData.githubProviders}
              </span>
            </div>
          </div>
        </div>

        {/* Accounts Statistics */}
        <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white">
          <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-4">
            Accounts Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">
                Total Accounts
              </span>
              <span className="text-lg font-bold text-[var(--color-text-black)]">
                {summaryData.totalAccounts}
              </span>
            </div>
            <div className="h-px bg-[var(--color-gray-border)]"></div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">
                Avg per User
              </span>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {summaryData.totalUsers > 0
                  ? (
                      summaryData.totalAccounts / summaryData.totalUsers
                    ).toFixed(2)
                  : "0.00"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">
                System Health
              </span>
              <span className="text-sm font-semibold text-green-600">
                ✓ Healthy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

