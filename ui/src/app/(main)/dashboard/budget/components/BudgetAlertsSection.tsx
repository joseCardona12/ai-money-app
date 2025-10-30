"use client";
import { IBudgetAlert } from "../types/budget";
import { IconAlertTriangle } from "@tabler/icons-react";

interface BudgetAlertsSectionProps {
  alerts: IBudgetAlert[];
}

export default function BudgetAlertsSection({
  alerts,
}: BudgetAlertsSectionProps): React.ReactNode {
  if (alerts.length === 0) return null;

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <IconAlertTriangle className="text-orange-600" size={20} />
        <h3 className="font-semibold text-orange-900">Budget Alerts</h3>
      </div>

      <p className="text-sm text-orange-800 mb-3">
        You&apos;ve exceeded your budget in {alerts.length} categories:
      </p>

      <div className="space-y-2">
        {alerts.map((alert) => (
          <div key={alert.id} className="text-sm text-red-600 font-medium">
            {alert.message}
          </div>
        ))}
      </div>
    </div>
  );
}
