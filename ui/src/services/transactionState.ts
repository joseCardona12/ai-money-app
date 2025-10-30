import { HTTPClient } from "@/utils/httpClient";
import { IResponseDto } from "@/interfaces/responseDto";

export interface ITransactionState {
  id: number;
  name: string;
  description?: string;
}

export interface ITransactionStateService {
  getAllTransactionStates(): Promise<IResponseDto>;
  getTransactionStateById(stateId: number): Promise<IResponseDto>;
}

class TransactionStateService implements ITransactionStateService {
  private httpClient: HTTPClient;

  constructor() {
    this.httpClient = new HTTPClient();
  }

  /**
   * Get all transaction states
   */
  public async getAllTransactionStates(): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>("transaction-states");
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get transaction state by ID
   */
  public async getTransactionStateById(stateId: number): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(
        `transaction-states/${stateId}`
      );
    } catch (error) {
      throw error;
    }
  }
}

export const transactionStateService = new TransactionStateService();
