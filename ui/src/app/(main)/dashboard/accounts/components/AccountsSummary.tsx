"use client";
import { IAccount } from "@/services/account";
import {
  IconWallet,
  IconCreditCard,
  IconPigMoney,
  IconTrendingUp,
} from "@tabler/icons-react";

interface IAccountsSummaryProps {
  accounts: IAccount[];
  isLoading?: boolean;
}

export default function AccountsSummary({
  accounts,
  isLoading = false,
}: IAccountsSummaryProps): React.ReactNode {
  // Calculate summary data
  const totalAccounts = accounts.length;
  const totalBalance = accounts.reduce(
    (sum, account) => sum + Number(account.balance),
    0
  );

  // Account types distribution
  const checkingAccounts = accounts.filter(
    (a) => a.account_type_id === 1
  ).length;
  const savingsAccounts = accounts.filter(
    (a) => a.account_type_id === 2
  ).length;
  const moneyMarketAccounts = accounts.filter(
    (a) => a.account_type_id === 3
  ).length;
  const creditCardAccounts = accounts.filter(
    (a) => a.account_type_id === 4
  ).length;

  // Currency distribution
  const usdAccounts = accounts.filter((a) => a.currency_id === 1).length;
  const eurAccounts = accounts.filter((a) => a.currency_id === 2).length;
  const gbpAccounts = accounts.filter((a) => a.currency_id === 3).length;
  const copAccounts = accounts.filter((a) => a.currency_id === 4).length;

  // Get primary currency for balance display
  const primaryCurrency = accounts.length > 0 ? accounts[0].currency?.name || "USD" : "USD";

  const SummaryCard = ({
    title,
    value,
    icon: Icon,
    color,
    subtitle,
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    subtitle?: string;
  }) => (
    <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--color-text-gray)] mb-1">{title}</p>
          <p className="text-2xl font-bold text-[var(--color-text-black)]">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-[var(--color-text-gray)] mt-2">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Accounts"
          value={totalAccounts}
          icon={IconWallet}
          color="bg-blue-500"
          subtitle={`${totalAccounts} account${totalAccounts !== 1 ? "s" : ""}`}
        />
        <SummaryCard
          title="Total Balance"
          value={`${primaryCurrency} ${totalBalance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          icon={IconTrendingUp}
          color="bg-green-500"
          subtitle="Across all accounts"
        />
        <SummaryCard
          title="Checking Accounts"
          value={checkingAccounts}
          icon={IconCreditCard}
          color="bg-purple-500"
          subtitle={`${checkingAccounts} account${checkingAccounts !== 1 ? "s" : ""}`}
        />
        <SummaryCard
          title="Savings Accounts"
          value={savingsAccounts}
          icon={IconPigMoney}
          color="bg-orange-500"
          subtitle={`${savingsAccounts} account${savingsAccounts !== 1 ? "s" : ""}`}
        />
      </div>

      {/* Account Types Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white">
          <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-4">
            Account Types
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">
                Checking
              </span>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {checkingAccounts}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">
                Savings
              </span>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {savingsAccounts}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">
                Money Market
              </span>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {moneyMarketAccounts}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">
                Credit Card
              </span>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {creditCardAccounts}
              </span>
            </div>
          </div>
        </div>

        {/* Currency Distribution */}
        <div className="p-6 rounded-xl border border-[var(--color-gray-border)] bg-white">
          <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-4">
            Currencies
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">USD</span>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {usdAccounts}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">EUR</span>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {eurAccounts}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">GBP</span>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {gbpAccounts}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--color-text-gray)]">COP</span>
              <span className="text-sm font-semibold text-[var(--color-text-black)]">
                {copAccounts}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

