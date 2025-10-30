export interface IAccount {
  id: number;
  user_id: number;
  account_name: string;
  account_type: string;
  account_number: string;
  balance: number;
  currency: string;
  bank_name: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface IAccountUI extends IAccount {
  // UI-specific properties can be added here
}

export interface ICreateAccountRequest {
  account_name: string;
  account_type: string;
  account_number: string;
  balance: number;
  currency: string;
  bank_name: string;
  is_primary?: boolean;
}

export interface IUpdateAccountRequest {
  account_name?: string;
  account_type?: string;
  account_number?: string;
  balance?: number;
  currency?: string;
  bank_name?: string;
  is_primary?: boolean;
}

export interface IAccountStats {
  totalAccounts: number;
  totalBalance: number;
  primaryAccount: IAccount | null;
  accountsByType: Record<string, number>;
}

