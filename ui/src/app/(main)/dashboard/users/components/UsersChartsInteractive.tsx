"use client";
import { useState } from "react";
import { IUserUI } from "../types/user";

interface IUsersChartsProps {
  users: IUserUI[];
  isLoading?: boolean;
}

interface HoverData {
  label: string;
  value: number;
  percentage: string;
}

export default function UsersChartsInteractive({
  users,
  isLoading = false,
}: IUsersChartsProps): React.ReactNode {
  const [hoveredRole, setHoveredRole] = useState<HoverData | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<HoverData | null>(null);
  const [hoveredProvider, setHoveredProvider] = useState<HoverData | null>(null);

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

  // Pie chart helper
  const calculatePieSlice = (value: number, total: number, startAngle: number) => {
    const sliceAngle = (value / total) * 360;
    const endAngle = startAngle + sliceAngle;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const radius = 80;
    const centerX = 120;
    const centerY = 120;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;
    return {
      path: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      percentage: ((value / total) * 100).toFixed(1),
    };
  };

  // Role distribution pie chart
  let roleAngle = 0;
  const adminSlice = calculatePieSlice(adminUsers, totalUsers, roleAngle);
  roleAngle += (adminUsers / totalUsers) * 360;
  const regularSlice = calculatePieSlice(regularUsers, totalUsers, roleAngle);

  // Plan distribution pie chart
  let planAngle = 0;
  const freeSlice = calculatePieSlice(freeUsers, totalUsers, planAngle);
  planAngle += (freeUsers / totalUsers) * 360;
  const premiumSlice = calculatePieSlice(premiumUsers, totalUsers, planAngle);
  planAngle += (premiumUsers / totalUsers) * 360;
  const enterpriseSlice = calculatePieSlice(enterpriseUsers, totalUsers, planAngle);

  // Provider distribution pie chart
  let providerAngle = 0;
  const emailSlice = calculatePieSlice(emailUsers, totalUsers, providerAngle);
  providerAngle += (emailUsers / totalUsers) * 360;
  const googleSlice = calculatePieSlice(googleUsers, totalUsers, providerAngle);
  providerAngle += (googleUsers / totalUsers) * 360;
  const githubSlice = calculatePieSlice(githubUsers, totalUsers, providerAngle);

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
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative w-60 h-60">
            <svg width="240" height="240" viewBox="0 0 240 240">
              <path
                d={adminSlice.path}
                fill="#3B82F6"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={() =>
                  setHoveredRole({
                    label: "Admin",
                    value: adminUsers,
                    percentage: adminSlice.percentage,
                  })
                }
                onMouseLeave={() => setHoveredRole(null)}
              />
              <path
                d={regularSlice.path}
                fill="#10B981"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={() =>
                  setHoveredRole({
                    label: "User",
                    value: regularUsers,
                    percentage: regularSlice.percentage,
                  })
                }
                onMouseLeave={() => setHoveredRole(null)}
              />
            </svg>
            {hoveredRole && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white bg-opacity-95 rounded-lg p-3 shadow-lg">
                  <p className="text-xs text-[var(--color-text-gray)]">
                    {hoveredRole.label}
                  </p>
                  <p className="text-2xl font-bold text-[var(--color-text-black)]">
                    {hoveredRole.value}
                  </p>
                  <p className="text-sm text-[var(--color-text-gray)]">
                    {hoveredRole.percentage}%
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="w-full space-y-2">
            <div
              className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
              onMouseEnter={() =>
                setHoveredRole({
                  label: "Admin",
                  value: adminUsers,
                  percentage: adminSlice.percentage,
                })
              }
              onMouseLeave={() => setHoveredRole(null)}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-[var(--color-text-gray)]">Admin</span>
              </div>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {adminUsers}
              </span>
            </div>
            <div
              className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50 cursor-pointer transition-colors"
              onMouseEnter={() =>
                setHoveredRole({
                  label: "User",
                  value: regularUsers,
                  percentage: regularSlice.percentage,
                })
              }
              onMouseLeave={() => setHoveredRole(null)}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-[var(--color-text-gray)]">User</span>
              </div>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {regularUsers}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Distribution Chart */}
      <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-4">
          Users by Plan
        </h3>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative w-60 h-60">
            <svg width="240" height="240" viewBox="0 0 240 240">
              <path
                d={freeSlice.path}
                fill="#9CA3AF"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={() =>
                  setHoveredPlan({
                    label: "Free",
                    value: freeUsers,
                    percentage: freeSlice.percentage,
                  })
                }
                onMouseLeave={() => setHoveredPlan(null)}
              />
              <path
                d={premiumSlice.path}
                fill="#8B5CF6"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={() =>
                  setHoveredPlan({
                    label: "Premium",
                    value: premiumUsers,
                    percentage: premiumSlice.percentage,
                  })
                }
                onMouseLeave={() => setHoveredPlan(null)}
              />
              <path
                d={enterpriseSlice.path}
                fill="#F59E0B"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={() =>
                  setHoveredPlan({
                    label: "Enterprise",
                    value: enterpriseUsers,
                    percentage: enterpriseSlice.percentage,
                  })
                }
                onMouseLeave={() => setHoveredPlan(null)}
              />
            </svg>
            {hoveredPlan && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white bg-opacity-95 rounded-lg p-3 shadow-lg">
                  <p className="text-xs text-[var(--color-text-gray)]">
                    {hoveredPlan.label}
                  </p>
                  <p className="text-2xl font-bold text-[var(--color-text-black)]">
                    {hoveredPlan.value}
                  </p>
                  <p className="text-sm text-[var(--color-text-gray)]">
                    {hoveredPlan.percentage}%
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="w-full space-y-2">
            <div
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onMouseEnter={() =>
                setHoveredPlan({
                  label: "Free",
                  value: freeUsers,
                  percentage: freeSlice.percentage,
                })
              }
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <span className="text-sm text-[var(--color-text-gray)]">Free</span>
              </div>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {freeUsers}
              </span>
            </div>
            <div
              className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors"
              onMouseEnter={() =>
                setHoveredPlan({
                  label: "Premium",
                  value: premiumUsers,
                  percentage: premiumSlice.percentage,
                })
              }
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm text-[var(--color-text-gray)]">Premium</span>
              </div>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {premiumUsers}
              </span>
            </div>
            <div
              className="flex items-center justify-between p-2 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors"
              onMouseEnter={() =>
                setHoveredPlan({
                  label: "Enterprise",
                  value: enterpriseUsers,
                  percentage: enterpriseSlice.percentage,
                })
              }
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm text-[var(--color-text-gray)]">Enterprise</span>
              </div>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {enterpriseUsers}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Provider Distribution Chart */}
      <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-4">
          Users by Auth Provider
        </h3>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative w-60 h-60">
            <svg width="240" height="240" viewBox="0 0 240 240">
              <path
                d={emailSlice.path}
                fill="#EF4444"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={() =>
                  setHoveredProvider({
                    label: "Email",
                    value: emailUsers,
                    percentage: emailSlice.percentage,
                  })
                }
                onMouseLeave={() => setHoveredProvider(null)}
              />
              <path
                d={googleSlice.path}
                fill="#3B82F6"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={() =>
                  setHoveredProvider({
                    label: "Google",
                    value: googleUsers,
                    percentage: googleSlice.percentage,
                  })
                }
                onMouseLeave={() => setHoveredProvider(null)}
              />
              <path
                d={githubSlice.path}
                fill="#1F2937"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={() =>
                  setHoveredProvider({
                    label: "GitHub",
                    value: githubUsers,
                    percentage: githubSlice.percentage,
                  })
                }
                onMouseLeave={() => setHoveredProvider(null)}
              />
            </svg>
            {hoveredProvider && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white bg-opacity-95 rounded-lg p-3 shadow-lg">
                  <p className="text-xs text-[var(--color-text-gray)]">
                    {hoveredProvider.label}
                  </p>
                  <p className="text-2xl font-bold text-[var(--color-text-black)]">
                    {hoveredProvider.value}
                  </p>
                  <p className="text-sm text-[var(--color-text-gray)]">
                    {hoveredProvider.percentage}%
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="w-full space-y-2">
            <div
              className="flex items-center justify-between p-2 rounded-lg hover:bg-red-50 cursor-pointer transition-colors"
              onMouseEnter={() =>
                setHoveredProvider({
                  label: "Email",
                  value: emailUsers,
                  percentage: emailSlice.percentage,
                })
              }
              onMouseLeave={() => setHoveredProvider(null)}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-[var(--color-text-gray)]">Email</span>
              </div>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {emailUsers}
              </span>
            </div>
            <div
              className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
              onMouseEnter={() =>
                setHoveredProvider({
                  label: "Google",
                  value: googleUsers,
                  percentage: googleSlice.percentage,
                })
              }
              onMouseLeave={() => setHoveredProvider(null)}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-[var(--color-text-gray)]">Google</span>
              </div>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {googleUsers}
              </span>
            </div>
            <div
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              onMouseEnter={() =>
                setHoveredProvider({
                  label: "GitHub",
                  value: githubUsers,
                  percentage: githubSlice.percentage,
                })
              }
              onMouseLeave={() => setHoveredProvider(null)}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                <span className="text-sm text-[var(--color-text-gray)]">GitHub</span>
              </div>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {githubUsers}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

