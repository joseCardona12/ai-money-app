"use client";
import z from "zod";
import {
  CURRENT_FORM_SIGN_UP,
  formSchemaSignUp,
} from "../utils/constants/formSchemaSignUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISignUpRequest } from "@/interfaces/signUp";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signUpService } from "../services/signUpService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function useSignUp() {
  const [remember, setRemember] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof formSchemaSignUp>>({
    resolver: zodResolver(formSchemaSignUp),
    defaultValues: CURRENT_FORM_SIGN_UP,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleSignUp = async (data: ISignUpRequest): Promise<void> => {
    setLoading(true);
    try {
      const response = await signUpService.signUp(data);
      if (response.status >= 400) {
        toast.error("Error", {
          description: response.message,
          duration: 2000,
        });
        setLoading(false);
        return;
      }
      toast.success("Correct credentials", {
        description: "Account created successfully",
        duration: 2000,
      });
      // Redirect to onboarding since user just registered
      router.push("/onboarding");
    } catch (_error) {
      // Error handling is done via toast notification above
    } finally {
      setLoading(false);
    }
  };
  return {
    control,
    errors,
    remember,
    handleSubmit,
    setError,
    handleSignUp,
    setRemember,
    loading,
  };
}
