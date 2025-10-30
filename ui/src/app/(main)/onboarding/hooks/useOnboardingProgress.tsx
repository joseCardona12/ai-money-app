import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CURRENT_FORM_ONBOARDING,
  formSchemaOnboarding,
} from "../utils/constants/formSchemaOnboarding";
import {
  IOnboardingFormData,
  IOnboardingRequest,
} from "@/interfaces/onboarding";
import { currencyService } from "@/services/currency";
import { ICurrency } from "@/interfaces/currency";
import { IResponseDtoArray, IResponseDto } from "@/interfaces/responseDto";
import { goalTypesService } from "@/services/goalTypes";
import { IGoalType } from "@/interfaces/goalType";
import { onboardingService } from "@/services/onboarding";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTERS } from "@/utils/constants/routers";

export default function useOnboardingProgress() {
  const [step, setStep] = useState<number>(1);
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [goalTypes, setGoalTypes] = useState<IGoalType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserId(user.id);
      } catch (_error) {
        // Error parsing user from localStorage
      }
    }
  }, []);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IOnboardingFormData>({
    resolver: zodResolver(formSchemaOnboarding),
    defaultValues: CURRENT_FORM_ONBOARDING,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const getAllCurrencies = async (): Promise<void> => {
    try {
      const currencies: IResponseDtoArray =
        await currencyService.getAllCurrencies();
      setCurrencies(currencies.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getAllGoalTypes = async (): Promise<void> => {
    try {
      const goalTypes: IResponseDtoArray =
        await goalTypesService.getAllGoalTypes();
      setGoalTypes(goalTypes.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Filter errors to only show relevant ones for current step
  const getErrorsForStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return {
          currency_id: errors.currency_id,
          monthly_income: errors.monthly_income,
        };
      case 2:
        return {
          goal_type_id: errors.goal_type_id,
        };
      case 3:
        return {
          budget_preference_id: errors.budget_preference_id,
        };
      case 4:
        return {
          initial_balance: errors.initial_balance,
        };
      default:
        return {};
    }
  };

  const filteredErrors = getErrorsForStep(step);

  // Navigation logic
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Step information
  const isLastStep = step === 4;
  const isFirstStep = step === 1;

  const handleOnboardingSubmit = async (
    data: IOnboardingFormData
  ): Promise<void> => {
    setLoading(true);
    try {
      // Convert strings to numbers and set completed to 1
      const submitData: IOnboardingRequest = {
        completed: 1,
        currency_id: Number(data.currency_id),
        monthly_income: Number(data.monthly_income || 0),
        goal_type_id: Number(data.goal_type_id),
        budget_preference_id: Number(data.budget_preference_id),
        initial_balance: Number(data.initial_balance),
        user_id: userId || undefined,
      };

      const response: IResponseDto = await onboardingService.submitOnboarding(
        submitData
      );

      if (response.status >= 400) {
        toast.error("Error", {
          description: response.message,
          duration: 2000,
        });
        setLoading(false);
        return;
      }

      toast.success("Onboarding completed", {
        description: "Your profile has been set up successfully",
        duration: 2000,
      });

      // Redirect to dashboard
      router.push(ROUTERS.dashboard);
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "An error occurred during onboarding",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async (): Promise<void> => {
    setLoading(true);
    try {
      // Create skip data with default values (completed: 0 for skip)
      const skipData: IOnboardingRequest = {
        completed: 0,
        currency_id: 1,
        monthly_income: 0,
        goal_type_id: 1,
        budget_preference_id: 1,
        initial_balance: 0,
        user_id: userId || undefined,
      };

      const response: IResponseDto = await onboardingService.submitOnboarding(
        skipData
      );

      if (response.status >= 400) {
        toast.error("Error", {
          description: response.message,
          duration: 2000,
        });
        setLoading(false);
        return;
      }

      toast.success("Onboarding skipped", {
        description: "You can complete your profile later",
        duration: 2000,
      });

      // Redirect to dashboard
      router.push(ROUTERS.dashboard);
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "An error occurred during onboarding",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCurrencies();
    getAllGoalTypes();
  }, []);

  return {
    step,
    setStep,
    control,
    handleSubmit,
    setError,
    errors: filteredErrors,
    handleOnboardingSubmit,
    handleSkip,
    handleNext,
    handleBack,
    isLastStep,
    isFirstStep,
    currencies,
    goalTypes,
    loading,
  };
}
