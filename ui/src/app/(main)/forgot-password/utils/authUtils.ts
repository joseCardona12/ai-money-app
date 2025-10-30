import { IForgotPasswordResponseDto } from "@/interfaces/dto/auth";

/**
 * Authentication utilities specific to forgot password functionality
 * Handles response validation and error processing
 */
export class ForgotPasswordAuthUtils {
  /**
   * Verifies if the forgot password request was successful
   * @param response - The response from the forgot password API
   * @returns true if the request was successful, false otherwise
   */
  static isForgotPasswordSuccessful(response: IForgotPasswordResponseDto): boolean {
    return response.status === 200;
  }

  /**
   * Gets the error message from a failed forgot password response
   * @param response - The response from the forgot password API
   * @returns The error message to display to the user
   */
  static getErrorMessage(response: IForgotPasswordResponseDto): string {
    return response.message || "An unexpected error occurred. Please try again.";
  }

  /**
   * Gets the success message from a successful forgot password response
   * @param response - The response from the forgot password API
   * @returns The success message to display to the user
   */
  static getSuccessMessage(response: IForgotPasswordResponseDto): string {
    return response.message || "Password reset email sent successfully. Please check your email.";
  }
}
