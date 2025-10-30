export interface ITransaction {
  id: number;
  description: string;
  amount: number;
  date: Date;
  created_at: Date;
  transaction_type_id: number;
  state_id: number;
  user_id: number;
  account_id: number;
  category_id: number;
  // Relations (optional)
  category?: {
    id: number;
    name: string;
  };
  transactionType?: {
    id: number;
    name: string;
  };
  state?: {
    id: number;
    name: string;
  };
}

export interface ICreateTransactionRequest {
  description: string;
  amount: number;
  date: Date;
  transaction_type_id: number;
  state_id: number;
  account_id: number;
  category_id: number;
}

export interface IUpdateTransactionRequest {
  description?: string;
  amount?: number;
  date?: Date;
  transaction_type_id?: number;
  state_id?: number;
  account_id?: number;
  category_id?: number;
}
