import { IOnboardingFormData } from "@/interfaces/onboarding";
import z from "zod";

export const step1Schema = z.object({
  currency_id: z.string().optional(),
  monthly_income: z.string().optional(),
});

export const step2Schema = z.object({
  goal_type_id: z.string().min(1, "Please select a financial goal"),
});

export const step3Schema = z.object({
  budget_preference_id: z.string().min(1, "Please select a budget preference"),
});

export const step4Schema = z.object({
  initial_balance: z.string().min(1, "Balance must be a positive number"),
});

export const formSchemaOnboarding = z.object({
  id: z.number().optional(),
  user_id: z.number().optional(),
  completed: z.string(),
  currency_id: z.string().min(1, "Please select a currency"),
  monthly_income: z.string().optional(),
  goal_type_id: z.string().min(1, "Please select a financial goal"),
  budget_preference_id: z.string().min(1, "Please select a budget preference"),
  initial_balance: z.string().min(1, "Balance must be a positive number"),
});

export const CURRENT_FORM_ONBOARDING: IOnboardingFormData = {
  completed: "0",
  currency_id: "",
  monthly_income: "",
  goal_type_id: "",
  budget_preference_id: "",
  initial_balance: "",
};
