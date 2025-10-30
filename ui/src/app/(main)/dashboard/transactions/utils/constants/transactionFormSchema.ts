import z from "zod";

export const transactionFormSchema = z.object({
  type: z.string().min(1, "Type is required"),
  category: z.string().min(1, "Category is required"),
  amount: z.number(),
  date: z.string().min(1, "Date is required"),
  description: z.string().optional(),
  state: z.string().min(1, "State is required"),
  account: z.string().min(1, "Account is required"),
});

export const CURRENT_FORM_TRANSACTION = {
  type: "",
  category: "",
  amount: 0,
  date: new Date().toISOString().split("T")[0],
  description: "",
  state: "",
  account: "",
};
