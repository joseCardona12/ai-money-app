import {
  IBudgetCategory,
  IBudgetSummary,
  IBudgetAlert,
} from "../../types/budget";

/**
 * Backend budget response format (snake_case)
 */
export interface IBackendBudgetResponse {
  id: number;
  month: string | Date;
  budgeted_amount: number | string;
  spent_amount: number | string;
  remaining: number | string;
  alert_triggered: boolean;
  created_at: string | Date;
  category_id: number;
  user_id: number;
  category?: {
    id: number;
    name: string;
    icon?: string;
    color?: string;
  };
  percentage_used?: number;
  is_over_budget?: boolean;
  days_remaining_in_month?: number;
}

/**
 * Backend budget summary response format (snake_case)
 */
export interface IBackendBudgetSummary {
  total_budgeted: number | string;
  total_spent: number | string;
  total_remaining: number | string;
  percentage_used: number;
  categories_over_budget: number;
  categories_with_alerts: number;
}

/**
 * Category metadata for mapping
 */
const CATEGORY_METADATA: Record<string, { icon: string; color: string }> = {
  "food-dining": { icon: "🍽️", color: "#FF6B35" },
  transportation: { icon: "🚗", color: "#4285F4" },
  shopping: { icon: "🛍️", color: "#9C27B0" },
  "bills-utilities": { icon: "💡", color: "#FFC107" },
  entertainment: { icon: "🎬", color: "#E91E63" },
  healthcare: { icon: "🏥", color: "#F44336" },
  education: { icon: "📚", color: "#2196F3" },
  travel: { icon: "✈️", color: "#00BCD4" },
  fitness: { icon: "💪", color: "#4CAF50" },
  "personal-care": { icon: "💅", color: "#FF9800" },
  gifts: { icon: "🎁", color: "#E91E63" },
  insurance: { icon: "🛡️", color: "#607D8B" },
  taxes: { icon: "📊", color: "#3F51B5" },
  investments: { icon: "📈", color: "#8BC34A" },
  other: { icon: "📋", color: "#607D8B" },
};

/**
 * Map backend budget response to UI format
 */
export const mapBackendBudgetToUI = (
  backendBudget: IBackendBudgetResponse
): IBudgetCategory => {
  const categoryName = backendBudget.category?.name || "Unknown";
  const categoryKey = categoryName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "");

  const metadata = CATEGORY_METADATA[categoryKey] || {
    icon: "📋",
    color: "#607D8B",
  };

  const budgeted = parseFloat(String(backendBudget.budgeted_amount));
  const spent = parseFloat(String(backendBudget.spent_amount));

  return {
    id: backendBudget.id,
    name: categoryName,
    icon: metadata.icon,
    color: metadata.color,
    budgeted,
    spent,
    isOverBudget: spent > budgeted,
  };
};

/**
 * Map backend budget summary to UI format
 */
export const mapBackendBudgetSummaryToUI = (
  backendSummary: IBackendBudgetSummary,
  month: string = "January",
  year: number = new Date().getFullYear()
): IBudgetSummary => {
  const totalBudgeted = parseFloat(String(backendSummary.total_budgeted));
  const totalSpent = parseFloat(String(backendSummary.total_spent));
  const totalRemaining = parseFloat(String(backendSummary.total_remaining));

  return {
    totalBudgeted,
    totalSpent,
    remaining: totalRemaining,
    percentageSpent: backendSummary.percentage_used,
    month,
    year,
  };
};

/**
 * Map backend budget alerts to UI format
 */
export const mapBackendBudgetsToAlerts = (
  budgets: IBackendBudgetResponse[]
): IBudgetAlert[] => {
  return budgets
    .filter((budget) => budget.is_over_budget)
    .map((budget) => {
      const parsedAmount = parseFloat(String(budget.remaining));
      const overAmount = Math.abs(isNaN(parsedAmount) ? 0 : parsedAmount);
      return {
        id: budget.id,
        categoryName: budget.category?.name || "Unknown",
        overAmount,
        message: `${budget.category?.name || "Unknown"}: $${overAmount.toFixed(
          2
        )} over`,
      };
    });
};

/**
 * Get month name from date
 */
export const getMonthName = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", { month: "long" });
};

/**
 * Get year from date
 */
export const getYear = (date: string | Date): number => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.getFullYear();
};

/**
 * Format date to ISO string (YYYY-MM-DD)
 */
export const formatDateToISO = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Get current month in ISO format
 */
export const getCurrentMonthISO = (): string => {
  const now = new Date();
  return formatDateToISO(new Date(now.getFullYear(), now.getMonth(), 1));
};
