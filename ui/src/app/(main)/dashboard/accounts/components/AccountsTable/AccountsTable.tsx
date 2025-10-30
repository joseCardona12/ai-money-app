"use client";
import AccountsTableHeader from "./AccountsTableHeader";
import AccountsTableBody from "./AccountsTableBody";
import AccountsTableFooter from "./AccountsTableFooter";
import AccountsTableSkeleton from "./AccountsTableSkeleton";
import { IAccount } from "@/services/account";

type IAccountUI = IAccount;

interface IAccountsTableProps {
  accounts: IAccountUI[];
  onAccountClick?: (accountId: number) => void;
  onEditAccount?: (accountId: number) => void;
  onDeleteAccount?: (accountId: number) => void;
  onViewDetails?: (accountId: number) => void;
  currentPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

export default function AccountsTable({
  accounts,
  onAccountClick,
  onEditAccount,
  onDeleteAccount,
  onViewDetails,
  currentPage = 1,
  itemsPerPage = 10,
  totalItems,
  onPageChange,
  isLoading = false,
}: IAccountsTableProps): React.ReactNode {
  const calculatedTotalItems = totalItems || accounts.length;

  // Show skeleton while loading
  if (isLoading) {
    return <AccountsTableSkeleton />;
  }

  return (
    <div className="rounded-xl border border-[var(--color-gray-border)] bg-white overflow-hidden">
      <AccountsTableHeader />
      <AccountsTableBody
        accounts={accounts}
        onAccountClick={onAccountClick}
        onEditAccount={onEditAccount}
        onDeleteAccount={onDeleteAccount}
        onViewDetails={onViewDetails}
        isLoading={isLoading}
      />
      <AccountsTableFooter
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={calculatedTotalItems}
        onPageChange={onPageChange}
      />
    </div>
  );
}
