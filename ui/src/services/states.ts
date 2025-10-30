import { IResponseDto } from "@/interfaces/responseDto";
import { HTTPClient } from "@/utils/httpClient";

interface IStatesService {
  getStates(): Promise<IResponseDto>;
}
class StatesService implements IStatesService {
  private httpClient: HTTPClient;
  constructor() {
    this.httpClient = new HTTPClient();
  }

  public async getStates(): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>("states");
    } catch (error) {
      throw error;
    }
  }
}

export const statesService = new StatesService();
