import { useForm } from "react-hook-form";
import {
  CURRENT_FORM_RESET_PASSWORD,
  formSchemaResetPassword,
} from "../utils/constants/formSchemaResetPassword";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IResetPasswordRequest } from "@/interfaces/verifyEmailCode";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ResetPasswordAuthService } from "../services/authService";
import { ResetPasswordAuthUtils } from "../utils/authUtils";
import useVerifyEmailModal from "./useVerifyEmailModal";

export default function useVerifyEmail() {
  const [token, setToken] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  const router = useRouter();
  const authService = new ResetPasswordAuthService();
  const modal = useVerifyEmailModal();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof formSchemaResetPassword>>({
    resolver: zodResolver(formSchemaResetPassword),
    defaultValues: CURRENT_FORM_RESET_PASSWORD,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  /**
   * Extract token from URL on component mount
   */
  useEffect(() => {
    const currentUrl = window.location.href;
    const extractedToken =
      ResetPasswordAuthUtils.extractTokenFromUrl(currentUrl);

    if (extractedToken) {
      setToken(extractedToken);
      setIsValidToken(true);
    } else {
      setIsValidToken(false);
    }
  }, []);

  /**
   * Handles the password reset form submission
   * @param data - The form data containing new password and confirmation
   */
  const handleVerifyEmail = async (data: IResetPasswordRequest) => {
    if (!token) {
      modal.showError(
        "Invalid reset token. Please request a new password reset."
      );
      return;
    }

    try {
      modal.showLoading("Resetting your password...");

      const response = await authService.resetPassword({
        token,
        newPassword: data.newPassword,
      });

      if (ResetPasswordAuthUtils.isResetPasswordSuccessful(response)) {
        modal.showSuccess(
          "Password reset successfully! Redirecting to dashboard..."
        );
        // Redirect to dashboard after successful reset
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        const errorMessage = ResetPasswordAuthUtils.getErrorMessage(response);
        modal.showError(errorMessage);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      modal.showError("An unexpected error occurred. Please try again.");
    }
  };

  return {
    control,
    handleSubmit,
    setError,
    errors,
    handleVerifyEmail,
    isValidToken,
    token,
    modal,
  };
}
