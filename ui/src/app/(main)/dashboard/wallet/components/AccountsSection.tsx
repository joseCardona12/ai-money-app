"use client";
import { useState } from "react";
import { IAccount, IAccountOption } from "../types/wallet";
import { IconEye, IconEdit, IconStar, IconTrash } from "@tabler/icons-react";
import { IconDotsVertical } from "../../../../../../public/icons";
import IconButton from "@/ui/components/IconButton";
import TransactionOptionsMenu from "@/ui/components/TransactionOptionsMenu";

interface AccountsSectionProps {
  accounts: IAccount[];
  onAccountClick: (accountId: number) => void;
  onViewAccountDetails: (accountId: number) => void;
  onEditAccount: (accountId: number) => void;
  onSetPrimaryAccount: (accountId: number) => void;
  onDeleteAccount: (accountId: number) => void;
}

export default function AccountsSection({
  accounts,
  onAccountClick,
  onViewAccountDetails,
  onEditAccount,
  onSetPrimaryAccount,
  onDeleteAccount,
}: AccountsSectionProps): React.ReactNode {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
  };

  const getAccountTypeLabel = (type: string): string => {
    switch (type) {
      case "checking":
        return "Checking";
      case "savings":
        return "Savings";
      case "credit":
        return "Credit Card";
      case "cash":
        return "Cash";
      default:
        return type;
    }
  };

  const getAccountOptions = (account: IAccount): IAccountOption[] => [
    {
      id: "view",
      text: "View Details",
      icon: <IconEye size={16} />,
      onClick: () => onViewAccountDetails(account.id),
    },
    {
      id: "edit",
      text: "Edit Account",
      icon: <IconEdit size={16} />,
      onClick: () => onEditAccount(account.id),
    },
    {
      id: "primary",
      text: "Set as Primary",
      icon: <IconStar size={16} />,
      onClick: () => onSetPrimaryAccount(account.id),
    },
    {
      id: "delete",
      text: "Delete Account",
      icon: <IconTrash size={16} />,
      onClick: () => onDeleteAccount(account.id),
      variant: "danger" as const,
    },
  ];

  return (
    <div className="space-y-4">
      <h2
        className="text-xl font-semibold"
        style={{ color: "var(--color-text-black)" }}
      >
        Your Accounts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="bg-white rounded-xl border border-[var(--color-gray-border)] hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onAccountClick(account.id)}
          >
            {/* Color bar at top */}
            <div
              className="h-1"
              style={{ backgroundColor: account.color }}
            ></div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                    style={{
                      backgroundColor: account.color + "20",
                      color: account.color,
                    }}
                  >
                    {account.icon}
                  </div>
                  <div>
                    <h3
                      className="font-medium text-sm"
                      style={{ color: "var(--color-text-black)" }}
                    >
                      {account.name}
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-text-gray)" }}
                    >
                      {account.bank}
                    </p>
                  </div>
                </div>
                <div className="relative z-50">
                  <IconButton
                    icon={IconDotsVertical}
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(
                        openMenuId === account.id ? null : account.id
                      );
                    }}
                  />

                  {openMenuId === account.id && (
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setOpenMenuId(null)}
                    />
                  )}

                  <TransactionOptionsMenu
                    isOpen={openMenuId === account.id}
                    onClose={() => setOpenMenuId(null)}
                    options={getAccountOptions(account)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className="text-2xl font-bold"
                    style={{
                      color:
                        account.balance < 0
                          ? "var(--color-red)"
                          : "var(--color-text-black)",
                    }}
                  >
                    {account.balance < 0 ? "-" : ""}
                    {formatCurrency(account.balance)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-gray)" }}
                  >
                    {getAccountTypeLabel(account.type)}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-gray)" }}
                  >
                    {account.accountNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
