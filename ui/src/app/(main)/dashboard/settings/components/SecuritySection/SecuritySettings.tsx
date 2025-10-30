"use client";
import { useState } from "react";
import { IconLock, IconShield, IconDevices } from "@tabler/icons-react";
import Button from "@/ui/components/Button";

interface IActiveSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export default function SecuritySettings(): React.ReactNode {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isRevokingSession, setIsRevokingSession] = useState(false);

  const [activeSessions] = useState<IActiveSession[]>([
    {
      id: "current",
      device: "Chrome on MacOS - San Francisco, CA",
      location: "San Francisco, CA",
      lastActive: "Just now",
      isCurrent: true,
    },
    {
      id: "mobile",
      device: "iPhone 14 Pro - San Francisco, CA",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
  ]);

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

  const revokeSession = async (sessionId: string) => {
    setIsRevokingSession(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Session revoked successfully!");
    } catch (error) {
      alert("Error revoking session. Please try again.");
    } finally {
      setIsRevokingSession(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Password & Authentication */}
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

      {/* Two-Factor Authentication */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <IconShield className="text-[var(--color-text-gray)]" size={20} />
          <div>
            <h3 className="font-semibold text-[var(--color-text-primary)]">
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-[var(--color-text-gray)]">
              Add an extra layer of security to your account
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <h4 className="font-medium text-[var(--color-text-primary)]">
              Two-Factor Authentication
              <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded">
                Disabled
              </span>
            </h4>
            <p className="text-sm text-[var(--color-text-gray)]">
              Secure your account with 2FA authentication
            </p>
          </div>
          <Button variant="outline">Enable</Button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <IconDevices className="text-[var(--color-text-gray)]" size={20} />
          <div>
            <h3 className="font-semibold text-[var(--color-text-primary)]">
              Active Sessions
            </h3>
            <p className="text-sm text-[var(--color-text-gray)]">
              Manage your active login sessions
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between py-3"
            >
              <div className="">
                <h4 className="font-medium text-[var(--color-text-primary)]">
                  {session.isCurrent ? "Current Session" : "Mobile App"}
                </h4>
                <p className="text-sm text-[var(--color-text-gray)]">
                  {session.device}
                </p>
                <p className="text-xs text-[var(--color-text-gray)]">
                  Last active: {session.lastActive}
                </p>
              </div>
              {session.isCurrent ? (
                <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded">
                  Active
                </span>
              ) : (
                <Button
                  onClick={() => revokeSession(session.id)}
                  disabled={isRevokingSession}
                  variant="outline"
                  className="!text-red-600 !border-red-200 hover:!bg-red-50"
                >
                  {isRevokingSession ? "Revoking..." : "Revoke"}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

