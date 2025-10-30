"use client";
import StatsCards from "./StatsCards";
import ChartSection from "./ChartDashboard/ChartSection";
import TransactionsSection from "./TransactionsSection";
import AlertsSection from "./AlertsSection";
import QuickActionsSection from "./QuickActionsSection";
import { IUseDashboard } from "../hooks/useDashboard";
import TitleContent from "@/ui/components/TitleContent";
import TransactionDetailsModal from "../../transactions/components/TransactionDetailsModal";

interface DashboardContentProps {
  dashboardData: IUseDashboard;
}

export default function DashboardContent({
  dashboardData,
}: DashboardContentProps): React.ReactNode {
  return (
    <div className="p-6 space-y-6">
      <TitleContent
        title="Dashboard"
        description="Summary of your financial activity"
      />
      <StatsCards statsCards={dashboardData.statsCards} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartSection
            chartData={dashboardData.chartData}
            selectedTimeframe={dashboardData.selectedTimeframe}
            setSelectedTimeframe={dashboardData.setSelectedTimeframe}
          />
        </div>
        <div>
          <TransactionsSection
            transactions={dashboardData.transactions}
            onTransactionClick={dashboardData.handleTransactionClick}
            onEditTransaction={dashboardData.handleEditTransaction}
            onDeleteTransaction={dashboardData.handleDeleteTransaction}
            onViewDetails={dashboardData.handleViewDetails}
            onDownloadReceipt={dashboardData.handleDownloadReceipt}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsSection alerts={dashboardData.alerts} />
        <QuickActionsSection
          quickActions={dashboardData.quickActions}
          onQuickAction={dashboardData.handleQuickAction}
        />
      </div>

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={dashboardData.detailsModal.isOpen}
        onClose={dashboardData.closeDetailsModal}
        transaction={dashboardData.detailsModal.selectedTransaction}
        onEdit={(transaction) =>
          dashboardData.handleEditTransaction(transaction.id)
        }
        onDelete={dashboardData.handleDeleteTransaction}
        onDownloadReceipt={dashboardData.handleDownloadReceipt}
      />
    </div>
  );
}
