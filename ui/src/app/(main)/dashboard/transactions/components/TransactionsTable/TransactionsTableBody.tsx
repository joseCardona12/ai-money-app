"use client";
import { useState } from "react";
import {
  IconEye,
  IconEdit,
  IconDownload,
  IconTrash,
} from "@tabler/icons-react";
import { IconDotsVertical } from "../../../../../../../public/icons";
import { STATUS_COLORS } from "../../utils/constants/transactionsData";
import { ITransaction } from "../../types/transaction";
import Budget from "@/ui/components/Budget";
import { formatDate } from "../../utils/functions/formatDate";
import { formatAmount } from "../../utils/functions/formatAmount";
import TransactionOptionsMenu from "@/ui/components/TransactionOptionsMenu";
import { ITransactionOption } from "@/interfaces/transactionOption";
import IconButton from "@/ui/components/IconButton";

interface ITransactionsTableBodyProps {
  transactions: ITransaction[];
  onTransactionClick: (transactionId: number) => void;
  onEditTransaction?: (transaction: ITransaction) => void;
  onDeleteTransaction?: (transactionId: number) => void;
  onViewDetails?: (transaction: ITransaction) => void;
  onDownloadReceipt?: (transaction: ITransaction) => void;
}

export default function TransactionsTableBody({
  transactions,
  onTransactionClick,
  onEditTransaction,
  onDeleteTransaction,
  onViewDetails,
  onDownloadReceipt,
}: ITransactionsTableBodyProps): React.ReactNode {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const getTransactionOptions = (
    transaction: ITransaction
  ): ITransactionOption[] => [
    {
      id: "view",
      text: "View Details",
      icon: <IconEye size={16} />,
      onClick: () => onViewDetails?.(transaction),
    },
    {
      id: "edit",
      text: "Edit Transaction",
      icon: <IconEdit size={16} />,
      onClick: () => onEditTransaction?.(transaction),
    },
    {
      id: "download",
      text: "Download Receipt",
      icon: <IconDownload size={16} />,
      onClick: () => onDownloadReceipt?.(transaction),
    },
    {
      id: "delete",
      text: "Delete",
      icon: <IconTrash size={16} />,
      onClick: () => onDeleteTransaction?.(transaction.id),
      variant: "danger" as const,
    },
  ];
  return (
    <>
      <div className="divide-y divide-[var(--color-gray-border)]">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="px-6 py-4 hover:bg-[var(--color-gray-light)] cursor-pointer transition-colors duration-200"
            onClick={() => onTransactionClick(transaction.id)}
          >
            <div className="grid grid-cols-5 gap-4 items-center">
              {/* Transaction Info */}
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${transaction.color}20` }}
                >
                  {transaction.icon}
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text-black)]">
                    {transaction.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-gray)]">
                    {transaction.description}
                  </p>
                </div>
              </div>

              {/* Category */}
              <div>
                <Budget text={transaction.category} />
              </div>

              {/* Date */}
              <div>
                <p className="text-sm text-[var(--color-text-black)] font-medium">
                  {formatDate(transaction.date)}
                </p>
                <p className="text-xs text-[var(--color-text-gray)]">
                  {transaction.time}
                </p>
              </div>

              {/* Status */}
              <div>
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: STATUS_COLORS[transaction.status].bg,
                    color: STATUS_COLORS[transaction.status].text,
                  }}
                >
                  {STATUS_COLORS[transaction.status].label}
                </span>
              </div>

              {/* Amount */}
              <div className="text-right flex items-center justify-end space-x-2 gap-2">
                <div className="flex flex-col gap-1">
                  <span
                    className={`font-semibold ${
                      transaction.type === "income"
                        ? "text-[var(--color-green)]"
                        : "text-[var(--color-text-black)]"
                    }`}
                  >
                    {formatAmount(transaction.amount, transaction.type)}
                  </span>
                  <span className="text-xs text-[var(--color-text-gray)]">
                    {transaction.type}
                  </span>
                </div>

                {/* Options Menu */}
                <div className="relative">
                  <IconButton
                    icon={IconDotsVertical}
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(
                        openMenuId === transaction.id ? null : transaction.id
                      );
                    }}
                  />

                  <TransactionOptionsMenu
                    isOpen={openMenuId === transaction.id}
                    onClose={() => setOpenMenuId(null)}
                    options={getTransactionOptions(transaction)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {transactions.length === 0 && (
        <div className="px-6 py-16 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[var(--color-gray-light)] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[var(--color-text-gray)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-[var(--color-text-black)]">
                No transactions yet
              </p>
              <p className="text-sm text-[var(--color-text-gray)] mt-1">
                Start by creating your first transaction
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
