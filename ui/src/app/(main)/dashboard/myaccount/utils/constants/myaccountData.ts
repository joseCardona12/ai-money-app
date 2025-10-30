import {
  IPersonalInformation,
  IAccountStatistics,
  IRecentActivity,
  IConnectedAccount,
  IProfilePicture,
} from "../../types/myaccount";

export const DEFAULT_PROFILE_PICTURE: IProfilePicture = {
  url: "https://via.placeholder.com/150",
  initials: "JC",
};

export const DEFAULT_PERSONAL_INFORMATION: IPersonalInformation = {
  fullName: "Jose Cardona",
  email: "jose@gmail.com",
  phoneNumber: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Financial enthusiast focused on building wealth and achieving financial freedom.",
};

export const DEFAULT_ACCOUNT_STATISTICS: IAccountStatistics = {
  totalTransactions: 0.0,
  totalTransactionsChange: 0.0,
  activeGoals: 0,
  activeGoalsCompleted: 0,
  savingsRate: 0.0,
  savingsRateChange: 0.0,
  memberSince: "Jan 2023",
};

export const DEFAULT_RECENT_ACTIVITY: IRecentActivity[] = [
  {
    id: "1",
    title: "Added transaction",
    description: "Grocery shopping - $65.50",
    timestamp: "2 hours ago",
  },
];

export const DEFAULT_CONNECTED_ACCOUNTS: IConnectedAccount[] = [
  {
    id: "1",
    name: "Chase Checking Account",
    type: "Bank Account",
    connectedDate: "Jan 15, 2024",
  },
];
