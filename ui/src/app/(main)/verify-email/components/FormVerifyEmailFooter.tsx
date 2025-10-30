import Button from "@/ui/components/Button";
import Link from "next/link";
import { IconArrowLeft } from "../../../../../public/icons";

export default function FormVerifyEmailFooter(): React.ReactNode {
  return (
    <div className="flex flex-col gap-6">
      <Button variant="primary" className="w-full" type="submit">
        Reset password
      </Button>
      <div className="flex flex-col">
        <div className="flex items-center justify-center gap-2">
          <IconArrowLeft className="text-sm text-[var(--color-text-gray)]" />
          <Link href="/login" className="text-sm text-[var(--color-text-gray)]">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
