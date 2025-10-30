"use client";
import Modal from "@/ui/components/Modal";
import { IAccount } from "@/services/account";

type IAccountUI = IAccount;

interface IAccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: IAccountUI | null;
}

export default function AccountDetailsModal({
  isOpen,
  onClose,
  account,
}: IAccountDetailsModalProps): React.ReactNode {
  if (!account) return null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Account Details" size="lg">
      <div className="p-6 space-y-6">
        {/* Account Header */}
        <div>
          <h3 className="text-xl font-bold text-[var(--color-text-black)]">
            {account.name}
          </h3>
          <p className="text-sm text-[var(--color-text-gray)] mt-1">
            {account.accountType?.name || "Unknown"} Account
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Account Type */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-gray)] uppercase">
              Account Type
            </label>
            <p className="text-sm text-[var(--color-text-black)] mt-1">
              {account.accountType?.name || "Unknown"}
            </p>
          </div>

          {/* Account Number */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-gray)] uppercase">
              Account Number
            </label>
            <p className="text-sm text-[var(--color-text-black)] mt-1">
              {account.account_number}
            </p>
          </div>

          {/* Balance */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-gray)] uppercase">
              Balance
            </label>
            <p className="text-lg font-bold text-[var(--color-text-black)] mt-1">
              {account.currency?.name || "USD"}{" "}
              {Number(account.balance).toLocaleString()}
            </p>
          </div>

          {/* Currency */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-gray)] uppercase">
              Currency
            </label>
            <p className="text-sm text-[var(--color-text-black)] mt-1">
              {account.currency?.name || "USD"}
            </p>
          </div>

          {/* Created Date */}
          <div className="col-span-2">
            <label className="text-xs font-medium text-[var(--color-text-gray)] uppercase">
              Created Date
            </label>
            <p className="text-sm text-[var(--color-text-black)] mt-1">
              {formatDate(account.created_at)}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
