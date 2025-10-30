import BarProgress from "@/ui/components/BarProgress";
import useOnboardingProgress from "../hooks/useOnboardingProgress";
import OnboardingProgressBody from "./OnboardingProgressBody";
import { ONBOARDING_STEPS } from "../utils/constants/onboardingOptions";
import Button from "@/ui/components/Button";
import { IconArrowLeft, IconArrowRight } from "../../../../../public/icons";

export default function OnboardingProgress(): React.ReactNode {
  const {
    step,
    setStep,
    errors,
    control,
    handleSubmit,
    handleOnboardingSubmit,
    handleSkip,
    handleNext,
    handleBack,
    isLastStep,
    isFirstStep,
    currencies,
    goalTypes,
    loading,
  } = useOnboardingProgress();

  const currentStepData = ONBOARDING_STEPS.find((s) => s.step === step);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 mb-6">
        <BarProgress step={step} setStep={setStep} totalStep={4} />
      </div>

      <form
        onSubmit={handleSubmit(handleOnboardingSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-[1.8rem] font-bold">{currentStepData?.title}</h1>
          <p className="text-[var(--color-text-gray)] text-sm">
            {currentStepData?.description}
          </p>
        </div>

        <OnboardingProgressBody
          errors={errors}
          control={control}
          step={step}
          currencies={currencies}
          goalTypes={goalTypes}
        />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2 w-full">
            {!isFirstStep ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <IconArrowLeft />
                Back
              </Button>
            ) : (
              <></>
            )}

            {isLastStep ? (
              <Button
                type="submit"
                variant="primary"
                className="flex items-center gap-2"
                disabled={loading}
              >
                {loading ? "Setting up..." : "Get Started"}
                {!loading && <IconArrowRight />}
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                onClick={handleNext}
                className="flex items-center gap-2 w-full justify-center"
              >
                Continue
                <IconArrowRight />
              </Button>
            )}
          </div>

          {!isLastStep && (
            <div className="text-center">
              <Button
                type="button"
                className="w-full"
                onClick={handleSkip}
                variant="outline"
                disabled={loading}
              >
                {loading ? "Skipping..." : "Skip for now"}
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
