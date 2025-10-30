"use client";
import { IConnectedAccount } from "../../types/myaccount";
import Button from "@/ui/components/Button";
import { IconTrash, IconPlus } from "@tabler/icons-react";

interface ConnectedAccountsProps {
  connectedAccounts: IConnectedAccount[];
  onDisconnect: (accountId: string) => Promise<void>;
  isLoading: boolean;
}

export default function ConnectedAccounts({
  connectedAccounts,
  onDisconnect,
  isLoading,
}: ConnectedAccountsProps): React.ReactNode {
  return (
    <div className="bg-white rounded-xl border border-[var(--color-gray-border)] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Connected Accounts
          </h3>
          <p className="text-sm text-[var(--color-text-gray)]">
            Manage your linked financial accounts
          </p>
        </div>
        <Button variant="primary" className="text-sm flex items-center gap-2">
          <IconPlus className="w-4 h-4" />
          Add Account
        </Button>
      </div>

      {connectedAccounts.length > 0 ? (
        <div className="space-y-3">
          {connectedAccounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between p-4 rounded-lg border border-[var(--color-gray-border)] hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {account.name}
                </p>
                <p className="text-xs text-[var(--color-text-gray)]">
                  {account.type} • Connected {account.connectedDate}
                </p>
              </div>

              <button
                onClick={() => onDisconnect(account.id)}
                disabled={isLoading}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <IconTrash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-[var(--color-text-gray)] mb-4">
            No connected accounts yet
          </p>
          <Button variant="primary" className="text-sm">
            Connect Your First Account
          </Button>
        </div>
      )}
    </div>
  );
}

