import { IResetPasswordResponseDto } from "@/interfaces/dto/auth";

/**
 * Authentication utilities specific to password reset functionality
 * Handles response validation and error processing
 */
export class ResetPasswordAuthUtils {
  /**
   * Verifies if the password reset was successful
   * @param response - The response from the reset password API
   * @returns true if the reset was successful, false otherwise
   */
  static isResetPasswordSuccessful(response: IResetPasswordResponseDto): boolean {
    return response.status === 200;
  }

  /**
   * Gets the error message from a failed reset password response
   * @param response - The response from the reset password API
   * @returns The error message to display to the user
   */
  static getErrorMessage(response: IResetPasswordResponseDto): string {
    return response.message || "An unexpected error occurred. Please try again.";
  }

  /**
   * Gets the success message from a successful reset password response
   * @param response - The response from the reset password API
   * @returns The success message to display to the user
   */
  static getSuccessMessage(response: IResetPasswordResponseDto): string {
    return response.message || "Password reset successfully. You will be redirected to the dashboard.";
  }

  /**
   * Extracts the reset token from the URL
   * @param url - The current URL containing the token parameter
   * @returns The token if found, null otherwise
   */
  static extractTokenFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get("token");
    } catch (error) {
      console.error("Error extracting token from URL:", error);
      return null;
    }
  }
}
