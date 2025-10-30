export interface IBudgetCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
  budgeted: number;
  spent: number;
  isOverBudget?: boolean;
}

export interface IBudgetSummary {
  totalBudgeted: number;
  totalSpent: number;
  remaining: number;
  percentageSpent: number;
  month: string;
  year: number;
}

export interface IBudgetAlert {
  id: number;
  categoryName: string;
  overAmount: number;
  message: string;
}

export interface IBudgetOption {
  id: string;
  text: string;
  icon?: React.ReactElement;
  onClick: () => void;
  variant?: "default" | "danger";
}

export interface IBudgetStats {
  totalCategories: number;
  categoriesOverBudget: number;
  averageSpending: number;
  monthlyTrend: number;
}
