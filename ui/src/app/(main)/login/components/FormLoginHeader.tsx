import Button from "@/ui/components/Button";
import LineOr from "@/ui/components/LineOr";
import { IconGithub, IconGoogle } from "../../../../../public/icons";

interface IFormLoginHeaderProps {
  loading: boolean;
}
export default function FormLoginHeader({
  loading,
}: IFormLoginHeaderProps): React.ReactNode {
  return (
    <div
      className={`form-header flex flex-col gap-6 ${loading && "opacity-50"}`}
    >
      <div>
        <h1 className="text-[1.8rem] font-bold">Welcome back</h1>
        <p className="text-[var(--color-text-gray)] text-sm">
          Sign in to continue to your account
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
      <LineOr text="OR COTINUE WITH EMAIL" />
    </div>
  );
}
