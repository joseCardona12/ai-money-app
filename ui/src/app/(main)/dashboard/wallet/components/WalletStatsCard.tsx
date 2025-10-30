"use client";
import { IWalletStats } from "../types/wallet";

interface WalletStatsCardProps {
  stats: IWalletStats;
}

export default function WalletStatsCard({ 
  stats 
}: WalletStatsCardProps): React.ReactNode {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="bg-[var(--color-gray-2)] rounded-xl p-6 border border-[var(--color-gray-border)]">
      <div className="space-y-2">
        <h3 
          className="text-sm font-medium"
          style={{ color: "var(--color-text-gray)" }}
        >
          Total Net Worth
        </h3>
        
        <div className="flex items-end gap-4">
          <h2 
            className="text-3xl font-bold"
            style={{ color: "var(--color-text-black)" }}
          >
            {formatCurrency(stats.totalNetWorth)}
          </h2>
          
          <div className="flex items-center gap-1 mb-1">
            <span 
              className={`text-sm font-medium ${
                stats.positive ? 'text-[var(--color-green)]' : 'text-[var(--color-red)]'
              }`}
            >
              {stats.positive ? '+' : ''}{stats.changePercentage}%
            </span>
            <span 
              className="text-sm"
              style={{ color: "var(--color-text-gray)" }}
            >
              {stats.changeText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
