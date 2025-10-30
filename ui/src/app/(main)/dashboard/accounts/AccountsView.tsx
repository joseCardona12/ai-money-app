"use client";
import AccountsContent from "./components/AccountsContent";
import useAccounts from "./hooks/useAccounts";

export default function AccountsView(): React.ReactNode {
  const accountsData = useAccounts();

  return (
    <div className="p-6 space-y-6">
      <AccountsContent accountsData={accountsData} />
    </div>
  );
}
