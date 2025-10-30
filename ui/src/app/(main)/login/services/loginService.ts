import { ILoginRequest } from "@/interfaces/login";
import { IResponseDto } from "@/interfaces/responseDto";
import { HTTPClient } from "@/utils/httpClient";

export interface ILoginService {
  login(request: ILoginRequest): Promise<IResponseDto>;
}
export class LoginService implements ILoginService {
  private httpClient: HTTPClient;
  constructor() {
    this.httpClient = new HTTPClient();
  }
  public async login(request: ILoginRequest): Promise<IResponseDto> {
    try {
      return await this.httpClient.post<ILoginRequest, IResponseDto>(
        "auth/login",
        request
      );
    } catch (error) {
      throw error;
    }
  }
}

export const loginService = new LoginService();
