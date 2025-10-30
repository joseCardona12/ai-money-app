import { IPersonalInformation } from "../../types/myaccount";
import z from "zod";

export const formSchemaPersonalInformation = z.object({
  fullName: z.string().min(2, "Full name is required").max(250),
  email: z.string().email("Invalid email format").min(2).max(250),
  phoneNumber: z.string().min(10, "Phone number is required").max(20),
  location: z.string().min(2, "Location is required").max(250),
  bio: z.string().max(500, "Bio must be less than 500 characters"),
});

export const CURRENT_FORM_PERSONAL_INFORMATION: IPersonalInformation = {
  fullName: "",
  email: "",
  phoneNumber: "",
  location: "",
  bio: "",
};

