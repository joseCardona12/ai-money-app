import { IForgotPasswordRequest } from "@/interfaces/forgotPassword";
import z from "zod";

export const formSchemaForgotPassword = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
});

export const CURRENT_FORM_FORGOT_PASSWORD: IForgotPasswordRequest = {
  email: "",
  phoneNumber: "",
};
