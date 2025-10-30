"use client";
import AccountsTable from "./AccountsTable/AccountsTable";
import AccountDetailsModal from "./AccountModals/AccountDetailsModal";
import AddAccountModal from "./AccountModals/AddAccountModal";
import EditAccountModal from "./AccountModals/EditAccountModal";
import DeleteAccountModal from "./AccountModals/DeleteAccountModal";
import AccountsSummary from "./AccountsSummary";
import Button from "@/ui/components/Button";
import { IconPlus } from "@tabler/icons-react";
import { IUseAccounts } from "../hooks/useAccounts";

interface IAccountsContentProps {
  accountsData: IUseAccounts;
}

export default function AccountsContent({
  accountsData,
}: IAccountsContentProps): React.ReactNode {
  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-black)]">
            Accounts Management
          </h2>
          <p className="text-sm text-[var(--color-text-gray)] mt-1">
            Manage and view all your bank accounts
          </p>
        </div>
        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={accountsData.handleOpenAddAccountModal}
        >
          <IconPlus className="w-5 h-5" />
          Add Account
        </Button>
      </div>

      {/* Accounts Summary */}
      <AccountsSummary
        accounts={accountsData.accounts}
        isLoading={accountsData.isLoading}
      />

      {/* Accounts Table */}
      <AccountsTable
        accounts={accountsData.accounts}
        onAccountClick={accountsData.handleAccountClick}
        currentPage={accountsData.currentPage}
        itemsPerPage={10}
        totalItems={accountsData.totalItems}
        onPageChange={accountsData.handlePageChange}
        onEditAccount={accountsData.handleOpenEditAccountModal}
        onDeleteAccount={accountsData.handleOpenDeleteAccountModal}
        onViewDetails={accountsData.handleViewDetails}
        isLoading={accountsData.isLoading}
      />

      {/* Account Details Modal */}
      <AccountDetailsModal
        isOpen={accountsData.isDetailsModalOpen}
        onClose={accountsData.handleCloseDetailsModal}
        account={accountsData.selectedAccount}
      />

      {/* Add Account Modal */}
      <AddAccountModal
        isOpen={accountsData.isAddAccountModalOpen}
        onClose={accountsData.handleCloseAddAccountModal}
        onSubmit={accountsData.handleCreateAccount}
        isLoading={accountsData.isCreatingAccount}
      />

      {/* Edit Account Modal */}
      <EditAccountModal
        isOpen={accountsData.isEditAccountModalOpen}
        onClose={accountsData.handleCloseEditAccountModal}
        onSubmit={accountsData.handleUpdateAccount}
        isLoading={accountsData.isUpdatingAccount}
        account={accountsData.editingAccount}
      />

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={accountsData.isDeleteAccountModalOpen}
        onClose={accountsData.handleCloseDeleteAccountModal}
        onConfirm={accountsData.handleConfirmDeleteAccount}
        isLoading={accountsData.isDeletingAccount}
        account={accountsData.accountToDelete}
      />
    </div>
  );
}
