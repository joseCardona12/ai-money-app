export default function ChartDashboardLegend(): React.ReactNode {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: "var(--color-blue)" }}
        />
        <span className="text-sm" style={{ color: "var(--color-text-gray)" }}>
          Budget
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: "var(--color-text-dark)" }}
        />
        <span className="text-sm" style={{ color: "var(--color-text-gray)" }}>
          Expenses
        </span>
      </div>
    </div>
  );
}
