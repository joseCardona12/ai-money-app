"use client";
import { useState } from "react";
import Button from "@/ui/components/Button";

interface IBillingHistory {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "failed";
}

export default function BillingHistorySettings(): React.ReactNode {
  const billingHistory: IBillingHistory[] = [
    { id: "1", date: "Jan 1, 2024", amount: "$9.99", status: "paid" },
    { id: "2", date: "Dec 1, 2023", amount: "$9.99", status: "paid" },
    { id: "3", date: "Nov 1, 2023", amount: "$9.99", status: "paid" },
  ];

  const downloadInvoice = (invoiceId: string) => {
    // Simulate invoice download
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent("Mock invoice data")
    );
    element.setAttribute("download", `invoice-${invoiceId}.pdf`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
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
              <Button
                onClick={() => downloadInvoice(invoice.id)}
                variant="outline"
                className="text-sm"
              >
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

