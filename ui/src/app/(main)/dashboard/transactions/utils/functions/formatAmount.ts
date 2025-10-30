export const formatAmount = (
  amount: number | undefined | null,
  type: "income" | "expense"
) => {
  const safeAmount = amount ?? 0;
  const formattedAmount = `$${safeAmount.toFixed(2)}`;
  return type === "income" ? `+${formattedAmount}` : `-${formattedAmount}`;
};
