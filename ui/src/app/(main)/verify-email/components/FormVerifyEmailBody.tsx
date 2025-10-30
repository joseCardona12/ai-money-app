import { IResetPasswordRequest } from "@/interfaces/verifyEmailCode";
import FormField from "@/ui/components/FormField";
import { Control, FieldErrors } from "react-hook-form";
import { useState } from "react";
import { IconEye, IconEyeOff } from "../../../../../public/icons";

interface IFormVerifyEmailBodyProps {
  control: Control<IResetPasswordRequest>;
  errors: FieldErrors<IResetPasswordRequest>;
}
export default function FormVerifyEmailBody({
  control,
  errors,
}: IFormVerifyEmailBodyProps): React.ReactNode {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <FormField<IResetPasswordRequest>
          label="New Password"
          name="newPassword"
          type={showNewPassword ? "text" : "password"}
          placeholder="Enter your new password"
          error={errors.newPassword}
          control={control}
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-[var(--color-text-gray)] hover:text-[var(--color-text-black)] transition-colors"
          onClick={() => setShowNewPassword(!showNewPassword)}
        >
          {showNewPassword ? (
            <IconEyeOff className="h-5 w-5" />
          ) : (
            <IconEye className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="relative">
        <FormField<IResetPasswordRequest>
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your new password"
          error={errors.confirmPassword}
          control={control}
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-[var(--color-text-gray)] hover:text-[var(--color-text-black)] transition-colors"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <IconEyeOff className="h-5 w-5" />
          ) : (
            <IconEye className="h-5 w-5" />
          )}
        </button>
      </div>

      <p className="text-sm text-[var(--color-text-gray)]">
        Create a new secure password for your account
      </p>
    </div>
  );
}
