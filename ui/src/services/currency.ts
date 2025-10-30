import { IResponseDtoArray } from "@/interfaces/responseDto";
import { HTTPClient } from "@/utils/httpClient";

export interface ICurrencyService {
  getAllCurrencies(): Promise<IResponseDtoArray>;
}
class CurrencyService implements ICurrencyService {
  private httpClient: HTTPClient;
  constructor() {
    this.httpClient = new HTTPClient();
  }
  public async getAllCurrencies(): Promise<IResponseDtoArray> {
    try {
      return await this.httpClient.get<IResponseDtoArray>("currencies");
    } catch (error: any) {
      throw error;
    }
  }
}

export const currencyService = new CurrencyService();
