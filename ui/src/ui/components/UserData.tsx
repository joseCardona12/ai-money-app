import { IUserData } from "@/interfaces/dashboard";
import { useState } from "react";
import ModalOption from "./ModalOption";
import { IModalOption } from "@/interfaces/ModalOption";
import useAuthListener from "@/app/(main)/dashboard/hooks/useAuthListener";

interface IUserDataProps {
  userData: IUserData;
  options: IModalOption[];
}
export default function UserData({
  userData,
  options,
}: IUserDataProps): React.ReactNode {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { user } = useAuthListener();

  // Safe email extraction
  const getEmail = user?.email
    ? `${user.email.slice(0, 16)}..`
    : "user@example.com";

  // Safe initials extraction
  const getInitials = (() => {
    if (!user?.fullName) return "U";
    const nameParts = user.fullName.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return nameParts[0][0] || "U";
  })();
  return (
    <div className="flex gap-3 items-center relative">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{user?.fullName}</p>
        <p className="text-xs" style={{ color: "var(--color-text-gray)" }}>
          {getEmail}
        </p>
      </div>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium cursor-pointer bg-[var(--color-blue)] overflow-hidden"
        onClick={() => setShowMenu(!showMenu)}
      >
        {user?.profile_picture ? (
          <img
            src={user.profile_picture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          getInitials.toUpperCase()
        )}
      </div>
      {showMenu && <ModalOption title="My account" options={options} />}
    </div>
  );
}
