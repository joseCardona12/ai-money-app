"use client";
import { useState, useEffect } from "react";
import { IUseSettings, IRegionalSettings } from "../types/settings";
import {
  DEFAULT_REGIONAL_SETTINGS,
  SETTINGS_CONTENT_TABS,
} from "../utils/constants/settingsData";
import { IContentTab } from "@/interfaces/contentTab";
import { settingsService } from "@/services/settings";
import useAuthListener from "../../hooks/useAuthListener";

export default function useSettings(): IUseSettings {
  const { user } = useAuthListener();
  const [activeTab, setActiveTab] = useState("general");
  const [regionalSettings, setRegionalSettings] = useState<IRegionalSettings>(
    DEFAULT_REGIONAL_SETTINGS
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [contentTabs, setContentTabs] = useState<IContentTab[]>(
    SETTINGS_CONTENT_TABS
  );

  // Load user settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      try {
        const response = await settingsService.getSettingByUserId(user.id);

        if (response.status < 400 && response.data) {
          const userSettings = response.data;

          // Map backend settings to regional settings
          // You may need to adjust this based on your actual backend response structure
          console.log("Loaded settings:", userSettings);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [user?.id]);

  const updateRegionalSettings = (settings: Partial<IRegionalSettings>) => {
    setRegionalSettings((prev) => ({
      ...prev,
      ...settings,
    }));
  };

  const saveSettings = async (): Promise<void> => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would make the actual API call to save settings
      console.log("Settings saved:", regionalSettings);

      // Show success message (you could add a toast notification here)
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const exportData = async (format: string): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate file download
      const filename = `financial-data-${
        new Date().toISOString().split("T")[0]
      }.${format.toLowerCase()}`;

      // Create a mock download
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent("Mock financial data")
      );
      element.setAttribute("download", filename);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      alert(`Data exported successfully as ${filename}`);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Error exporting data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async (): Promise<void> => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted."
    );

    if (!confirmed) return;

    const doubleConfirmed = window.confirm(
      "This is your final warning. Are you absolutely sure you want to permanently delete your account and all associated data?"
    );

    if (!doubleConfirmed) return;

    setIsLoading(true);
    try {
      // Simulate API call for account deletion
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Here you would make the actual API call to delete the account
      console.log("Account deletion requested...");

      alert(
        "Account deletion request submitted. You will receive a confirmation email shortly."
      );
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Error processing account deletion. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    activeTab,
    regionalSettings,
    isLoading,
    isSaving,
    contentTabs,

    // Actions
    setActiveTab,
    setContentTabs,
    updateRegionalSettings,
    saveSettings,
    exportData,
    deleteAccount,
  };
}
