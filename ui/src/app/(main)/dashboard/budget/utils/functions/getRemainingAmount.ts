export const getRemainingAmount = (spent: number, limit: number): number => {
  return Math.max(limit - spent, 0);
};

