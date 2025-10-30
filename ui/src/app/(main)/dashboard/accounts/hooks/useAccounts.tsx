"use client";
import { useState, useEffect } from "react";
import { accountService, IAccount } from "@/services/account";
import { toast } from "sonner";

type IAccountUI = IAccount;

export interface IUseAccounts {
  accounts: IAccountUI[];
  isLoading: boolean;
  currentPage: number;
  totalItems: number;

  // Modal states
  isDetailsModalOpen: boolean;
  isAddAccountModalOpen: boolean;
  isEditAccountModalOpen: boolean;
  isDeleteAccountModalOpen: boolean;
  isImageViewerOpen: boolean;

  // Selected data
  selectedAccount: IAccountUI | null;
  editingAccount: IAccountUI | null;
  accountToDelete: IAccountUI | null;
  viewerImageUrl: string;

  // Loading states
  isCreatingAccount: boolean;
  isUpdatingAccount: boolean;
  isDeletingAccount: boolean;

  // Handlers
  handlePageChange: (page: number) => void;
  handleAccountClick: (accountId: number) => void;
  handleViewDetails: (accountId: number) => void;
  handleCloseDetailsModal: () => void;
  handleOpenAddAccountModal: () => void;
  handleCloseAddAccountModal: () => void;
  handleOpenEditAccountModal: (accountId: number) => void;
  handleCloseEditAccountModal: () => void;
  handleOpenDeleteAccountModal: (accountId: number) => void;
  handleCloseDeleteAccountModal: () => void;
  handleCreateAccount: (data: Partial<IAccount>) => Promise<void>;
  handleUpdateAccount: (data: Partial<IAccount>) => Promise<void>;
  handleConfirmDeleteAccount: () => Promise<void>;
  handleViewImage: (imageUrl: string) => void;
  handleCloseImageViewer: () => void;
}

export default function useAccounts(): IUseAccounts {
  const [accounts, setAccounts] = useState<IAccountUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Modal states
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  // Selected data
  const [selectedAccount, setSelectedAccount] = useState<IAccountUI | null>(
    null
  );
  const [editingAccount, setEditingAccount] = useState<IAccountUI | null>(null);
  const [accountToDelete, setAccountToDelete] = useState<IAccountUI | null>(
    null
  );
  const [viewerImageUrl, setViewerImageUrl] = useState("");

  // Loading states
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isUpdatingAccount, setIsUpdatingAccount] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  // Load accounts on mount
  useEffect(() => {
    loadAccounts();
  }, [currentPage]);

  const loadAccounts = async () => {
    try {
      setIsLoading(true);
      const response = await accountService.getAllAccounts();
      const accounts = Array.isArray(response.data) ? response.data : [];
      setAccounts(accounts as IAccountUI[]);
      setTotalItems(accounts.length);
    } catch (error) {
      toast.error("Failed to load accounts");
      console.error(error);
      setAccounts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAccountClick = (accountId: number) => {
    const account = accounts.find((a) => a.id === accountId);
    if (account) {
      setSelectedAccount(account);
    }
  };

  const handleViewDetails = (accountId: number) => {
    const account = accounts.find((a) => a.id === accountId);
    if (account) {
      setSelectedAccount(account);
      setIsDetailsModalOpen(true);
    }
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedAccount(null);
  };

  const handleOpenAddAccountModal = () => {
    setIsAddAccountModalOpen(true);
  };

  const handleCloseAddAccountModal = () => {
    setIsAddAccountModalOpen(false);
  };

  const handleOpenEditAccountModal = (accountId: number) => {
    const account = accounts.find((a) => a.id === accountId);
    if (account) {
      setEditingAccount(account);
      setIsEditAccountModalOpen(true);
    }
  };

  const handleCloseEditAccountModal = () => {
    setIsEditAccountModalOpen(false);
    setEditingAccount(null);
  };

  const handleOpenDeleteAccountModal = (accountId: number) => {
    const account = accounts.find((a) => a.id === accountId);
    if (account) {
      setAccountToDelete(account);
      setIsDeleteAccountModalOpen(true);
    }
  };

  const handleCloseDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(false);
    setAccountToDelete(null);
  };

  const handleCreateAccount = async (data: Partial<IAccount>) => {
    try {
      setIsCreatingAccount(true);
      await accountService.createAccount(data as IAccount);
      toast.success("Account created successfully");
      handleCloseAddAccountModal();
      await loadAccounts();
    } catch (error) {
      toast.error("Failed to create account");
      console.error(error);
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const handleUpdateAccount = async (data: Partial<IAccount>) => {
    try {
      if (!editingAccount) return;
      setIsUpdatingAccount(true);
      await accountService.updateAccount(editingAccount.id, data);
      toast.success("Account updated successfully");
      handleCloseEditAccountModal();
      await loadAccounts();
    } catch (error) {
      toast.error("Failed to update account");
      console.error(error);
    } finally {
      setIsUpdatingAccount(false);
    }
  };

  const handleConfirmDeleteAccount = async () => {
    try {
      if (!accountToDelete) return;
      setIsDeletingAccount(true);
      await accountService.deleteAccount(accountToDelete.id);
      toast.success("Account deleted successfully");
      handleCloseDeleteAccountModal();
      await loadAccounts();
    } catch (error) {
      toast.error("Failed to delete account");
      console.error(error);
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const handleViewImage = (imageUrl: string) => {
    setViewerImageUrl(imageUrl);
    setIsImageViewerOpen(true);
  };

  const handleCloseImageViewer = () => {
    setIsImageViewerOpen(false);
    setViewerImageUrl("");
  };

  return {
    accounts,
    isLoading,
    currentPage,
    totalItems,
    isDetailsModalOpen,
    isAddAccountModalOpen,
    isEditAccountModalOpen,
    isDeleteAccountModalOpen,
    isImageViewerOpen,
    selectedAccount,
    editingAccount,
    accountToDelete,
    viewerImageUrl,
    isCreatingAccount,
    isUpdatingAccount,
    isDeletingAccount,
    handlePageChange,
    handleAccountClick,
    handleViewDetails,
    handleCloseDetailsModal,
    handleOpenAddAccountModal,
    handleCloseAddAccountModal,
    handleOpenEditAccountModal,
    handleCloseEditAccountModal,
    handleOpenDeleteAccountModal,
    handleCloseDeleteAccountModal,
    handleCreateAccount,
    handleUpdateAccount,
    handleConfirmDeleteAccount,
    handleViewImage,
    handleCloseImageViewer,
  };
}
