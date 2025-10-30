import { ITransaction as IBackendTransaction } from "@/interfaces/transaction";
import { ITransaction } from "../../types/transaction";
import { formatTime } from "./formatTime";

export const mapBackendTransactionToUI = (
  backendTx: IBackendTransaction
): ITransaction => {
  const date = new Date(backendTx.date);
  const dateStr = date.toISOString().split("T")[0];
  // Format time using Colombia locale (es-CO)
  const timeStr = formatTime(backendTx.date, "es-CO");

  const type = backendTx.transaction_type_id === 1 ? "income" : "expense";

  const statusMap: { [key: number]: "completed" | "pending" | "failed" } = {
    1: "pending",
    2: "completed",
    3: "failed",
  };
  const status = statusMap[backendTx.state_id] || "pending";

  const iconMap: { [key: string]: string } = {
    income: "💰",
    expense: "💸",
  };
  const colorMap: { [key: string]: string } = {
    income: "var(--color-green)",
    expense: "var(--color-red)",
  };

  return {
    id: backendTx.id,
    name: backendTx.description.split(" ").slice(0, 2).join(" "),
    description: backendTx.description,
    category: backendTx.category?.name || "Uncategorized",
    date: dateStr,
    time: timeStr,
    amount: backendTx.amount,
    type,
    status,
    icon: iconMap[type],
    color: colorMap[type],
    // Backend IDs for editing
    type_id: backendTx.transaction_type_id,
    category_id: backendTx.category_id,
    state_id: backendTx.state_id,
    account_id: backendTx.account_id,
  };
};
