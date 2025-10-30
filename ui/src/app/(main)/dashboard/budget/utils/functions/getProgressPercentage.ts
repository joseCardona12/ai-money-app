export const getProgressPercentage = (spent: number, limit: number): number => {
  if (limit === 0) return 0;
  return Math.min((spent / limit) * 100, 100);
};

