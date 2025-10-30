import ItemFinancialJourney from "../../sign-up/components/ItemFinancialJourney";
import {
  CURRENT_FINANCIAL_JOURNEY,
  IFinancialJourney,
} from "../../sign-up/utils/constants/financialJourney";
import {
  CURRENT_ONBOARDING_ITEM_FINANCIAL,
  IOnboardingItemFinancial,
} from "../utils/constants/onboardingItemFinancial";

export default function OnboardingLeft(): React.ReactNode {
  return (
    <div className="flex flex-col gap-6">
      <div className="right-header flex flex-col gap-2 justify-center">
        <div className="h-14 w-14 bg-[var(--color-blue-light-2)] rounded-full flex justify-center items-center">
          <div className="h-8 w-8 bg-[var(--color-blue)] rounded-full"></div>
        </div>
        <h2 className="font-bold text-[1.6rem] w-80">
          Let's set up your financial profile
        </h2>
      </div>
      <div className="right-body flex flex-col gap-6">
        <p className="text-sm text-[var(--color-text-gray)] w-90">
          Join thousands of users who trust ai money to manage their finances
          smarter with AI-powered insights.
        </p>
        <div className="flex flex-col gap-2">
          {CURRENT_ONBOARDING_ITEM_FINANCIAL.map(
            (item: IOnboardingItemFinancial, index: number) => (
              <ItemFinancialJourney
                description={item.description}
                icon={
                  <span className="text-sm text-[var(--color-blue)]">
                    {item.number}
                  </span>
                }
                title={item.title}
                key={index}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
