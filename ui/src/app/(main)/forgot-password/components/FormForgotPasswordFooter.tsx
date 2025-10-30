import Button from "@/ui/components/Button";
import { IconArrowLeft, IconArrowRight } from "../../../../../public/icons";
import { useRouter } from "next/navigation";

interface IFormForgotPasswordFooterProps {
  tabKey: string;
}
export default function FormForgotPasswordFooter({
  tabKey,
}: IFormForgotPasswordFooterProps): React.ReactNode {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="primary"
        className="flex items-center justify-center w-full gap-2"
      >
        <span>
          {tabKey === "email" ? "Send reset link" : "Send verification code"}
        </span>
        <IconArrowRight />
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-center w-full gap-2"
        onClick={() => {
          router.push("/login");
        }}
        type="button"
      >
        <IconArrowLeft />
        <span>Back to login</span>
      </Button>
    </div>
  );
}
