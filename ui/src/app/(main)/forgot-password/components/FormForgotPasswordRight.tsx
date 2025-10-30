import ItemFinancialJourney from "../../sign-up/components/ItemFinancialJourney";
import {
  CURRENT_FORGOT_PASSWORD_ITEMS,
  IForgotPasswordItem,
} from "../utils/constants/forgotPasswordItem";

export default function FormForgotPasswordRight(): React.ReactNode {
  return (
    <div className="flex flex-col gap-6">
      <div className="right-header flex flex-col gap-2 justify-center items-center">
        <div className="h-12 w-12 bg-[var(--color-blue-light-2)] rounded-full flex justify-center items-center">
          <div className="h-8 w-8 bg-[var(--color-blue)] rounded-full"></div>
        </div>
        <h2 className="font-bold text-[1.6rem] w-90 text-center">
          Don't worry,it happens!
        </h2>
      </div>
      <div className="right-body flex flex-col gap-6">
        <p className="text-sm text-[var(--color-text-gray)] w-90 text-center">
          We'll help you reset your password and get back to managing your
          finances in no time
        </p>
        <div className="flex flex-col gap-4">
          {CURRENT_FORGOT_PASSWORD_ITEMS.map(
            (item: IForgotPasswordItem, index: number) => (
              <ItemFinancialJourney
                description={item.description}
                title={item.title}
                key={index}
                icon={
                  <span className="text-[var(--color-blue)] text-sm">
                    {item.number}
                  </span>
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
