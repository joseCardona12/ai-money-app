import ContentTab from "@/ui/components/ContentTab";
import { IconCheck } from "../../../../../public/icons";
import { IContentTab } from "@/interfaces/contentTab";
import FormField from "@/ui/components/FormField";
import { IForgotPasswordRequest } from "@/interfaces/forgotPassword";
import { Control, FieldErrors } from "react-hook-form";

interface IFormForgotPasswordBodyProps {
  setElementTab: (value: string) => void;
  contentTabs: IContentTab[];
  setContentTabs: (value: IContentTab[]) => void;
  elementTab: string;
  errors: FieldErrors<IForgotPasswordRequest>;
  control: Control<IForgotPasswordRequest>;
}
export default function FormForgotPasswordBody({
  setElementTab,
  contentTabs,
  setContentTabs,
  elementTab,
  control,
  errors,
}: IFormForgotPasswordBodyProps): React.ReactNode {
  console.log("element tab", elementTab);
  return (
    <div className="flex flex-col gap-4">
      <ContentTab
        contentTabs={contentTabs}
        setElement={setElementTab}
        setContentTabs={setContentTabs}
      />
      {elementTab === "email" ? (
        <div className="flex flex-col gap-2">
          <FormField<IForgotPasswordRequest>
            label="Email address"
            name="email"
            type="email"
            placeholder="name@gmail.com"
            error={errors.email}
            control={control}
          />
          <p className="text-[.8rem] text-[var(--color-text-gray)]">
            We'll send you link to reset your password
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <FormField<IForgotPasswordRequest>
            label="Phone number"
            name="phoneNumber"
            type="number"
            placeholder="+57 3006233512"
            error={errors.phoneNumber}
            control={control}
          />
          <p className="text-[.8rem] text-[var(--color-text-gray)]">
            We'll send you a verification code via SMS
          </p>
        </div>
      )}
    </div>
  );
}
