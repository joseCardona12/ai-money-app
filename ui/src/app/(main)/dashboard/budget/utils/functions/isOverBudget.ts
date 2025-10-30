export const isOverBudget = (spent: number, limit: number): boolean => {
  return spent > limit;
};

