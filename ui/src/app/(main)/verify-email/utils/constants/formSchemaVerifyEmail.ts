import { IVerifyEmailRequest } from "@/interfaces/verifyEmailCode";
import z from "zod";

export const formSchemaVerifyEmail = z.object({
  codeOne: z.string().min(1, ">=1").max(1, ">=1"),
  codeTwo: z.string().min(1, ">=1").max(1, ">=1"),
  codeThree: z.string().min(1, ">=1").max(1, ">=1"),
  codeFour: z.string().min(1, ">=1").max(1, ">=1"),
  codeFive: z.string().min(1, ">=1").max(1, ">=1"),
  codeSix: z.string().min(1, ">=1").max(1, ">=1"),
});

export const CURRENT_FORM_VERIFY_EMAIL: IVerifyEmailRequest = {
  codeOne: "",
  codeTwo: "",
  codeThree: "",
  codeFour: "",
  codeFive: "",
  codeSix: "",
};
