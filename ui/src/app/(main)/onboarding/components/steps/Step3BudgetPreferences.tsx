import { IOnboardingFormData } from "@/interfaces/onboarding";
import FormFieldRadio from "@/ui/components/FormFieldRadio";
import { Control, FieldErrors } from "react-hook-form";
import {
  BUDGET_PREFERENCES_OPTIONS,
  IBudgetPreferenceOption,
} from "../../utils/constants/onboardingOptions";

interface IStep3BudgetPreferencesProps {
  control: Control<IOnboardingFormData>;
  errors: FieldErrors<IOnboardingFormData>;
}

export default function Step3BudgetPreferences({
  control,
  errors,
}: IStep3BudgetPreferencesProps): React.ReactNode {
  return (
    <div className="w-full max-w-full">
      <div>
        <div className="flex flex-col gap-2">
          {BUDGET_PREFERENCES_OPTIONS.map(
            (preference: IBudgetPreferenceOption) => (
              <FormFieldRadio<IOnboardingRequest>
                key={preference.value}
                name="budget_preference_id"
                type="radio"
                error={errors.budget_preference_id}
                control={control}
                text={
                  <div className="flex flex-col gap-0">
                    <h6 className="font-medium text-sm">{preference.label}</h6>
                    <p className="text-xs text-[var(--color-text-gray)] mt-0.5 break-words">
                      {preference.description}
                    </p>
                  </div>
                }
                value={preference.value}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
