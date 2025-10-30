"use client";
import { useState } from "react";
import { IconBell } from "@tabler/icons-react";
import Button from "@/ui/components/Button";

interface INotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function NotificationSettings(): React.ReactNode {
  const [notifications, setNotifications] = useState<INotificationSetting[]>([
    {
      id: "email",
      title: "Email Notifications",
      description: "Receive notifications via email",
      enabled: true,
    },
    {
      id: "push",
      title: "Push Notifications",
      description: "Receive push notifications on your device",
      enabled: true,
    },
    {
      id: "budget",
      title: "Budget Alerts",
      description: "Get notified when you exceed budget limits",
      enabled: true,
    },
    {
      id: "goals",
      title: "Goal Reminders",
      description: "Reminders to contribute to your financial goals",
      enabled: true,
    },
    {
      id: "transactions",
      title: "Transaction Notifications",
      description: "Get notified for every transaction",
      enabled: true,
    },
    {
      id: "weekly",
      title: "Weekly Summary",
      description: "Receive a weekly financial summary email",
      enabled: true,
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  const savePreferences = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Notification preferences saved successfully!");
    } catch (error) {
      alert("Error saving preferences. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <IconBell className="text-[var(--color-text-gray)]" size={20} />
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary)]">
            Notification Preferences
          </h3>
          <p className="text-sm text-[var(--color-text-gray)]">
            Choose what notifications you want to receive
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center justify-between py-3 border-b border-[var(--color-gray-border)]"
          >
            <div>
              <h4 className="font-medium text-[var(--color-text-primary)]">
                {notification.title}
              </h4>
              <p className="text-sm text-[var(--color-text-gray)]">
                {notification.description}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notification.enabled}
                onChange={() => toggleNotification(notification.id)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-blue)]"></div>
            </label>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <Button
          variant="primary"
          onClick={savePreferences}
          disabled={isSaving}
          className="px-6 py-2 bg-[var(--color-blue)] text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSaving ? "Saving Preferences..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
