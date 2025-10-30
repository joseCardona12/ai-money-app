import { CHART_CONFIG, CHART_DATA } from "../../utils/constants/dashboardData";

interface ChartDashboardProps {
  chartData: typeof CHART_DATA;
}

export default function ChartDashboard({
  chartData,
}: ChartDashboardProps): React.ReactNode {
  return (
    <div className="h-64 flex items-end justify-between gap-2 mb-4">
      {chartData.map((data, index) => (
        <div key={index} className="flex flex-col items-center gap-1 flex-1">
          <div className="flex items-end gap-1 h-48">
            <div
              className="w-3 rounded-t"
              style={{
                height: `${(data.budget / CHART_CONFIG.maxValue) * 100}%`,
                backgroundColor: "var(--color-blue)",
              }}
            />
            <div
              className="w-3 rounded-t"
              style={{
                height: `${(data.expense / CHART_CONFIG.maxValue) * 100}%`,
                backgroundColor: "var(--color-text-dark)",
              }}
            />
          </div>
          <span className="text-xs" style={{ color: "var(--color-text-gray)" }}>
            {data.month}
          </span>
        </div>
      ))}
    </div>
  );
}
