"use client";
import { useState } from "react";
import { IconDevices } from "@tabler/icons-react";
import Button from "@/ui/components/Button";

interface IActiveSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export default function ActiveSessionsSettings(): React.ReactNode {
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
          <div key={session.id} className="flex items-center justify-between py-3">
            <div>
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
  );
}

