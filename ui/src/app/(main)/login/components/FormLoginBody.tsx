import { ILoginRequest } from "@/interfaces/login";
import FormField from "@/ui/components/FormField";
import { Control, FieldErrors } from "react-hook-form";
import { IconEye, IconEyeOff } from "../../../../../public/icons";
import Input from "@/ui/components/Input";
import Link from "next/link";

interface IFormLoginBodyProps {
  control: Control<ILoginRequest>;
  errors: FieldErrors<ILoginRequest>;
  showIcon: boolean;
  setShowIcon: (value: boolean) => void;
  setRemember: (value: boolean) => void;
  remember: boolean;
  loading: boolean;
}
export default function FormLoginBody({
  control,
  errors,
  showIcon,
  setShowIcon,
  setRemember,
  remember,
  loading,
}: IFormLoginBodyProps): React.ReactNode {
  return (
    <div className={`flex flex-col gap-4 ${loading && "opacity-50"}`}>
      <FormField<ILoginRequest>
        label="Email address"
        name="email"
        type="email"
        placeholder="name@gmail.com"
        error={errors.email}
        control={control}
      />
      <FormField<ILoginRequest>
        label="Password"
        name="password"
        type="text"
        secondType="password"
        placeholder="*****"
        icon={<IconEye />}
        secondIcon={<IconEyeOff />}
        withIcon
        error={errors.password}
        control={control}
        setShowIcon={setShowIcon}
        showIcon={showIcon}
      />
      <div className="flex items-center justify-between">
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
            Remember
          </span>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm text-[var(--color-blue)] font-medium"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
