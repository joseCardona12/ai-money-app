"use client";
import TransactionsContent from "./components/TransactionsContent";
import useTransactions from "./hooks/useTransactions";

export default function TransactionsView(): React.ReactNode {
  const transactionsData = useTransactions();

  return <TransactionsContent transactionsData={transactionsData} />;
}
