import { ILoginRequestDto, ILoginResponseDto } from "@/interfaces/dto/auth";
import { HTTPClient } from "@/utils/httpClient";

class OAuthService {
  private httpClient: HTTPClient;
  constructor() {
    this.httpClient = new HTTPClient();
  }
  public login = async (
    request: ILoginRequestDto
  ): Promise<ILoginResponseDto> => {
    return await this.httpClient.post<ILoginResponseDto, ILoginRequestDto>(
      "auth/login",
      request
    );
  };
}

export const oauthService = new OAuthService();
