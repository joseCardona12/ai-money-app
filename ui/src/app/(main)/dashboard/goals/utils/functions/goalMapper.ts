import { IGoal } from "../../types/goals";

/**
 * Backend goal interface from API
 */
export interface IBackendGoal {
  id: number;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  target_amount: number;
  current_amount: number;
  start_date: string;
  end_date: string;
  state_id?: number;
  goal_type_id?: number;
  user_id: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Map backend goal data to UI format
 * Converts snake_case backend fields to camelCase UI fields
 */
export const mapBackendGoalToUI = (backendGoal: IBackendGoal): IGoal => {
  const deadline = new Date(backendGoal.end_date);
  const today = new Date();
  const isOverdue = deadline < today;

  return {
    id: backendGoal.id,
    title: backendGoal.name,
    description: backendGoal.description || "No description",
    currentAmount:
      typeof backendGoal.current_amount === "string"
        ? parseFloat(backendGoal.current_amount)
        : backendGoal.current_amount,
    targetAmount:
      typeof backendGoal.target_amount === "string"
        ? parseFloat(backendGoal.target_amount)
        : backendGoal.target_amount,
    deadline: backendGoal.end_date,
    category: "General", // Default category, can be enhanced with goal_type_id
    color: backendGoal.color || "#3B82F6", // Default blue
    icon: backendGoal.icon || "🎯", // Default target icon
    isOverdue,
  };
};

/**
 * Map multiple backend goals to UI format
 */
export const mapBackendGoalsToUI = (backendGoals: IBackendGoal[]): IGoal[] => {
  return backendGoals.map(mapBackendGoalToUI);
};

/**
 * Calculate overall progress from goals
 */
export const calculateOverallProgress = (goals: IGoal[]) => {
  if (goals.length === 0) {
    return {
      totalCurrent: 0,
      totalTarget: 0,
      percentage: "0.00",
      description: "No goals yet",
    };
  }

  const totalCurrent = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  // Calculate percentage safely
  let percentage = "0.00";
  if (totalTarget > 0) {
    const percentageValue = (totalCurrent / totalTarget) * 100;
    // Ensure it's a valid number and not NaN
    percentage = isNaN(percentageValue) ? "0.00" : percentageValue.toFixed(2);
  }

  return {
    totalCurrent,
    totalTarget,
    percentage,
    description: `${percentage}% of your goals completed`,
  };
};

/**
 * Calculate goal progress percentage
 */
export const calculateGoalProgress = (goal: IGoal): string => {
  if (goal.targetAmount === 0) return "0.00";
  return ((goal.currentAmount / goal.targetAmount) * 100).toFixed(2);
};

/**
 * Get days remaining until deadline
 */
export const getDaysRemaining = (deadline: string): number => {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Format deadline for display
 */
export const formatDeadline = (deadline: string): string => {
  const date = new Date(deadline);
  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
