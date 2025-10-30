"use client";
import WalletStatsCard from "./WalletStatsCard";
import AccountsSection from "./AccountsSection";
import RecentActivitySection from "./RecentActivitySection";
import AddAccountModal from "./AccountModals/AddAccountModal";
import Button from "@/ui/components/Button";
import { IconPlus } from "@tabler/icons-react";
import { IUseWallet } from "../hooks/useWallet";

interface WalletContentProps {
  walletData: IUseWallet;
}

export default function WalletContent({
  walletData,
}: WalletContentProps): React.ReactNode {
  return (
    <div className="p-6 space-y-6">
      {/* Header with title and Add Account button */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-black)" }}
          >
            Wallet
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-gray)" }}
          >
            Manage your accounts and view balances
          </p>
        </div>
        <Button
          variant="primary"
          onClick={walletData.handleAddAccount}
          className="flex items-center gap-2"
        >
          <IconPlus size={16} />
          Add Account
        </Button>
      </div>

      <WalletStatsCard stats={walletData.stats} />

      <AccountsSection
        accounts={walletData.accounts}
        onAccountClick={walletData.handleAccountClick}
        onViewAccountDetails={walletData.handleViewAccountDetails}
        onEditAccount={walletData.handleEditAccount}
        onSetPrimaryAccount={walletData.handleSetPrimaryAccount}
        onDeleteAccount={walletData.handleDeleteAccount}
      />

      <RecentActivitySection
        activities={walletData.recentActivity}
        onActivityClick={walletData.handleActivityClick}
      />

      {/* Add Account Modal */}
      <AddAccountModal
        isOpen={walletData.modal.isOpen}
        onClose={walletData.closeModal}
        mode={walletData.modal.mode}
        account={walletData.modal.selectedAccount}
        onSubmit={walletData.handleModalSubmit}
        accountTypes={walletData.accountTypes}
        accountColors={walletData.accountColors}
      />
    </div>
  );
}
