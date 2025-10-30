"use client";
import AnalyticsStatsCards from "./AnalyticsStatsCards";
import IncomeVsExpensesChart from "./Charts/IncomeVsExpensesChart";
import SavingsTrendChart from "./Charts/SavingsTrendChart";
import SpendingByCategoryChart from "./Charts/SpendingByCategoryChart";
import TopSpendingCategoriesChart from "./Charts/TopSpendingCategoriesChart";
import CategoryBreakdownList from "./CategoryBreakdownList";
import CashFlowAnalysisChart from "./Charts/CashFlowAnalysisChart";
import Select from "@/ui/components/Select";
import AnalyticsTabs from "./AnalyticsTabs";
import { IUseAnalytics } from "../hooks/useAnalytics";
import { TIME_PERIODS } from "../utils/constants/analyticsData";

interface AnalyticsContentProps {
  analyticsData: IUseAnalytics;
}

export default function AnalyticsContent({
  analyticsData,
}: AnalyticsContentProps): React.ReactNode {
  const renderTabContent = () => {
    switch (analyticsData.activeTab) {
      case "overview":
        return (
          <div className="space-y-4">
            {/* Income vs Expenses Chart */}
            <IncomeVsExpensesChart data={analyticsData.incomeVsExpenses} />

            {/* Savings Trend Chart */}
            <SavingsTrendChart data={analyticsData.savingsTrend} />
          </div>
        );

      case "categories":
        return (
          <div className="space-y-4">
            {/* Spending by Category and Top Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SpendingByCategoryChart data={analyticsData.categorySpending} />
              <TopSpendingCategoriesChart
                data={analyticsData.categorySpending}
              />
            </div>

            {/* Category Breakdown List */}
            <CategoryBreakdownList data={analyticsData.categoryBreakdown} />
          </div>
        );

      case "cashflow":
        return (
          <div className="space-y-4">
            {/* Cash Flow Analysis Chart */}
            <CashFlowAnalysisChart data={analyticsData.cashFlowAnalysis} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-black)]">
            Analytics
          </h1>
          <p className="text-[var(--color-text-gray)] text-sm mt-1">
            Detailed insights into your financial patterns
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Time Period Selector */}
          <Select
            value={analyticsData.selectedPeriod}
            onChange={(value) => analyticsData.handlePeriodChange(value)}
            options={TIME_PERIODS}
            placeholder="Select period"
          />
        </div>
      </div>

      {/* Analytics Stats Cards */}
      <AnalyticsStatsCards cards={analyticsData.cards} />

      {/* Tabs */}
      <AnalyticsTabs
        contentTabs={analyticsData.contentTabs}
        setElement={analyticsData.handleTabChange}
        setContentTabs={analyticsData.setContentTabs}
      />

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}
