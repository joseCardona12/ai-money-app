"use client";
import { CHART_DATA } from "../../utils/constants/dashboardData";
import ChartDashboard from "./ChartDashboard";
import ChartDashboardLegend from "./ChartDashboardLegend";
import ChartDashboardHeader from "./ChartDashboardHeader";

interface ChartSectionProps {
  chartData: typeof CHART_DATA;
  selectedTimeframe: string;
  setSelectedTimeframe: (timeframe: string) => void;
}

export default function ChartSection({
  chartData,
  selectedTimeframe,
  setSelectedTimeframe,
}: ChartSectionProps): React.ReactNode {
  return (
    <div
      className="p-6 rounded-xl border border-[var(--color-gray-border)] h-full"
      style={{ backgroundColor: "var(--color-white)" }}
    >
      <ChartDashboardHeader
        selectedTimeframe={selectedTimeframe}
        setSelectedTimeframe={setSelectedTimeframe}
        options={[
          { value: "This year", label: "This year" },
          { value: "Last year", label: "Last year" },
        ]}
      />
      <ChartDashboard chartData={chartData} />
      <ChartDashboardLegend />
    </div>
  );
}
