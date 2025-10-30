export default function UsersTableHeader(): React.ReactNode {
  return (
    <div className="px-8 py-4 border-b border-[var(--color-gray-border)] bg-[var(--color-gray-light)]">
      <div className="grid grid-cols-8 gap-8 text-sm font-medium text-[var(--color-text-gray)]">
        <div>User</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Join Date</div>
        <div>Role</div>
        <div>Plan</div>
        <div>Provider</div>
        <div className="text-right">Actions</div>
      </div>
    </div>
  );
}
