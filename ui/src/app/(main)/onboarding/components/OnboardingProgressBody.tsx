import { IOnboardingFormData } from "@/interfaces/onboarding";
import { Control, FieldErrors } from "react-hook-form";
import Step1BasicInformation from "./steps/Step1BasicInformation";
import Step2FinancialGoals from "./steps/Step2FinancialGoals";
import Step3BudgetPreferences from "./steps/Step3BudgetPreferences";
import Step4InitialSetup from "./steps/Step4InitialSetup";
import { ICurrency } from "@/interfaces/currency";
import { IGoalType } from "@/interfaces/goalType";

interface IOnboardingProgressBodyProps {
  control: Control<IOnboardingFormData>;
  errors: FieldErrors<IOnboardingFormData>;
  step: number;
  currencies: ICurrency[];
  goalTypes: IGoalType[];
}

export default function OnboardingProgressBody({
  control,
  errors,
  step,
  currencies,
  goalTypes,
}: IOnboardingProgressBodyProps): React.ReactNode {
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Step1BasicInformation
            control={control}
            errors={errors}
            currencies={currencies}
          />
        );
      case 2:
        return (
          <Step2FinancialGoals
            control={control}
            errors={errors}
            goalTypes={goalTypes}
          />
        );
      case 3:
        return <Step3BudgetPreferences control={control} errors={errors} />;
      case 4:
        return <Step4InitialSetup control={control} errors={errors} />;
      default:
        return (
          <Step1BasicInformation
            currencies={currencies}
            control={control}
            errors={errors}
          />
        );
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      {renderStepContent()}
    </div>
  );
}
