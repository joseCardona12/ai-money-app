import { SelectOption } from "@/interfaces/selectOption";
import Select from "@/ui/components/Select";

interface RecentTransactionHeaderProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}
export default function RecentTransactionHeader({
  options,
  value,
  onChange,
}: RecentTransactionHeaderProps): React.ReactNode {
  return (
    <div className="flex items-center justify-between mb-6">
      <h3
        className="text-lg font-semibold"
        style={{ color: "var(--color-text-black)" }}
      >
        Recent transactions
      </h3>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        variant="currency"
      />
    </div>
  );
}
