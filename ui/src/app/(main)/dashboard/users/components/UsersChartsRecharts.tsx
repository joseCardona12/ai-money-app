"use client";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { IUserUI } from "../types/user";

interface IUsersChartsProps {
  users: IUserUI[];
  isLoading?: boolean;
}

export default function UsersChartsRecharts({
  users,
  isLoading = false,
}: IUsersChartsProps): React.ReactNode {
  // Calculate data for charts
  const totalUsers = users.length;

  // Role distribution
  const adminUsers = users.filter((u) => u.role_id === 2).length;
  const regularUsers = users.filter((u) => u.role_id === 1).length;

  // Plan distribution
  const freeUsers = users.filter((u) => u.plan_id === 1).length;
  const premiumUsers = users.filter((u) => u.plan_id === 2).length;
  const enterpriseUsers = users.filter((u) => u.plan_id === 3).length;

  // Provider distribution
  const emailUsers = users.filter((u) => u.provider_id === 1).length;
  const googleUsers = users.filter((u) => u.provider_id === 2).length;
  const githubUsers = users.filter((u) => u.provider_id === 3).length;

  // Data for charts
  const roleData = [
    { name: "Admin", value: adminUsers, fill: "#3B82F6" },
    { name: "User", value: regularUsers, fill: "#10B981" },
  ];

  const planData = [
    { name: "Free", value: freeUsers, fill: "#9CA3AF" },
    { name: "Premium", value: premiumUsers, fill: "#8B5CF6" },
    { name: "Enterprise", value: enterpriseUsers, fill: "#F59E0B" },
  ];

  const providerData = [
    { name: "Email", value: emailUsers, fill: "#EF4444" },
    { name: "Google", value: googleUsers, fill: "#3B82F6" },
    { name: "GitHub", value: githubUsers, fill: "#1F2937" },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalUsers) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900">{data.name}</p>
          <p className="text-lg font-bold text-gray-900">{data.value}</p>
          <p className="text-xs text-gray-600">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Role Distribution Chart */}
      <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-4">
          Users by Role
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={roleData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {roleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Plan Distribution Chart */}
      <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-4">
          Users by Plan
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={planData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {planData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Provider Distribution Chart */}
      <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-4">
          Users by Auth Provider
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={providerData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {providerData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

