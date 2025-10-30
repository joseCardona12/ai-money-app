import Button from "@/ui/components/Button";
import { IconGithub, IconGoogle } from "../../../../../public/icons";
import LineOr from "@/ui/components/LineOr";

interface IFormSignUpHeaderProps {
  loading: boolean;
}
export default function FormSignUpHeader({
  loading,
}: IFormSignUpHeaderProps): React.ReactNode {
  return (
    <div
      className={`form-header flex flex-col gap-6 ${loading && "opacity-50"}`}
    >
      <div>
        <h1 className="text-[1.8rem] font-bold">Create your account</h1>
        <p className="text-[var(--color-text-gray)] text-sm">
          Start managing your finances smarter today
        </p>
      </div>
      <div className="flex flex-col w-full gap-2">
        <Button
          variant="outline"
          type="button"
          className="flex justify-center items-center gap-4"
        >
          <IconGithub />
          <span>Continue with GitHub</span>
        </Button>
        <Button
          variant="outline"
          type="button"
          className="flex justify-center items-center gap-4"
        >
          <IconGoogle />
          <span>Continue with Google</span>
        </Button>
      </div>
      <LineOr text="OR SIGN UP WITH EMAIL" />
    </div>
  );
}
