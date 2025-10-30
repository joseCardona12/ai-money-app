export interface ICurrencyOption {
  value: string;
  label: string;
  symbol: string;
}

export interface IFinancialGoalOption {
  value: string;
  label: string;
  description: string;
}

export interface IBudgetPreferenceOption {
  value: string;
  label: string;
  description: string;
}

export const CURRENCY_OPTIONS: ICurrencyOption[] = [
  {
    value: "USD",
    label: "USD - US Dollar",
    symbol: "$",
  },
  {
    value: "COP",
    label: "COP - Colombian Peso",
    symbol: "$",
  },
];

export const FINANCIAL_GOALS_OPTIONS: IFinancialGoalOption[] = [
  {
    value: "build_savings",
    label: "Build Savings",
    description: "Create an emergency fund or save for the future",
  },
  {
    value: "pay_off_debt",
    label: "Pay Off Debt",
    description: "Reduce or eliminate credit card or loan debt",
  },
  {
    value: "start_investing",
    label: "Start Investing",
    description: "Grow wealth through investments",
  },
];

export const BUDGET_PREFERENCES_OPTIONS: IBudgetPreferenceOption[] = [
  {
    value: "detailed_tracking",
    label: "Detailed Tracking",
    description: "Track every expense and categorize all transactions",
  },
  {
    value: "simple_overview",
    label: "Simple Overview",
    description: "Focus on big picture with minimal tracking",
  },
  {
    value: "ai_powered_automation",
    label: "AI-Powered Automation",
    description: "Let AI categorize and provide insights automatically",
  },
];

export const ONBOARDING_STEPS = [
  {
    step: 1,
    title: "Basic Information",
    description: "Let's start with some basic details about your finances.",
  },
  {
    step: 2,
    title: "Financial Goals",
    description: "What do you want to achieve? Select all that apply.",
  },
  {
    step: 3,
    title: "Budget Preferences",
    description: "How do you prefer to manage your budget?",
  },
  {
    step: 4,
    title: "Almost Done!",
    description: "Set your starting balance to begin tracking your finances.",
  },
];
