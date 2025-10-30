import { IResetPasswordRequest } from "@/interfaces/verifyEmailCode";
import z from "zod";

export const formSchemaResetPassword = z.object({
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const CURRENT_FORM_RESET_PASSWORD: IResetPasswordRequest = {
  newPassword: "",
  confirmPassword: "",
};
