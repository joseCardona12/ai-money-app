import { IGoalRequest } from "@/interfaces/goalRequest";

/**
 * Backend goal request format (snake_case)
 */
export interface IBackendGoalRequest {
  name: string;
  description: string;
  target_amount: number;
  current_amount: number;
  start_date: string;
  end_date: string;
  color: string;
  icon: string;
  state_id?: number;
  goal_type_id?: number;
}

/**
 * Map UI goal request to backend format
 * Converts camelCase to snake_case and title to name
 */
export const mapUIGoalRequestToBackend = (
  uiRequest: IGoalRequest
): IBackendGoalRequest => {
  // Get today's date as start_date
  const today = new Date();
  const startDate = today.toISOString().split("T")[0];

  return {
    name: uiRequest.title, // title → name
    description: uiRequest.description,
    target_amount: uiRequest.targetAmount, // targetAmount → target_amount
    current_amount: uiRequest.currentAmount, // currentAmount → current_amount
    start_date: startDate, // Use today as start date
    end_date: uiRequest.deadline, // deadline → end_date
    color: uiRequest.color,
    icon: uiRequest.icon,
    state_id: 1, // Default state (pending)
    goal_type_id: 1, // Default goal type
  };
};

/**
 * Map UI goal request to backend format for updates
 * Only includes fields that are provided
 */
export const mapUIGoalRequestToBackendPartial = (
  uiRequest: Partial<IGoalRequest>
): Partial<IBackendGoalRequest> => {
  const backendRequest: Partial<IBackendGoalRequest> = {};

  if (uiRequest.title !== undefined) {
    backendRequest.name = uiRequest.title;
  }
  if (uiRequest.description !== undefined) {
    backendRequest.description = uiRequest.description;
  }
  if (uiRequest.targetAmount !== undefined) {
    backendRequest.target_amount = uiRequest.targetAmount;
  }
  if (uiRequest.currentAmount !== undefined) {
    backendRequest.current_amount = uiRequest.currentAmount;
  }
  if (uiRequest.deadline !== undefined) {
    backendRequest.end_date = uiRequest.deadline;
  }
  if (uiRequest.color !== undefined) {
    backendRequest.color = uiRequest.color;
  }
  if (uiRequest.icon !== undefined) {
    backendRequest.icon = uiRequest.icon;
  }

  return backendRequest;
};

