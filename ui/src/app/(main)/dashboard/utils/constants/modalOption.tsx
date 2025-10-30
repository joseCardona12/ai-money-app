import { IModalOption } from "@/interfaces/ModalOption";
import {
  IconSettings,
  IconUser,
  IconLogout,
} from "../../../../../../public/icons";

export const USER_MODAL_OPTIONS: IModalOption[] = [
  {
    title: "My account",
    icon: <IconUser className="text-sm text-[var(--color-text-gray)]" />,
    text: "Profile",
    url: "/dashboard/myaccount",
  },
  {
    title: "Settings",
    icon: <IconSettings className="text-sm text-[var(--color-text-gray)]" />,
    text: "Settings",
    url: "/dashboard/settings",
  },
  {
    title: "Logout",
    icon: <IconLogout className="text-sm text-red-500" />,
    text: "Logout",
    url: "/logout",
  },
];
