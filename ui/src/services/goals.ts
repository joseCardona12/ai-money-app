import { IResponseDto } from "@/interfaces/responseDto";
import { HTTPClient } from "@/utils/httpClient";
import { IGoal } from "@/app/(main)/dashboard/goals/types/goals";
import { IGoalRequest } from "@/interfaces/goalRequest";
import { IContributionRequest } from "@/interfaces/contributionRequest";
import {
  mapUIGoalRequestToBackend,
  mapUIGoalRequestToBackendPartial,
} from "@/app/(main)/dashboard/goals/utils/functions/goalRequestMapper";

export interface IGoalService {
  createGoal(userId: number, data: IGoalRequest): Promise<IResponseDto>;
  getGoalsByUserId(userId: number): Promise<IResponseDto>;
  getGoalById(userId: number, goalId: number): Promise<IResponseDto>;
  updateGoal(
    userId: number,
    goalId: number,
    data: Partial<IGoalRequest>
  ): Promise<IResponseDto>;
  deleteGoal(userId: number, goalId: number): Promise<IResponseDto>;
  getActiveGoals(userId: number): Promise<IResponseDto>;
  getGoalsNearCompletion(userId: number): Promise<IResponseDto>;
  addContribution(
    userId: number,
    goalId: number,
    goal: IGoal,
    contribution: IContributionRequest
  ): Promise<IResponseDto>;
}

class GoalService implements IGoalService {
  private httpClient: HTTPClient;

  constructor() {
    this.httpClient = new HTTPClient();
  }

  /**
   * Create a new goal
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   * Maps UI format (camelCase) to backend format (snake_case)
   */
  public async createGoal(
    userId: number,
    data: IGoalRequest
  ): Promise<IResponseDto> {
    try {
      const backendData = mapUIGoalRequestToBackend(data);
      return await this.httpClient.post<any, IResponseDto>(
        `goals`,
        backendData
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all goals for the authenticated user
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async getGoalsByUserId(userId: number): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(`goals`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a specific goal by ID
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async getGoalById(
    userId: number,
    goalId: number
  ): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(`goals/${goalId}`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a goal
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   * Maps UI format (camelCase) to backend format (snake_case)
   */
  public async updateGoal(
    userId: number,
    goalId: number,
    data: Partial<IGoalRequest>
  ): Promise<IResponseDto> {
    try {
      const backendData = mapUIGoalRequestToBackendPartial(data);
      return await this.httpClient.put<any, IResponseDto>(
        `goals/${goalId}`,
        backendData
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a goal
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async deleteGoal(
    userId: number,
    goalId: number
  ): Promise<IResponseDto> {
    try {
      return await this.httpClient.delete<IResponseDto>(`goals/${goalId}`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get active goals for the authenticated user
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async getActiveGoals(userId: number): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(`goals/active`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get goals near completion for the authenticated user
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async getGoalsNearCompletion(userId: number): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(`goals/near-completion`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add a contribution to a goal
   * This updates the goal's currentAmount by adding the contribution amount
   * Also updates the description with the contribution description
   * Uses PATCH to only update specific fields
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async addContribution(
    userId: number,
    goalId: number,
    goal: IGoal,
    contribution: IContributionRequest
  ): Promise<IResponseDto> {
    try {
      // Calculate new current amount
      const newCurrentAmount = goal.currentAmount + contribution.amount;

      // Create PATCH request with only the fields to update
      const patchData = {
        current_amount: newCurrentAmount,
        description: contribution.description || goal.description,
      };

      return await this.httpClient.patch<any, IResponseDto>(
        `goals/${goalId}/progress`,
        patchData
      );
    } catch (error) {
      throw error;
    }
  }
}

export const goalService = new GoalService();
