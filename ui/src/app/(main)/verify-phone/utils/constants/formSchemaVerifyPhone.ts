import { IVerifyPhoneRequest } from "@/interfaces/verifyPhoneCode";
import z from "zod";

export const formSchemaVerifyPhone = z.object({
  codeOne: z.string().min(1, ">=1").max(1, ">=1"),
  codeTwo: z.string().min(1, ">=1").max(1, ">=1"),
  codeThree: z.string().min(1, ">=1").max(1, ">=1"),
  codeFour: z.string().min(1, ">=1").max(1, ">=1"),
  codeFive: z.string().min(1, ">=1").max(1, ">=1"),
  codeSix: z.string().min(1, ">=1").max(1, ">=1"),
});

export const CURRENT_FORM_VERIFY_PHONE: IVerifyPhoneRequest = {
  codeOne: "",
  codeTwo: "",
  codeThree: "",
  codeFour: "",
  codeFive: "",
  codeSix: "",
};
