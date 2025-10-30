import { z } from "zod";

export const goalFormSchema = z.object({
  title: z.string().min(1, "Goal title is required").max(50, "Title too long"),
  description: z.string().min(1, "Description is required").max(100, "Description too long"),
  targetAmount: z.number().min(1, "Target amount must be greater than 0"),
  currentAmount: z.number().min(0, "Current amount cannot be negative").default(0),
  deadline: z.string().min(1, "Deadline is required"),
  category: z.string().min(1, "Category is required"),
  color: z.string().min(1, "Color is required"),
  icon: z.string().min(1, "Icon is required"),
});

export type GoalFormData = z.infer<typeof goalFormSchema>;

export const CURRENT_FORM_GOAL: GoalFormData = {
  title: "",
  description: "",
  targetAmount: 0,
  currentAmount: 0,
  deadline: "",
  category: "",
  color: "#3B82F6",
  icon: "🎯",
};

export const GOAL_ICONS = [
  { value: "🛡️", label: "Shield" },
  { value: "✈️", label: "Airplane" },
  { value: "🚗", label: "Car" },
  { value: "🏠", label: "House" },
  { value: "📚", label: "Books" },
  { value: "💰", label: "Money" },
  { value: "🎯", label: "Target" },
  { value: "💎", label: "Diamond" },
  { value: "🌟", label: "Star" },
  { value: "🎉", label: "Party" },
];
