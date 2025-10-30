import { IResponseDto } from "@/interfaces/responseDto";
import {
  ITransaction,
  ICreateTransactionRequest,
  IUpdateTransactionRequest,
} from "@/interfaces/transaction";
import { HTTPClient } from "@/utils/httpClient";

export interface IMonthlyStatsComparison {
  currentMonth: {
    totalAmount: number;
    totalIncome: number;
    totalExpenses: number;
    balance: number;
  };
  lastMonth: {
    totalAmount: number;
    totalIncome: number;
    totalExpenses: number;
    balance: number;
  } | null;
  changes: {
    totalAmountChange: string | null;
    totalIncomeChange: string | null;
    totalExpensesChange: string | null;
    totalAmountChangePositive: boolean;
    totalIncomeChangePositive: boolean;
    totalExpensesChangePositive: boolean;
  };
}

export interface ITransactionService {
  getTransactionsByUserId(userId: number): Promise<IResponseDto>;
  getTransactionById(
    transactionId: number,
    userId: number
  ): Promise<IResponseDto>;
  createTransaction(
    transaction: ICreateTransactionRequest,
    userId: number
  ): Promise<IResponseDto>;
  updateTransaction(
    transactionId: number,
    userId: number,
    transaction: IUpdateTransactionRequest
  ): Promise<IResponseDto>;
  deleteTransaction(
    transactionId: number,
    userId: number
  ): Promise<IResponseDto>;
  getMonthlyStatsComparison(userId: number): Promise<IResponseDto>;
}

class TransactionService implements ITransactionService {
  private httpClient: HTTPClient;

  constructor() {
    this.httpClient = new HTTPClient();
  }

  public async getTransactionsByUserId(
    userId: number,
    page: number = 1,
    limit: number = 40,
    filters?: {
      search?: string;
      category?: string;
      type?: string;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<IResponseDto> {
    try {
      let url = `transactions/user/${userId}?page=${page}&limit=${limit}`;

      if (filters?.search) {
        url += `&search=${encodeURIComponent(filters.search)}`;
      }
      if (filters?.category && filters.category !== "all") {
        url += `&category=${encodeURIComponent(filters.category)}`;
      }
      if (filters?.type && filters.type !== "all") {
        url += `&type=${encodeURIComponent(filters.type)}`;
      }
      if (filters?.startDate) {
        url += `&startDate=${filters.startDate}`;
      }
      if (filters?.endDate) {
        url += `&endDate=${filters.endDate}`;
      }

      return await this.httpClient.get<IResponseDto>(url);
    } catch (error) {
      throw error;
    }
  }

  public async getTransactionById(
    transactionId: number,
    userId: number
  ): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(
        `transactions/${transactionId}/user/${userId}`
      );
    } catch (error) {
      throw error;
    }
  }

  public async createTransaction(
    transaction: ICreateTransactionRequest,
    userId: number
  ): Promise<IResponseDto> {
    try {
      return await this.httpClient.post<
        ICreateTransactionRequest,
        IResponseDto
      >(`transactions/user/${userId}`, transaction);
    } catch (error) {
      throw error;
    }
  }

  public async updateTransaction(
    transactionId: number,
    userId: number,
    transaction: IUpdateTransactionRequest
  ): Promise<IResponseDto> {
    try {
      return await this.httpClient.put<IUpdateTransactionRequest, IResponseDto>(
        `transactions/${transactionId}/user/${userId}`,
        transaction
      );
    } catch (error) {
      throw error;
    }
  }

  public async deleteTransaction(
    transactionId: number,
    userId: number
  ): Promise<IResponseDto> {
    try {
      return await this.httpClient.delete<IResponseDto>(
        `transactions/${transactionId}/user/${userId}`
      );
    } catch (error) {
      throw error;
    }
  }

  public async getMonthlyStatsComparison(
    userId: number
  ): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(
        `transactions/user/${userId}/monthly-stats`
      );
    } catch (error) {
      throw error;
    }
  }
}

export const transactionService = new TransactionService();
