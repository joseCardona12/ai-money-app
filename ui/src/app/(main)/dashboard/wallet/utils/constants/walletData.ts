import { IAccount, IRecentActivity, IWalletStats } from "../../types/wallet";

export const WALLET_STATS: IWalletStats = {
  totalNetWorth: 36699.50,
  changePercentage: 12.8,
  changeText: "vs last month",
  positive: true,
};

export const ACCOUNTS_DATA: IAccount[] = [
  {
    id: 1,
    name: "Main Checking",
    type: "checking",
    bank: "Chase Bank",
    balance: 12500.00,
    accountNumber: "****4532",
    color: "var(--color-blue)",
    icon: "🏦",
  },
  {
    id: 2,
    name: "Savings Account",
    type: "savings",
    bank: "Bank of America",
    balance: 25000.00,
    accountNumber: "****7821",
    color: "var(--color-green)",
    icon: "💰",
  },
  {
    id: 3,
    name: "Credit Card",
    type: "credit",
    bank: "American Express",
    balance: -1250.50,
    accountNumber: "****0543",
    color: "var(--color-purple)",
    icon: "💳",
  },
  {
    id: 4,
    name: "Cash",
    type: "cash",
    bank: "Physical",
    balance: 450.00,
    accountNumber: "N/A",
    color: "var(--color-orange)",
    icon: "💵",
  },
];

export const RECENT_ACTIVITY_DATA: IRecentActivity[] = [
  {
    id: 1,
    name: "Salary Deposit",
    account: "Main Checking",
    amount: 5000.00,
    type: "income",
    date: "2024-01-15",
    icon: "💰",
    color: "var(--color-green)",
  },
  {
    id: 2,
    name: "Rent Payment",
    account: "Main Checking",
    amount: 2000.00,
    type: "expense",
    date: "2024-01-14",
    icon: "🏠",
    color: "var(--color-blue)",
  },
  {
    id: 3,
    name: "Interest",
    account: "Savings Account",
    amount: 125.00,
    type: "income",
    date: "2024-01-13",
    icon: "📈",
    color: "var(--color-green)",
  },
  {
    id: 4,
    name: "Amazon Purchase",
    account: "Credit Card",
    amount: 89.99,
    type: "expense",
    date: "2024-01-12",
    icon: "📦",
    color: "var(--color-purple)",
  },
];
