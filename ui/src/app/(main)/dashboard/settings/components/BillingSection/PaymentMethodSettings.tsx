"use client";
import { useState } from "react";
import Button from "@/ui/components/Button";

export default function PaymentMethodSettings(): React.ReactNode {
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);

  const updatePaymentMethod = async () => {
    setIsUpdatingPayment(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Payment method updated successfully!");
    } catch (error) {
      alert("Error updating payment method. Please try again.");
    } finally {
      setIsUpdatingPayment(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-[var(--color-text-primary)]">
        Payment Method
      </h3>

      <div className="flex items-center justify-between p-4 border border-[var(--color-gray-border)] rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">VISA</span>
          </div>
          <div>
            <p className="font-medium text-[var(--color-text-primary)]">
              •••• •••• •••• 4532
            </p>
            <p className="text-sm text-[var(--color-text-gray)]">
              Expires 12/25
            </p>
          </div>
        </div>
        <Button
          onClick={updatePaymentMethod}
          disabled={isUpdatingPayment}
          variant="outline"
        >
          {isUpdatingPayment ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
}

