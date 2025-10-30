import { IResponseDto } from "@/interfaces/responseDto";
import { ISignUpRequest } from "@/interfaces/signUp";
import { IUser } from "@/interfaces/user";
import { HTTPClient } from "@/utils/httpClient";
import { settingsService } from "@/services/settings";
import { analyticsService } from "@/services/analytics";

export interface ISignUpService {
  signUp(request: ISignUpRequest): Promise<IResponseDto>;
}
class SignUpService implements ISignUpService {
  private httpClient: HTTPClient;
  constructor() {
    this.httpClient = new HTTPClient();
  }
  public async signUp(request: ISignUpRequest): Promise<IResponseDto> {
    const user: IUser = {
      ...request,
      fullName: request.fullName || "John Doe",
      phone_number: "+57 3006233512",
      address: "CR 77 TEST123",
      bio: "I am a test user",
      profile_picture: "https://avatar.iran.liara.run/public/8",
      join_date: new Date(),
      role_id: 1,
      provider_id: 1,
      plan_id: 1,
    };
    try {
      // Step 1: Create user
      const userResponse = await this.httpClient.post<IUser, IResponseDto>(
        "auth/register",
        user
      );

      if (userResponse.status >= 400) {
        return userResponse;
      }

      // Get the created user ID and token from the response
      // Backend returns user inside data.user
      const createdUser = (
        userResponse.data as { user?: IUser; token?: string }
      )?.user;
      const token = (userResponse.data as { user?: IUser; token?: string })
        ?.token;
      const userId = createdUser?.id;

      if (!userId || !token) {
        return {
          status: 400,
          message: "Failed to get user ID or token from registration response",
          data: null,
        };
      }

      // Set token and user in localStorage for authenticated requests
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(createdUser));

      // Step 2: Create settings with default values
      await settingsService.createSettings({
        user_id: userId,
        region: "US",
        timezone: "UTC",
        notification_enabled: 1,
        plan_id: 1,
        security_level_id: 1,
        currency_id: 1,
        language_id: 4,
      });

      // Step 3: Create analytics with default values (all zeros)
      await analyticsService.createAnalytics({
        user_id: userId,
        total_income: 0,
        total_expenses: 0,
        total_savings: 0,
        savings_rate: 0,
        net_cash_flow: 0,
        period: new Date(),
      });

      return userResponse;
    } catch (error) {
      throw error;
    }
  }
}

export const signUpService = new SignUpService();
