import { z } from "zod";

export const contributionFormSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
});

export type ContributionFormData = z.infer<typeof contributionFormSchema>;

export const CURRENT_FORM_CONTRIBUTION: ContributionFormData = {
  amount: 0,
  description: "",
  date: new Date().toISOString().split('T')[0], // Today's date
};
