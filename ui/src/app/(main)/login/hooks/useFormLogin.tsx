"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  CURRENT_FORM_LOGIN,
  formSchemaLogin,
} from "../utils/constants/formSchemaLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ILoginRequest } from "@/interfaces/login";
import { loginService } from "../services/loginService";
import { onboardingService } from "@/services/onboarding";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTERS } from "@/utils/constants/routers";
import { IResponseDto } from "@/interfaces/responseDto";

export default function useFormLogin() {
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: CURRENT_FORM_LOGIN,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleLogin = async (data: ILoginRequest): Promise<void> => {
    setLoading(true);
    try {
      const response: IResponseDto = await loginService.login(data);
      if (response.status >= 400) {
        toast.error("Error", {
          description: response.message,
          duration: 2000,
        });
        setLoading(false);
        return;
      }
      toast.success("Correct credentials", {
        description: "Login successful",
        duration: 2000,
      });
      // Save token and user to localStorage
      localStorage.setItem("token", response.data?.token);
      localStorage.setItem("user", JSON.stringify(response.data?.user));

      // Save token to cookies for middleware
      document.cookie = `token=${response.data?.token}; path=/; max-age=86400`;

      // Check if user already has onboarding
      try {
        const onboardingStatus =
          await onboardingService.checkOnboardingStatus();

        // If user already has onboarding, redirect to dashboard
        if (onboardingStatus.data?.has_onboarding) {
          router.push(ROUTERS.dashboard);
        } else {
          // Otherwise, redirect to onboarding
          router.push(ROUTERS.onboarding);
        }
      } catch (error: any) {
        // If there's an error checking status, redirect to onboarding
        router.push(ROUTERS.onboarding);
      }
    } catch (error: any) {
      toast.error("Error", {
        description: error.message,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };
  return {
    control,
    setError,
    handleSubmit,
    errors,
    setShowIcon,
    showIcon,
    setRemember,
    remember,
    handleLogin,
    loading,
  };
}
