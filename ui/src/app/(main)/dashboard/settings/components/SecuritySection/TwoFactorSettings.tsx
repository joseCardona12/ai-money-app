"use client";
import { useState } from "react";
import { IconShield } from "@tabler/icons-react";
import Button from "@/ui/components/Button";

export default function TwoFactorSettings(): React.ReactNode {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
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
  );
}

