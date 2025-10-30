import { HTTPClient } from "@/utils/httpClient";
import { IResetPasswordRequestDto, IResetPasswordResponseDto } from "@/interfaces/dto/auth";

/**
 * Authentication service for password reset functionality
 * Handles API communication for completing password reset
 */
export class ResetPasswordAuthService {
  private httpClient: HTTPClient;

  constructor() {
    this.httpClient = new HTTPClient();
  }

  /**
   * Completes the password reset process
   * @param request - The reset password request containing token and new password
   * @returns Promise with the response from the backend
   */
  public async resetPassword(request: IResetPasswordRequestDto): Promise<IResetPasswordResponseDto> {
    return await this.httpClient.post<IResetPasswordResponseDto, IResetPasswordRequestDto>(
      "auth/reset-password",
      request
    );
  }
}
