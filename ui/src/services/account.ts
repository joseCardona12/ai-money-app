import { HTTPClient } from "@/utils/httpClient";
import { IResponseDto } from "@/interfaces/responseDto";

export interface IAccount {
  id: number;
  name: string;
  account_type_id: number;
  balance: string | number;
  created_at: string;
  currency_id: number;
  user_id: number;
  accountType?: {
    id: number;
    name: string;
  };
  currency?: {
    id: number;
    name: string;
  };
}

export interface IAccountService {
  getAllAccounts(): Promise<IResponseDto>;
  getAccountsByUserId(userId: number): Promise<IResponseDto>;
  getAccountById(accountId: number): Promise<IResponseDto>;
  createAccount(account: IAccount): Promise<IResponseDto>;
  updateAccount(
    accountId: number,
    account: Partial<IAccount>
  ): Promise<IResponseDto>;
  deleteAccount(accountId: number): Promise<IResponseDto>;
}

class AccountService implements IAccountService {
  private httpClient: HTTPClient;

  constructor() {
    this.httpClient = new HTTPClient();
  }

  /**
   * Get all accounts
   */
  public async getAllAccounts(): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>("accounts");
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get accounts by user ID
   */
  public async getAccountsByUserId(userId: number): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(`accounts/user/${userId}`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get account by ID
   */
  public async getAccountById(accountId: number): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(`accounts/${accountId}`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new account
   */
  public async createAccount(account: IAccount): Promise<IResponseDto> {
    try {
      return await this.httpClient.post<IAccount, IResponseDto>(
        "accounts",
        account
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update account
   */
  public async updateAccount(
    accountId: number,
    account: Partial<IAccount>
  ): Promise<IResponseDto> {
    try {
      return await this.httpClient.put<Partial<IAccount>, IResponseDto>(
        `accounts/${accountId}`,
        account
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete account
   */
  public async deleteAccount(accountId: number): Promise<IResponseDto> {
    try {
      throw new Error("DELETE method not implemented in HTTPClient");
    } catch (error) {
      throw error;
    }
  }
}

export const accountService = new AccountService();
