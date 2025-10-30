import { HTTPClient } from "@/utils/httpClient";
import { IResponseDto } from "@/interfaces/responseDto";

export interface ITransactionType {
  id: number;
  name: string;
  description?: string;
}

export interface ITransactionTypeService {
  getAllTransactionTypes(): Promise<IResponseDto>;
  getTransactionTypeById(typeId: number): Promise<IResponseDto>;
}

class TransactionTypeService implements ITransactionTypeService {
  private httpClient: HTTPClient;

  constructor() {
    this.httpClient = new HTTPClient();
  }

  /**
   * Get all transaction types
   */
  public async getAllTransactionTypes(): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>("transaction-types");
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get transaction type by ID
   */
  public async getTransactionTypeById(typeId: number): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(
        `transaction-types/${typeId}`
      );
    } catch (error) {
      throw error;
    }
  }
}

export const transactionTypeService = new TransactionTypeService();
