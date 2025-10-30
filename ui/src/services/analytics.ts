import { IResponseDto } from "@/interfaces/responseDto";
import { HTTPClient } from "@/utils/httpClient";

export interface IAnalytics {
  total_income?: number;
  total_expenses?: number;
  total_savings?: number;
  savings_rate?: number;
  net_cash_flow?: number;
  period?: Date;
  user_id: number;
}

export interface IAnalyticsService {
  createAnalytics(analytics: IAnalytics): Promise<IResponseDto>;
  getAnalyticsByUserId(userId: number): Promise<IResponseDto>;
}

class AnalyticsService implements IAnalyticsService {
  private httpClient: HTTPClient;

  constructor() {
    this.httpClient = new HTTPClient();
  }

  public async createAnalytics(analytics: IAnalytics): Promise<IResponseDto> {
    try {
      return await this.httpClient.post<IAnalytics, IResponseDto>(
        "analytics",
        analytics
      );
    } catch (error) {
      throw error;
    }
  }

  public async getAnalyticsByUserId(userId: number): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(
        `analytics/user/${userId}`
      );
    } catch (error) {
      throw error;
    }
  }
}

export const analyticsService = new AnalyticsService();
