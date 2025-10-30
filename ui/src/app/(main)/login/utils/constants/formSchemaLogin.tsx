import { ILoginRequest } from "@/interfaces/login";
import z from "zod";

export const formSchemaLogin = z.object({
  email: z.string().email("Invalid email format").min(2).max(250),
  password: z
    .string()
    .min(8, "Expected string to have >=8 characters")
    .max(20, "Expected string to have <20  characters")
    .regex(/[A-Z]/, "Must include a capital letter")
    .regex(/[a-z]/, "Must include a lowecase letter"),
});

export const CURRENT_FORM_LOGIN: ILoginRequest = {
  email: "",
  password: "",
};
