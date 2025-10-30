"use client";
import { useState } from "react";
import Button from "@/ui/components/Button";

export default function CurrentPlanSettings(): React.ReactNode {
  const [isCancelling, setIsCancelling] = useState(false);

  const cancelSubscription = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your subscription? You'll lose access to premium features."
    );

    if (!confirmed) return;

    setIsCancelling(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(
        "Subscription cancelled successfully. You'll retain access until the end of your billing period."
      );
    } catch (error) {
      alert("Error cancelling subscription. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
        $9.99/month
      </h3>
      <ul className="space-y-1 text-sm text-[var(--color-text-gray)] mb-4">
        <li>• Unlimited transactions</li>
        <li>• Advanced analytics</li>
        <li>• Priority support</li>
      </ul>
      <div className="flex gap-3">
        <Button variant="outline">Change Plan</Button>
        <Button
          onClick={cancelSubscription}
          disabled={isCancelling}
          variant="outline"
          className="!text-red-600 !border-red-200 hover:!bg-red-50"
        >
          {isCancelling ? "Cancelling..." : "Cancel Subscription"}
        </Button>
      </div>
    </div>
  );
}

