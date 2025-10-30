"use client";
import { IconTrendingUp, IconTrendingDown, IconUsers, IconUserPlus, IconUserCheck } from "@tabler/icons-react";
import { IUserUI } from "../types/user";

interface IUsersAnalyticsProps {
  users: IUserUI[];
  isLoading?: boolean;
}

export default function UsersAnalytics({
  users,
  isLoading = false,
}: IUsersAnalyticsProps): React.ReactNode {
  // Calculate analytics
  const totalUsers = users.length;
  
  // Count by role
  const adminUsers = users.filter((u) => u.role_id === 2).length;
  const regularUsers = users.filter((u) => u.role_id === 1).length;
  
  // Count by plan
  const premiumUsers = users.filter((u) => u.plan_id === 2).length;
  const enterpriseUsers = users.filter((u) => u.plan_id === 3).length;
  const freeUsers = users.filter((u) => u.plan_id === 1).length;
  
  // Count by provider
  const googleUsers = users.filter((u) => u.provider_id === 2).length;
  const githubUsers = users.filter((u) => u.provider_id === 3).length;
  const emailUsers = users.filter((u) => u.provider_id === 1).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers.toString(),
      icon: IconUsers,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      description: "Active users in system",
    },
    {
      title: "Admin Users",
      value: adminUsers.toString(),
      icon: IconUserCheck,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      description: `${((adminUsers / totalUsers) * 100).toFixed(1)}% of total`,
    },
    {
      title: "Premium Plan",
      value: premiumUsers.toString(),
      icon: IconUserPlus,
      color: "bg-green-100",
      iconColor: "text-green-600",
      description: `${((premiumUsers / totalUsers) * 100).toFixed(1)}% of total`,
    },
    {
      title: "Enterprise Plan",
      value: enterpriseUsers.toString(),
      icon: IconTrendingUp,
      color: "bg-orange-100",
      iconColor: "text-orange-600",
      description: `${((enterpriseUsers / totalUsers) * 100).toFixed(1)}% of total`,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-[var(--color-gray-border)] bg-white animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="p-4 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-[var(--color-text-gray)]">
                {stat.title}
              </h3>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <Icon size={16} className={stat.iconColor} />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-2xl font-semibold text-[var(--color-text-black)]">
                {stat.value}
              </p>
              <p className="text-xs text-[var(--color-text-gray)]">
                {stat.description}
              </p>
            </div>
          </div>
        );
      })}

      {/* Additional Info Cards */}
      <div className="p-4 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-[var(--color-text-gray)]">
            Free Plan
          </h3>
          <div className="p-2 rounded-lg bg-gray-100">
            <IconUsers size={16} className="text-gray-600" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-semibold text-[var(--color-text-black)]">
            {freeUsers}
          </p>
          <p className="text-xs text-[var(--color-text-gray)]">
            {((freeUsers / totalUsers) * 100).toFixed(1)}% of total
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-[var(--color-text-gray)]">
            Google Auth
          </h3>
          <div className="p-2 rounded-lg bg-red-100">
            <IconUsers size={16} className="text-red-600" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-semibold text-[var(--color-text-black)]">
            {googleUsers}
          </p>
          <p className="text-xs text-[var(--color-text-gray)]">
            {((googleUsers / totalUsers) * 100).toFixed(1)}% of total
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-[var(--color-text-gray)]">
            GitHub Auth
          </h3>
          <div className="p-2 rounded-lg bg-gray-100">
            <IconUsers size={16} className="text-gray-600" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-semibold text-[var(--color-text-black)]">
            {githubUsers}
          </p>
          <p className="text-xs text-[var(--color-text-gray)]">
            {((githubUsers / totalUsers) * 100).toFixed(1)}% of total
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-[var(--color-text-gray)]">
            Email Auth
          </h3>
          <div className="p-2 rounded-lg bg-blue-100">
            <IconUsers size={16} className="text-blue-600" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-semibold text-[var(--color-text-black)]">
            {emailUsers}
          </p>
          <p className="text-xs text-[var(--color-text-gray)]">
            {((emailUsers / totalUsers) * 100).toFixed(1)}% of total
          </p>
        </div>
      </div>
    </div>
  );
}

