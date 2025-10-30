import {
  IconDots,
  IconEye,
  IconEdit,
  IconDownload,
  IconTrash,
} from "@tabler/icons-react";
import { TRANSACTIONS_DATA } from "../../utils/constants/dashboardData";
import IconButton from "@/ui/components/IconButton";
import TransactionOptionsMenu from "@/ui/components/TransactionOptionsMenu";
import { ITransactionOption } from "@/interfaces/transactionOption";
import { useState } from "react";

interface RecentTransactionBodyProps {
  transactions: typeof TRANSACTIONS_DATA;
  onTransactionClick: (transactionId: number) => void;
  onEditTransaction?: (transactionId: number) => void;
  onDeleteTransaction?: (transactionId: number) => void;
  onViewDetails?: (transactionId: number) => void;
  onDownloadReceipt?: (transactionId: number) => void;
}
export default function RecentTransactionBody({
  transactions,
  onTransactionClick,
  onEditTransaction,
  onDeleteTransaction,
  onViewDetails,
  onDownloadReceipt,
}: RecentTransactionBodyProps): React.ReactNode {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const getTransactionOptions = (
    transactionId: number
  ): ITransactionOption[] => [
    {
      id: "view",
      text: "View Details",
      icon: <IconEye size={16} />,
      onClick: () => onViewDetails?.(transactionId),
    },
    {
      id: "edit",
      text: "Edit Transaction",
      icon: <IconEdit size={16} />,
      onClick: () => onEditTransaction?.(transactionId),
    },
    {
      id: "download",
      text: "Download Receipt",
      icon: <IconDownload size={16} />,
      onClick: () => onDownloadReceipt?.(transactionId),
    },
    {
      id: "delete",
      text: "Delete",
      icon: <IconTrash size={16} />,
      onClick: () => onDeleteTransaction?.(transactionId),
      variant: "danger" as const,
    },
  ];
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between border border-[var(--color-gray-border)] p-2 rounded-lg cursor-pointer"
          style={{ backgroundColor: "var(--color-gray-2)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${transaction.color}20` }}
            >
              <span className="text-lg">{transaction.icon}</span>
            </div>
            <div>
              <p
                className="font-medium text-sm"
                style={{ color: "var(--color-text-black)" }}
              >
                {transaction.name}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--color-text-gray)" }}
              >
                {transaction.date}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span
              className="font-semibold text-sm"
              style={{ color: "var(--color-text-black)" }}
            >
              {transaction.amount}
            </span>
            <div className="relative">
              <IconButton
                icon={IconDots}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(
                    openMenuId === transaction.id ? null : transaction.id
                  );
                }}
                variant="ghost"
                size="sm"
              />

              <TransactionOptionsMenu
                isOpen={openMenuId === transaction.id}
                onClose={() => setOpenMenuId(null)}
                options={getTransactionOptions(transaction.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
