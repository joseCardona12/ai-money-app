import Button from "@/ui/components/Button";
import Link from "next/link";
import { IconSpinner } from "../../../../../public/icons";

interface IFormLoginFooterProps {
  loading: boolean;
}
export default function FormLoginFooter({
  loading,
}: IFormLoginFooterProps): React.ReactNode {
  return (
    <div className={`w-full flex flex-col gap-4 ${loading && "opacity-50"}`}>
      <Button variant="primary" className="w-full" disabled={loading}>
        {loading ? (
          <div className="flex items-center gap-2 justify-center">
            <IconSpinner className="animate-spin duration-150" />
            <span>Loading...</span>
          </div>
        ) : (
          "Sign in"
        )}
      </Button>
      <p className="text-sm text-[var(--color-text-gray)] text-center">
        Don't have an account?{" "}
        <Link href="/sign-up" className="text-[var(--color-blue)]">
          Sign Up for free
        </Link>
      </p>
    </div>
  );
}
