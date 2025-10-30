export interface IGoal {
  id: number;
  title: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  deadline: string;
  category: string;
  color: string;
  icon: string;
  isOverdue?: boolean;
}

export interface IOverallProgress {
  totalCurrent: number;
  totalTarget: number;
  percentage: string;
  description: string;
}

export interface IGoalOption {
  id: string;
  text: string;
  icon?: React.ReactElement;
  onClick: () => void;
  variant?: "default" | "danger";
}

export interface IGoalStats {
  totalGoals: number;
  completedGoals: number;
  totalProgress: number;
  monthlyContribution: number;
}
