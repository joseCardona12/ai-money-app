import { IResponseDto } from "@/interfaces/responseDto";

export interface ITokenRefreshService {
  refreshToken(): Promise<IResponseDto>;
  isTokenExpired(token: string): boolean;
  getTokenExpirationTime(token: string): number | null;
}

class TokenRefreshService implements ITokenRefreshService {
  private baseUrl: string = "http://localhost:3001/api";

  /**
   * Decode JWT token and check if it's expired
   */
  public isTokenExpired(token: string): boolean {
    try {
      const expirationTime = this.getTokenExpirationTime(token);
      if (!expirationTime) return true;

      const bufferTime = 60 * 1000;
      return Date.now() >= expirationTime - bufferTime;
    } catch (_error) {
      return true;
    }
  }

  /**
   * Get token expiration time in milliseconds
   */
  public getTokenExpirationTime(token: string): number | null {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return null;

      // Decode the payload (second part)
      const payload = JSON.parse(atob(parts[1]));

      // JWT exp is in seconds, convert to milliseconds
      if (payload.exp) {
        return payload.exp * 1000;
      }
      return null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  /**
   * Refresh the JWT token
   */
  public async refreshToken(): Promise<IResponseDto> {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const headers: Record<string, string> = {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        headers,
      });

      const data: IResponseDto = await response.json();

      if (data.status < 400 && data.data?.token) {
        // Save new token to localStorage
        localStorage.setItem("token", data.data.token);

        // Dispatch custom event to notify other components
        window.dispatchEvent(
          new CustomEvent("token-refreshed", {
            detail: { token: data.data.token },
          })
        );

        return data;
      }

      throw new Error(data.message || "Failed to refresh token");
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";

      throw error;
    }
  }
}

export const tokenRefreshService = new TokenRefreshService();
