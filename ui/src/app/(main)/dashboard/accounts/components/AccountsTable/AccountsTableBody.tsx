"use client";
import { useState } from "react";
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";
import { IconDotsVertical } from "../../../../../../../public/icons";
import { IAccount } from "@/services/account";
import IconButton from "@/ui/components/IconButton";

type IAccountUI = IAccount;

interface IAccountsTableBodyProps {
  accounts: IAccountUI[];
  onAccountClick?: (accountId: number) => void;
  onEditAccount?: (accountId: number) => void;
  onDeleteAccount?: (accountId: number) => void;
  onViewDetails?: (accountId: number) => void;
  isLoading: boolean;
}

export default function AccountsTableBody({
  accounts,
  onAccountClick,
  onEditAccount,
  onDeleteAccount,
  onViewDetails,
  isLoading,
}: IAccountsTableBodyProps): React.ReactNode {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const handleMenuClick = (e: React.MouseEvent, accountId: number) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === accountId ? null : accountId);
  };

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
    setOpenMenuId(null);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px] space-y-2 p-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px] p-8 text-center">
          <p className="text-[var(--color-text-gray)]">No accounts found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1000px] divide-y divide-[var(--color-gray-border)]">
        {accounts.map((account) => (
          <div
            key={account.id}
            onClick={() => onAccountClick?.(account.id)}
            className="px-8 py-4 hover:bg-[var(--color-gray-light)] cursor-pointer transition-colors duration-200 relative border-b border-[var(--color-gray-border)]"
          >
            <div className="grid grid-cols-7 gap-8 items-center w-full">
              {/* Account Name */}
              <div className="text-sm font-medium text-[var(--color-text-black)] truncate">
                {account.name}
              </div>

              {/* Account Type */}
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {account.accountType?.name || "Unknown"}
                </span>
              </div>

              {/* Account Number */}
              <div className="text-sm text-gray-500 truncate">
                {account.account_number}
              </div>

              {/* Balance */}
              <div className="text-sm font-semibold text-[var(--color-text-black)]">
                {Number(account.balance).toLocaleString()}
              </div>

              {/* Currency */}
              <div className="text-sm text-gray-500">
                {account.currency?.name || "USD"}
              </div>

              {/* Created Date */}
              <div className="text-sm text-gray-500">
                {formatDate(account.created_at)}
              </div>

              {/* Actions */}
              <div className="flex justify-end relative">
                <IconButton
                  icon={IconDotsVertical}
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleMenuClick(e, account.id)}
                />
                {openMenuId === account.id && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-[var(--color-gray-border)] rounded-lg shadow-lg z-10 min-w-[150px]">
                    <button
                      onClick={(e) =>
                        handleAction(e, () => onViewDetails?.(account.id))
                      }
                      className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-gray-light)] flex items-center gap-2 border-b"
                    >
                      <IconEye className="w-4 h-4" /> View
                    </button>
                    <button
                      onClick={(e) =>
                        handleAction(e, () => onEditAccount?.(account.id))
                      }
                      className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-gray-light)] flex items-center gap-2 border-b"
                    >
                      <IconEdit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={(e) =>
                        handleAction(e, () => onDeleteAccount?.(account.id))
                      }
                      className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                    >
                      <IconTrash className="w-4 h-4" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
