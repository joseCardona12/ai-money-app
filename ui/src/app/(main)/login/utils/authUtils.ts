import { ILoginResponseDto } from "@/interfaces/dto/auth";

/**
 * Authentication utilities specific to the login module
 */

export class LoginAuthUtils {
  private static readonly TOKEN_KEY = "authToken";
  private static readonly USER_KEY = "user";
  private static readonly REMEMBER_KEY = "rememberMe";

  /**
   * Saves the authentication token
   */
  static setToken(token: string, remember: boolean = false): void {
    if (remember) {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.REMEMBER_KEY, "true");
    } else {
      sessionStorage.setItem(this.TOKEN_KEY, token);
      localStorage.removeItem(this.REMEMBER_KEY);
    }
  }

  /**
   * Saves the user data
   */
  static setUser(user: any, remember: boolean = false): void {
    const userData = JSON.stringify(user);

    if (remember) {
      localStorage.setItem(this.USER_KEY, userData);
    } else {
      sessionStorage.setItem(this.USER_KEY, userData);
    }
  }

  /**
   * Clears all authentication data
   */
  static clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.REMEMBER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  /**
   * Verifies if the login was successful based on the response
   */
  static isLoginSuccessful(response: ILoginResponseDto): boolean {
    return response.status === 200 && !!response.data;
  }

  /**
   * Processes the successful login response
   */
  static processSuccessfulLogin(
    response: ILoginResponseDto,
    remember: boolean
  ): void {
    if (response.data?.token) {
      this.setToken(response.data.token, remember);
    }

    if (response.data?.user) {
      this.setUser(response.data.user, remember);
    }
  }

  /**
   * Gets the error message from the response
   */
  static getErrorMessage(response: ILoginResponseDto): string {
    return response.message || "Invalid credentials";
  }
}
