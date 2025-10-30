"use client";
import BudgetContent from "./components/BudgetContent";
import useBudget from "./hooks/useBudget";

export default function BudgetView(): React.ReactNode {
  const budgetData = useBudget();

  return <BudgetContent budgetData={budgetData} />;
}
