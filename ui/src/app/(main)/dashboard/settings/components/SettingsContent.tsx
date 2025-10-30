"use client";
import { ISettingsContentProps } from "../types/settings";
import SettingsTabs from "./SettingsTabs";
import RegionalSettings from "./RegionalSettings";
import DataManagement from "./DataManagement";
import NotificationSettings from "./NotificationSettings";
import PasswordSettings from "./SecuritySection/PasswordSettings";
import TwoFactorSettings from "./SecuritySection/TwoFactorSettings";
import ActiveSessionsSettings from "./SecuritySection/ActiveSessionsSettings";
import CurrentPlanSettings from "./BillingSection/CurrentPlanSettings";
import PaymentMethodSettings from "./BillingSection/PaymentMethodSettings";
import BillingHistorySettings from "./BillingSection/BillingHistorySettings";

export default function SettingsContent({
  settingsData,
}: ISettingsContentProps): React.ReactNode {
  const {
    activeTab,
    regionalSettings,
    isSaving,
    isLoading,
    contentTabs,
    setActiveTab,
    setContentTabs,
    updateRegionalSettings,
    saveSettings,
    exportData,
    deleteAccount,
  } = settingsData;

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-8">
            {/* Regional Settings Section */}
            <div className="bg-white rounded-lg border border-[var(--color-gray-border)] p-6">
              <RegionalSettings
                settings={regionalSettings}
                onUpdate={updateRegionalSettings}
                onSave={saveSettings}
                isSaving={isSaving}
              />
            </div>

            {/* Data Management Section */}
            <div className="bg-white rounded-lg border border-[var(--color-gray-border)] p-6">
              <DataManagement
                onExportData={exportData}
                onDeleteAccount={deleteAccount}
                isLoading={isLoading}
              />
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="bg-white rounded-lg border border-[var(--color-gray-border)] p-6">
            <NotificationSettings />
          </div>
        );

      case "security":
        return (
          <div className="space-y-8">
            {/* Password & Authentication Section */}
            <div className="bg-white rounded-lg border border-[var(--color-gray-border)] p-6">
              <PasswordSettings />
            </div>

            {/* Two-Factor Authentication Section */}
            <div className="bg-white rounded-lg border border-[var(--color-gray-border)] p-6">
              <TwoFactorSettings />
            </div>

            {/* Active Sessions Section */}
            <div className="bg-white rounded-lg border border-[var(--color-gray-border)] p-6">
              <ActiveSessionsSettings />
            </div>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-8">
            {/* Current Plan Section */}
            <div className="bg-white rounded-lg border border-[var(--color-gray-border)] p-6">
              <CurrentPlanSettings />
            </div>

            {/* Payment Method Section */}
            <div className="bg-white rounded-lg border border-[var(--color-gray-border)] p-6">
              <PaymentMethodSettings />
            </div>

            {/* Billing History Section */}
            <div className="bg-white rounded-lg border border-[var(--color-gray-border)] p-6">
              <BillingHistorySettings />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
          Settings
        </h1>
        <p className="text-[var(--color-text-gray)]">
          Manage your account preferences and app settings
        </p>
      </div>

      {/* Tabs */}
      <SettingsTabs
        contentTabs={contentTabs}
        setElement={setActiveTab}
        setContentTabs={setContentTabs}
      />

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}
