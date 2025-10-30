"use client";
import Button from "@/ui/components/Button";
import Link from "next/link";
import { IconArrowLeft } from "../../../../../public/icons";

export default function PrivacyContent(): React.ReactNode {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ color: "var(--color-text-gray)" }}
        >
          <IconArrowLeft className="text-sm" />
          <span className="text-sm">Back to home</span>
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-[1.6rem] font-bold">Privacy Policy</h1>
        <p style={{ color: "var(--color-text-gray)" }} className="text-sm">
          How we protect your information
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <PrivacyPolicyContent />
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="primary" className="w-full">
          I Understand
        </Button>
        <div className="text-center">
          <Link
            href="/"
            style={{ color: "var(--color-text-gray)" }}
            className="text-sm"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function PrivacyPolicyContent(): React.ReactNode {
  return (
    <div className="space-y-3">
      <section>
        <h3 className="text-sm font-semibold mb-1">
          1. Information Collection
        </h3>
        <p style={{ color: "var(--color-text-gray)" }} className="text-xs">
          We collect data you provide when using our services.
        </p>
      </section>

      <section>
        <h3 className="text-sm font-semibold mb-1">2. Data Usage</h3>
        <p style={{ color: "var(--color-text-gray)" }} className="text-xs">
          To provide and improve our services.
        </p>
      </section>

      <section>
        <h3 className="text-sm font-semibold mb-1">3. Data Sharing</h3>
        <p style={{ color: "var(--color-text-gray)" }} className="text-xs">
          We do not sell your personal information.
        </p>
      </section>

      <section>
        <h3 className="text-sm font-semibold mb-1">4. Security</h3>
        <p style={{ color: "var(--color-text-gray)" }} className="text-xs">
          We implement security measures to protect your data.
        </p>
      </section>

      <section>
        <h3 className="text-sm font-semibold mb-1">5. Your Rights</h3>
        <p style={{ color: "var(--color-text-gray)" }} className="text-xs">
          Access, update, or delete your information anytime.
        </p>
      </section>

      <section>
        <h3 className="text-sm font-semibold mb-1">6. Contact</h3>
        <p style={{ color: "var(--color-text-gray)" }} className="text-xs">
          Questions? Contact privacy@aimoney.com
        </p>
      </section>
    </div>
  );
}
