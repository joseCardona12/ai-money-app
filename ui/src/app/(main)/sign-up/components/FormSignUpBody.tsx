import { ISignUpRequest } from "@/interfaces/signUp";
import FormField from "@/ui/components/FormField";
import { Control, FieldErrors } from "react-hook-form";
import { IconEye, IconEyeOff } from "../../../../../public/icons";
import Input from "@/ui/components/Input";
import Link from "next/link";

interface IFormSignUpBodyProps {
  control: Control<ISignUpRequest>;
  errors: FieldErrors<ISignUpRequest>;
  setRemember: (value: boolean) => void;
  remember: boolean;
  loading: boolean;
}
export default function FormSignUpBody({
  errors,
  control,
  setRemember,
  remember,
  loading,
}: IFormSignUpBodyProps): React.ReactNode {
  return (
    <div className={`flex flex-col gap-4 ${loading && "opacity-50"}`}>
      <FormField<ISignUpRequest>
        label="Full name"
        name="fullName"
        type="text"
        placeholder="name"
        error={errors.fullName}
        control={control}
      />
      <FormField<ISignUpRequest>
        label="Email address"
        name="email"
        type="email"
        placeholder="name@gmail.com"
        error={errors.email}
        control={control}
      />
      <FormField<ISignUpRequest>
        label="Password"
        name="password"
        type="text"
        secondType="password"
        icon={<IconEye />}
        secondIcon={<IconEyeOff />}
        placeholder="Create a strong password"
        error={errors.password}
        control={control}
        withIcon
      />
      <div>
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setRemember(!remember)}
        >
          <Input
            type="checkbox"
            checked={remember}
            onChange={(e) => {
              setRemember(e.target.checked);
            }}
          />
          <span className="text-sm text-[var(--color-text-gray)]">
            I agree to the{" "}
            <Link href="/terms" className="text-[var(--color-blue)]">
              Terms of service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[var(--color-blue)]">
              Privacity Policy
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
