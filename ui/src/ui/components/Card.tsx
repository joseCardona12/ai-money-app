import { IconTrendingUp } from "@tabler/icons-react";
import { title } from "process";
import Select from "./Select";
import { SelectOption } from "@/interfaces/selectOption";

interface ICardProps {
  title: string;
  amount: string;
  currency: string;
  change: string;
  changeText: string;
  positive: boolean;
  selects: SelectOption[];
}
export default function Card({
  title,
  amount,
  currency,
  change,
  changeText,
  positive,
  selects,
}: ICardProps): React.ReactNode {
  return (
    <div
      className="p-6 rounded-xl border-1 border-[var(--color-gray-border)]"
      style={{ backgroundColor: "var(--color-white)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3
          className="text-sm font-medium"
          style={{ color: "var(--color-text-gray)" }}
        >
          {title}
        </h3>
        <Select
          options={selects}
          value={currency}
          variant="currency"
          className="text-xs"
        />
      </div>
      <div className="mb-3">
        <h2
          className="text-3xl font-bold"
          style={{ color: "var(--color-text-black)" }}
        >
          {amount}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <IconTrendingUp
            className="w-4 h-4"
            style={{ color: "var(--color-green)" }}
          />
          <span
            className="text-xs font-medium"
            style={{ color: "var(--color-green)" }}
          >
            {change}
          </span>
        </div>
        <span className="text-xs" style={{ color: "var(--color-text-gray)" }}>
          {changeText}
        </span>
      </div>
    </div>
  );
}
