import { ReactElement } from "react";
import { IconCheck } from "../../../../../../public/icons";

export interface IFinancialJourney {
  icon: ReactElement;
  title: string;
  description: string;
}
export const CURRENT_FINANCIAL_JOURNEY: IFinancialJourney[] = [
  {
    icon: <IconCheck className="text-[var(--color-blue)] text-sm" />,
    title: "AI-Powered Insights",
    description: "Get personalized financial recommendations",
  },
  {
    icon: <IconCheck className="text-[var(--color-blue)] text-sm" />,
    title: "Smart Budgeting",
    description: "Track expenses and stay on top of your budget",
  },
  {
    icon: <IconCheck className="text-[var(--color-blue)] text-sm" />,
    title: "Goal Tracking",
    description: "Set and achieve your financial goals faster",
  },
];
