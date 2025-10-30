"use client";
import { IconDownload, IconTrash } from "@tabler/icons-react";
import { IDataManagementProps } from "../types/settings";
import Button from "@/ui/components/Button";

export default function DataManagement({
  onExportData,
  onDeleteAccount,
  isLoading,
}: IDataManagementProps): React.ReactNode {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">
          Data Management
        </h3>
        <p className="text-sm text-[var(--color-text-gray)]">
          Export or delete your financial data
        </p>
      </div>
      <div className="flex items-center justify-between border border-[var(--color-gray-border)] rounded-lg p-4">
        <div className="flex items-center gap-3">
          <IconDownload className="text-[var(--color-text-gray)]" size={20} />
          <div>
            <h4 className="font-medium text-[var(--color-text-primary)]">
              Export Data
            </h4>
            <p className="text-sm text-[var(--color-text-gray)]">
              Download all your financial data as CSV
            </p>
          </div>
        </div>
        <Button
          onClick={() => onExportData("CSV")}
          disabled={isLoading}
          variant="outline"
        >
          {isLoading ? "Exporting..." : "Export"}
        </Button>
      </div>
      <div className="flex items-center justify-between border border-[var(--color-gray-border)] rounded-lg p-4">
        <div className="flex items-center gap-3">
          <IconTrash className="text-red-500" size={20} />
          <div>
            <h4 className="font-medium text-red-600">Delete Account</h4>
            <p className="text-sm text-[var(--color-text-gray)]">
              Permanently delete your account and all data
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={onDeleteAccount}
          disabled={isLoading}
          className="!bg-red-600 !text-white !border-red-600 hover:!bg-red-700 hover:!border-red-700"
        >
          {isLoading ? "Processing..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}
