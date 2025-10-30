import { tokenRefreshService } from "@/services/tokenRefresh";

export class HTTPClient {
  private baseUrl: string = "http://localhost:3001/api";
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<void> | null = null;

  constructor(clientBaseUrl?: string) {
    this.baseUrl = clientBaseUrl ?? this.baseUrl;
  }

  private getHeaders(token?: string | null) {
    const headers: Record<string, string> = {
      "Content-type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  /**
   * Check if token is expired and refresh if needed
   */
  private async ensureValidToken(): Promise<void> {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    // If token is expired, refresh it
    if (tokenRefreshService.isTokenExpired(token)) {
      // If already refreshing, wait for it to complete
      if (this.isRefreshing && this.refreshPromise) {
        return this.refreshPromise;
      }

      this.isRefreshing = true;
      this.refreshPromise = tokenRefreshService
        .refreshToken()
        .then(() => {
          this.isRefreshing = false;
          this.refreshPromise = null;
        })
        .catch(() => {
          this.isRefreshing = false;
          this.refreshPromise = null;
        });

      return this.refreshPromise;
    }
  }

  async get<T>(url: string): Promise<T> {
    await this.ensureValidToken();

    const token = localStorage.getItem("token");
    const headers = this.getHeaders(token);
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers,
      method: "GET",
    });
    return await response.json();
  }

  async post<B, T>(url: string, body: B): Promise<T> {
    await this.ensureValidToken();

    const token = localStorage.getItem("token");
    const headers = this.getHeaders(token);
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  async put<B, T>(url: string, body: B): Promise<T> {
    await this.ensureValidToken();

    const token = localStorage.getItem("token");
    const headers = this.getHeaders(token);
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers,
      method: "PUT",
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  async patch<B, T>(url: string, body: B): Promise<T> {
    await this.ensureValidToken();

    const token = localStorage.getItem("token");
    const headers = this.getHeaders(token);
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers,
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  async delete<T>(url: string): Promise<T> {
    await this.ensureValidToken();

    const token = localStorage.getItem("token");
    const headers = this.getHeaders(token);
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers,
      method: "DELETE",
    });
    return await response.json();
  }
}
