"use client";
import { useState } from "react";
import { IconLock } from "@tabler/icons-react";
import Button from "@/ui/components/Button";

export default function PasswordSettings(): React.ReactNode {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert("Error updating password. Please try again.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <IconLock className="text-[var(--color-text-gray)]" size={20} />
        <div>
          <h3 className="font-semibold text-[var(--color-text-primary)]">
            Password & Authentication
          </h3>
          <p className="text-sm text-[var(--color-text-gray)]">
            Manage your password and security settings
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="w-full px-3 py-2 border border-[var(--color-gray-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-3 py-2 border border-[var(--color-gray-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full px-3 py-2 border border-[var(--color-gray-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)] focus:border-transparent"
          />
        </div>

        <Button
          onClick={updatePassword}
          disabled={
            isUpdatingPassword ||
            !currentPassword ||
            !newPassword ||
            !confirmPassword
          }
          variant="primary"
        >
          {isUpdatingPassword ? "Updating Password..." : "Update Password"}
        </Button>
      </div>
    </div>
  );
}

