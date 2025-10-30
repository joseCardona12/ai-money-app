"use client";
import GoalsContent from "./components/GoalsContent";
import useGoals from "./hooks/useGoals";

export default function GoalsView(): React.ReactNode {
  const goalsData = useGoals();

  return <GoalsContent goalsData={goalsData} />;
}
