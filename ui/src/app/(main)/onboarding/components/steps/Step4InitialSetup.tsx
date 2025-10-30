import { IOnboardingFormData } from "@/interfaces/onboarding";
import FormFieldNumber from "@/ui/components/FormFieldNumber";
import { Control, FieldErrors } from "react-hook-form";

interface IStep4InitialSetupProps {
  control: Control<IOnboardingFormData>;
  errors: FieldErrors<IOnboardingFormData>;
}

export default function Step4InitialSetup({
  control,
  errors,
}: IStep4InitialSetupProps): React.ReactNode {
  return (
    <div className="w-full max-w-full">
      <div className="mb-6">
        <FormFieldNumber<IOnboardingFormData>
          label="Current Total Balance"
          name="initial_balance"
          placeholder="10000"
          error={errors.initial_balance}
          control={control}
          min={0}
        />
        <p className="text-xs text-[var(--color-text-gray)] mt-1">
          Include all your accounts: checking, savings, cash, etc.
        </p>
      </div>

      <div
        className="border rounded-lg p-4"
        style={{
          backgroundColor: "var(--color-blue-light)",
          borderColor: "var(--color-blue-light-2)",
        }}
      >
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0">🎉</div>
          <div className="flex-1 min-w-0">
            <h6
              className="font-medium text-base"
              style={{ color: "var(--color-blue)" }}
            >
              You're all set!
            </h6>
            <p
              className="text-sm mt-1 break-words"
              style={{ color: "var(--color-blue)" }}
            >
              We'll use this information to provide personalized insights and
              help you achieve your financial goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
