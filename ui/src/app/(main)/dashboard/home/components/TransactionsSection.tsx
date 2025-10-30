"use client";
import { TRANSACTIONS_DATA } from "../utils/constants/dashboardData";
import RecentTransactionHeader from "./RecentTransaction/RecentTransactionHeader";
import RecentTransactionBody from "./RecentTransaction/RecentTransactionBody";

interface TransactionsSectionProps {
  transactions: typeof TRANSACTIONS_DATA;
  onTransactionClick: (transactionId: number) => void;
  onEditTransaction?: (transactionId: number) => void;
  onDeleteTransaction?: (transactionId: number) => void;
  onViewDetails?: (transactionId: number) => void;
  onDownloadReceipt?: (transactionId: number) => void;
}

export default function TransactionsSection({
  transactions,
  onTransactionClick,
  onEditTransaction,
  onDeleteTransaction,
  onViewDetails,
  onDownloadReceipt,
}: TransactionsSectionProps): React.ReactNode {
  return (
    <div
      className="p-6 rounded-xl border h-full border-[var(--color-gray-border)]"
      style={{ backgroundColor: "var(--color-white)" }}
    >
      <RecentTransactionHeader
        options={[
          { value: "recent", label: "Recent" },
          { value: "thisYear", label: "This year" },
          { value: "lastYear", label: "Last year" },
        ]}
        value="recent"
        onChange={() => {}}
      />
      <RecentTransactionBody
        transactions={transactions}
        onTransactionClick={onTransactionClick}
        onEditTransaction={onEditTransaction}
        onDeleteTransaction={onDeleteTransaction}
        onViewDetails={onViewDetails}
        onDownloadReceipt={onDownloadReceipt}
      />
    </div>
  );
}
