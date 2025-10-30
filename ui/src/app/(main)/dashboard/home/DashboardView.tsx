"use client";
import DashboardContent from "./components/DashboardContent";
import useDashboard from "./hooks/useDashboard";

export default function DashboardView(): React.ReactNode {
  const dashboardData = useDashboard();

  return <DashboardContent dashboardData={dashboardData} />;
}
