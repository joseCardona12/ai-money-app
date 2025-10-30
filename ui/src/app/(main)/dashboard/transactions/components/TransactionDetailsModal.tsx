"use client";
import Modal from "@/ui/components/Modal";
import Button from "@/ui/components/Button";
import Budget from "@/ui/components/Budget";
import { ITransaction } from "../types/transaction";
import { STATUS_COLORS } from "../utils/constants/transactionsData";
import { formatDate } from "../utils/functions/formatDate";
import { formatAmount } from "../utils/functions/formatAmount";
import { IconEdit, IconDownload, IconTrash } from "@tabler/icons-react";

interface ITransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: ITransaction;
  onEdit?: (transaction: ITransaction) => void;
  onDelete?: (transactionId: number) => void;
  onDownloadReceipt?: (transaction: ITransaction) => void;
}

export default function TransactionDetailsModal({
  isOpen,
  onClose,
  transaction,
  onEdit,
  onDelete,
  onDownloadReceipt,
}: ITransactionDetailsModalProps): React.ReactNode {
  if (!transaction) return null;

  const handleEdit = () => {
    // Close details modal first, then open edit modal
    onClose();
    // Use setTimeout to ensure the details modal closes before opening edit modal
    setTimeout(() => {
      onEdit?.(transaction);
    }, 100);
  };

  const handleDelete = () => {
    onDelete?.(transaction.id);
  };

  const handleDownload = () => {
    onDownloadReceipt?.(transaction);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Details"
      size="md"
    >
      <div className="p-6">
        {/* Transaction Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${transaction.color}20` }}
          >
            {transaction.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-[var(--color-text-black)] mb-1">
              {transaction.name}
            </h3>
            <p className="text-sm text-[var(--color-text-gray)]">
              {transaction.description}
            </p>
          </div>
          <div className="text-right">
            <div
              className={`text-2xl font-bold mb-1 ${
                transaction.type === "income"
                  ? "text-[var(--color-green)]"
                  : "text-[var(--color-text-black)]"
              }`}
            >
              {formatAmount(transaction.amount, transaction.type)}
            </div>
            <span className="text-sm text-[var(--color-text-gray)] capitalize">
              {transaction.type}
            </span>
          </div>
        </div>

        {/* Transaction Details Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-gray)] mb-2">
              Category
            </label>
            <Budget text={transaction.category} />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-gray)] mb-2">
              Status
            </label>
            <span
              className="inline-flex px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: STATUS_COLORS[transaction.status].bg,
                color: STATUS_COLORS[transaction.status].text,
              }}
            >
              {STATUS_COLORS[transaction.status].label}
            </span>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-gray)] mb-2">
              Date
            </label>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-black)]">
                {formatDate(transaction.date)}
              </p>
              <p className="text-xs text-[var(--color-text-gray)]">
                {transaction.time}
              </p>
            </div>
          </div>

          {/* Transaction ID */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-gray)] mb-2">
              Transaction ID
            </label>
            <p className="text-sm font-mono text-[var(--color-text-black)]">
              #{transaction.id.toString().padStart(6, "0")}
            </p>
          </div>
        </div>

        {/* Additional Information */}
        {transaction.description && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--color-text-gray)] mb-2">
              Description
            </label>
            <div className="p-3 bg-[var(--color-gray-light)] rounded-lg">
              <p className="text-sm text-[var(--color-text-black)]">
                {transaction.description}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-gray-border)]">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={handleDownload}
                className="flex items-center space-x-2"
              >
                <IconDownload size={16} />
                <span>Download Receipt</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleEdit}
                className="flex items-center space-x-2"
              >
                <IconEdit size={16} />
                <span>Edit</span>
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={handleDelete}
              className="flex items-center space-x-2 text-red-600 hover:bg-red-50"
            >
              <IconTrash size={16} />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
