export interface ITransactionRequest {
  type: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
  state: string;
  account: string;
}
