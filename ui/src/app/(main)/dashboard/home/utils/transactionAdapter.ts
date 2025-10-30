import { ITransaction } from "../../transactions/types/transaction";
import { TRANSACTIONS_DATA } from "./constants/dashboardData";

type DashboardTransaction = typeof TRANSACTIONS_DATA[0];

export function adaptDashboardTransactionToTransaction(
  dashboardTransaction: DashboardTransaction
): ITransaction {
  // Convertir el amount string a number
  const amountNumber = parseFloat(dashboardTransaction.amount.replace('$', ''));
  
  return {
    id: dashboardTransaction.id,
    name: dashboardTransaction.name,
    description: `Transaction from ${dashboardTransaction.date}`,
    category: "general", // Valor por defecto
    date: dashboardTransaction.date,
    time: "12:00 PM", // Valor por defecto
    amount: amountNumber,
    type: "expense" as const, // Valor por defecto, se puede mejorar con lógica
    status: "completed" as const, // Valor por defecto
    icon: dashboardTransaction.icon,
    color: dashboardTransaction.color,
  };
}

export function findDashboardTransactionById(
  transactions: typeof TRANSACTIONS_DATA,
  id: number
): DashboardTransaction | undefined {
  return transactions.find(transaction => transaction.id === id);
}
