export interface IOnboardingFormData {
  // Onboarding metadata
  id?: number;
  user_id?: number;
  completed: string;

  // Step 1: Basic Information
  currency_id: string;
  monthly_income?: string;

  // Step 2: Financial Goals
  goal_type_id: string;

  // Step 3: Budget Preferences
  budget_preference_id: string;

  // Step 4: Initial Setup
  initial_balance: string;
}

export interface IOnboardingRequest {
  // Onboarding metadata
  id?: number;
  user_id?: number;
  completed: number;

  // Step 1: Basic Information
  currency_id: number;
  monthly_income: number;

  // Step 2: Financial Goals
  goal_type_id: number;

  // Step 3: Budget Preferences
  budget_preference_id: number;

  // Step 4: Initial Setup
  initial_balance: number;
}
