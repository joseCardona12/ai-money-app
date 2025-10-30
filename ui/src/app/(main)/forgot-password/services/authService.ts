import { HTTPClient } from "@/utils/httpClient";
import { IForgotPasswordRequestDto, IForgotPasswordResponseDto } from "@/interfaces/dto/auth";

/**
 * Authentication service for forgot password functionality
 * Handles API communication for password reset requests
 */
export class ForgotPasswordAuthService {
  private httpClient: HTTPClient;

  constructor() {
    this.httpClient = new HTTPClient();
  }

  /**
   * Sends a password reset request to the backend
   * @param request - The forgot password request containing email
   * @returns Promise with the response from the backend
   */
  public async requestPasswordReset(request: IForgotPasswordRequestDto): Promise<IForgotPasswordResponseDto> {
    return await this.httpClient.post<IForgotPasswordResponseDto, IForgotPasswordRequestDto>(
      "auth/forgot-password",
      request
    );
  }
}
