export interface IProfilePicture {
  url: string;
  initials: string;
}

export interface IPersonalInformation {
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  bio: string;
  profile_picture?: string;
}

export interface IAccountStatistics {
  totalTransactions: number;
  totalTransactionsChange: number;
  activeGoals: number;
  activeGoalsCompleted: number;
  savingsRate: number;
  savingsRateChange: number;
  memberSince: string;
}

export interface IRecentActivity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon?: string;
}

export interface IConnectedAccount {
  id: string;
  name: string;
  type: string;
  connectedDate: string;
}

export interface IUseMyAccount {
  // State
  profilePicture: IProfilePicture;
  personalInformation: IPersonalInformation;
  accountStatistics: IAccountStatistics;
  recentActivity: IRecentActivity[];
  connectedAccounts: IConnectedAccount[];
  isLoading: boolean;
  isSaving: boolean;
  PLAN: string;

  saveProfile: () => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<void>;
  disconnectAccount: (accountId: string) => Promise<void>;
}

export interface IMyAccountContentProps {
  myAccountData: IUseMyAccount;
}
