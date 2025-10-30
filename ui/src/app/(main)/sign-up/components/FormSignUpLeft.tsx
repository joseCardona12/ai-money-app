import { IconCheck, IconEye } from "../../../../../public/icons";
import {
  CURRENT_FINANCIAL_JOURNEY,
  IFinancialJourney,
} from "../utils/constants/financialJourney";
import ItemFinancialJourney from "./ItemFinancialJourney";

export default function FormSignUpLeft(): React.ReactNode {
  return (
    <div className="flex flex-col gap-6">
      <div className="right-header flex flex-col gap-2">
        <div className="h-12 w-12 bg-[var(--color-blue-light-2)] rounded-full flex justify-center items-center">
          <div className="h-8 w-8 bg-[var(--color-blue)] rounded-full"></div>
        </div>
        <h2 className="font-bold text-[1.6rem] w-70">
          Start your journey to financial freedom
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {CURRENT_FINANCIAL_JOURNEY.map(
          (item: IFinancialJourney, index: number) => (
            <ItemFinancialJourney
              description={item.description}
              icon={item.icon}
              title={item.title}
              key={index}
            />
          )
        )}
      </div>
    </div>
  );
}
