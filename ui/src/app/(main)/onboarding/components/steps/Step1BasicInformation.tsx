import { IOnboardingFormData } from "@/interfaces/onboarding";
import FormFieldNumber from "@/ui/components/FormFieldNumber";
import FormFieldRadio from "@/ui/components/FormFieldRadio";
import { Control, FieldErrors } from "react-hook-form";
import { ICurrency } from "@/interfaces/currency";
import { IconSpinner } from "../../../../../../public/icons";

interface IStep1BasicInformationProps {
  control: Control<IOnboardingFormData>;
  errors: FieldErrors<IOnboardingFormData>;
  currencies: ICurrency[];
}

export default function Step1BasicInformation({
  control,
  errors,
  currencies = [],
}: IStep1BasicInformationProps): React.ReactNode {
  return (
    <div className="w-full max-w-full">
      <div className="mb-6">
        <h5 className="font-medium text-base mb-4">Preferred Currency</h5>
        <div className="flex flex-col gap-3">
          {currencies && currencies.length > 0 ? (
            currencies.map((currency: ICurrency) => (
              <FormFieldRadio<IOnboardingFormData>
                key={currency.id}
                name="currency_id"
                type="radio"
                error={errors.currency_id}
                control={control}
                text={`${currency.name} (${currency.symbol})`}
                value={currency.id?.toString() || "0"}
              />
            ))
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <IconSpinner className="animate-spin duration-150" />
              <p>Loading currencies...</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <FormFieldNumber<IOnboardingFormData>
          label="Monthly Income"
          name="monthly_income"
          placeholder="5000"
          error={errors.monthly_income}
          control={control}
          isOptional
          min={0}
        />
        <p className="text-xs text-[var(--color-text-gray)] mt-1">
          This helps us provide better budget recommendations
        </p>
      </div>
    </div>
  );
}
