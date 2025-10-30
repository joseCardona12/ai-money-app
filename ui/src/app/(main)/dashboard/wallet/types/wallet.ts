export interface IAccount {
  id: number;
  name: string;
  type: "checking" | "savings" | "credit" | "cash";
  bank: string;
  balance: number;
  accountNumber: string;
  color: string;
  icon: string;
}

export interface IRecentActivity {
  id: number;
  name: string;
  account: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  icon: string;
  color: string;
}

export interface IWalletStats {
  totalNetWorth: number;
  changePercentage: number;
  changeText: string;
  positive: boolean;
}

export interface IAccountOption {
  id: string;
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}
