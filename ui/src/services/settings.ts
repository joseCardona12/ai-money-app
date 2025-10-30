import { IResponseDto } from "@/interfaces/responseDto";
import { HTTPClient } from "@/utils/httpClient";

export interface ISettings {
  region?: string;
  timezone?: string;
  notification_enabled?: number;
  plan_id?: number;
  security_level_id?: number;
  currency_id?: number;
  language_id?: number;
  user_id: number;
}

export interface ISettingsService {
  createSettings(settings: ISettings): Promise<IResponseDto>;
  getSettingByUserId(userId: number): Promise<IResponseDto>;
}

class SettingsService implements ISettingsService {
  private httpClient: HTTPClient;

  constructor() {
    this.httpClient = new HTTPClient();
  }

  public async createSettings(settings: ISettings): Promise<IResponseDto> {
    try {
      return await this.httpClient.post<ISettings, IResponseDto>(
        "settings",
        settings
      );
    } catch (error) {
      throw error;
    }
  }

  public async getSettingByUserId(userId: number): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(`settings/user/${userId}`);
    } catch (error) {
      throw error;
    }
  }
}

export const settingsService = new SettingsService();
