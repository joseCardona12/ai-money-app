import { IGoal, IOverallProgress } from "../../types/goals";

export const GOALS_DATA: IGoal[] = [
  {
    id: 1,
    title: "Emergency Fund",
    description: "6 months of expenses",
    currentAmount: 18500,
    targetAmount: 30000,
    deadline: "2024-12-31",
    category: "emergency",
    color: "#3B82F6",
    icon: "🛡️",
    isOverdue: false,
  },
  {
    id: 2,
    title: "Vacation to Japan",
    description: "2 weeks trip including flights and hotels",
    currentAmount: 5200,
    targetAmount: 8000,
    deadline: "2024-06-15",
    category: "travel",
    color: "#8B5CF6",
    icon: "✈️",
    isOverdue: true,
  },
  {
    id: 3,
    title: "New Car",
    description: "Down payment for Tesla Model 3",
    currentAmount: 3200,
    targetAmount: 15000,
    deadline: "2025-03-01",
    category: "transportation",
    color: "#10B981",
    icon: "🚗",
    isOverdue: false,
  },
  {
    id: 4,
    title: "Home Renovation",
    description: "Kitchen and bathroom remodel",
    currentAmount: 12800,
    targetAmount: 25000,
    deadline: "2024-09-30",
    category: "home",
    color: "#F59E0B",
    icon: "🏠",
    isOverdue: true,
  },
];

export const OVERALL_PROGRESS: IOverallProgress = {
  totalCurrent: 39700,
  totalTarget: 78000,
  percentage: "50.90",
  description: "You're 50.90% of the way to achieving all your goals",
};

export const GOAL_CATEGORIES = [
  { value: "emergency", label: "Emergency Fund" },
  { value: "travel", label: "Travel" },
  { value: "transportation", label: "Transportation" },
  { value: "home", label: "Home" },
  { value: "education", label: "Education" },
  { value: "investment", label: "Investment" },
  { value: "other", label: "Other" },
];

export const GOAL_COLORS = [
  { value: "#3B82F6", label: "Blue" },
  { value: "#8B5CF6", label: "Purple" },
  { value: "#10B981", label: "Green" },
  { value: "#F59E0B", label: "Orange" },
  { value: "#EF4444", label: "Red" },
  { value: "#6B7280", label: "Gray" },
];

export const GOAL_ICONS = [
  { value: "🎯", label: "Target" },
  { value: "🛡️", label: "Shield" },
  { value: "✈️", label: "Airplane" },
  { value: "🚗", label: "Car" },
  { value: "🏠", label: "House" },
  { value: "📚", label: "Books" },
  { value: "💼", label: "Briefcase" },
  { value: "💰", label: "Money" },
  { value: "🎓", label: "Graduation" },
  { value: "🏋️", label: "Fitness" },
  { value: "🌍", label: "World" },
  { value: "🎨", label: "Art" },
];
