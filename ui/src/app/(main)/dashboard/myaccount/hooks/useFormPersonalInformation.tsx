"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  CURRENT_FORM_PERSONAL_INFORMATION,
  formSchemaPersonalInformation,
} from "../utils/constants/formSchemaPersonalInformation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { IPersonalInformation } from "../types/myaccount";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import { userService } from "@/services/user";

export default function useFormPersonalInformation(
  initialData: IPersonalInformation
) {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchemaPersonalInformation>>({
    resolver: zodResolver(formSchemaPersonalInformation),
    defaultValues: initialData || CURRENT_FORM_PERSONAL_INFORMATION,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleSavePersonalInformation = async (
    data: IPersonalInformation
  ): Promise<void> => {
    setLoading(true);
    try {
      const response = await userService.updateUser(Number(user?.id), data);
      if (response.status >= 400) {
        toast.error("Error", {
          description: response.message,
          duration: 2000,
        });
        return;
      }
      toast.success("Success", {
        description: "Personal information updated successfully",
        duration: 2000,
      });
      localStorage.setItem("user", JSON.stringify(response.data));

      // Dispatch custom event to notify listeners
      window.dispatchEvent(
        new CustomEvent("user-updated", {
          detail: { type: "user-updated", user: response.data },
        })
      );
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "Failed to save personal information",
        duration: 2000,
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return {
    control,
    setError,
    handleSubmit,
    errors,
    handleSavePersonalInformation,
    loading,
    reset,
  };
}
