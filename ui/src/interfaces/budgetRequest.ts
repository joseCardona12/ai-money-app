export interface IBudgetRequest {
  categoryId: number;
  budgetedAmount: number;
  month?: string; // ISO format: YYYY-MM-DD
}
