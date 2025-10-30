import z from "zod";

export const accountFormSchema = z.object({
  name: z.string().min(1, "Account name is required"),
  type: z.string().min(1, "Account type is required"),
  bank: z.string().min(1, "Bank name is required"),
  balance: z.number().min(0, "Balance must be greater than or equal to 0"),
  accountNumber: z.string().optional(),
  color: z.string().min(1, "Color is required"),
});

export const CURRENT_FORM_ACCOUNT = {
  name: "",
  type: "",
  bank: "",
  balance: 0,
  accountNumber: "",
  color: "var(--color-blue)",
};

export const ACCOUNT_TYPES = [
  { value: "checking", label: "Checking" },
  { value: "savings", label: "Savings" },
  { value: "credit", label: "Credit Card" },
  { value: "cash", label: "Cash" },
];

export const ACCOUNT_COLORS = [
  { value: "var(--color-blue)", label: "Blue" },
  { value: "var(--color-green)", label: "Green" },
  { value: "var(--color-orange)", label: "Orange" },
  { value: "var(--color-purple)", label: "Purple" },
  { value: "var(--color-red)", label: "Red" },
  { value: "var(--color-yellow)", label: "Yellow" },
];
