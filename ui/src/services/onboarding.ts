import { IOnboardingRequest } from "@/interfaces/onboarding";
import { IResponseDto } from "@/interfaces/responseDto";
import { HTTPClient } from "@/utils/httpClient";

export interface IOnboardingService {
  submitOnboarding(request: IOnboardingRequest): Promise<IResponseDto>;
  checkOnboardingStatus(): Promise<IResponseDto>;
}

class OnboardingService implements IOnboardingService {
  private httpClient: HTTPClient;

  constructor() {
    this.httpClient = new HTTPClient();
  }

  public async submitOnboarding(
    request: IOnboardingRequest
  ): Promise<IResponseDto> {
    try {
      return await this.httpClient.post<IOnboardingRequest, IResponseDto>(
        "onboardings",
        request
      );
    } catch (error) {
      throw error;
    }
  }

  public async checkOnboardingStatus(): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>("onboardings/check");
    } catch (error) {
      throw error;
    }
  }
}

export const onboardingService = new OnboardingService();
