export default function TransactionsTableHeader(): React.ReactNode {
  return (
    <div className="px-6 py-4 border-b border-[var(--color-gray-border)] bg-[var(--color-gray-light)]">
      <div className="grid grid-cols-5 gap-4 text-sm font-medium text-[var(--color-text-gray)]">
        <div>Transaction</div>
        <div>Category</div>
        <div>Date</div>
        <div>Status</div>
        <div className="text-right">Amount</div>
      </div>
    </div>
  );
}

