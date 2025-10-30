import { z } from "zod";

export const budgetFormSchema = z.object({
  categoryId: z
    .union([z.string(), z.number()])
    .refine((val) => {
      const num = typeof val === "string" ? parseInt(val, 10) : val;
      return num > 0;
    }, "Category is required")
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val)),
  budgetedAmount: z
    .number()
    .min(0.01, "Budgeted amount must be greater than 0"),
  month: z.string().optional(),
});

export type BudgetFormData = z.infer<typeof budgetFormSchema>;

export const CURRENT_FORM_BUDGET: BudgetFormData = {
  categoryId: 0,
  budgetedAmount: 0,
  month: undefined,
};
