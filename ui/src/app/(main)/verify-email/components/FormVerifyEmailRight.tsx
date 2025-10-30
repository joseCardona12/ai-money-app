import { IconLock } from "@tabler/icons-react";
import { IconCheck } from "../../../../../public/icons";

export default function FormVerifyEmailRight(): React.ReactNode {
  return (
    <div className="flex flex-col gap-6">
      <div className="right-header flex flex-col gap-2 justify-center items-center">
        <div className="h-14 w-14 bg-[var(--color-blue-light-2)] rounded-full flex justify-center items-center">
          <IconLock className="w-8 h-8 text-[var(--color-blue)]" />
        </div>
        <h2 className="font-bold text-[1.6rem] w-100 text-center">
          Almost there!
        </h2>
      </div>
      <div className="right-body flex flex-col gap-6">
        <p className="text-sm text-[var(--color-text-gray)] w-90 text-center">
          Create a new secure password to complete the reset process and regain
          access to your account.
        </p>
        <div className="justify-between bg-[var(--color-gray)] p-3 rounded-lg border border-[var(--color-gray-border)] flex flex-col gap-2">
          <h5 className="text-sm">Password requirements:</h5>
          <ul className="flex flex-col gap-1">
            <li className="text-[.8rem] text-[var(--color-text-gray)] flex items-center gap-2">
              <IconCheck />
              At least 6 characters long
            </li>
            <li className="text-[.8rem] text-[var(--color-text-gray)] flex items-center gap-2">
              <IconCheck />
              Must match confirmation
            </li>
            <li className="text-[.8rem] text-[var(--color-text-gray)] flex items-center gap-2">
              <IconCheck />
              Choose something secure and memorable
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
