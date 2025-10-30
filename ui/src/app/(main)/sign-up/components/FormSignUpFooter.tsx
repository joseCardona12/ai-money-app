import Button from "@/ui/components/Button";
import { IconArrowRight, IconSpinner } from "../../../../../public/icons";
import Link from "next/link";

interface IFormSignUpHeaderProps {
  loading: boolean;
}
export default function FormSignUpFooter({
  loading,
}: IFormSignUpHeaderProps): React.ReactNode {
  return (
    <div className="w-full flex flex-col gap-2">
      <Button
        variant="primary"
        className="w-full flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2 justify-center">
            <IconSpinner className="animate-spin duration-150" />
            <span>Loading...</span>
          </div>
        ) : (
          "Create account"
        )}
        <IconArrowRight />
      </Button>
      <p className="text-sm text-[var(--color-text-gray)] text-center">
        Do you have an account?{" "}
        <Link href="/login" className="text-[var(--color-blue)]">
          Sign in
        </Link>
      </p>
    </div>
  );
}
