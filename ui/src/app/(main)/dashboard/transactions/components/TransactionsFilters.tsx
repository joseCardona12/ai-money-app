"use client";
import { IconSearch, IconX } from "@tabler/icons-react";
import Input from "@/ui/components/Input";
import Select from "@/ui/components/Select";
import { SelectOption } from "@/interfaces/selectOption";

interface ITransactionsFiltersProps {
  searchTerm: string;
  categories: SelectOption[];
  types: SelectOption[];
  timePeriods: SelectOption[];
  selectedCategory: string;
  selectedType: string;
  selectedTimePeriod: string;
  onSearch: (term: string) => void;
  onCategoryFilter: (category: string) => void;
  onTypeFilter: (type: string) => void;
  onTimePeriodFilter: (period: string) => void;
  onClearFilters: () => void;
}

export default function TransactionsFilters({
  searchTerm,
  categories,
  types,
  timePeriods,
  selectedCategory,
  selectedType,
  selectedTimePeriod,
  onSearch,
  onCategoryFilter,
  onTypeFilter,
  onTimePeriodFilter,
  onClearFilters,
}: ITransactionsFiltersProps): React.ReactNode {
  const getSelectedTimePeriodLabel = () => {
    const selected = timePeriods.find(
      (period) => period.value === selectedTimePeriod
    );
    return selected?.label || "Last 30 days";
  };

  return (
    <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white overflow-visible">
      {/* Main Filter Row */}
      <div className="flex items-center gap-4 overflow-visible">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconSearch size={16} style={{ color: "var(--color-text-gray)" }} />
          </div>
          <Input
            type="text"
            placeholder="Search transactions..."
            className="pl-10 text-sm w-full"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <Select
          options={categories}
          value={selectedCategory}
          onChange={onCategoryFilter}
          placeholder="All Categories"
          variant="default"
          className="min-w-[140px]"
        />

        {/* Type Filter */}
        <Select
          options={types}
          value={selectedType}
          onChange={onTypeFilter}
          placeholder="All Types"
          variant="default"
          className="min-w-[120px]"
        />

        {/* Time Period Filter */}
        <Select
          options={timePeriods}
          value={selectedTimePeriod}
          onChange={onTimePeriodFilter}
          placeholder="Last 30 days"
          variant="default"
          className="min-w-[130px]"
        />

        {/* Clear Filters Button */}
        <button
          onClick={onClearFilters}
          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
          title="Clear all filters"
        >
          <IconX size={16} style={{ color: "#ef4444" }} />
        </button>
      </div>

      {/* Active Filters Tags */}
      {selectedTimePeriod && selectedTimePeriod !== "30days" && (
        <div className="flex items-center gap-2 mt-4">
          <div className="flex items-center gap-1 px-3 py-1 bg-[var(--color-gray-light)] rounded-full text-sm">
            <span style={{ color: "var(--color-text-black)" }}>
              {getSelectedTimePeriodLabel()}
            </span>
            <button
              onClick={() => onTimePeriodFilter("30days")}
              className="ml-1 hover:bg-[var(--color-gray-border)] rounded-full p-0.5 transition-colors"
            >
              <IconX size={12} style={{ color: "var(--color-text-gray)" }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
