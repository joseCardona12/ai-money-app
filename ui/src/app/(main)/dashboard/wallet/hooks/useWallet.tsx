"use client";
import { useState } from "react";
import {
  WALLET_STATS,
  ACCOUNTS_DATA,
  RECENT_ACTIVITY_DATA,
} from "../utils/constants/walletData";
import { IAccount, IRecentActivity, IWalletStats } from "../types/wallet";
import { IAccountRequest } from "@/interfaces/accountRequest";
import {
  ACCOUNT_TYPES,
  ACCOUNT_COLORS,
} from "../utils/constants/accountFormSchema";

export interface IModalState {
  isOpen: boolean;
  mode: "add" | "edit";
  selectedAccount?: IAccount;
}

export interface IWalletData {
  stats: IWalletStats;
  accounts: IAccount[];
  recentActivity: IRecentActivity[];
  accountTypes: typeof ACCOUNT_TYPES;
  accountColors: typeof ACCOUNT_COLORS;
  modal: IModalState;
}

export interface IWalletActions {
  handleAddAccount: () => void;
  handleAccountClick: (accountId: number) => void;
  handleActivityClick: (activityId: number) => void;
  handleViewAccountDetails: (accountId: number) => void;
  handleEditAccount: (accountId: number) => void;
  handleSetPrimaryAccount: (accountId: number) => void;
  handleDeleteAccount: (accountId: number) => void;
  openAddModal: () => void;
  openEditModal: (account: IAccount) => void;
  closeModal: () => void;
  handleModalSubmit: (data: IAccountRequest) => void;
}

export interface IUseWallet extends IWalletData, IWalletActions {}

export default function useWallet(): IUseWallet {
  const [modal, setModal] = useState<IModalState>({
    isOpen: false,
    mode: "add",
    selectedAccount: undefined,
  });

  const handleAddAccount = () => {
    openAddModal();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAccountClick = (_accountId: number) => {
    // TODO: Implement account click handler
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleActivityClick = (_activityId: number) => {
    // TODO: Implement activity click handler
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleViewAccountDetails = (_accountId: number) => {
    // TODO: Implement view account details handler
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditAccount = (_accountId: number) => {
    // TODO: Implement edit account handler
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSetPrimaryAccount = (_accountId: number) => {
    // TODO: Implement set primary account handler
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeleteAccount = (_accountId: number) => {
    // TODO: Implement delete account handler
  };

  const openAddModal = () => {
    setModal({
      isOpen: true,
      mode: "add",
      selectedAccount: undefined,
    });
  };

  const openEditModal = (account: IAccount) => {
    setModal({
      isOpen: true,
      mode: "edit",
      selectedAccount: account,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      mode: "add",
      selectedAccount: undefined,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleModalSubmit = (_data: IAccountRequest) => {
    // TODO: Implement account submission logic
    closeModal();
  };

  return {
    // Data
    stats: WALLET_STATS,
    accounts: ACCOUNTS_DATA,
    recentActivity: RECENT_ACTIVITY_DATA,
    accountTypes: ACCOUNT_TYPES,
    accountColors: ACCOUNT_COLORS,
    modal,

    // Actions
    handleAddAccount,
    handleAccountClick,
    handleActivityClick,
    handleViewAccountDetails,
    handleEditAccount,
    handleSetPrimaryAccount,
    handleDeleteAccount,
    openAddModal,
    openEditModal,
    closeModal,
    handleModalSubmit,
  };
}
