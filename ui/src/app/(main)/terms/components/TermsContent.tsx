"use client";
import Button from "@/ui/components/Button";
import Link from "next/link";
import { IconArrowLeft } from "../../../../../public/icons";
import useTerms from "../hooks/useTerms";

export default function TermsContent(): React.ReactNode {
  const { elementTab } = useTerms();

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

      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-[1.6rem] font-bold">Legal Information</h1>
          <p style={{ color: "var(--color-text-gray)" }} className="text-sm">
            Review our terms and privacy policy
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {elementTab === "terms" ? <TermsOfService /> : <PrivacyPolicy />}
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="primary" className="w-full">
          I Accept
        </Button>
        <div className="text-center">
          <Link
            href="/"
            style={{ color: "var(--color-text-gray)" }}
            className="text-sm"
          >
            I'll review this later
          </Link>
        </div>
      </div>
    </div>
  );
}

function TermsOfService(): React.ReactNode {
  return (
    <div className="space-y-3">
      <section>
        <h3 className="text-sm font-semibold mb-1">1. Acceptance</h3>
        <p style={{ color: "var(--color-text-gray)" }} className="text-xs">
          By using AI Money, you agree to these terms.
        </p>
      </section>

      <section>
        <h3 className="text-sm font-semibold mb-1">2. License</h3>
        <p style={{ color: "var(--color-text-gray)" }} className="text-xs">
          Personal, non-commercial use only.
        </p>
      </section>

      <section>
        <h3 className="text-sm font-semibold mb-1">3. Financial Data</h3>
        <p style={{ color: "var(--color-text-gray)" }} className="text-xs">
          You're responsible for data accuracy. We provide tools, not advice.
        </p>
      </section>

      <section>
        <h3 className="text-sm font-semibold mb-1">4. Account Security</h3>
        <p style={{ color: "var(--color-text-gray)" }} className="text-xs">
          Keep credentials secure. You're responsible for account activity.
        </p>
      </section>

      <section>
        <h3 className="text-sm font-semibold mb-1">5. Prohibited Uses</h3>
        <p style={{ color: "var(--color-text-gray)" }} className="text-xs">
          No illegal or unauthorized use permitted.
        </p>
      </section>

      <section>
        <h3 className="text-sm font-semibold mb-1">6. Liability</h3>
        <p style={{ color: "var(--color-text-gray)" }} className="text-xs">
          We're not liable for indirect damages from service use.
        </p>
      </section>
    </div>
  );
}

function PrivacyPolicy(): React.ReactNode {
  return (
    <div className="space-y-3">
      <section>
        <h3 className="text-sm font-semibold mb-1">1. Data Collection</h3>
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
