import { useState } from "react";
import { CURRENT_CONTENT_TAB } from "../utils/constants/contentTab";
import { IContentTab } from "@/interfaces/contentTab";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  CURRENT_FORM_FORGOT_PASSWORD,
  formSchemaForgotPassword,
} from "../utils/constants/formSchemaForgotPassword";
import { IForgotPasswordRequest } from "@/interfaces/forgotPassword";
import { ForgotPasswordAuthService } from "../services/authService";
import { ForgotPasswordAuthUtils } from "../utils/authUtils";
import useForgotPasswordModal from "./useForgotPasswordModal";

export default function useForgotPassword() {
  const [elementTab, setElementTab] = useState<string>("email");
  const [contentTabs, setContentTabs] =
    useState<IContentTab[]>(CURRENT_CONTENT_TAB);

  const authService = new ForgotPasswordAuthService();
  const modal = useForgotPasswordModal();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof formSchemaForgotPassword>>({
    resolver: zodResolver(formSchemaForgotPassword),
    defaultValues: CURRENT_FORM_FORGOT_PASSWORD,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  /**
   * Handles the forgot password form submission
   * @param data - The form data containing email
   */
  const handleForgotPassword = async (data: IForgotPasswordRequest) => {
    if (!data.email) {
      setError("email", {
        type: "required",
        message: "Email is required",
      });
      return;
    }

    try {
      modal.showLoading("Sending reset email...");

      const response = await authService.requestPasswordReset({
        email: data.email,
      });

      if (ForgotPasswordAuthUtils.isForgotPasswordSuccessful(response)) {
        const successMessage =
          ForgotPasswordAuthUtils.getSuccessMessage(response);
        modal.showSuccess(successMessage);
      } else {
        const errorMessage = ForgotPasswordAuthUtils.getErrorMessage(response);
        modal.showError(errorMessage);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      modal.showError("An unexpected error occurred. Please try again.");
    }
  };

  return {
    elementTab,
    setElementTab,
    contentTabs,
    setContentTabs,
    errors,
    control,
    handleSubmit,
    setError,
    handleForgotPassword,
    modal,
  };
}
