import { IVerifyPhoneRequest } from "@/interfaces/verifyPhoneCode";
import FormField from "@/ui/components/FormField";
import { Control, FieldErrors } from "react-hook-form";

interface IFormVerifyPhoneBodyProps {
  control: Control<IVerifyPhoneRequest>;
  errors: FieldErrors<IVerifyPhoneRequest>;
}

export default function FormVerifyPhoneBody({
  control,
  errors,
}: IFormVerifyPhoneBodyProps): React.ReactNode {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center w-full gap-2">
        <FormField<IVerifyPhoneRequest>
          label=""
          name="codeOne"
          type="number"
          placeholder=""
          error={errors.codeOne}
          control={control}
          className="w-full"
        />
        <FormField<IVerifyPhoneRequest>
          label=""
          name="codeTwo"
          type="number"
          placeholder=""
          error={errors.codeTwo}
          control={control}
          className="w-full"
        />
        <FormField<IVerifyPhoneRequest>
          label=""
          name="codeThree"
          type="number"
          placeholder=""
          error={errors.codeThree}
          control={control}
          className="w-full"
        />
        <FormField<IVerifyPhoneRequest>
          label=""
          name="codeFour"
          type="number"
          placeholder=""
          error={errors.codeFour}
          control={control}
          className="w-full"
        />
        <FormField<IVerifyPhoneRequest>
          label=""
          name="codeFive"
          type="number"
          placeholder=""
          error={errors.codeFive}
          control={control}
          className="w-full"
        />
        <FormField<IVerifyPhoneRequest>
          label=""
          name="codeSix"
          type="number"
          placeholder=""
          error={errors.codeSix}
          control={control}
          className="w-full"
        />
      </div>
      <p style={{ color: "var(--color-text-gray)" }} className="text-sm">
        Enter the code sent via SMS
      </p>
    </div>
  );
}
