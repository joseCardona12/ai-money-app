export interface IOnboardingItemFinancial {
  number: string;
  title: string;
  description: string;
}

export const CURRENT_ONBOARDING_ITEM_FINANCIAL: IOnboardingItemFinancial[] = [
  {
    number: "1",
    title: "Basic information",
    description: "Currency and income",
  },
  {
    number: "2",
    title: "Financial Goals",
    description: "What you want to achieve",
  },
  {
    number: "3",
    title: "Budget Preferences",
    description: "How you manage money",
  },
  {
    number: "4",
    title: "Initial Setup",
    description: "Starting balance",
  },
];
