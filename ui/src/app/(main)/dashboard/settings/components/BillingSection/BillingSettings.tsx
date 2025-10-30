"use client";
import { useState } from "react";
import { IconCreditCard, IconDownload } from "@tabler/icons-react";
import Button from "@/ui/components/Button";

interface IBillingHistory {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
}

export default function BillingSettings(): React.ReactNode {
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const billingHistory: IBillingHistory[] = [
    { id: "1", date: "Jan 1, 2024", amount: "$9.99", status: "paid" },
    { id: "2", date: "Dec 1, 2023", amount: "$9.99", status: "paid" },
    { id: "3", date: "Nov 1, 2023", amount: "$9.99", status: "paid" },
  ];

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

  const downloadInvoice = (invoiceId: string) => {
    // Simulate invoice download
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent("Mock invoice data")
    );
    element.setAttribute("download", `invoice-${invoiceId}.pdf`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      {/* Current Plan */}
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

      {/* Separator */}
      <hr className="border-[var(--color-gray-border)]" />

      {/* Payment Method */}
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
          <button
            onClick={updatePaymentMethod}
            disabled={isUpdatingPayment}
            className="px-4 py-2 border border-[var(--color-gray-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isUpdatingPayment ? "Updating..." : "Update"}
          </button>
        </div>
      </div>

      {/* Separator */}
      <hr className="border-[var(--color-gray-border)]" />

      {/* Billing History */}
      <div className="space-y-4">
        <h3 className="font-semibold text-[var(--color-text-primary)]">
          Billing History
        </h3>

        <div className="space-y-3">
          {billingHistory.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between py-3"
            >
              <div>
                <p className="font-medium text-[var(--color-text-primary)]">
                  {invoice.date}
                </p>
                <p className="text-sm text-[var(--color-text-gray)]">
                  {invoice.amount}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 text-sm bg-green-100 text-green-600 rounded">
                  Paid
                </span>
                <button
                  onClick={() => downloadInvoice(invoice.id)}
                  className="px-3 py-1 text-sm border border-[var(--color-gray-border)] text-[var(--color-text-primary)] rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)] focus:ring-offset-2 transition-colors duration-200"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

