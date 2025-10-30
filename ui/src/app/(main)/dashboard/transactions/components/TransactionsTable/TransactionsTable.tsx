"use client";
import TransactionsTableHeader from "./TransactionsTableHeader";
import TransactionsTableBody from "./TransactionsTableBody";
import TransactionsTableFooter from "./TransactionsTableFooter";
import TransactionsTableSkeleton from "./TransactionsTableSkeleton";
import { ITransaction } from "../../types/transaction";

interface ITransactionsTableProps {
  transactions: ITransaction[];
  onTransactionClick: (transactionId: number) => void;
  currentPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onEditTransaction?: (transaction: ITransaction) => void;
  onDeleteTransaction?: (transactionId: number) => void;
  onViewDetails?: (transaction: ITransaction) => void;
  onDownloadReceipt?: (transactionId: number) => void;
  isLoading?: boolean;
}

export default function TransactionsTable({
  transactions,
  onTransactionClick,
  currentPage = 1,
  itemsPerPage = 10,
  totalItems,
  onPageChange,
  onEditTransaction,
  onDeleteTransaction,
  onViewDetails,
  onDownloadReceipt,
  isLoading = false,
}: ITransactionsTableProps): React.ReactNode {
  const calculatedTotalItems = totalItems || transactions.length;

  // Show skeleton while loading
  if (isLoading) {
    return <TransactionsTableSkeleton />;
  }

  return (
    <div className="rounded-xl border border-[var(--color-gray-border)] bg-white overflow-hidden">
      <TransactionsTableHeader />
      <TransactionsTableBody
        transactions={transactions}
        onTransactionClick={onTransactionClick}
        onEditTransaction={onEditTransaction}
        onDeleteTransaction={onDeleteTransaction}
        onViewDetails={onViewDetails}
        onDownloadReceipt={onDownloadReceipt}
      />
      <TransactionsTableFooter
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={calculatedTotalItems}
        onPageChange={onPageChange}
      />
    </div>
  );
}

