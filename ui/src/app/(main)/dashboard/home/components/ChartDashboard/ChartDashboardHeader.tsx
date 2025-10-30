import { SelectOption } from "@/interfaces/selectOption";
import Select from "@/ui/components/Select";

interface ChartDashboardHeaderProps {
  selectedTimeframe: string;
  setSelectedTimeframe: (timeframe: string) => void;
  options: SelectOption[];
}
export default function ChartDashboardHeader({
  selectedTimeframe,
  setSelectedTimeframe,
  options,
}: ChartDashboardHeaderProps): React.ReactNode {
  return (
    <div className="flex items-center justify-between mb-6">
      <h3
        className="text-lg font-semibold"
        style={{ color: "var(--color-text-black)" }}
      >
        Budget vs Expenses Comparison
      </h3>
      <Select
        options={options}
        value={selectedTimeframe}
        onChange={setSelectedTimeframe}
        variant="currency"
      />
    </div>
  );
}
