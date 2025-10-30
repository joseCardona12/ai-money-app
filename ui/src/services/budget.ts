import { IResponseDto } from "@/interfaces/responseDto";
import { HTTPClient } from "@/utils/httpClient";
import { IBudgetRequest } from "@/interfaces/budgetRequest";

export interface IBudgetService {
  createBudget(userId: number, data: IBudgetRequest): Promise<IResponseDto>;
  getBudgetsByUserId(userId: number, month?: string): Promise<IResponseDto>;
  getBudgetById(userId: number, budgetId: number): Promise<IResponseDto>;
  updateBudget(
    userId: number,
    budgetId: number,
    data: Partial<IBudgetRequest>
  ): Promise<IResponseDto>;
  deleteBudget(userId: number, budgetId: number): Promise<IResponseDto>;
  getBudgetSummary(userId: number, month?: string): Promise<IResponseDto>;
  getMonthlyBudgetOverview(
    userId: number,
    month: string
  ): Promise<IResponseDto>;
  getBudgetsWithAlerts(userId: number): Promise<IResponseDto>;
  getOverBudgetBudgets(userId: number): Promise<IResponseDto>;
}

class BudgetService implements IBudgetService {
  private httpClient: HTTPClient;

  constructor() {
    this.httpClient = new HTTPClient();
  }

  /**
   * Create a new budget
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async createBudget(
    userId: number,
    data: IBudgetRequest
  ): Promise<IResponseDto> {
    try {
      // Convert month to ISO string format that new Date() can parse
      let monthDate = new Date().toISOString();
      if (data.month) {
        // If month is in YYYY-MM-DD format, convert to ISO string
        const date = new Date(data.month + "T00:00:00Z");
        monthDate = date.toISOString();
      }

      const backendData = {
        category_id: data.categoryId,
        budgeted_amount: data.budgetedAmount,
        month: monthDate,
      };
      return await this.httpClient.post<any, IResponseDto>(
        `budgets`,
        backendData
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all budgets for the authenticated user
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async getBudgetsByUserId(
    userId: number,
    month?: string
  ): Promise<IResponseDto> {
    try {
      const params = month ? `?month=${month}` : "";
      return await this.httpClient.get<IResponseDto>(`budgets${params}`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a specific budget by ID
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async getBudgetById(
    userId: number,
    budgetId: number
  ): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(`budgets/${budgetId}`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a budget
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async updateBudget(
    userId: number,
    budgetId: number,
    data: Partial<IBudgetRequest>
  ): Promise<IResponseDto> {
    try {
      const backendData: any = {};
      if (data.budgetedAmount !== undefined) {
        backendData.budgeted_amount = data.budgetedAmount;
      }
      if (data.categoryId !== undefined) {
        backendData.category_id = data.categoryId;
      }
      if (data.month !== undefined) {
        // Convert month to ISO string format that new Date() can parse
        const date = new Date(data.month + "T00:00:00Z");
        backendData.month = date.toISOString();
      }
      return await this.httpClient.put<any, IResponseDto>(
        `budgets/${budgetId}`,
        backendData
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a budget
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async deleteBudget(
    userId: number,
    budgetId: number
  ): Promise<IResponseDto> {
    try {
      return await this.httpClient.delete<IResponseDto>(`budgets/${budgetId}`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get budget summary for a specific month
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async getBudgetSummary(
    userId: number,
    month?: string
  ): Promise<IResponseDto> {
    try {
      const params = month ? `?month=${month}` : "";
      return await this.httpClient.get<IResponseDto>(
        `budgets/summary${params}`
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get monthly budget overview
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async getMonthlyBudgetOverview(
    userId: number,
    month: string
  ): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(
        `budgets/monthly-overview?month=${month}`
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get budgets with alerts
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async getBudgetsWithAlerts(userId: number): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(`budgets/alerts`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get over-budget budgets
   * Note: userId parameter is kept for API compatibility but not used in URL
   * The backend uses the authenticated user's ID from the JWT token
   */
  public async getOverBudgetBudgets(userId: number): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(`budgets/over-budget`);
    } catch (error) {
      throw error;
    }
  }
}

export const budgetService = new BudgetService();
