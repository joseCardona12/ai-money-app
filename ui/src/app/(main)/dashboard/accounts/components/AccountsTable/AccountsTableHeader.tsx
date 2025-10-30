export default function AccountsTableHeader(): React.ReactNode {
  return (
    <div className="px-8 py-4 border-b border-[var(--color-gray-border)] bg-[var(--color-gray-light)]">
      <div className="grid grid-cols-7 gap-8 text-sm font-medium text-[var(--color-text-gray)]">
        <div>Account Name</div>
        <div>Account Type</div>
        <div>Account Number</div>
        <div>Balance</div>
        <div>Currency</div>
        <div>Created Date</div>
        <div className="text-right">Actions</div>
      </div>
    </div>
  );
}
